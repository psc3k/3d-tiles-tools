"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTStructuralMetadata = void 0;
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const core_3 = require("@gltf-transform/core");
const StructuralMetadata_1 = require("./StructuralMetadata");
const StructuralMetadata_2 = require("./StructuralMetadata");
const StructuralMetadata_3 = require("./StructuralMetadata");
const StructuralMetadata_4 = require("./StructuralMetadata");
const StructuralMetadata_5 = require("./StructuralMetadata");
const StructuralMetadata_6 = require("./StructuralMetadata");
const StructuralMetadata_7 = require("./StructuralMetadata");
const StructuralMetadata_8 = require("./StructuralMetadata");
const StructuralMetadata_9 = require("./StructuralMetadata");
const StructuralMetadata_10 = require("./StructuralMetadata");
const StructuralMetadata_11 = require("./StructuralMetadata");
const StructuralMetadata_12 = require("./StructuralMetadata");
const StructuralMetadata_13 = require("./StructuralMetadata");
const StructuralMetadata_14 = require("./StructuralMetadata");
const NAME = "EXT_structural_metadata";
/**
 * Returns the given value if it is **NOT** equal to the given
 * default value.
 *
 * Returns `null` if the given value **IS** equal to the
 * given default value.
 *
 * @param value - The value
 * @param defaultValue - The default value
 * @returns The result
 */
function ifNot(value, defaultValue) {
    if (value == defaultValue) {
        return null;
    }
    return value;
}
//============================================================================
/**
 * [`EXT_structural_metadata`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_structural_metadata/extensions/2.0/Vendor/EXT_structural_metadata/)
 * defines a means of storing structured metadata within a glTF 2.0 asset.
 *
 * @internal
 */
