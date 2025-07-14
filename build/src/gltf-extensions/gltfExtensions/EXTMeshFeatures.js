"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTMeshFeatures = void 0;
const core_1 = require("@gltf-transform/core");
const MeshFeatures_1 = require("./MeshFeatures");
const MeshFeatures_2 = require("./MeshFeatures");
const MeshFeatures_3 = require("./MeshFeatures");
const NAME = "EXT_mesh_features";
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
 * [`EXT_mesh_features`](https://github.com/CesiumGS/glTF/tree/proposal-EXT_mesh_features/extensions/2.0/Vendor/EXT_mesh_features/)
 * defines a means of assigning identifiers to geometry and subcomponents of geometry within a glTF 2.0 asset.
 *
 * Properties:
 * - {@link MeshFeatures}
 * - {@link MeshFeaturesFeatureId}
 * - {@link FeatureIdTexture}
 *
 * ### Example
 *
 * ```typescript
 * const document = new Document();
 *
 * // Create an Extension attached to the Document.
 * const extMeshFeatures = document.createExtension(EXTMeshFeatures);
 *
 * // Define an array of IDs
 * const ids = [ 12, 23, 34, 45, 56, 78, 78, 89, 90 ];
 *
 * // Put the IDs into an `Accessor`
 * const buffer = document.createBuffer();
 * const accessor = document.createAccessor();
 * accessor.setBuffer(buffer);
 * accessor.setType(Accessor.Type.SCALAR);
 * accessor.setArray(new Int16Array(ids));
 *
 * // Create a mesh `Primitive`
 * const primitive = document.createPrimitive();
 *
 * // Set the IDs as one attribute of the `Primitive`
 * const attributeNumber = 2;
 * primitive.setAttribute(`_FEATURE_ID_${attributeNumber}`, accessor);
 *
 * // Create a `FeatureId` object. This object indicates that the IDs
 * // are stored in the attribute `_FEATURE_ID_${attributeNumber}`
 * const featureId = extMeshFeatures.createFeatureId();
 * featureId.setFeatureCount(new Set(ids).size);
 * featureId.setAttribute(attributeNumber);
 *
 * // Create a `MeshFeatures` object that contains the
 * // created `FeatureID`, and store it as an extension
 * // object in the `Primitive`
 * const meshFeatures = extMeshFeatures.createMeshFeatures();
 * meshFeatures.addFeatureId(featureId);
 * primitive.setExtension("EXT_mesh_features", meshFeatures);
 *
 * // Assign the `Primitive` to a `Mesh`
 * const mesh = document.createMesh();
 * mesh.addPrimitive(primitive);
 *
 * // Create an IO object and register the extension
 * const io = new NodeIO();
 * io.registerExtensions([EXTMeshFeatures]);
 *
 * // Write the document as JSON
 * const written = await io.writeJSON(document);
 * ```
 *
 * @internal
 */
class EXTMeshFeatures extends core_1.Extension {
    constructor() {
        super(...arguments);
        this.extensionName = NAME;
    }
    createMeshFeatures() {
        return new MeshFeatures_3.MeshFeatures(this.document.getGraph());
    }
    createFeatureId() {
        return new MeshFeatures_1.FeatureId(this.document.getGraph());
    }
    createFeatureIdTexture() {
        return new MeshFeatures_2.FeatureIdTexture(this.document.getGraph());
    }
    read(context) {
        const jsonDoc = context.jsonDoc;
        const meshDefs = jsonDoc.json.meshes || [];
        meshDefs.forEach((meshDef, meshIndex) => {
            const primDefs = meshDef.primitives || [];
            primDefs.forEach((primDef, primIndex) => {
                this.readPrimitive(context, meshIndex, primDef, primIndex);
            });
        });
        return this;
    }
    readPrimitive(context, meshIndex, primDef, primIndex) {
        if (!primDef.extensions || !primDef.extensions[NAME]) {
            return;
        }
        const meshFeatures = this.createMeshFeatures();
        const meshFeaturesDef = primDef.extensions[NAME];
        const featureIdDefs = meshFeaturesDef.featureIds;
        for (const featureIdDef of featureIdDefs) {
            const featureId = this.createFeatureId();
            this.readFeatureId(context, featureId, featureIdDef);
            meshFeatures.addFeatureId(featureId);
        }
        const mesh = context.meshes[meshIndex];
        mesh.listPrimitives()[primIndex].setExtension(NAME, meshFeatures);
    }
    readFeatureId(context, featureId, featureIdDef) {
        featureId.setFeatureCount(featureIdDef.featureCount);
        if (featureIdDef.nullFeatureId !== undefined) {
            featureId.setNullFeatureId(featureIdDef.nullFeatureId);
        }
        if (featureIdDef.label !== undefined) {
            featureId.setLabel(featureIdDef.label);
        }
        if (featureIdDef.attribute !== undefined) {
            featureId.setAttribute(featureIdDef.attribute);
        }
        const featureIdTextureDef = featureIdDef.texture;
        if (featureIdTextureDef !== undefined) {
            const featureIdTexture = this.createFeatureIdTexture();
            this.readFeatureIdTexture(context, featureIdTexture, featureIdTextureDef);
            featureId.setTexture(featureIdTexture);
        }
        if (featureIdDef.propertyTable !== undefined) {
            const root = this.document.getRoot();
            const structuralMetadata = root.getExtension("EXT_structural_metadata");
            if (structuralMetadata) {
                const propertyTables = structuralMetadata.listPropertyTables();
                const propertyTable = propertyTables[featureIdDef.propertyTable];
                featureId.setPropertyTable(propertyTable);
            }
            else {
                throw new Error(`${NAME}: No EXT_structural_metadata definition for looking up property tables`);
            }
        }
    }
    readFeatureIdTexture(context, featureIdTexture, featureIdTextureDef) {
        const jsonDoc = context.jsonDoc;
        const textureDefs = jsonDoc.json.textures || [];
        if (featureIdTextureDef.channels) {
            featureIdTexture.setChannels(featureIdTextureDef.channels);
        }
        const source = textureDefs[featureIdTextureDef.index].source;
        if (source !== undefined) {
            const texture = context.textures[source];
            featureIdTexture.setTexture(texture);
            const textureInfo = featureIdTexture.getTextureInfo();
            if (textureInfo) {
                context.setTextureInfo(textureInfo, featureIdTextureDef);
            }
        }
    }
    write(context) {
        const jsonDoc = context.jsonDoc;
        const meshDefs = jsonDoc.json.meshes;
        if (!meshDefs) {
            return this;
        }
        for (const mesh of this.document.getRoot().listMeshes()) {
            const meshIndex = context.meshIndexMap.get(mesh);
            if (meshIndex === undefined) {
                continue;
            }
            const meshDef = meshDefs[meshIndex];
            mesh.listPrimitives().forEach((prim, primIndex) => {
                const primDef = meshDef.primitives[primIndex];
                this.writePrimitive(context, prim, primDef);
            });
        }
        return this;
    }
    writePrimitive(context, prim, primDef) {
        const meshFeatures = prim.getExtension(NAME);
        if (!meshFeatures) {
            return;
        }
        const meshFeaturesDef = { featureIds: [] };
        meshFeatures.listFeatureIds().forEach((featureId) => {
            const featureIdDef = this.createFeatureIdDef(context, featureId);
            meshFeaturesDef.featureIds.push(featureIdDef);
        });
        primDef.extensions = primDef.extensions || {};
        primDef.extensions[NAME] = meshFeaturesDef;
    }
    createFeatureIdDef(context, featureId) {
        let textureDef = undefined;
        const featureIdTexture = featureId.getTexture();
        if (featureIdTexture) {
            const texture = featureIdTexture.getTexture();
            const textureInfo = featureIdTexture.getTextureInfo();
            if (texture && textureInfo) {
                const basicTextureDef = context.createTextureInfoDef(texture, textureInfo);
                textureDef = {
                    channels: ifNot(featureIdTexture.getChannels(), [0]) ?? undefined,
                    index: basicTextureDef.index,
                    texCoord: basicTextureDef.texCoord,
                };
            }
        }
        let propertyTableDef;
        const propertyTable = featureId.getPropertyTable();
        if (propertyTable !== null) {
            const root = this.document.getRoot();
            const structuralMetadata = root.getExtension("EXT_structural_metadata");
            if (structuralMetadata) {
                const propertyTables = structuralMetadata.listPropertyTables();
                propertyTableDef = propertyTables.indexOf(propertyTable);
            }
            else {
                throw new Error(`${NAME}: No EXT_structural_metadata definition for looking up property table index`);
            }
        }
        const featureIdDef = {
            featureCount: featureId.getFeatureCount(),
            nullFeatureId: featureId.getNullFeatureId() ?? undefined,
            label: featureId.getLabel() ?? undefined,
            attribute: featureId.getAttribute() ?? undefined,
            texture: textureDef,
            propertyTable: propertyTableDef,
        };
        return featureIdDef;
    }
}
exports.EXTMeshFeatures = EXTMeshFeatures;
EXTMeshFeatures.EXTENSION_NAME = NAME;
//# sourceMappingURL=EXTMeshFeatures.js.map