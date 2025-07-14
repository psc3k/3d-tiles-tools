"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DracoDecoder = void 0;
const draco3d_1 = __importDefault(require("draco3d"));
const base_1 = require("../../base");
const DracoError_1 = require("./DracoError");
const ComponentDataType_1 = require("./ComponentDataType");
/**
 * A thin wrapper around Draco, tailored for decompressing
 * point cloud data.
 *
 * @internal
 */
class DracoDecoder {
    // Implementation note: This was largely ported from CesiumJS
    // 'decodeDraco.js'. The current version of "@types/draco3d"
    // is "1.4.2", which does not match the IDL of the current
    // version of "draco3d", which is "1.5.6". Therefore, there
    // are some `as any` and casts in this implementation.
    /**
     * Creates a new instance of a `DracoDecoder`
     *
     * @returns The promise to the instance
     */
    static async create() {
        const decoderModule = await draco3d_1.default.createDecoderModule({});
        return new DracoDecoder(decoderModule);
    }
    /**
     * Private constructor. Instantiation via `create` method.
     *
     * @param decoderModule - The decoder module
     */
    constructor(decoderModule) {
        this.decoderModule = decoderModule;
    }
    /**
     * Decodes the given attributes from the given draco-encoded buffer.
     *
     * The given buffer is assumed to contain Draco POINT_CLOUD data, with
     * the attribute data for the attributes in the given dictionary.
     *
     * @param properties - The mapping from property names (like
     * `POSITION`) to IDs
     * @param binary - The binary data to to decode from
     * @returns The decoded data for each attribute, and information
     * about its structure
     * @throws DracoError If the data could not be decoded
     */
    decodePointCloud(properties, binary) {
        const draco = this.decoderModule;
        const dracoDecoder = new draco.Decoder();
        const buffer = new draco.DecoderBuffer();
        const array = binary;
        buffer.Init(array, array.length);
        const geometryType = dracoDecoder.GetEncodedGeometryType(buffer);
        if (geometryType !== draco.POINT_CLOUD) {
            throw new DracoError_1.DracoError("Draco geometry type must be POINT_CLOUD.");
        }
        const dracoPointCloud = new draco.Mesh();
        const decodingStatus = dracoDecoder.DecodeBufferToPointCloud(buffer, dracoPointCloud);
        if (!decodingStatus.ok()) {
            throw new DracoError_1.DracoError(`Error decoding draco point cloud: ${decodingStatus.error_msg()}`);
        }
        draco.destroy(buffer);
        const result = {};
        const propertyNames = Object.keys(properties);
        for (const propertyName of propertyNames) {
            let dracoAttribute;
            if (propertyName === "POSITION" || propertyName === "NORMAL") {
                const dracoAttributeId = dracoDecoder.GetAttributeId(dracoPointCloud, draco[propertyName]);
                dracoAttribute = dracoDecoder.GetAttribute(dracoPointCloud, dracoAttributeId);
            }
            else {
                const attributeId = properties[propertyName];
                dracoAttribute = dracoDecoder.GetAttributeByUniqueId(dracoPointCloud, attributeId);
            }
            result[propertyName] = this.decodeAttribute(dracoPointCloud, dracoDecoder, dracoAttribute);
        }
        draco.destroy(dracoPointCloud);
        draco.destroy(dracoDecoder);
        return result;
    }
    decodeQuantizedDracoTypedArray(dracoMesh, dracoDecoder, dracoAttribute, quantizationBits, vertexArrayLength) {
        const draco = this.decoderModule;
        let vertexArray;
        let attributeData;
        if (quantizationBits <= 8) {
            attributeData = new draco.DracoUInt8Array();
            vertexArray = new Uint8Array(vertexArrayLength);
            dracoDecoder.GetAttributeUInt8ForAllPoints(dracoMesh, dracoAttribute, attributeData);
        }
        else if (quantizationBits <= 16) {
            attributeData = new draco.DracoUInt16Array();
            vertexArray = new Uint16Array(vertexArrayLength);
            dracoDecoder.GetAttributeUInt16ForAllPoints(dracoMesh, dracoAttribute, attributeData);
        }
        else {
            attributeData = new draco.DracoFloat32Array();
            vertexArray = new Float32Array(vertexArrayLength);
            dracoDecoder.GetAttributeFloatForAllPoints(dracoMesh, dracoAttribute, attributeData);
        }
        for (let i = 0; i < vertexArrayLength; ++i) {
            vertexArray[i] = attributeData.GetValue(i);
        }
        draco.destroy(attributeData);
        return vertexArray;
    }
    decodeDracoTypedArray(dracoMesh, dracoDecoder, dracoAttribute, vertexArrayLength) {
        const draco = this.decoderModule;
        let vertexArray;
        let attributeData;
        // Some attribute types are casted down to 32 bit since Draco only returns 32 bit values
        const dataType = dracoAttribute.data_type();
        switch (dataType) {
            case 1:
            case 11: // DT_INT8 or DT_BOOL
                attributeData = new draco.DracoInt8Array();
                vertexArray = new Int8Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt8ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 2: // DT_UINT8
                attributeData = new draco.DracoUInt8Array();
                vertexArray = new Uint8Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt8ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 3: // DT_INT16
                attributeData = new draco.DracoInt16Array();
                vertexArray = new Int16Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt16ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 4: // DT_UINT16
                attributeData = new draco.DracoUInt16Array();
                vertexArray = new Uint16Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt16ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 5:
            case 7: // DT_INT32 or DT_INT64
                attributeData = new draco.DracoInt32Array();
                vertexArray = new Int32Array(vertexArrayLength);
                dracoDecoder.GetAttributeInt32ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 6:
            case 8: // DT_UINT32 or DT_UINT64
                attributeData = new draco.DracoUInt32Array();
                vertexArray = new Uint32Array(vertexArrayLength);
                dracoDecoder.GetAttributeUInt32ForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            case 9:
            case 10: // DT_FLOAT32 or DT_FLOAT64
                attributeData = new draco.DracoFloat32Array();
                vertexArray = new Float32Array(vertexArrayLength);
                dracoDecoder.GetAttributeFloatForAllPoints(dracoMesh, dracoAttribute, attributeData);
                break;
            default:
                throw new DracoError_1.DracoError(`Invalid attribute data type ${dataType}`);
        }
        for (let i = 0; i < vertexArrayLength; ++i) {
            vertexArray[i] = attributeData.GetValue(i);
        }
        draco.destroy(attributeData);
        return vertexArray;
    }
    decodeAttribute(dracoMesh, dracoDecoder, dracoAttribute) {
        const draco = this.decoderModule;
        const numPoints = dracoMesh.num_points();
        const numComponents = dracoAttribute.num_components();
        let quantization = undefined;
        const qTransform = new draco.AttributeQuantizationTransform();
        if (qTransform.InitFromAttribute(dracoAttribute)) {
            const minValues = Array(numComponents);
            for (let i = 0; i < numComponents; ++i) {
                minValues[i] = qTransform.min_value(i);
            }
            quantization = {
                quantizationBits: qTransform.quantization_bits(),
                minValues: minValues,
                range: qTransform.range(),
                octEncoded: false,
            };
        }
        draco.destroy(qTransform);
        const oTransform = new draco.AttributeOctahedronTransform();
        if (oTransform.InitFromAttribute(dracoAttribute)) {
            quantization = {
                quantizationBits: oTransform.quantization_bits(),
                octEncoded: true,
            };
        }
        draco.destroy(oTransform);
        const vertexArrayLength = numPoints * numComponents;
        let vertexArray;
        if (quantization) {
            vertexArray = this.decodeQuantizedDracoTypedArray(dracoMesh, dracoDecoder, dracoAttribute, quantization.quantizationBits, vertexArrayLength);
        }
        else {
            vertexArray = this.decodeDracoTypedArray(dracoMesh, dracoDecoder, dracoAttribute, vertexArrayLength);
        }
        const componentDatatype = ComponentDataType_1.ComponentDatatype.fromTypedArray(vertexArray);
        const attributeInfo = {
            componentsPerAttribute: numComponents,
            componentDatatype: ComponentDataType_1.ComponentDatatype.toString(componentDatatype),
            byteOffset: dracoAttribute.byte_offset(),
            byteStride: ComponentDataType_1.ComponentDatatype.getSizeInBytes(componentDatatype) * numComponents,
            normalized: dracoAttribute.normalized(),
            quantization: quantization,
        };
        return {
            attributeData: base_1.Buffers.fromTypedArray(vertexArray),
            attributeInfo: attributeInfo,
        };
    }
}
exports.DracoDecoder = DracoDecoder;
//# sourceMappingURL=DracoDecoder.js.map