class EXTStructuralMetadata extends core_1.Extension {
    constructor() {
        // Implementation note:
        //
        // This class is large, and largely undocumented. But its implementation
        // is mostly purely mechanical, and the overall structure is:
        // - There are 'create' methods for all model classes. This includes
        //   some 'create...From' methods that directly translate JSON into
        //   the model classes (for things that do not require the reader context)
        // - There are `read` methods that receive (the reader context and)
        //   the 'model' instance and the '...Def' instance (i.e. the plain
        //   JSON object). These 'read' methods fill the 'model' instance
        //   with the data from the '...Def' instance, resolving references
        //   (i.e. indices) accordingly, and call the 'read' methods for
        //   any sub-elements.
        // - There are `create...Def` methods that receive (the writer
        //   context and) the 'model' instance, and create the '..Def'
        //   instance, calling other 'create...Def' methods to fill in
        //   the sub-elements
        super(...arguments);
        this.extensionName = NAME;
        this.prewriteTypes = [core_2.PropertyType.BUFFER];
    }
    createStructuralMetadata() {
        return new StructuralMetadata_14.StructuralMetadata(this.document.getGraph());
    }
    createSchema() {
        return new StructuralMetadata_13.Schema(this.document.getGraph());
    }
    createClass() {
        return new StructuralMetadata_1.Class(this.document.getGraph());
    }
    createClassProperty() {
        return new StructuralMetadata_2.ClassProperty(this.document.getGraph());
    }
    createEnum() {
        return new StructuralMetadata_4.Enum(this.document.getGraph());
    }
    createEnumValue() {
        return new StructuralMetadata_5.EnumValue(this.document.getGraph());
    }
    createPropertyTable() {
        return new StructuralMetadata_9.PropertyTable(this.document.getGraph());
    }
    createPropertyTableProperty() {
        return new StructuralMetadata_10.PropertyTableProperty(this.document.getGraph());
    }
    createPropertyTexture() {
        return new StructuralMetadata_11.PropertyTexture(this.document.getGraph());
    }
    createPropertyTextureProperty() {
        return new StructuralMetadata_12.PropertyTextureProperty(this.document.getGraph());
    }
    createPropertyAttribute() {
        return new StructuralMetadata_7.PropertyAttribute(this.document.getGraph());
    }
    createPropertyAttributeProperty() {
        return new StructuralMetadata_8.PropertyAttributeProperty(this.document.getGraph());
    }
    createElementStructuralMetadata() {
        return new StructuralMetadata_3.ElementStructuralMetadata(this.document.getGraph());
    }
    createMeshPrimitiveStructuralMetadata() {
        return new StructuralMetadata_6.MeshPrimitiveStructuralMetadata(this.document.getGraph());
    }
    createSchemaFrom(schemaDef) {
        const schema = this.createSchema();
        this.readSchema(schema, schemaDef);
        return schema;
    }
    createClassFrom(classDef) {
        const classObject = this.createClass();
        this.readClass(classObject, classDef);
        return classObject;
    }
    createClassPropertyFrom(classPropertyDef) {
        const classProperty = this.createClassProperty();
        this.readClassProperty(classProperty, classPropertyDef);
        return classProperty;
    }
    createEnumFrom(enumDef) {
        const enumObject = this.createEnum();
        this.readEnum(enumObject, enumDef);
        return enumObject;
    }
    createEnumValueFrom(enumValueDef) {
        const enumValue = this.createEnumValue();
        this.readEnumValue(enumValue, enumValueDef);
        return enumValue;
    }
    read(context) {
        const structuralMetadata = this.createTopLevelStructuralMetadata(context);
        if (!structuralMetadata) {
            return this;
        }
        const jsonDoc = context.jsonDoc;
        const gltfDef = jsonDoc.json;
        const meshDefs = gltfDef.meshes || [];
        meshDefs.forEach((meshDef, meshIndex) => {
            const mesh = context.meshes[meshIndex];
            const primitives = mesh.listPrimitives();
            const primDefs = meshDef.primitives || [];
            primDefs.forEach((primDef, primIndex) => {
                const prim = primitives[primIndex];
                this.readPrimitive(structuralMetadata, prim, primDef);
            });
        });
        const nodeDefs = gltfDef.nodes || [];
        nodeDefs.forEach((nodeDef, nodeIndex) => {
            const node = context.nodes[nodeIndex];
            this.readNode(structuralMetadata, node, nodeDef);
        });
        return this;
    }
    createTopLevelStructuralMetadata(context) {
        const jsonDoc = context.jsonDoc;
        const gltfDef = jsonDoc.json;
        if (!gltfDef.extensions || !gltfDef.extensions[NAME]) {
            return undefined;
        }
        // Obtain the top-level structural metadata information,
        // and use it to fill the "model class" instance
        const structuralMetadataDef = gltfDef.extensions[NAME];
        const structuralMetadata = this.createStructuralMetadata();
        this.readStructuralMetadata(context, structuralMetadata, structuralMetadataDef);
        const root = this.document.getRoot();
        root.setExtension(NAME, structuralMetadata);
        return structuralMetadata;
    }
    readStructuralMetadata(context, structuralMetadata, structuralMetadataDef) {
        if (structuralMetadataDef.schema !== undefined) {
            const schemaDef = structuralMetadataDef.schema;
            const schema = this.createSchemaFrom(schemaDef);
            structuralMetadata.setSchema(schema);
        }
        else if (structuralMetadataDef.schemaUri !== undefined) {
            const schemaUri = structuralMetadataDef.schemaUri;
            structuralMetadata.setSchemaUri(schemaUri);
        }
        const propertyTextureDefs = structuralMetadataDef.propertyTextures || [];
        for (const propertyTextureDef of propertyTextureDefs) {
            const propertyTexture = this.createPropertyTexture();
            this.readPropertyTexture(context, propertyTexture, propertyTextureDef);
            structuralMetadata.addPropertyTexture(propertyTexture);
        }
        const propertyTableDefs = structuralMetadataDef.propertyTables || [];
        for (const propertyTableDef of propertyTableDefs) {
            const propertyTable = this.createPropertyTable();
            this.readPropertyTable(context, propertyTable, propertyTableDef);
            structuralMetadata.addPropertyTable(propertyTable);
        }
        const propertyAttributeDefs = structuralMetadataDef.propertyAttributes || [];
        for (const propertyAttributeDef of propertyAttributeDefs) {
            const propertyAttribute = this.createPropertyAttribute();
            this.readPropertyAttribute(propertyAttribute, propertyAttributeDef);
            structuralMetadata.addPropertyAttribute(propertyAttribute);
        }
    }
    readSchema(schema, schemaDef) {
        if (schemaDef.id !== undefined) {
            schema.setId(schemaDef.id);
        }
        else {
            throw new Error(`${NAME}: The schema.id is required`);
        }
        if (schemaDef.name !== undefined) {
            schema.setObjectName(schemaDef.name);
        }
        if (schemaDef.description !== undefined) {
            schema.setDescription(schemaDef.description);
        }
        if (schemaDef.version !== undefined) {
            schema.setVersion(schemaDef.version);
        }
        const classes = schemaDef.classes || {};
        for (const classKey of Object.keys(classes)) {
            const classDef = classes[classKey];
            const classObject = this.createClassFrom(classDef);
            schema.setClass(classKey, classObject);
        }
        const enums = schemaDef.enums || {};
        for (const enumKey of Object.keys(enums)) {
            const enumDef = enums[enumKey];
            const enumObject = this.createEnumFrom(enumDef);
            schema.setEnum(enumKey, enumObject);
        }
    }
    readClass(classObject, classDef) {
        if (classDef.name !== undefined) {
            classObject.setObjectName(classDef.name);
        }
        if (classDef.description !== undefined) {
            classObject.setDescription(classDef.description);
        }
        const properties = classDef.properties || {};
        for (const classPropertyKey of Object.keys(properties)) {
            const classPropertyDef = properties[classPropertyKey];
            const classProperty = this.createClassPropertyFrom(classPropertyDef);
            classObject.setProperty(classPropertyKey, classProperty);
        }
    }
    readClassProperty(classProperty, classPropertyDef) {
        // I'd REALLY like to boil these down to
        // setIfDefined(classProperty, classPropertyDef, "type");
        // or even
        // for (p in def) set(m, def, p);
        // or even
        // assignAll(model, def);
        // But ...
        // - this does not seem to be possible without the "evil eval"
        // - this would break down for 'name' and 'setObjectName'...
        // - the error handling for required properties becomes tricky...
        if (classPropertyDef.name !== undefined) {
            classProperty.setObjectName(classPropertyDef.name);
        }
        if (classPropertyDef.description !== undefined) {
            classProperty.setDescription(classPropertyDef.description);
        }
        if (classPropertyDef.type !== undefined) {
            classProperty.setType(classPropertyDef.type);
        }
        else {
            throw new Error(`${NAME}: The classProperty.type is required`);
        }
        if (classPropertyDef.componentType !== undefined) {
            classProperty.setComponentType(classPropertyDef.componentType);
        }
        if (classPropertyDef.enumType !== undefined) {
            classProperty.setEnumType(classPropertyDef.enumType);
        }
        if (classPropertyDef.array !== undefined) {
            classProperty.setArray(classPropertyDef.array);
        }
        if (classPropertyDef.count !== undefined) {
            classProperty.setCount(classPropertyDef.count);
        }
        if (classPropertyDef.normalized !== undefined) {
            classProperty.setNormalized(classPropertyDef.normalized);
        }
        if (classPropertyDef.offset !== undefined) {
            classProperty.setOffset(classPropertyDef.offset);
        }
        if (classPropertyDef.scale !== undefined) {
            classProperty.setScale(classPropertyDef.scale);
        }
        if (classPropertyDef.max !== undefined) {
            classProperty.setMax(classPropertyDef.max);
        }
        if (classPropertyDef.min !== undefined) {
            classProperty.setMin(classPropertyDef.min);
        }
        if (classPropertyDef.required !== undefined) {
            classProperty.setRequired(classPropertyDef.required);
        }
        if (classPropertyDef.noData !== undefined) {
            classProperty.setNoData(classPropertyDef.noData);
        }
        if (classPropertyDef.default !== undefined) {
            classProperty.setDefault(classPropertyDef.default);
        }
    }
    readEnum(enumObject, enumDef) {
        if (enumDef.name !== undefined) {
            enumObject.setObjectName(enumDef.name);
        }
        if (enumDef.description !== undefined) {
            enumObject.setDescription(enumDef.description);
        }
        if (enumDef.valueType !== undefined) {
            enumObject.setValueType(enumDef.valueType);
        }
        const valueDefs = enumDef.values || {};
        for (const valueDef of valueDefs) {
            const enumValue = this.createEnumValueFrom(valueDef);
            enumObject.addEnumValue(enumValue);
        }
    }
    readEnumValue(enumValue, enumValueDef) {
        if (enumValueDef.name !== undefined) {
            enumValue.setObjectName(enumValueDef.name);
        }
        if (enumValueDef.description !== undefined) {
            enumValue.setDescription(enumValueDef.description);
        }
        if (enumValueDef.value !== undefined) {
            enumValue.setValue(enumValueDef.value);
        }
    }
    readPropertyTexture(context, propertyTexture, propertyTextureDef) {
        propertyTexture.setClass(propertyTextureDef.class);
        if (propertyTextureDef.name !== undefined) {
            propertyTexture.setName(propertyTextureDef.name);
        }
        const properties = propertyTextureDef.properties || {};
        for (const propertyKey of Object.keys(properties)) {
            const propertyTexturePropertyDef = properties[propertyKey];
            const propertyTextureProperty = this.createPropertyTextureProperty();
            this.readPropertyTextureProperty(context, propertyTextureProperty, propertyTexturePropertyDef);
            propertyTexture.setProperty(propertyKey, propertyTextureProperty);
        }
    }
    readPropertyTextureProperty(context, propertyTextureProperty, propertyTexturePropertyDef) {
        const jsonDoc = context.jsonDoc;
        const textureDefs = jsonDoc.json.textures || [];
        if (propertyTexturePropertyDef.channels) {
            propertyTextureProperty.setChannels(propertyTexturePropertyDef.channels);
        }
        const source = textureDefs[propertyTexturePropertyDef.index].source;
        if (source !== undefined) {
            const texture = context.textures[source];
            propertyTextureProperty.setTexture(texture);
            const textureInfo = propertyTextureProperty.getTextureInfo();
            if (textureInfo) {
                context.setTextureInfo(textureInfo, propertyTexturePropertyDef);
            }
        }
        if (propertyTexturePropertyDef.offset !== undefined) {
            propertyTextureProperty.setOffset(propertyTexturePropertyDef.offset);
        }
        if (propertyTexturePropertyDef.scale !== undefined) {
            propertyTextureProperty.setScale(propertyTexturePropertyDef.scale);
        }
        if (propertyTexturePropertyDef.max !== undefined) {
            propertyTextureProperty.setMax(propertyTexturePropertyDef.max);
        }
        if (propertyTexturePropertyDef.min !== undefined) {
            propertyTextureProperty.setMin(propertyTexturePropertyDef.min);
        }
    }
    readPropertyTable(context, propertyTable, propertyTableDef) {
        propertyTable.setClass(propertyTableDef.class);
        if (propertyTableDef.name !== undefined) {
            propertyTable.setName(propertyTableDef.name);
        }
        propertyTable.setCount(propertyTableDef.count);
        const properties = propertyTableDef.properties || {};
        for (const propertyKey of Object.keys(properties)) {
            const propertyTablePropertyDef = properties[propertyKey];
            const propertyTableProperty = this.createPropertyTableProperty();
            this.readPropertyTableProperty(context, propertyTableProperty, propertyTablePropertyDef);
            propertyTable.setProperty(propertyKey, propertyTableProperty);
        }
    }
    readPropertyTableProperty(context, propertyTableProperty, propertyTablePropertyDef) {
        const valuesData = EXTStructuralMetadata.obtainBufferViewData(context, propertyTablePropertyDef.values);
        propertyTableProperty.setValues(valuesData);
        if (propertyTablePropertyDef.arrayOffsets != undefined) {
            const arrayOffsetsData = EXTStructuralMetadata.obtainBufferViewData(context, propertyTablePropertyDef.arrayOffsets);
            propertyTableProperty.setArrayOffsets(arrayOffsetsData);
        }
        if (propertyTablePropertyDef.stringOffsets != undefined) {
            const stringOffsetsData = EXTStructuralMetadata.obtainBufferViewData(context, propertyTablePropertyDef.stringOffsets);
            propertyTableProperty.setStringOffsets(stringOffsetsData);
        }
        if (propertyTablePropertyDef.arrayOffsetType !== undefined) {
            propertyTableProperty.setArrayOffsetType(propertyTablePropertyDef.arrayOffsetType);
        }
        if (propertyTablePropertyDef.stringOffsetType !== undefined) {
            propertyTableProperty.setStringOffsetType(propertyTablePropertyDef.stringOffsetType);
        }
        if (propertyTablePropertyDef.offset !== undefined) {
            propertyTableProperty.setOffset(propertyTablePropertyDef.offset);
        }
        if (propertyTablePropertyDef.scale !== undefined) {
            propertyTableProperty.setScale(propertyTablePropertyDef.scale);
        }
        if (propertyTablePropertyDef.max !== undefined) {
            propertyTableProperty.setMax(propertyTablePropertyDef.max);
        }
        if (propertyTablePropertyDef.min !== undefined) {
            propertyTableProperty.setMin(propertyTablePropertyDef.min);
        }
    }
    readPropertyAttribute(propertyAttribute, propertyAttributeDef) {
        propertyAttribute.setClass(propertyAttributeDef.class);
        if (propertyAttributeDef.name !== undefined) {
            propertyAttribute.setName(propertyAttributeDef.name);
        }
        const properties = propertyAttributeDef.properties || {};
        for (const propertyKey of Object.keys(properties)) {
            const propertyAttributePropertyDef = properties[propertyKey];
            const propertyAttributeProperty = this.createPropertyAttributeProperty();
            this.readPropertyAttributeProperty(propertyAttributeProperty, propertyAttributePropertyDef);
            propertyAttribute.setProperty(propertyKey, propertyAttributeProperty);
        }
    }
    readPropertyAttributeProperty(propertyAttributeProperty, propertyAttributePropertyDef) {
        propertyAttributeProperty.setAttribute(propertyAttributePropertyDef.attribute);
        if (propertyAttributePropertyDef.offset !== undefined) {
            propertyAttributeProperty.setOffset(propertyAttributePropertyDef.offset);
        }
        if (propertyAttributePropertyDef.scale !== undefined) {
            propertyAttributeProperty.setScale(propertyAttributePropertyDef.scale);
        }
        if (propertyAttributePropertyDef.max !== undefined) {
            propertyAttributeProperty.setMax(propertyAttributePropertyDef.max);
        }
        if (propertyAttributePropertyDef.min !== undefined) {
            propertyAttributeProperty.setMin(propertyAttributePropertyDef.min);
        }
    }
    readPrimitive(structuralMetadata, prim, primDef) {
        if (!primDef.extensions || !primDef.extensions[NAME]) {
            return;
        }
        const meshPrimitiveStructuralMetadata = this.createMeshPrimitiveStructuralMetadata();
        const extensionObject = primDef.extensions[NAME];
        const meshPrimitiveStructuralMetadataDef = extensionObject;
        const propertyTextures = structuralMetadata.listPropertyTextures();
        const propertyTextureIndexDefs = meshPrimitiveStructuralMetadataDef.propertyTextures || [];
        for (const propertyTextureIndexDef of propertyTextureIndexDefs) {
            const propertyTexture = propertyTextures[propertyTextureIndexDef];
            meshPrimitiveStructuralMetadata.addPropertyTexture(propertyTexture);
        }
        const propertyAttributes = structuralMetadata.listPropertyAttributes();
        const propertyAttributeIndexDefs = meshPrimitiveStructuralMetadataDef.propertyAttributes || [];
        for (const propertyAttributeIndexDef of propertyAttributeIndexDefs) {
            const propertyAttribute = propertyAttributes[propertyAttributeIndexDef];
            meshPrimitiveStructuralMetadata.addPropertyAttribute(propertyAttribute);
        }
        prim.setExtension(NAME, meshPrimitiveStructuralMetadata);
    }
    readNode(structuralMetadata, node, nodeDef) {
        if (!nodeDef.extensions || !nodeDef.extensions[NAME]) {
            return;
        }
        const elementStructuralMetadata = this.createElementStructuralMetadata();
        const extensionObject = nodeDef.extensions[NAME];
        const elementStructuralMetadataDef = extensionObject;
        const propertyTables = structuralMetadata.listPropertyTables();
        const propertyTableIndex = elementStructuralMetadataDef.propertyTable;
        const index = elementStructuralMetadataDef.index;
        if (propertyTableIndex === undefined) {
            throw new Error(`${NAME}: No property table index in structural metadata`);
        }
        if (index === undefined) {
            throw new Error(`${NAME}: No index in structural metadata`);
        }
        const propertyTable = propertyTables[propertyTableIndex];
        elementStructuralMetadata.setPropertyTable(propertyTable);
        elementStructuralMetadata.setIndex(index);
        node.setExtension(NAME, elementStructuralMetadata);
    }
    /**
     * Obtains the data of the buffer view with the given index,
     * based on the current reader context.
     *
     * This will internally resolve the buffer of the specified
     * buffer view, and return the slice of the buffer data
     * that corresponds to the buffer view.
     *
     * @param context - The reader context
     * @param bufferViewIndex - The buffer view index
     * @returns The buffer view data
     */
    static obtainBufferViewData(context, bufferViewIndex) {
        const jsonDoc = context.jsonDoc;
        const bufferDefs = jsonDoc.json.buffers || [];
        const bufferViewDefs = jsonDoc.json.bufferViews || [];
        const bufferViewDef = bufferViewDefs[bufferViewIndex];
        const bufferDef = bufferDefs[bufferViewDef.buffer];
        const bufferData = bufferDef.uri
            ? jsonDoc.resources[bufferDef.uri]
            : jsonDoc.resources[core_3.GLB_BUFFER];
        const byteOffset = bufferViewDef.byteOffset || 0;
        const byteLength = bufferViewDef.byteLength;
        const bufferViewData = bufferData.slice(byteOffset, byteOffset + byteLength);
        return bufferViewData;
    }
    write(context) {
        const root = this.document.getRoot();
        const structuralMetadata = root.getExtension(NAME);
        if (!structuralMetadata) {
            return this;
        }
        const jsonDoc = context.jsonDoc;
        const gltfDef = jsonDoc.json;
        const structuralMetadataDef = this.createStructuralMetadataDef(context, structuralMetadata);
        gltfDef.extensions = gltfDef.extensions || {};
        gltfDef.extensions[NAME] = structuralMetadataDef;
        const meshes = root.listMeshes();
        const meshDefs = gltfDef.meshes;
        if (meshDefs) {
            for (const mesh of meshes) {
                const meshIndex = context.meshIndexMap.get(mesh);
                if (meshIndex === undefined) {
                    continue;
                }
                const meshDef = meshDefs[meshIndex];
                mesh.listPrimitives().forEach((prim, primIndex) => {
                    const primDef = meshDef.primitives[primIndex];
                    this.writePrimitive(structuralMetadata, prim, primDef);
                });
            }
        }
        const nodes = root.listNodes();
        const nodeDefs = gltfDef.nodes;
        if (nodeDefs) {
            for (const node of nodes) {
                const nodeIndex = context.nodeIndexMap.get(node);
                if (nodeIndex === undefined) {
                    continue;
                }
                const nodeDef = nodeDefs[nodeIndex];
                this.writeNode(structuralMetadata, node, nodeDef);
            }
        }
        return this;
    }
    writePrimitive(structuralMetadata, prim, primDef) {
        const meshPrimitiveStructuralMetadata = prim.getExtension(NAME);
        if (!meshPrimitiveStructuralMetadata) {
            return;
        }
        const globalPropertyTextures = structuralMetadata.listPropertyTextures();
        const globalPropertyAttributes = structuralMetadata.listPropertyAttributes();
        let propertyTextureDefs = undefined;
        let propertyAttributeDefs = undefined;
        const propertyTextures = meshPrimitiveStructuralMetadata.listPropertyTextures();
        if (propertyTextures.length > 0) {
            propertyTextureDefs = [];
            for (const propertyTexture of propertyTextures) {
                const index = globalPropertyTextures.indexOf(propertyTexture);
                if (index >= 0) {
                    propertyTextureDefs.push(index);
                }
                else {
                    throw new Error(`${NAME}: Invalid property texture in mesh primitive`);
                }
            }
        }
        const propertyAttributes = meshPrimitiveStructuralMetadata.listPropertyAttributes();
        if (propertyAttributes.length > 0) {
            propertyAttributeDefs = [];
            for (const propertyAttribute of propertyAttributes) {
                const index = globalPropertyAttributes.indexOf(propertyAttribute);
                if (index >= 0) {
                    propertyAttributeDefs.push(index);
                }
                else {
                    throw new Error(`${NAME}: Invalid property attribute in mesh primitive`);
                }
            }
        }
        const meshPrimitiveStructuralMetadataDef = {
            propertyTextures: propertyTextureDefs,
            propertyAttributes: propertyAttributeDefs,
        };
        primDef.extensions = primDef.extensions || {};
        primDef.extensions[NAME] = meshPrimitiveStructuralMetadataDef;
    }
    writeNode(structuralMetadata, node, nodeDef) {
        const elementStructuralMetadata = node.getExtension(NAME);
        if (!elementStructuralMetadata) {
            return;
        }
        const globalPropertyTables = structuralMetadata.listPropertyTables();
        const propertyTable = elementStructuralMetadata.getPropertyTable();
        if (propertyTable) {
            const propertyTableIndex = globalPropertyTables.indexOf(propertyTable);
            if (propertyTableIndex >= 0) {
                const elementStructuralMetadataDef = {
                    propertyTable: propertyTableIndex,
                    index: elementStructuralMetadata.getIndex() ?? undefined,
                };
                nodeDef.extensions = nodeDef.extensions || {};
                nodeDef.extensions[NAME] = elementStructuralMetadataDef;
            }
            else {
                throw new Error(`${NAME}: Invalid property tavle in node`);
            }
        }
    }
    createStructuralMetadataDef(context, structuralMetadata) {
        const structuralMetadataDef = {};
        const schema = structuralMetadata.getSchema();
        if (schema) {
            const schemaDef = this.createSchemaDef(schema);
            structuralMetadataDef.schema = schemaDef;
        }
        const schemaUri = structuralMetadata.getSchemaUri();
        if (schemaUri !== null) {
            structuralMetadataDef.schemaUri = schemaUri;
        }
        const propertyTables = structuralMetadata.listPropertyTables();
        if (propertyTables.length > 0) {
            const propertyTableDefs = [];
            for (const propertyTable of propertyTables) {
                const propertyTableDef = this.createPropertyTableDef(context, propertyTable);
                propertyTableDefs.push(propertyTableDef);
            }
            structuralMetadataDef.propertyTables = propertyTableDefs;
        }
        const propertyTextures = structuralMetadata.listPropertyTextures();
        if (propertyTextures.length > 0) {
            const propertyTextureDefs = [];
            for (const propertyTexture of propertyTextures) {
                const propertyTextureDef = this.createPropertyTextureDef(context, propertyTexture);
                propertyTextureDefs.push(propertyTextureDef);
            }
            structuralMetadataDef.propertyTextures = propertyTextureDefs;
        }
        const propertyAttributes = structuralMetadata.listPropertyAttributes();
        if (propertyAttributes.length > 0) {
            const propertyAttributeDefs = [];
            for (const propertyAttribute of propertyAttributes) {
                const propertyAttributeDef = this.createPropertyAttributeDef(propertyAttribute);
                propertyAttributeDefs.push(propertyAttributeDef);
            }
            structuralMetadataDef.propertyAttributes = propertyAttributeDefs;
        }
        return structuralMetadataDef;
    }
    createSchemaDef(schema) {
        let classes = undefined;
        let enums = undefined;
        const classKeys = schema.listClassKeys();
        if (classKeys.length > 0) {
            classes = {};
            for (const classKey of classKeys) {
                const classObject = schema.getClass(classKey);
                if (classObject) {
                    const classDef = this.createClassDef(classObject);
                    classes[classKey] = classDef;
                }
            }
        }
        const enumKeys = schema.listEnumKeys();
        if (enumKeys.length > 0) {
            enums = {};
            for (const enumKey of enumKeys) {
                const enumObject = schema.getEnum(enumKey);
                if (enumObject) {
                    const enumDef = this.createEnumDef(enumObject);
                    enums[enumKey] = enumDef;
                }
            }
        }
        const schemaDef = {
            id: schema.getId(),
            name: schema.getObjectName() ?? undefined,
            description: schema.getDescription() ?? undefined,
            version: schema.getVersion() ?? undefined,
            classes: classes,
            enums: enums,
        };
        return schemaDef;
    }
    createClassDef(classObject) {
        let properties = undefined;
        const propertyKeys = classObject.listPropertyKeys();
        if (propertyKeys.length > 0) {
            properties = {};
            for (const propertyKey of propertyKeys) {
                const propertyObject = classObject.getProperty(propertyKey);
                if (propertyObject) {
                    const propertyDef = this.createClassPropertyDef(propertyObject);
                    properties[propertyKey] = propertyDef;
                }
            }
        }
        const classDef = {
            name: classObject.getObjectName() ?? undefined,
            description: classObject.getDescription() ?? undefined,
            properties: properties,
        };
        return classDef;
    }
    createClassPropertyDef(classProperty) {
        const classPropertyDef = {
            name: classProperty.getObjectName() ?? undefined,
            description: classProperty.getDescription() ?? undefined,
            type: classProperty.getType(),
            componentType: classProperty.getComponentType() ?? undefined,
            enumType: classProperty.getEnumType() ?? undefined,
            array: ifNot(classProperty.getArray(), false) ?? undefined,
            count: classProperty.getCount() ?? undefined,
            normalized: ifNot(classProperty.getNormalized(), false) ?? undefined,
            offset: classProperty.getOffset() ?? undefined,
            scale: classProperty.getScale() ?? undefined,
            max: classProperty.getMax() ?? undefined,
            min: classProperty.getMin() ?? undefined,
            required: ifNot(classProperty.getRequired(), false) ?? undefined,
            noData: classProperty.getNoData() ?? undefined,
            default: classProperty.getDefault() ?? undefined,
        };
        return classPropertyDef;
    }
    createEnumDef(enumObject) {
        const valueDefs = [];
        const values = enumObject.listValues();
        for (const value of values) {
            const valueDef = this.createEnumValueDef(value);
            valueDefs.push(valueDef);
        }
        const enumDef = {
            name: enumObject.getObjectName() ?? undefined,
            description: enumObject.getDescription() ?? undefined,
            valueType: ifNot(enumObject.getValueType(), "UINT16") ?? undefined,
            values: valueDefs,
        };
        return enumDef;
    }
    createEnumValueDef(enumValue) {
        const enumValueDef = {
            name: enumValue.getObjectName(),
            description: enumValue.getDescription() ?? undefined,
            value: enumValue.getValue(),
        };
        return enumValueDef;
    }
    createPropertyTableDef(context, propertyTable) {
        let propertyDefs = undefined;
        const propertyKeys = propertyTable.listPropertyKeys();
        if (propertyKeys.length > 0) {
            propertyDefs = {};
            for (const propertyKey of propertyKeys) {
                const propertyTableProperty = propertyTable.getProperty(propertyKey);
                if (propertyTableProperty) {
                    const propertyTablePropertyDef = this.createPropertyTablePropertyDef(context, propertyKey, propertyTableProperty);
                    propertyDefs[propertyKey] = propertyTablePropertyDef;
                }
            }
        }
        const propertyTableDef = {
            name: propertyTable.getObjectName() ?? undefined,
            class: propertyTable.getClass(),
            count: propertyTable.getCount(),
            properties: propertyDefs,
        };
        return propertyTableDef;
    }
    createPropertyTablePropertyDef(context, propertyName, propertyTableProperty) {
        const valuesData = propertyTableProperty.getValues();
        const values = context.otherBufferViewsIndexMap.get(valuesData);
        if (values === undefined) {
            throw new Error(`${NAME}: No values for property table property ${propertyName}`);
        }
        let arrayOffsets = undefined;
        const arrayOffsetsData = propertyTableProperty.getArrayOffsets();
        if (arrayOffsetsData) {
            arrayOffsets = context.otherBufferViewsIndexMap.get(arrayOffsetsData);
            if (arrayOffsets === undefined) {
                throw new Error(`${NAME}: No arrayOffsets for property table property ${propertyName}`);
            }
        }
        let stringOffsets = undefined;
        const stringOffsetsData = propertyTableProperty.getStringOffsets();
        if (stringOffsetsData) {
            stringOffsets = context.otherBufferViewsIndexMap.get(stringOffsetsData);
            if (stringOffsets === undefined) {
                throw new Error(`${NAME}: No stringOffsets for property table property ${propertyName}`);
            }
        }
        const propertyTablePropertyDef = {
            values: values,
            arrayOffsets: arrayOffsets,
            stringOffsets: stringOffsets,
            arrayOffsetType: ifNot(propertyTableProperty.getArrayOffsetType(), "UINT32") ??
                undefined,
            stringOffsetType: ifNot(propertyTableProperty.getStringOffsetType(), "UINT32") ??
                undefined,
            offset: propertyTableProperty.getOffset() ?? undefined,
            scale: propertyTableProperty.getScale() ?? undefined,
            max: propertyTableProperty.getMax() ?? undefined,
            min: propertyTableProperty.getMin() ?? undefined,
        };
        return propertyTablePropertyDef;
    }
    createPropertyTextureDef(context, propertyTexture) {
        let propertyDefs = undefined;
        const propertyKeys = propertyTexture.listPropertyKeys();
        if (propertyKeys.length > 0) {
            propertyDefs = {};
            for (const propertyKey of propertyKeys) {
                const propertyTextureProperty = propertyTexture.getProperty(propertyKey);
                if (propertyTextureProperty) {
                    const propertyTexturePropertyDef = this.createPropertyTexturePropertyDef(context, propertyKey, propertyTextureProperty);
                    propertyDefs[propertyKey] = propertyTexturePropertyDef;
                }
            }
        }
        const propertyTextureDef = {
            name: propertyTexture.getObjectName() ?? undefined,
            class: propertyTexture.getClass(),
            properties: propertyDefs,
        };
        return propertyTextureDef;
    }
    createPropertyTexturePropertyDef(context, propertyName, propertyTextureProperty) {
        const texture = propertyTextureProperty.getTexture();
        const textureInfo = propertyTextureProperty.getTextureInfo();
        if (!texture) {
            throw new Error(`${NAME}: No texture for property texture property ${propertyName}`);
        }
        if (!textureInfo) {
            throw new Error(`${NAME}: No textureInfo for property texture property ${propertyName}`);
        }
        const basicTextureDef = context.createTextureInfoDef(texture, textureInfo);
        const propertyTexturePropertyDef = {
            channels: ifNot(propertyTextureProperty.getChannels(), [0]) ?? undefined,
            index: basicTextureDef.index,
            texCoord: basicTextureDef.texCoord,
            offset: propertyTextureProperty.getOffset() ?? undefined,
            scale: propertyTextureProperty.getScale() ?? undefined,
            max: propertyTextureProperty.getMax() ?? undefined,
            min: propertyTextureProperty.getMin() ?? undefined,
        };
        return propertyTexturePropertyDef;
    }
    createPropertyAttributeDef(propertyAttribute) {
        let propertyDefs = undefined;
        const propertyKeys = propertyAttribute.listPropertyKeys();
        if (propertyKeys.length > 0) {
            propertyDefs = {};
            for (const propertyKey of propertyKeys) {
                const propertyAttributeProperty = propertyAttribute.getProperty(propertyKey);
                if (propertyAttributeProperty) {
                    const propertyAttributePropertyDef = this.createPropertyAttributePropertyDef(propertyAttributeProperty);
                    propertyDefs[propertyKey] = propertyAttributePropertyDef;
                }
            }
        }
        const propertyAttributeDef = {
            name: propertyAttribute.getObjectName() ?? undefined,
            class: propertyAttribute.getClass(),
            properties: propertyDefs,
        };
        return propertyAttributeDef;
    }
    createPropertyAttributePropertyDef(propertyAttributeProperty) {
        const propertyAttributePropertyDef = {
            attribute: propertyAttributeProperty.getAttribute(),
            offset: propertyAttributeProperty.getOffset() ?? undefined,
            scale: propertyAttributeProperty.getScale() ?? undefined,
            max: propertyAttributeProperty.getMax() ?? undefined,
            min: propertyAttributeProperty.getMin() ?? undefined,
        };
        return propertyAttributePropertyDef;
    }
    /**
     * Perform the operations that are required before writing
     * a glTF document when it contains this extension.
     *
     * This extension defines `prewriteTypes = [PropertyType.BUFFER];`
     * to prepare the buffer data that contains the buffer view data
     * that otherwise is not referenced (because property tables are
     * directly referring to buffer views, and not via accessors)
     */
    prewrite(context, propertyType) {
        if (propertyType === core_2.PropertyType.BUFFER) {
            this._prewriteBuffers(context);
        }
        return this;
    }
    /**
     * Prepares writing a document that contains this extension.
     *
     * This will collect all buffer views that are referred to by the
     * property tables, and store them as "otherBufferViews" of
     * the writer context (for the main buffer), to make sure
     * that they are part of the buffer when it is eventually
     * written in Writer.ts.
     *
     * @param context - The writer context
     * @returns The deep void of space
     */
    _prewriteBuffers(context) {
        const root = this.document.getRoot();
        const structuralMetadata = root.getExtension(NAME);
        if (!structuralMetadata) {
            return;
        }
        const jsonDoc = context.jsonDoc;
        const gltfDef = jsonDoc.json;
        let bufferViewDefs = gltfDef.bufferViews;
        if (!bufferViewDefs) {
            bufferViewDefs = [];
            gltfDef.bufferViews = bufferViewDefs;
        }
        const propertyTables = structuralMetadata.listPropertyTables();
        for (const propertyTable of propertyTables) {
            const propertyValues = propertyTable.listPropertyValues();
            for (const propertyValue of propertyValues) {
                const otherBufferViews = this.obtainOtherBufferViews(context);
                const values = propertyValue.getValues();
                otherBufferViews.push(values);
                const arrayOffsets = propertyValue.getArrayOffsets();
                if (arrayOffsets) {
                    otherBufferViews.push(arrayOffsets);
                }
                const stringOffsets = propertyValue.getStringOffsets();
                if (stringOffsets) {
                    otherBufferViews.push(stringOffsets);
                }
            }
        }
    }
    /**
     * Obtain the "otherBufferViews" for the main buffer from the given
     * context, creating them if they did not exist yet.
     *
     * @param context - The writer context
     * @returns The other buffer views
     */
    obtainOtherBufferViews(context) {
        const root = this.document.getRoot();
        const buffer = root.listBuffers()[0];
        let otherBufferViews = context.otherBufferViews.get(buffer);
        if (!otherBufferViews) {
            otherBufferViews = [];
            context.otherBufferViews.set(buffer, otherBufferViews);
        }
        return otherBufferViews;
    }
}
exports.EXTStructuralMetadata = EXTStructuralMetadata;
EXTStructuralMetadata.EXTENSION_NAME = NAME;
//# sourceMappingURL=EXTStructuralMetadata.js.map