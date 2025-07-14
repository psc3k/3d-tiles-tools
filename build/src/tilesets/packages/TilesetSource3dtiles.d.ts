/// <reference types="node" />
/// <reference types="node" />
import { TilesetSource } from "../tilesetData/TilesetSource";
/**
 * Implementation of a TilesetSource based on a 3DTILES (SQLITE3 database)
 * file.
 *
 * @internal
 */
export declare class TilesetSource3dtiles implements TilesetSource {
    /**
     * The database, or undefined if the database is not opened
     */
    private db;
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
//# sourceMappingURL=TilesetSource3dtiles.d.ts.map