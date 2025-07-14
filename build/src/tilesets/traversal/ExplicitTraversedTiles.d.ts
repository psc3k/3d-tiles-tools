import { ResourceResolver } from "../../base";
import { Tileset } from "../../structure";
import { TileImplicitTiling } from "../../structure";
import { Schema } from "../../structure";
import { TraversedTile } from "./TraversedTile";
import { ExplicitTraversedTile } from "./ExplicitTraversedTile";
/**
 * Internal methods used in the `ExplicitTraversedTile` class.
 *
 * (Specifically: Methods to create the children of explicit
 * tiles, when these explicit tiles define the root of an
 * implicit tileset)
 *
 * @internal
 */
export declare class ExplicitTraversedTiles {
    /**
     * Create the traversed children for the given explicit traversed tile.
     *
     * This method will be called from `ExplicitTraversedTile` instances
     * when the contain `implicitTiling` information, in order to create
     * the traversed children.
     *
     * The children will then be a single-element array that contains the
     * root node of the implicit tileset, as an `ImplicitTraversedTile`.
     *
     * @param tileset - The tileset
     * @param implicitTiling - The `TileImplicitTiling`
     * @param parent - The `ExplicitTraversedTile`
     * @param schema - The optional metadata schema
     * @param resourceResolver - The `ResourceResolver` that
     * will be used e.g. for subtree files
     * @returns The traversed children
     * @throws ImplicitTilingError If the input was structurally invalid
     */
    static createTraversedChildren(tileset: Tileset, implicitTiling: TileImplicitTiling, schema: Schema | undefined, parent: ExplicitTraversedTile, resourceResolver: ResourceResolver): Promise<TraversedTile[]>;
    /**
     * Creates the root node for the traversal of an implicit quadtree.
     *
     * @param tileset - The tileset
     * @param implicitTiling - The `TileImplicitTiling`
     * @param schema - The optional metadata schema
     * @param parent - The `ExplicitTraversedTile`
     * @param resourceResolver - The `ResourceResolver` that
     * will be used e.g. for subtree files
     * @returns The root of an implicit quadtree
     * @throws ImplicitTilingError If the input was structurally invalid
     */
    private static createImplicitQuadtreeRoot;
    /**
     * Creates the root node for the traversal of an implicit octree.
     *
     * @param tileset - The tileset
     * @param implicitTiling - The `TileImplicitTiling`
     * @param schema - The optional metadata schema
     * @param parent - The `ExplicitTraversedTile`
     * @param resourceResolver - The `ResourceResolver` that
     * will be used e.g. for subtree files
     * @returns The root of an implicit octree
     * @throws ImplicitTilingError If the input was structurally invalid
     */
    private static createImplicitOctreeRoot;
}
//# sourceMappingURL=ExplicitTraversedTiles.d.ts.map