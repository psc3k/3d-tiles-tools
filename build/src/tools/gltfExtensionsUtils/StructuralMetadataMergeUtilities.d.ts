import { Document } from "@gltf-transform/core";
import { Property } from "@gltf-transform/core";
import { PropertyResolver } from "@gltf-transform/core/dist/properties";
export declare function mergeDocuments(target: Document, source: Document, resolve?: PropertyResolver<Property>): Map<Property, Property>;
export declare function copyToDocument(target: Document, source: Document, sourceProperties: Property[], resolve?: PropertyResolver<Property>): Map<Property, Property>;
//# sourceMappingURL=StructuralMetadataMergeUtilities.d.ts.map