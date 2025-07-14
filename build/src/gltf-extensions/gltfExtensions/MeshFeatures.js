"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureIdTexture = exports.FeatureId = exports.MeshFeatures = void 0;
const core_1 = require("@gltf-transform/core");
const core_2 = require("@gltf-transform/core");
const core_3 = require("@gltf-transform/core");
const NAME = "EXT_mesh_features";
//============================================================================
//============================================================================
// The actual model classes
//
// These are exported, and visible to users.
//
// They offer accessor methods for the properties that are defined in
// the model class interfaces. Depending on the type of the properties,
// these accesor methods come in different flavors:
//
// - For "primitive" property types (like `number`, `boolean` and `string`),
//   the implementations use `this.get(...)`/`this.set(...)`
// - For property types that correspond to other "model" classes,
//   the implementations use `this.getRef(...)`/`this.setRef(...)`.
// - For property types that correspond to ARRAYS of "model" classes,
//   the implementations don't offer "getters/setters", but instead,
//   they offer `add/remove/list` methods, implemented based on
//   `this.addRef(...)`/`this.removeRef(...)`/`this.listRefs(...)`.
//
// A special case is that of textures:
//
// Each texture in these classes is modeled as a property with the
// type `Texture`, and an associated `TextureInfo`. The `TextureInfo`
// can only be accessed with a `get` method, but not explicitly
// set: It is managed internally by glTF-Transform. So for
// an `exampleTextureInfo: TextureInfo` property, there will only
// be a getter, implemented as
// ```
// getExampleTextureInfo(): TextureInfo | null {
//   return this.getRef("exampleTexture") ?
//     this.getRef("exampleTextureInfo") : null;
// }
// ```
/**
 * Main model class of `EXT_mesh_features`
 *
 * @internal
 */
class MeshFeatures extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "MeshFeatures";
        this.parentTypes = [core_3.PropertyType.PRIMITIVE];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            featureIds: [],
        });
    }
    listFeatureIds() {
        return this.listRefs("featureIds");
    }
    addFeatureId(featureId) {
        return this.addRef("featureIds", featureId);
    }
    removeFeatureId(featureId) {
        return this.removeRef("featureIds", featureId);
    }
}
exports.MeshFeatures = MeshFeatures;
MeshFeatures.EXTENSION_NAME = NAME;
/**
 * Implementation of a feature ID for `EXT_mesh_features`
 *
 * @internal
 */
class FeatureId extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "FeatureId";
        this.parentTypes = ["MeshFeatures"];
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            nullFeatureId: null,
            label: null,
            attribute: null,
            texture: null,
            propertyTable: null,
        });
    }
    getFeatureCount() {
        return this.get("featureCount");
    }
    setFeatureCount(featureCount) {
        return this.set("featureCount", featureCount);
    }
    getNullFeatureId() {
        return this.get("nullFeatureId");
    }
    setNullFeatureId(nullFeatureId) {
        return this.set("nullFeatureId", nullFeatureId);
    }
    getLabel() {
        return this.get("label");
    }
    setLabel(label) {
        return this.set("label", label);
    }
    getAttribute() {
        return this.get("attribute");
    }
    setAttribute(attribute) {
        return this.set("attribute", attribute);
    }
    getTexture() {
        return this.getRef("texture");
    }
    setTexture(texture) {
        return this.setRef("texture", texture);
    }
    getPropertyTable() {
        return this.getRef("propertyTable");
    }
    setPropertyTable(propertyTable) {
        return this.setRef("propertyTable", propertyTable);
    }
}
exports.FeatureId = FeatureId;
FeatureId.EXTENSION_NAME = NAME;
/**
 * Implementation of a feature ID texture for `EXT_mesh_features`
 *
 * @internal
 */
class FeatureIdTexture extends core_1.ExtensionProperty {
    init() {
        this.extensionName = NAME;
        this.propertyType = "FeatureIdTexture";
        this.parentTypes = ["FeatureId"];
    }
    getDefaults() {
        const defaultTextureInfo = new core_2.TextureInfo(this.graph, "textureInfo");
        defaultTextureInfo.setMinFilter(core_2.TextureInfo.MagFilter.NEAREST);
        defaultTextureInfo.setMagFilter(core_2.TextureInfo.MagFilter.NEAREST);
        return Object.assign(super.getDefaults(), {
            channels: [0],
            texture: null,
            textureInfo: defaultTextureInfo,
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
}
exports.FeatureIdTexture = FeatureIdTexture;
FeatureIdTexture.EXTENSION_NAME = NAME;
//# sourceMappingURL=MeshFeatures.js.map