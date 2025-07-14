"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTables = void 0;
/**
 * Internal uutility methods related to the migration of batch tables
 *
 * @internal
 */
class BatchTables {
    /**
     * Obtain the names of all properties that appear in the
     * `3DTILES_draco_point_compression` extension of the
     * given batch table (or the empty array if the extension
     * is not present)
     *
     * @param batchTable - The batch table
     * @returns The draco property names
     */
    static obtainDracoPropertyNames(batchTable) {
        return Object.keys(BatchTables.obtainDracoProperties(batchTable));
    }
    /**
     * Obtain all properties that appear in the`3DTILES_draco_point_compression`
     * extension of the given batch table (or the empty object if the extension
     * is not present)
     *
     * @param batchTable - The batch table
     * @returns The draco properties
     */
    static obtainDracoProperties(batchTable) {
        if (!batchTable.extensions) {
            return {};
        }
        const batchTableExtension = batchTable.extensions["3DTILES_draco_point_compression"];
        if (!batchTableExtension) {
            return {};
        }
        return batchTableExtension.properties;
    }
}
exports.BatchTables = BatchTables;
//# sourceMappingURL=BatchTables.js.map