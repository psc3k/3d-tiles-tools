"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchTableSchemas = void 0;
const BatchTableClassProperties_1 = require("./BatchTableClassProperties");
const Ids_1 = require("./Ids");
/**
 * Methods to create metadata 'Schema' objects from batch tables
 *
 * @internal
 */
class BatchTableSchemas {
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
    static createSchema(identifier, batchTable) {
        const id = Ids_1.Ids.sanitize(identifier);
        // Create the 'properties' for the metadata class, as a dictionary
        // of property names to `ClassProperty` objects.
        // (sanitizing the property names if necessary)
        const properties = {};
        const propertyNames = Object.keys(batchTable);
        for (const propertyName of propertyNames) {
            if (propertyName === "extensions" || propertyName === "extras") {
                continue;
            }
            const propertyValue = batchTable[propertyName];
            const classProperty = BatchTableClassProperties_1.BatchTableClassProperties.createClassProperty(propertyName, propertyValue);
            const propertyId = Ids_1.Ids.sanitize(propertyName);
            properties[propertyId] = classProperty;
        }
        // Bail out if there are no properties
        if (Object.keys(properties).length === 0) {
            return undefined;
        }
        // Define the 'classes' for the metadata schema, only containing
        // a single class with all properties
        const classes = {};
        const metadataClass = {
            name: "Generated from " + id,
            properties: properties,
        };
        const className = "class_" + id;
        classes[className] = metadataClass;
        // Generate the actual schema
        const schema = {
            id: "ID_" + id,
            name: "Generated from " + id,
            classes: classes,
        };
        return schema;
    }
}
exports.BatchTableSchemas = BatchTableSchemas;
//# sourceMappingURL=BatchTableSchemas.js.map