export interface Obb {
    center: Float64Array;
    halfSize: Float32Array;
    quaternion: Float32Array;
}
export interface Attribute {
    /** Data uses the data type of the vertex attribute */
    data: number[] | Float64Array | Float32Array;
    /** Components per vertex */
    size: number;
    /** Index into data array i.e. not a byte offset  */
    offsetIdx: number;
    /** Stride across data array i.e. not a byte stride */
    strideIdx: number;
}
export declare function computeOBB(positions: Attribute, obb: Obb): void;
//# sourceMappingURL=dito.d.ts.map