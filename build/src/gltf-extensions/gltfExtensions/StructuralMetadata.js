"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeshPrimitiveStructuralMetadata = exports.ElementStructuralMetadata = exports.PropertyAttributeProperty = exports.PropertyAttribute = exports.PropertyTextureProperty = exports.PropertyTexture = exports.PropertyTableProperty = exports.PropertyTable = exports.EnumValue = exports.Enum = exports.ClassProperty = exports.Class = exports.Schema = exports.StructuralMetadata = void 0;
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const core_3 = require("@gltf-transform/core");
const NAME = "EXT_structural_metadata";
//============================================================================
//============================================================================
// The actual model classes
// (See `MeshFeatures` for details about the concepts)
//
/**
 * Main model class for `EXT_structural_metadata`
 *
 * @internal
 */
class StructuralMetadata extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "StructuralMetadata";
        this.parentTypes = [core_3.PropertyType.ROOT];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            schema: null,
            schemaUri: null,
            propertyTables: [],
            propertyTextures: [],
            propertyAttributes: [],
        });
    }
    getSchema() {
        return this.getRef("schema");
    }
    setSchema(schema) {
        return this.setRef("schema", schema);
    }
    getSchemaUri() {
        return this.get("schemaUri");
    }
    setSchemaUri(schemaUri) {
        return this.set("schemaUri", schemaUri);
    }
    listPropertyTables() {
        return this.listRefs("propertyTables");
    }
    addPropertyTable(propertyTable) {
        return this.addRef("propertyTables", propertyTable);
    }
    removePropertyTable(propertyTable) {
        return this.removeRef("propertyTables", propertyTable);
    }
    listPropertyTextures() {
        return this.listRefs("propertyTextures");
    }
    addPropertyTexture(propertyTexture) {
        return this.addRef("propertyTextures", propertyTexture);
    }
    removePropertyTexture(propertyTexture) {
        return this.removeRef("propertyTextures", propertyTexture);
    }
    listPropertyAttributes() {
        return this.listRefs("propertyAttributes");
    }
    addPropertyAttribute(propertyAttribute) {
        return this.addRef("propertyAttributes", propertyAttribute);
    }
    removePropertyAttribute(propertyAttribute) {
        return this.removeRef("propertyAttributes", propertyAttribute);
    }
}
exports.StructuralMetadata = StructuralMetadata;
StructuralMetadata.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata schema for `EXT_structural_metadata`
 *
 * @internal
 */
class Schema extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "Schema";
        this.parentTypes = ["StructuralMetadata"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            description: null,
            version: null,
            classes: {},
            enums: {},
        });
    }
    getId() {
        return this.get("id");
    }
    setId(name) {
        return this.set("id", name);
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getDescription() {
        return this.get("description");
    }
    setDescription(description) {
        return this.set("description", description);
    }
    getVersion() {
        return this.get("version");
    }
    setVersion(version) {
        return this.set("version", version);
    }
    setClass(key, value) {
        return this.setRefMap("classes", key, value);
    }
    getClass(key) {
        return this.getRefMap("classes", key);
    }
    listClassKeys() {
        return this.listRefMapKeys("classes");
    }
    listClassValues() {
        return this.listRefMapValues("classes");
    }
    setEnum(key, value) {
        return this.setRefMap("enums", key, value);
    }
    getEnum(key) {
        return this.getRefMap("enums", key);
    }
    listEnumKeys() {
        return this.listRefMapKeys("enums");
    }
    listEnumValues() {
        return this.listRefMapValues("enums");
    }
}
exports.Schema = Schema;
Schema.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata class for `EXT_structural_metadata`
 *
 * @internal
 */
class Class extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "Class";
        this.parentTypes = ["Schema"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            description: null,
            properties: {},
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getDescription() {
        return this.get("description");
    }
    setDescription(description) {
        return this.set("description", description);
    }
    setProperty(key, value) {
        return this.setRefMap("properties", key, value);
    }
    getProperty(key) {
        return this.getRefMap("properties", key);
    }
    listPropertyKeys() {
        return this.listRefMapKeys("properties");
    }
    listPropertyValues() {
        return this.listRefMapValues("properties");
    }
}
exports.Class = Class;
Class.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata class property for `EXT_structural_metadata`
 *
 * @internal
 */
