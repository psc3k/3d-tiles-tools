/// <reference types="node" />
/// <reference types="node" />
import { TilesetSource } from "../tilesetData/TilesetSource";
import { IndexEntry } from "./IndexEntry";
/**
 * Implementation of a TilesetSource based on a 3TZ file.
 *
 * @internal
 */
export declare class TilesetSource3tz implements TilesetSource {
    /**
     * The file descriptor that was created from the input file
     */
    private fd;
    /**
     * The ZIP index.
     *
     * This is created from the `"@3dtilesIndex1@"` file of a 3TZ file.
     *
     * It is an array of `IndexEntry` objects, sorted by the MD5 hash,
     * in ascending order.
     */
    private zipIndex;
    /**
     * Default constructor
     */
    constructor();
    getZipIndex(): IndexEntry[] | undefined;
    /** {@inheritDoc TilesetSource.open} */
    open(fullInputName: string): Promise<void>;
    /** {@inheritDoc TilesetSource.getKeys} */
    getKeys(): Promise<AsyncIterable<string>>;
    private static createKeysIterable;
    /** {@inheritDoc TilesetSource.getValue} */
    getValue(key: string): Promise<Buffer | undefined>;
    /** {@inheritDoc TilesetSource.close} */
    close(): Promise<void>;
}
//# sourceMappingURL=TilesetSource3tz.d.ts.map