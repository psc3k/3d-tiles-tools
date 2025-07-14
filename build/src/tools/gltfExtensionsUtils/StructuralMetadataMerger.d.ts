import { Document } from "@gltf-transform/core";
/**
 * A class for merging two glTF-Transform documents that may contain
 * the `EXT_structural_metadata` extension.
 *
 * @internal
 */
export declare class StructuralMetadataMerger {
    /**
     * A suffix that will be appended to an unspecified schema ID
     * for merged schemas. This is ONLY used for unit tests.
     */
    private static mergedSchemaIdSuffix;
    /**
     * Set a suffix that will be appended to an unspecified schema ID
     * for merged schemas. This is ONLY used for unit tests. Clients
     * should never call this function.
     *
     * @param mergedSchemaIdSuffix - The suffix for merged schema IDs
     */
    static setMergedSchemaIdSuffix(mergedSchemaIdSuffix: string | undefined): void;
    /**
     * Merge two glTF-Transform documents, taking into account that
     * they might contain the `EXT_structural_metadata` extension.
     *
     * This will perform a default merge operation, but apply
     * special treatment for the case that either or both of the documents
     * contain the extension: It will merge the top-level extension
     * object, and assign the merged one to the root of the target
     * document.
     *
     * @param targetDocument - The target document
     * @param sourceDocument - The source document
     * @param schemaUriResolver - A function that can resolve the `schemaUri`
     * and return the metadata schema JSON object
     * @returns A promise that resolves when the operation is finished
     */
    static mergeDocumentsWithStructuralMetadata(targetDocument: Document, sourceDocument: Document, schemaUriResolver: (schemaUri: string) => Promise<any>): Promise<void>;
    /**
     * Merge the given `EXT_structural_metadata` extension objects from
     * the given documents, and assign the result to the given
     * target document.
     *
     * @param targetDocument - The target document
     * @param targetStructuralMetadata - The target extension object
     * @param sourceDocument - The source document
     * @param sourceStructuralMetadata - The source extension object
     * @param mainMergeMap - The map from `mergeDocuments`
     * @param schemaUriResolver - A function that can resolve the `schemaUri`
     * and return the metadata schema JSON object
     * @returns A promise that resolves when the operation is finished
     */
    private static mergeStructuralMetadata;
    /**
     * Merge the property tables from the given source to the given targets.
     *
     * This will update the 'class' of the copied property tables according
     * to the given name mapping.
     *
     * @param targetStructuralMetadata - The target extension object
     * @param sourceStructuralMetadata - The source extension object
     * @param mainMergeMap - The mapping from `mergeDocuments`
     * @param sourceClassNamesInTarget - The mapping from class names in
     * the source schema to the names that they have in the target schema.
     */
    private static mergePropertyTables;
    /**
     * Merge the property textures from the given source to the given targets.
     *
     * This will update the 'class' of the copied property textures according
     * to the given name mapping.
     *
     * The given target structural metadata will afterwards contain the set
     * of unique textures. This means that when there are two textures
     * that are `equal` according to the glTF-Transform `Property.equal`
     * implementation, then the texture will only be added once to the
     * target.
     *
     * @param targetStructuralMetadata - The target extension object
     * @param sourceStructuralMetadata - The source extension object
     * @param mainMergeMap  - The mapping from `mergeDocuments`
     * @param sourceClassNamesInTarget - The mapping from class names in
     * the source schema to the names that they have in the target schema.
     */
    private static mergePropertyTextures;
    /**
     * Updates all mesh primitives to refer to the merged property textures.
     *
     * This will examine all mesh primitives in the given target document,
     * and check whether they contain the `EXT_structural_metadata` extension
     * object with property textures.
     *
     * If the extension object is found, then the property textures in
     * the target mesh primitive will be updated, using
     * `updateMeshPrimitivePropertyTextures`.
     *
     * @param targetDocument - The target document
     * @param targetStructuralMetadata - The target root extension object
     */
    private static updateMeshPrimitivesPropertyTextures;
    /**
     * Updates the extension object of a mesh primitive to refer to the
     * merged property textures.
     *
     * The property textures in the given extension object will be
     * cleared, and replaced by the property textures that have been
     * created in the root extension object, to ensure that the property
     * textures in the mesh primitive extension object are THE actual
     * PropertyTexture objects that also appear in the top-level
     * extension object.
     *
     * @param targetRootPropertyTextures - The property textures from
     * the root extension object of the target
     * @param targetMeshPrimitiveStructuralMetadata - The extension object
     * from a mesh primitive
     */
    private static updateMeshPrimitivePropertyTextures;
    /**
     * Merge the property attributes from the given source to the given targets.
     *
     * This will update the 'class' of the copied property attributes according
     * to the given name mapping.
     *
     * The given target structural metadata will afterwards contain the set
     * of unique attributes. This means that when there are two attributes
     * that are `equal` according to the glTF-Transform `Property.equal`
     * implementation, then the attribute will only be added once to the
     * target.
     *
     * @param targetStructuralMetadata - The target extension object
     * @param sourceStructuralMetadata - The source extension object
     * @param mainMergeMap - The mapping from `mergeDocuments`
     * @param sourceClassNamesInTarget - The mapping from class names in
     * the source schema to the names that they have in the target schema.
     */
    private static mergePropertyAttributes;
    /**
     * Updates all mesh primitives to refer to the merged property attributes.
     *
     * This will examine all mesh primitives in the given target document,
     * and check whether they contain the `EXT_structural_metadata` extension
     * object with property attributes.
     *
     * If the extension object is found, then the property attributes in
     * the target mesh primitive will be updated, using
     * `updateMeshPrimitivePropertyAttributes`.
     *
     * @param targetDocument - The target document
     * @param targetStructuralMetadata - The target root extension object
     */
    private static updateMeshPrimitivesPropertyAttributes;
    /**
     * Updates the extension object of a mesh primitive to refer to the
     * merged property attributes.
     *
     * The property attributes in the given extension object will be
     * cleared, and replaced by the property attributes that have been
     * created in the root extension object, to ensure that the property
     * attributes in the mesh primitive extension object are THE actual
     * PropertyAttribute objects that also appear in the top-level
     * extension object.
     *
     * @param targetRootPropertyAttributes - The property attributes from
     * the root extension object of the target
     * @param targetMeshPrimitiveStructuralMetadata - The extension object
     * from a mesh primitive
     */
    private static updateMeshPrimitivePropertyAttributes;
    /**
     * Merge the given `EXT_structural_metadata` schema objects from
     * the given documents.
     *
     * This will merge the enums and classes from the source schema
     * into the target schema, performing renaming operations for
     * disambiguation as necessary.
     *
     * The method will return a mapping from class names in the source
     * schema to the names that they have in the target schema.
     *
     * @param targetDocument - The target document
     * @param targetSchema - The target schema
     * @param sourceDocument - The source document
     * @param sourceSchema - The source schema
     * @returns A mapping from class names in the source schema to the
     * names that they have in the target schema.
     */
    private static mergeSchemas;
    /**
     * Merge the set of enums from given source schema into the given target.
     *
     * This will perform renaming operations for disambiguation as
     * necessary. The method will return a mapping from enum names in
     * the source schema to the names that they have in the target schema.
     *
     * @param targetDocument - The target document
     * @param targetSchema - The target schema
     * @param sourceDocument - The source document
     * @param sourceSchema - The source schema
     * @returns A mapping from enum names in the source schema to the
     * names that they have in the target schema.
     */
    private static mergeSchemaEnums;
    /**
     * Merge the set of classes from given source schema into the given target.
     *
     * This will perform renaming operations for disambiguation as
     * necessary. This will include any renamings that are caused by
     * enums that have already been renamed: When a source class refers
     * to an enum that has been renamed, then the corresponding enumName
     * properties will be updated accordingly, and it will be added as
     * a new class to the target.
     *
     * The method will return a mapping from class names in
     * the source schema to the names that they have in the target schema.
     *
     * @param targetDocument - The target document
     * @param targetSchema - The target schema
     * @param sourceDocument - The source document
     * @param sourceSchema - The source schema
     * @param sourceEnumNamesInTarget - A mapping from enum names in the
     * source schema to the names that they have in the target schema.
     * @returns A mapping from class names in the source schema to the
     * names that they have in the target schema.
     */
    private static mergeSchemaClasses;
    /**
     * Returns whether the given source class contains an enum-typed
     * property where the enum was renamed, according to the given
     * name mapping
     *
     * @param sourceClass - The source class
     * @param sourceEnumNamesInTarget - A mapping from enum names in the
     * source schema to the names that they have in the target schema.
     * @returns Whether the class contains a renamed enum type
     */
    private static containsRenamedEnumType;
    /**
     * Updates the enumType of all enum-typed properties in the given
     * class, based on the given name mapping.
     *
     * @param targetClass - The target class
     * @param sourceEnumNamesInTarget - A mapping from enum names in the
     * source schema to the names that they have in the target schema.
     */
    private static updateEnumTypes;
    /**
     * Returns whether the given array of glTF-Transform `Property` objects
     * contains an objec that is equal to the given one, based on the
     * glTF-Transform `Property.equal` implementation.
     *
     * @param properties - The properties
     * @param property - The property
     * @returns The result
     */
    private static containsEqual;
    /**
     * Copy a single object from the given source document to the
     * given target document, and return the copy.
     *
     * @param targetDocument - The target document
     * @param sourceDocument - The source document
     * @param sourceElement - The source object
     * @returns The target object
     */
    private static copySingle;
    /**
     * Disambiguate the given name against the existing names.
     *
     * This will return a name that is based on the given input
     * name, but that does NOT yet appear in the given existing
     * names. It will NOT add the resulting name to the given
     * set. The exact disambiguation strategy is not specified.
     *
     * @param s - The input name
     * @param existing - The existing name
     * @returns - The disambiguated name
     */
    private static disambiguate;
}
//# sourceMappingURL=StructuralMetadataMerger.d.ts.map