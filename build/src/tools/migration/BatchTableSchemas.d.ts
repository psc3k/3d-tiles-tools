import { Schema } from "../../structure";
import { BatchTable } from "../../structure";
/**
 * Methods to create metadata 'Schema' objects from batch tables
 *
 * @internal
 */
export declare class BatchTableSchemas {
    /**
     * Create a metadata 'Schema' object that describes the properties in
     * the given batch table.
     *
     * The given 'identifier' will be used for disambiguation, and as
     * part of the class name. If it contains characters that make it
     * invalid as a class name, then these characters will be replaced
     * with underscores.
     *
     * If the given batch table does not contain any properties that
     * can be converted to metadata properties, then `undefined` is
     * returned.
     *
     * @param identifier - An identifier for disambiguation
     * @param batchTable - The batch table
     * @returns The metadata schema
     * @throws TileFormatError If the given batch table contained invalid
     * data
     */
    static createSchema(identifier: string, batchTable: BatchTable): Schema | undefined;
}
//# sourceMappingURL=BatchTableSchemas.d.ts.map