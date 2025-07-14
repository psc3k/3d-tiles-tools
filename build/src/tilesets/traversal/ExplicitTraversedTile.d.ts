import { ResourceResolver } from "../../base";
import { Tileset } from "../../structure";
import { Tile } from "../../structure";
import { Content } from "../../structure";
import { TileImplicitTiling } from "../../structure";
import { MetadataEntity } from "../../structure";
import { Schema } from "../../structure";
import { TraversedTile } from "./TraversedTile";
/**
 * An implementation of a `TraversedTile` that reflects a tile
 * that actually appears as a JSON representation in the tileset.
 *
 * @internal
 */
export declare class ExplicitTraversedTile implements TraversedTile {
    /**
     * The parent tile, or `undefined` if this is the root
     */
    private readonly _parent;
    /**
     * The `Tileset` that this tile belongs to
     */
    private readonly _tileset;
    /**
     * The `Tile` object that this traversed tile was created for
     */
    private readonly _tile;
    /**
     * A JSON-path like path identifying this tile
     */
    private readonly _path;
    /**
     * The global level. This is the level starting at the
     * root of the tileset.
     */
    private readonly _level;
    /**
     * The metadata schema in the context of which this tile
     * is created. This is the schema that was obtained from
     * the `tileset.schema` or `tileset.schemaUri`. If this
     * is defined, it is assumed to be valid. If it is
     * undefined and a tile with metadata is encountered,
     * then an error will be thrown in `asTile`.
     */
    private readonly _schema;
    /**
     * The `ResourceResolver` that will resolve resources
     * that may be required if this is the root of an
     * implicit tileset (e.g. the subtree files).
     */
    private readonly _resourceResolver;
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
    static createRoot(tileset: Tileset, root: Tile, schema: Schema | undefined, resourceResolver: ResourceResolver): TraversedTile;
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
    constructor(tileset: Tileset, tile: Tile, path: string, level: number, parent: TraversedTile | undefined, schema: Schema | undefined, resourceResolver: ResourceResolver);
    /**
     * Returns the `metadata` from the input JSON that defines the
     * `MetadataEntity` that is associated with this tile, or
     * `undefined` if the input did not contain a metadata entity.
     *
     * @returns The `MetadataEntity` object, or `undefined`
     */
    getMetadata(): MetadataEntity | undefined;
    /**
     * Returns the `implicitTiling` from the input JSON that defines the
     * `TileImplicitTiling` that is associated with this tile, or
     * `undefined` if this tile does not define an implicit tiling.
     *
     * @returns The `TileImplicitTiling` object
     */
    getImplicitTiling(): TileImplicitTiling | undefined;
    /** {@inheritDoc TraversedTile.asRawTile} */
    asRawTile(): Tile;
    /** {@inheritDoc TraversedTile.asFinalTile} */
    asFinalTile(): Tile;
    /** {@inheritDoc TraversedTile.path} */
    get path(): string;
    /** {@inheritDoc TraversedTile.level} */
    get level(): number;
    /** {@inheritDoc TraversedTile.getParent} */
    getParent(): TraversedTile | undefined;
    /** {@inheritDoc TraversedTile.getChildren} */
    getChildren(): Promise<TraversedTile[]>;
    /** {@inheritDoc TraversedTile.getRawContents} */
    getRawContents(): Content[];
    /** {@inheritDoc TraversedTile.getFinalContents} */
    getFinalContents(): Content[];
    /** {@inheritDoc TraversedTile.getResourceResolver} */
    getResourceResolver(): ResourceResolver;
    /** {@inheritDoc TraversedTile.isImplicitTilesetRoot} */
    isImplicitTilesetRoot(): boolean;
    /** {@inheritDoc TraversedTile.getSubtreeUri} */
    getSubtreeUri(): string | undefined;
    /** {@inheritDoc TraversedTile.getTileset} */
    getTileset(): Tileset;
    /**
     * Creates a string representation of this tile.
     *
     * The exact format is not specified, but it will contain information
     * that is suitable for identifying this tile within a tile hierarchy.
     *
     * @returns The string
     */
    toString: () => string;
}
//# sourceMappingURL=ExplicitTraversedTile.d.ts.map