class ClassProperty extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "ClassProperty";
        this.parentTypes = ["Class"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            description: null,
            componentType: null,
            enumType: null,
            array: null,
            count: null,
            normalized: null,
            offset: null,
            scale: null,
            max: null,
            min: null,
            required: null,
            noData: null,
            default: null,
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getDescription() {
        return this.get("description");
    }
    setDescription(description) {
        return this.set("description", description);
    }
    getType() {
        return this.get("type");
    }
    setType(type) {
        return this.set("type", type);
    }
    getComponentType() {
        return this.get("componentType");
    }
    setComponentType(componentType) {
        return this.set("componentType", componentType);
    }
    getEnumType() {
        return this.get("enumType");
    }
    setEnumType(enumType) {
        return this.set("enumType", enumType);
    }
    getArray() {
        return this.get("array");
    }
    setArray(array) {
        return this.set("array", array);
    }
    getCount() {
        return this.get("count");
    }
    setCount(count) {
        return this.set("count", count);
    }
    getNormalized() {
        return this.get("normalized");
    }
    setNormalized(normalized) {
        return this.set("normalized", normalized);
    }
    getOffset() {
        return this.get("offset");
    }
    setOffset(offset) {
        return this.set("offset", offset);
    }
    getScale() {
        return this.get("scale");
    }
    setScale(scale) {
        return this.set("scale", scale);
    }
    getMax() {
        return this.get("max");
    }
    setMax(max) {
        return this.set("max", max);
    }
    getMin() {
        return this.get("min");
    }
    setMin(min) {
        return this.set("min", min);
    }
    getRequired() {
        return this.get("required");
    }
    setRequired(required) {
        return this.set("required", required);
    }
    getNoData() {
        return this.get("noData");
    }
    setNoData(noData) {
        return this.set("noData", noData);
    }
    getDefault() {
        return this.get("default");
    }
    setDefault(defaultValue) {
        return this.set("default", defaultValue);
    }
}
exports.ClassProperty = ClassProperty;
ClassProperty.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata enum for `EXT_structural_metadata`
 *
 * @internal
 */
class Enum extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "Enum";
        this.parentTypes = ["Schema"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            description: null,
            valueType: "UINT16",
            values: [],
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getDescription() {
        return this.get("description");
    }
    setDescription(description) {
        return this.set("description", description);
    }
    getValueType() {
        return this.get("valueType");
    }
    setValueType(valueType) {
        return this.set("valueType", valueType);
    }
    listValues() {
        return this.listRefs("values");
    }
    addEnumValue(enumValue) {
        return this.addRef("values", enumValue);
    }
    removeEnumValue(enumValue) {
        return this.removeRef("values", enumValue);
    }
}
exports.Enum = Enum;
Enum.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata enum value for `EXT_structural_metadata`
 *
 * @internal
 */
