"use strict";
// NOTE: The functions in this class are "ported" from
// https://github.com/donmccurdy/glTF-Transform/pull/1375/files
//
// The only exported functions are "mergeDocuments" and "copyToDocument",
// which will be replaced by the functions from glTF-Transform 4.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyToDocument = exports.mergeDocuments = void 0;
const core_1 = require("@gltf-transform/core");
const { TEXTURE_INFO, ROOT } = core_1.PropertyType;
const NO_TRANSFER_TYPES = new Set([TEXTURE_INFO, ROOT]);
function listNonRootProperties(document) {
    const visited = new Set();
    for (const edge of document.getGraph().listEdges()) {
        visited.add(edge.getChild());
    }
    return Array.from(visited);
}
function mergeDocuments(target, source, resolve) {
    resolve ||= createDefaultPropertyResolver(target, source);
    for (const sourceExtension of source.getRoot().listExtensionsUsed()) {
        const targetExtension = target.createExtension(sourceExtension.constructor);
        if (sourceExtension.isRequired())
            targetExtension.setRequired(true);
    }
    // Root properties (name, asset, default scene, extras) are not overwritten.
    return _copyToDocument(target, source, listNonRootProperties(source), resolve);
}
exports.mergeDocuments = mergeDocuments;
function copyToDocument(target, source, sourceProperties, resolve) {
    const sourcePropertyDependencies = new Set();
    for (const property of sourceProperties) {
        if (NO_TRANSFER_TYPES.has(property.propertyType)) {
            throw new Error(`Type "${property.propertyType}" cannot be transferred.`);
        }
        listPropertyDependencies(property, sourcePropertyDependencies);
    }
    return _copyToDocument(target, source, Array.from(sourcePropertyDependencies), resolve);
}
exports.copyToDocument = copyToDocument;
function _copyToDocument(target, source, sourceProperties, resolve) {
    resolve ||= createDefaultPropertyResolver(target, source);
    // Create stub classes for every Property in other Document.
    const propertyMap = new Map();
    for (const sourceProp of sourceProperties) {
        // TextureInfo copy handled by Material or ExtensionProperty.
        if (!propertyMap.has(sourceProp) &&
            sourceProp.propertyType !== TEXTURE_INFO) {
            propertyMap.set(sourceProp, resolve(sourceProp));
        }
    }
    // Assemble relationships between Properties.
    for (const [sourceProp, targetProp] of propertyMap.entries()) {
        targetProp.copy(sourceProp, resolve);
    }
    return propertyMap;
}
function createDefaultPropertyResolver(target, source) {
    const propertyMap = new Map([
        [source.getRoot(), target.getRoot()],
    ]);
    return (sourceProp) => {
        // TextureInfo lifecycle is bound to a Material or ExtensionProperty.
        if (sourceProp.propertyType === TEXTURE_INFO)
            return sourceProp;
        let targetProp = propertyMap.get(sourceProp);
        if (!targetProp) {
            // Create stub class, defer copying properties.
            const PropertyClass = sourceProp.constructor;
            targetProp = new PropertyClass(target.getGraph());
            propertyMap.set(sourceProp, targetProp);
        }
        return targetProp;
    };
}
function listPropertyDependencies(parent, visited) {
    const graph = parent.getGraph();
    const queue = [parent];
    let next = undefined;
    while ((next = queue.pop())) {
        visited.add(next);
        for (const child of graph.listChildren(next)) {
            if (!visited.has(child)) {
                queue.push(child);
            }
        }
    }
    return visited;
}
//# sourceMappingURL=StructuralMetadataMergeUtilities.js.map