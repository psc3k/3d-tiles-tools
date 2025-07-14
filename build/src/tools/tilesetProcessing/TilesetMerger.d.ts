import { TilesetSource } from "../../tilesets";
import { TilesetTarget } from "../../tilesets";
/**
 * A class for merging multiple tilesets, to create a tileset that refers
 * to the merged ones as external tilesets.
 *
 * @internal
 */
export declare class TilesetMerger {
    /**
     * The tileset sources that have been created from the source names
     */
    private tilesetSources;
    /**
     * The file names for the tileset JSON files.
     *
     * If the inputs are tileset JSON files, then these are the file names.
     * If the inputs are directories or files that do not end with ".json",
     * then these names will default to "tileset.json"
     */
    private tilesetSourceJsonFileNames;
    /**
     * The directories that will contain the external tilesets.
     *
     * For the default `merge` operation, these will be the last component
     * of the source directory name. For example, for a tileset like
     * "./data/example/tileset.json", this will be "example".
     * The merger will create subdirectories in the target directory,
     * and copy the source tilesets into these directories. The merged
     * tileset will then refer to these (copied) tilesets. Duplicate
     * names will be disambiguated.
     *
     * For the `mergeJson` operation, these will be relative paths,
     * pointing from the target directory to the original source
     * directories.
     *
     * In both cases, these will be the directories that appear in
     * the `content.uri` of the merged tileset.
     */
    private externalTilesetDirectories;
    /**
     * The target that the resulting tileset will be written to.
     */
    private tilesetTarget;
    /**
     * The name of the tileset JSON file in the target.
     * (Usually `tileset.json`)
     */
    private tilesetTargetJsonFileName;
    /**
     * Creates a new instance
     */
    constructor();
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
    merge(tilesetSourceNames: string[], tilesetTargetName: string, overwrite: boolean): Promise<void>;
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
    mergeData(tilesetSources: TilesetSource[], tilesetSourceJsonFileNames: string[] | undefined, tilesetTarget: TilesetTarget, tilesetTargetJsonFileName: string): Promise<void>;
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
    mergeJson(tilesetSourceNames: string[], tilesetTargetName: string, overwrite: boolean): Promise<void>;
    /**
     * Internal method to differentiate between `merge` and `mergeJson`
     *
     * @param tilesetSourceNames - The tileset source names
     * @param tilesetTargetName - The tileset target name
     * @param overwrite - Whether target files should be overwritten
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError When the input could not be processed
     */
    private mergeOperation;
    /**
     * Internal method for `merge`, only creating the actual merged
     * tileset JSON and putting it into the target.
     */
    private mergeInternal;
    /**
     * Copy the resources from the source tilesets into the target.
     *
     * This will obtain the entries of all sources, and add them
     * to the target, adding the `externalTilesetDirectory` to the
     * path.
     */
    private copyResources;
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
    private static createUnique;
    private static getChildren;
    private static getMergedGeometricError;
    private static getBoundingBox;
    private static getMergedBox;
}
//# sourceMappingURL=TilesetMerger.d.ts.map