class EnumValue extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "EnumValue";
        this.parentTypes = ["Enum"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            description: null,
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getDescription() {
        return this.get("description");
    }
    setDescription(description) {
        return this.set("description", description);
    }
    getValue() {
        return this.get("value");
    }
    setValue(value) {
        return this.set("value", value);
    }
}
exports.EnumValue = EnumValue;
EnumValue.EXTENSION_NAME = NAME;
/**
 * Implementation of a property table for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyTable extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyTable";
        this.parentTypes = ["StructuralMetadata"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            properties: {},
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getClass() {
        return this.get("class");
    }
    setClass(className) {
        return this.set("class", className);
    }
    getCount() {
        return this.get("count");
    }
    setCount(count) {
        return this.set("count", count);
    }
    setProperty(key, value) {
        return this.setRefMap("properties", key, value);
    }
    getProperty(key) {
        return this.getRefMap("properties", key);
    }
    listPropertyKeys() {
        return this.listRefMapKeys("properties");
    }
    listPropertyValues() {
        return this.listRefMapValues("properties");
    }
}
exports.PropertyTable = PropertyTable;
PropertyTable.EXTENSION_NAME = NAME;
/**
 * Implementation of a property table property for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyTableProperty extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyTableProperty";
        this.parentTypes = ["PropertyTable"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            arrayOffsets: null,
            stringOffsets: null,
            arrayOffsetType: null,
            stringOffsetType: null,
            offset: null,
            scale: null,
            max: null,
            min: null,
        });
    }
    getValues() {
        return this.get("values");
    }
    setValues(values) {
        return this.set("values", values);
    }
    getArrayOffsets() {
        return this.get("arrayOffsets");
    }
    setArrayOffsets(arrayOffsets) {
        return this.set("arrayOffsets", arrayOffsets);
    }
    getStringOffsets() {
        return this.get("stringOffsets");
    }
    setStringOffsets(stringOffsets) {
        return this.set("stringOffsets", stringOffsets);
    }
    getArrayOffsetType() {
        return this.get("arrayOffsetType");
    }
    setArrayOffsetType(arrayOffsetType) {
        return this.set("arrayOffsetType", arrayOffsetType);
    }
    getStringOffsetType() {
        return this.get("stringOffsetType");
    }
    setStringOffsetType(stringOffsetType) {
        return this.set("stringOffsetType", stringOffsetType);
    }
    getOffset() {
        return this.get("offset");
    }
    setOffset(offset) {
        return this.set("offset", offset);
    }
    getScale() {
        return this.get("scale");
    }
    setScale(scale) {
        return this.set("scale", scale);
    }
    getMax() {
        return this.get("max");
    }
    setMax(max) {
        return this.set("max", max);
    }
    getMin() {
        return this.get("min");
    }
    setMin(min) {
        return this.set("min", min);
    }
}
exports.PropertyTableProperty = PropertyTableProperty;
PropertyTableProperty.EXTENSION_NAME = NAME;
/**
 * Implementation of a property texture for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyTexture extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyTexture";
        this.parentTypes = ["StructuralMetadata"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            properties: {},
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getClass() {
        return this.get("class");
    }
    setClass(_class) {
        return this.set("class", _class);
    }
    setProperty(key, value) {
        return this.setRefMap("properties", key, value);
    }
    getProperty(key) {
        return this.getRefMap("properties", key);
    }
    listPropertyKeys() {
        return this.listRefMapKeys("properties");
    }
    listPropertyValues() {
        return this.listRefMapValues("properties");
    }
}
exports.PropertyTexture = PropertyTexture;
PropertyTexture.EXTENSION_NAME = NAME;
/**
 * Implementation of a property texture property for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyTextureProperty extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyTextureProperty";
        this.parentTypes = ["PropertyTexture"];
    }
    getDefaults() {
        const defaultTextureInfo = new core_2.TextureInfo(this.graph, "textureInfo");
        defaultTextureInfo.setMinFilter(core_2.TextureInfo.MagFilter.NEAREST);
        defaultTextureInfo.setMagFilter(core_2.TextureInfo.MagFilter.NEAREST);
        return Object.assign(super.getDefaults(), {
            channels: [0],
            texture: null,
            textureInfo: defaultTextureInfo,
            offset: null,
            scale: null,
            max: null,
            min: null,
        });
    }
    getChannels() {
        return this.get("channels");
    }
    setChannels(channels) {
        return this.set("channels", channels);
    }
    getTexture() {
        return this.getRef("texture");
    }
    setTexture(texture) {
        return this.setRef("texture", texture);
    }
    getTextureInfo() {
        return this.getRef("texture") ? this.getRef("textureInfo") : null;
    }
    getOffset() {
        return this.get("offset");
    }
    setOffset(offset) {
        return this.set("offset", offset);
    }
    getScale() {
        return this.get("scale");
    }
    setScale(scale) {
        return this.set("scale", scale);
    }
    getMax() {
        return this.get("max");
    }
    setMax(max) {
        return this.set("max", max);
    }
    getMin() {
        return this.get("min");
    }
    setMin(min) {
        return this.set("min", min);
    }
}
exports.PropertyTextureProperty = PropertyTextureProperty;
PropertyTextureProperty.EXTENSION_NAME = NAME;
/**
 * Implementation of a property attribute for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyAttribute extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyAttribute";
        this.parentTypes = ["StructuralMetadata"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            objectName: null,
            properties: {},
        });
    }
    getObjectName() {
        return this.get("objectName");
    }
    setObjectName(name) {
        return this.set("objectName", name);
    }
    getClass() {
        return this.get("class");
    }
    setClass(_class) {
        return this.set("class", _class);
    }
    setProperty(key, value) {
        return this.setRefMap("properties", key, value);
    }
    getProperty(key) {
        return this.getRefMap("properties", key);
    }
    listPropertyKeys() {
        return this.listRefMapKeys("properties");
    }
    listPropertyValues() {
        return this.listRefMapValues("properties");
    }
}
exports.PropertyAttribute = PropertyAttribute;
PropertyAttribute.EXTENSION_NAME = NAME;
/**
 * Implementation of a property attribute property for `EXT_structural_metadata`
 *
 * @internal
 */
