"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetMerger = void 0;
const path_1 = __importDefault(require("path"));
const base_1 = require("../../base");
const base_2 = require("../../base");
const tilesets_1 = require("../../tilesets");
const tilesets_2 = require("../../tilesets");
const tilesets_3 = require("../../tilesets");
const tilesets_4 = require("../../tilesets");
const BoundingVolumes_1 = require("./BoundingVolumes");
/**
 * A class for merging multiple tilesets, to create a tileset that refers
 * to the merged ones as external tilesets.
 *
 * @internal
 */
class TilesetMerger {
    /**
     * Creates a new instance
     */
    constructor() {
        this.tilesetSources = [];
        this.tilesetSourceJsonFileNames = [];
        this.externalTilesetDirectories = [];
    }
    /**
     * Merges the tileset from the specified sources into one tileset
     * that refers to the sources as external ones, and writes the
     * result into the given target.
     *
     * @param tilesetSourceNames - The tileset source names
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether target files should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     * @throws TilesetError When the output already exists
     * and `overwrite` was `false`.
     */
    async merge(tilesetSourceNames, tilesetTargetName, overwrite) {
        return this.mergeOperation(tilesetSourceNames, tilesetTargetName, overwrite, false);
    }
    /**
     * Merges the tilesets from the given sources into one tileset
     * that refers to the sources as external ones, and writes the
     * result into the given target.
     *
     * If the given source file names are `undefined`, then this
     * will assume that all source names are `tileset.json`.
     *
     * This will write the data from the given sources into
     * subdirectories within the target. The names of these
     * subdirectories are unspecified.
     *
     * The caller is responsible for calling `open` on the given
     * sources and `begin` on the given target before calling this
     * method, and `close` on the sources and `end` on the target
     * after calling this method.
     *
     * @param tilesetSources - The tileset sources
     * @param tilesetSourceJsonFileNames - The names of the main tileset
     * JSON files in the sources. When this is `undefined`, then the
     * name `tileset.json` will be assumed for all of them.
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName  - The name that the main
     * tileset JSON should have in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the given source file names are defined
     * and their number does not match the number of sources.
     * @throws TilesetError When the input could not be processed
     */
    async mergeData(tilesetSources, tilesetSourceJsonFileNames, tilesetTarget, tilesetTargetJsonFileName) {
        if (tilesetSourceJsonFileNames === undefined) {
            tilesetSourceJsonFileNames = Array(tilesetSources.length).fill("tileset.json");
        }
        if (tilesetSourceJsonFileNames.length !== tilesetSources.length) {
            const message = `Received ${tilesetSources.length} sources ` +
                `but ${tilesetSourceJsonFileNames.length} source JSON file names`;
            throw new tilesets_1.TilesetError(message);
        }
        this.tilesetSources = tilesetSources;
        this.tilesetSourceJsonFileNames = tilesetSourceJsonFileNames;
        this.externalTilesetDirectories = [];
        for (let i = 0; i < tilesetSources.length; i++) {
            this.externalTilesetDirectories.push(`external_${i}`);
        }
        this.tilesetTarget = tilesetTarget;
        this.tilesetTargetJsonFileName = tilesetTargetJsonFileName;
        // Perform the actual merge, creating the merged tileset JSON
        // in the target
        await this.mergeInternal();
        // Copy the resources from the sources to the target
        await this.copyResources();
        this.tilesetSources.length = 0;
        this.externalTilesetDirectories.length = 0;
        this.tilesetTarget = undefined;
        this.tilesetTargetJsonFileName = undefined;
    }
    /**
     * Merges the tileset from the specified sources into one tileset
     * that refers to the sources as external ones, and writes the
     * result into the given target without copying resources to
     * output directory.
     *
     * @param tilesetSourceNames - The tileset source names
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether target files should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     * @throws TilesetError When the output already exists
     * and `overwrite` was `false`.
     */
    async mergeJson(tilesetSourceNames, tilesetTargetName, overwrite) {
        return this.mergeOperation(tilesetSourceNames, tilesetTargetName, overwrite, true);
    }
    /**
     * Internal method to differentiate between `merge` and `mergeJson`
     *
     * @param tilesetSourceNames - The tileset source names
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether target files should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     */
    async mergeOperation(tilesetSourceNames, tilesetTargetName, overwrite, jsonOnly) {
        const tilesetTargetDirectory = tilesets_4.Tilesets.determineTilesetDirectoryName(tilesetTargetName);
        for (const tilesetSourceName of tilesetSourceNames) {
            // Determine the name of the file that contains the tileset JSON data,
            // and the source directory
            const tilesetSourceJsonFileName = tilesets_4.Tilesets.determineTilesetJsonFileName(tilesetSourceName);
            const externalTilesetDirectory = tilesets_4.Tilesets.determineTilesetDirectoryName(tilesetSourceName);
            const tilesetSource = await tilesets_2.TilesetSources.createAndOpen(tilesetSourceName);
            this.tilesetSources.push(tilesetSource);
            this.tilesetSourceJsonFileNames.push(tilesetSourceJsonFileName);
            // Determine the directory name that will be used for referring
            // to the source tileset (via the `content.uri` in the merged
            // tileset), and store it in the 'externalTilesetDirectories'.
            if (jsonOnly) {
                // When only a merged JSON should be created, then the
                // external tileset directory will be a relative path,
                // pointing from the original source to the target
                const relativeExternalTilesetDirectory = base_1.Paths.relativize(tilesetTargetDirectory, externalTilesetDirectory);
                this.externalTilesetDirectories.push(relativeExternalTilesetDirectory);
            }
            else {
                // When a full merge operation is performed, then the
                // source tilesets are copied into the target directory,
                // using a name that just consists of the base name (last
                // path component) of the source directory, disambiguated
                const externalTilesetDirectoryBaseName = path_1.default.basename(externalTilesetDirectory);
                const uniqueExternalTilesetDirectory = TilesetMerger.createUnique(externalTilesetDirectoryBaseName, this.externalTilesetDirectories);
                this.externalTilesetDirectories.push(uniqueExternalTilesetDirectory);
            }
        }
        this.tilesetTargetJsonFileName =
            tilesets_4.Tilesets.determineTilesetJsonFileName(tilesetTargetName);
        this.tilesetTarget = await tilesets_3.TilesetTargets.createAndBegin(tilesetTargetName, overwrite);
        // Perform the actual merge, creating the merged tileset JSON
        // in the target
        await this.mergeInternal();
        // Copy the resources from the sources to the target
        if (!jsonOnly) {
            await this.copyResources();
        }
        // Clean up by closing the sources and the target
        for (const tilesetSource of this.tilesetSources) {
            await tilesetSource.close();
        }
        await this.tilesetTarget.end();
        this.tilesetSources.length = 0;
        this.externalTilesetDirectories.length = 0;
        this.tilesetTarget = undefined;
        this.tilesetTargetJsonFileName = undefined;
    }
    /**
     * Internal method for `merge`, only creating the actual merged
     * tileset JSON and putting it into the target.
     */
    async mergeInternal() {
        if (this.tilesetSources.length == 0 ||
            !this.tilesetTarget ||
            !this.tilesetTargetJsonFileName) {
            throw new base_2.DeveloperError("The sources and target must be defined");
        }
        // Parse the Tileset objects from all sources
        const tilesets = [];
        const length = this.tilesetSources.length;
        for (let i = 0; i < length; ++i) {
            const tilesetSource = this.tilesetSources[i];
            const tilesetSourceJsonFileName = this.tilesetSourceJsonFileNames[i];
            const tileset = await tilesets_2.TilesetSources.parseSourceValue(tilesetSource, tilesetSourceJsonFileName);
            tilesets.push(tileset);
        }
        // Derive the information for the merged tileset
        const geometricError = TilesetMerger.getMergedGeometricError(tilesets);
        const box = TilesetMerger.getMergedBox(tilesets);
        const children = TilesetMerger.getChildren(tilesets, this.externalTilesetDirectories, this.tilesetSourceJsonFileNames);
        const mergedTileset = {
            asset: {
                version: "1.1",
            },
            geometricError: geometricError,
            root: {
                boundingVolume: {
                    box: box,
                },
                refine: "ADD",
                geometricError: geometricError,
                children: children,
            },
        };
        // Write the merged tileset into the target
        const mergedTilesetJson = JSON.stringify(mergedTileset, null, 2);
        const mergedTilesetBuffer = Buffer.from(mergedTilesetJson);
        await this.tilesetTarget.addEntry(this.tilesetTargetJsonFileName, mergedTilesetBuffer);
    }
    /**
     * Copy the resources from the source tilesets into the target.
     *
     * This will obtain the entries of all sources, and add them
     * to the target, adding the `externalTilesetDirectory` to the
     * path.
     */
    async copyResources() {
        if (this.tilesetSources.length == 0 || !this.tilesetTarget) {
            throw new base_2.DeveloperError("The sources and target must be defined");
        }
        const length = this.tilesetSources.length;
        for (let i = 0; i < length; ++i) {
            const tilesetSource = this.tilesetSources[i];
            const externalTilesetDirectory = this.externalTilesetDirectories[i];
            const sourceKeys = await tilesetSource.getKeys();
            for await (const sourceKey of sourceKeys) {
                const value = await tilesetSource.getValue(sourceKey);
                const targetKey = base_1.Paths.join(externalTilesetDirectory, sourceKey);
                if (value) {
                    await this.tilesetTarget.addEntry(targetKey, value);
                }
            }
        }
    }
    /**
     * Creates a string that does not exist yet.
     *
     * If the given prefix is not yet contained in the given list,
     * then it is returned. Otherwise, it is made "unique" in an
     * unspecified way, and then returned.
     *
     * This does NOT add the new string to the given list!
     *
     * @param prefix - The prefix
     * @param existing - The existing strings
     * @returns The unique string
     */
    static createUnique(prefix, existing) {
        let result = prefix;
        let counter = 0;
        for (;;) {
            if (!existing.includes(result)) {
                return result;
            }
            result = `${prefix}-${counter}`;
            counter++;
        }
    }
    //========================================================================
    // The following functions are ported from the `merge-tilesets` branch
    // at https://github.com/CesiumGS/3d-tiles-tools/blob/d7e76e59022fc5e5aa4b848730ec9f8f4dea6d4e/tools/lib/mergeTilesets.js
    // with slight modification of 'getChildren' for disambiguation
    // and updates to compute bounding boxes instead of bounding spheres,
    // and a fix for https://github.com/CesiumGS/3d-tiles-tools/issues/157
    static getChildren(tilesets, externalTilesetDirectories, tilesetJsonFileNames) {
        const length = tilesets.length;
        const children = Array(length);
        for (let i = 0; i < length; ++i) {
            const tilesetJsonFileName = tilesetJsonFileNames[i];
            const externalTilesetDirectory = externalTilesetDirectories[i];
            const tilesetUrl = base_1.Paths.join(externalTilesetDirectory, tilesetJsonFileName);
            children[i] = tilesets[i].root;
            children[i].content = {
                uri: tilesetUrl,
            };
            children[i].boundingVolume = {
                box: TilesetMerger.getBoundingBox(tilesets[i]),
            };
            delete children[i].children;
            delete children[i].transform;
            delete children[i].implicitTiling;
        }
        return children;
    }
    static getMergedGeometricError(tilesets) {
        let geometricError = 0.0;
        const length = tilesets.length;
        for (let i = 0; i < length; ++i) {
            geometricError = Math.max(geometricError, tilesets[i].geometricError);
        }
        return geometricError;
    }
    static getBoundingBox(tileset) {
        const root = tileset.root;
        const boundingVolume = root.boundingVolume;
        const boundingVolumeBox = BoundingVolumes_1.BoundingVolumes.computeBoundingVolumeBoxFromBoundingVolume(boundingVolume);
        if (boundingVolumeBox === undefined) {
            throw new tilesets_1.TilesetError("No bounding volume found in root tile");
        }
        if (root.transform === undefined) {
            return boundingVolumeBox;
        }
        return BoundingVolumes_1.BoundingVolumes.transformBoundingVolumeBox(boundingVolumeBox, root.transform);
    }
    static getMergedBox(tilesets) {
        const length = tilesets.length;
        const boundingBoxes = Array(length);
        for (let i = 0; i < length; ++i) {
            boundingBoxes[i] = TilesetMerger.getBoundingBox(tilesets[i]);
        }
        const boundingBox = BoundingVolumes_1.BoundingVolumes.computeUnionBoundingVolumeBox(boundingBoxes);
        return boundingBox;
    }
}
exports.TilesetMerger = TilesetMerger;
//# sourceMappingURL=TilesetMerger.js.map