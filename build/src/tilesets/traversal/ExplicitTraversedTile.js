"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplicitTraversedTile = void 0;
const ExplicitTraversedTiles_1 = require("./ExplicitTraversedTiles");
const MetadataSemanticOverrides_1 = require("./MetadataSemanticOverrides");
const Tiles_1 = require("../tilesets/Tiles");
/**
 * An implementation of a `TraversedTile` that reflects a tile
 * that actually appears as a JSON representation in the tileset.
 *
 * @internal
 */
class ExplicitTraversedTile {
    /**
     * Convenience function to create the root tile for a tile
     * traversal.
     *
     * @param tileset - The tileset itself
     * @param root - The root tile from the tileset
     * @param schema - The optional metadata schema
     * @param resourceResolver - The `ResourceResolver` for
     * external references (like subtree files)
     * @returns The root `TraversedTile`
     */
    static createRoot(tileset, root, schema, resourceResolver) {
        const traversedRoot = new ExplicitTraversedTile(tileset, root, "/root", 0, undefined, schema, resourceResolver);
        return traversedRoot;
    }
    /**
     * Creates a new instance
     *
     * @param tileset - The tileset that this tile belongs to
     * @param tile - The `Tile` from the tileset JSON
     * @param path - A JSON-path-like string describing this tile
     * @param level - The level, referring to the root of the
     * traversal, starting at 0
     * @param parent - The optional parent tile
     * @param schema - The optional metadata schema
     * @param resourceResolver - The `ResourceResolver` for
     * external references (like subtree files)
     */
    constructor(tileset, tile, path, level, parent, schema, resourceResolver) {
        /**
         * Creates a string representation of this tile.
         *
         * The exact format is not specified, but it will contain information
         * that is suitable for identifying this tile within a tile hierarchy.
         *
         * @returns The string
         */
        this.toString = () => {
            return `ExplicitTraversedTile[level=${this.level}, path=${this.path}]`;
        };
        this._tileset = tileset;
        this._tile = tile;
        this._path = path;
        this._level = level;
        this._parent = parent;
        this._schema = schema;
        this._resourceResolver = resourceResolver;
    }
    /**
     * Returns the `metadata` from the input JSON that defines the
     * `MetadataEntity` that is associated with this tile, or
     * `undefined` if the input did not contain a metadata entity.
     *
     * @returns The `MetadataEntity` object, or `undefined`
     */
    getMetadata() {
        return this._tile.metadata;
    }
    /**
     * Returns the `implicitTiling` from the input JSON that defines the
     * `TileImplicitTiling` that is associated with this tile, or
     * `undefined` if this tile does not define an implicit tiling.
     *
     * @returns The `TileImplicitTiling` object
     */
    getImplicitTiling() {
        return this._tile.implicitTiling;
    }
    /** {@inheritDoc TraversedTile.asRawTile} */
    asRawTile() {
        return this._tile;
    }
    /** {@inheritDoc TraversedTile.asFinalTile} */
    asFinalTile() {
        const tile = this._tile;
        const finalTile = {
            boundingVolume: tile.boundingVolume,
            viewerRequestVolume: tile.viewerRequestVolume,
            geometricError: tile.geometricError,
            refine: tile.refine,
            transform: tile.transform,
            children: tile.children,
            metadata: tile.metadata,
            implicitTiling: tile.implicitTiling,
            extensions: tile.extensions,
            extras: tile.extras,
        };
        Tiles_1.Tiles.setContents(finalTile, this.getFinalContents());
        const schema = this._schema;
        if (schema) {
            MetadataSemanticOverrides_1.MetadataSemanticOverrides.applyExplicitTileMetadataSemanticOverrides(finalTile, schema);
        }
        return finalTile;
    }
    /** {@inheritDoc TraversedTile.path} */
    get path() {
        return this._path;
    }
    /** {@inheritDoc TraversedTile.level} */
    get level() {
        return this._level;
    }
    /** {@inheritDoc TraversedTile.getParent} */
    getParent() {
        return this._parent;
    }
    /** {@inheritDoc TraversedTile.getChildren} */
    async getChildren() {
        const implicitTiling = this._tile.implicitTiling;
        const schema = this._schema;
        if (implicitTiling) {
            const children = await ExplicitTraversedTiles_1.ExplicitTraversedTiles.createTraversedChildren(this._tileset, implicitTiling, schema, this, this._resourceResolver);
            return children;
        }
        if (!this._tile.children) {
            return [];
        }
        const children = this._tile.children;
        const childLevel = this._level + 1;
        const traversedChildren = [];
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const childPath = `${this.path}/children/${i}`;
            const traversedChild = new ExplicitTraversedTile(this._tileset, child, childPath, childLevel, this, this._schema, this._resourceResolver);
            traversedChildren.push(traversedChild);
        }
        return traversedChildren;
    }
    /** {@inheritDoc TraversedTile.getRawContents} */
    getRawContents() {
        if (this._tile.content) {
            return [this._tile.content];
        }
        if (this._tile.contents) {
            return this._tile.contents;
        }
        return [];
    }
    /** {@inheritDoc TraversedTile.getFinalContents} */
    getFinalContents() {
        const rawContents = this.getRawContents();
        const schema = this._schema;
        if (!schema) {
            return rawContents;
        }
        const finalContents = [];
        for (let i = 0; i < rawContents.length; i++) {
            const rawContent = rawContents[i];
            const finalContent = {
                boundingVolume: rawContent.boundingVolume,
                uri: rawContent.uri,
                metadata: rawContent.metadata,
                group: rawContent.group,
                extensions: rawContent.extensions,
                extras: rawContent.extras,
            };
            MetadataSemanticOverrides_1.MetadataSemanticOverrides.applyExplicitContentMetadataSemanticOverrides(finalContent, schema);
            finalContents.push(finalContent);
        }
        return finalContents;
    }
    /** {@inheritDoc TraversedTile.getResourceResolver} */
    getResourceResolver() {
        return this._resourceResolver;
    }
    /** {@inheritDoc TraversedTile.isImplicitTilesetRoot} */
    isImplicitTilesetRoot() {
        return this._tile.implicitTiling !== undefined;
    }
    /** {@inheritDoc TraversedTile.getSubtreeUri} */
    getSubtreeUri() {
        return undefined;
    }
    /** {@inheritDoc TraversedTile.getTileset} */
    getTileset() {
        return this._tileset;
    }
}
exports.ExplicitTraversedTile = ExplicitTraversedTile;
//# sourceMappingURL=ExplicitTraversedTile.js.map