class PropertyAttributeProperty extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "PropertyAttributeProperty";
        this.parentTypes = ["PropertyAttribute"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            offset: null,
            scale: null,
            max: null,
            min: null,
        });
    }
    getAttribute() {
        return this.get("attribute");
    }
    setAttribute(attribute) {
        return this.set("attribute", attribute);
    }
    getOffset() {
        return this.get("offset");
    }
    setOffset(offset) {
        return this.set("offset", offset);
    }
    getScale() {
        return this.get("scale");
    }
    setScale(scale) {
        return this.set("scale", scale);
    }
    getMax() {
        return this.get("max");
    }
    setMax(max) {
        return this.set("max", max);
    }
    getMin() {
        return this.get("min");
    }
    setMin(min) {
        return this.set("min", min);
    }
}
exports.PropertyAttributeProperty = PropertyAttributeProperty;
PropertyAttributeProperty.EXTENSION_NAME = NAME;
/**
 * Implementation of a metadata entity for `EXT_structural_metadata`
 *
 * @internal
 */
class ElementStructuralMetadata extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "ElementStructuralMetadata";
        this.parentTypes = [core_3.PropertyType.NODE];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {});
    }
    getPropertyTable() {
        return this.getRef("propertyTable");
    }
    setPropertyTable(propertyTable) {
        return this.setRef("propertyTable", propertyTable);
    }
    getIndex() {
        return this.get("index");
    }
    setIndex(index) {
        return this.set("index", index);
    }
}
exports.ElementStructuralMetadata = ElementStructuralMetadata;
ElementStructuralMetadata.EXTENSION_NAME = NAME;
/**
 * Implementation of a structural metadata in a mesh primitive `EXT_structural_metadata`
 *
 * @internal
 */
class MeshPrimitiveStructuralMetadata extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "MeshPrimitiveStructuralMetadata";
        this.parentTypes = [core_3.PropertyType.PRIMITIVE];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            propertyTextures: [],
            propertyAttributes: [],
        });
    }
    listPropertyTextures() {
        return this.listRefs("propertyTextures");
    }
    addPropertyTexture(propertyTexture) {
        return this.addRef("propertyTextures", propertyTexture);
    }
    removePropertyTexture(propertyTexture) {
        return this.removeRef("propertyTextures", propertyTexture);
    }
    listPropertyAttributes() {
        return this.listRefs("propertyAttributes");
    }
    addPropertyAttribute(propertyAttribute) {
        return this.addRef("propertyAttributes", propertyAttribute);
    }
    removePropertyAttribute(propertyAttribute) {
        return this.removeRef("propertyAttributes", propertyAttribute);
    }
}
exports.MeshPrimitiveStructuralMetadata = MeshPrimitiveStructuralMetadata;
MeshPrimitiveStructuralMetadata.EXTENSION_NAME = NAME;
//# sourceMappingURL=StructuralMetadata.js.map