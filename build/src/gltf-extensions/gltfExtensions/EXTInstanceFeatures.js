"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTInstanceFeatures = void 0;
const core_1 = require("@gltf-transform/core");
const InstanceFeatures_1 = require("./InstanceFeatures");
const InstanceFeatures_2 = require("./InstanceFeatures");
const NAME = "EXT_instance_features";
//============================================================================
/**
 * [`EXT_instance_features`](https://github.com/CesiumGS/glTF/blob/3d-tiles-next/extensions/2.0/Vendor/EXT_instance_features/)
 * defines a means of assigning identifiers to instances that are created with the `EXT_mesh_gpu_instancing` extension.
 *
 * Properties:
 * - {@link InstanceFeatures}
 * - {@link InstanceFeaturesFeatureId}
 *
 * @internal
 */
class EXTInstanceFeatures extends core_1.Extension {
    constructor() {
        super(...arguments);
        this.extensionName = NAME;
    }
    createInstanceFeatures() {
        return new InstanceFeatures_2.InstanceFeatures(this.document.getGraph());
    }
    createFeatureId() {
        return new InstanceFeatures_1.FeatureId(this.document.getGraph());
    }
    read(context) {
        const jsonDoc = context.jsonDoc;
        const gltfDef = jsonDoc.json;
        const nodeDefs = gltfDef.nodes || [];
        nodeDefs.forEach((nodeDef, nodeIndex) => {
            const node = context.nodes[nodeIndex];
            this.readNode(context, node, nodeDef);
        });
        return this;
    }
    readNode(context, node, nodeDef) {
        if (!nodeDef.extensions || !nodeDef.extensions[NAME]) {
            return;
        }
        const instanceFeatures = this.createInstanceFeatures();
        const instanceFeaturesDef = nodeDef.extensions[NAME];
        const featureIdDefs = instanceFeaturesDef.featureIds;
        for (const featureIdDef of featureIdDefs) {
            const featureId = this.createFeatureId();
            this.readFeatureId(featureId, featureIdDef);
            instanceFeatures.addFeatureId(featureId);
        }
        node.setExtension(NAME, instanceFeatures);
    }
    readFeatureId(featureId, featureIdDef) {
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
    write(context) {
        const jsonDoc = context.jsonDoc;
        const nodeDefs = jsonDoc.json.nodes;
        if (!nodeDefs) {
            return this;
        }
        for (const node of this.document.getRoot().listNodes()) {
            const nodeIndex = context.nodeIndexMap.get(node);
            if (nodeIndex === undefined) {
                continue;
            }
            const nodeDef = nodeDefs[nodeIndex];
            this.writeNode(node, nodeDef);
        }
        return this;
    }
    writeNode(node, nodeDef) {
        const instanceFeatures = node.getExtension(NAME);
        if (!instanceFeatures) {
            return;
        }
        const instanceFeaturesDef = { featureIds: [] };
        instanceFeatures.listFeatureIds().forEach((featureId) => {
            const featureIdDef = this.createFeatureIdDef(featureId);
            instanceFeaturesDef.featureIds.push(featureIdDef);
        });
        nodeDef.extensions = nodeDef.extensions || {};
        nodeDef.extensions[NAME] = instanceFeaturesDef;
    }
    createFeatureIdDef(featureId) {
        let propertyTableDef;
        const propertyTable = featureId.getPropertyTable();
        if (propertyTable !== null) {
            const root = this.document.getRoot();
            const structuralMetadata = root.getExtension("EXT_structural_metadata");
            if (structuralMetadata) {
                const propertyTables = structuralMetadata.listPropertyTables();
                propertyTableDef = propertyTables.indexOf(propertyTable);
                if (propertyTableDef < 0) {
                    throw new Error(`${NAME}: Invalid property table in feature ID`);
                }
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
            propertyTable: propertyTableDef,
        };
        return featureIdDef;
    }
}
exports.EXTInstanceFeatures = EXTInstanceFeatures;
EXTInstanceFeatures.EXTENSION_NAME = NAME;
//# sourceMappingURL=EXTInstanceFeatures.js.map