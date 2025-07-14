/// <reference types="node" />
/// <reference types="node" />
import { TilesetSource } from "./TilesetSource";
/**
 * Implementation of a TilesetSource based on a directory
 * in a file system
 *
 * @internal
 */
export declare class TilesetSourceFs implements TilesetSource {
    /**
     * The full name of the directory that contains the tileset.json file
     */
    private fullInputName;
    /**
     * Default constructor
     */
    constructor();
    /** {@inheritDoc TilesetSource.open} */
    open(fullInputName: string): Promise<void>;
    /** {@inheritDoc TilesetSource.getKeys} */
    getKeys(): Promise<AsyncIterable<string>>;
    /** {@inheritDoc TilesetSource.getValue} */
    getValue(key: string): Promise<Buffer | undefined>;
    /** {@inheritDoc TilesetSource.close} */
    close(): Promise<void>;
}
//# sourceMappingURL=TilesetSourceFs.d.ts.map