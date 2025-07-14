"use strict";
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeOBB = void 0;
const epsilon = 0.000001;
const alMid = [0, 0, 0];
const alLen = [0, 0, 0];
// Derived from the C++ sample implementation of http://www.idt.mdh.se/~tla/publ/FastOBBs.pdf
function computeOBB(positions, obb) {
    const { data, strideIdx } = positions;
    const count = data.length / strideIdx;
    if (count <= 0) {
        return;
    }
    // Select seven extremal points along predefined slab directions
    const extremals = new ExtremalPoints(positions);
    // Compute size of AABB (max and min projections of vertices are already
    // computed as slabs 0-2)
    v3add(alMid, extremals.minProj, extremals.maxProj);
    v3scale(alMid, alMid, 0.5);
    v3subtract(alLen, extremals.maxProj, extremals.minProj);
    const alVal = _getQualityValue(alLen);
    const best = new Orientation();
    best.quality = alVal;
    if (count < 14) {
        positions = {
            data: new Float64Array(extremals.buffer, 14 * 8, 14 * 3),
            size: 3,
            offsetIdx: 0,
            strideIdx: 3,
        };
    }
    // Find best OBB axes based on the constructed base triangle
    const p0 = [0, 0, 0]; // Vertices of the large base triangle
    const p1 = [0, 0, 0]; // Vertices of the large base triangle
    const p2 = [0, 0, 0]; // Vertices of the large base triangle
    const e0 = [0, 0, 0]; // Edge vectors of the large base triangle
    const e1 = [0, 0, 0]; // Edge vectors of the large base triangle
    const e2 = [0, 0, 0]; // Edge vectors of the large base triangle
    const n = [0, 0, 0]; // Unit normal of the large base triangle
    switch (_findBestObbAxesFromBaseTriangle(extremals, positions, n, p0, p1, p2, e0, e1, e2, best, obb)) {
        case 1:
            _finalizeAxisAlignedOBB(alMid, alLen, obb);
            return;
        case 2:
            _finalizeLineAlignedOBB(positions, e0, obb);
            return;
    }
    // Find improved OBB axes based on constructed di-tetrahedral shape raised from base triangle
    _findImprovedObbAxesFromUpperAndLowerTetrasOfBaseTriangle(positions, n, p0, p1, p2, e0, e1, e2, best, obb);
    // compute the true obb dimensions by iterating over all vertices
    _computeObbDimensions(positions, best.b0, best.b1, best.b2, bMin, bMax);
    const bLen = [0, 0, 0];
    v3subtract(bLen, bMax, bMin);
    best.quality = _getQualityValue(bLen);
    // Check if the OBB extent is still smaller than the intial AABB
    if (best.quality < alVal) {
        _finalizeOBB(best.b0, best.b1, best.b2, bMin, bMax, bLen, obb); // if so, assign all OBB params
    }
    else {
        _finalizeAxisAlignedOBB(alMid, alLen, obb); // otherwise, assign all OBB params using the intial AABB
    }
}
exports.computeOBB = computeOBB;
function _findBestObbAxesFromBaseTriangle(extremals, positions, n, p0, p1, p2, e0, e1, e2, best, obb) {
    _findFurthestPointPair(extremals, p0, p1);
    // Degenerate case 1:
    // If the furthest points are very close, return OBB aligned with the initial AABB
    if (v3squaredDistance(p0, p1) < epsilon) {
        return 1;
    }
    // Compute edge vector of the line segment p0, p1
    v3subtract(e0, p0, p1);
    v3normalize(e0, e0);
    // Find a third point furthest away from line given by p0, e0 to define the large base triangle
    const dist2 = _findFurthestPointFromInfiniteEdge(positions, p0, e0, p2);
    // Degenerate case 2:
    // If the third point is located very close to the line, return an OBB aligned with the line
    if (dist2 < epsilon) {
        return 2;
    }
    // Compute the two remaining edge vectors and the normal vector of the base triangle
    v3subtract(e1, p1, p2);
    v3normalize(e1, e1);
    v3subtract(e2, p2, p0);
    v3normalize(e2, e2);
    v3cross(n, e1, e0);
    v3normalize(n, n);
    _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n, e0, e1, e2, best);
    return 0; // success
}
const q0 = [0, 0, 0];
const q1 = [0, 0, 0];
const f0 = [0, 0, 0]; // Edge vectors towards q0/1
const f1 = [0, 0, 0]; // Edge vectors towards q0/1
const f2 = [0, 0, 0]; // Edge vectors towards q0/1
const n0 = [0, 0, 0]; // Unit normals of tetra tris
const n1 = [0, 0, 0]; // Unit normals of tetra tris
const n2 = [0, 0, 0]; // Unit normals of tetra tris
function _findImprovedObbAxesFromUpperAndLowerTetrasOfBaseTriangle(positions, n, p0, p1, p2, e0, e1, e2, best, obb) {
    // Find furthest points above and below the plane of the base triangle for tetra constructions
    _findUpperLowerTetraPoints(positions, n, p0, p1, p2, q0, q1);
    // For each valid point found, search for the best OBB axes based on the 3 arising triangles
    if (q0[0] !== undefined) {
        v3subtract(f0, q0, p0);
        v3normalize(f0, f0);
        v3subtract(f1, q0, p1);
        v3normalize(f1, f1);
        v3subtract(f2, q0, p2);
        v3normalize(f2, f2);
        v3cross(n0, f1, e0);
        v3normalize(n0, n0);
        v3cross(n1, f2, e1);
        v3normalize(n1, n1);
        v3cross(n2, f0, e2);
        v3normalize(n2, n2);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n0, e0, f1, f0, best);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n1, e1, f2, f1, best);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n2, e2, f0, f2, best);
    }
    if (q1[0] !== undefined) {
        v3subtract(f0, q1, p0);
        v3normalize(f0, f0);
        v3subtract(f1, q1, p1);
        v3normalize(f1, f1);
        v3subtract(f2, q1, p2);
        v3normalize(f2, f2);
        v3cross(n0, f1, e0);
        v3normalize(n0, n0);
        v3cross(n1, f2, e1);
        v3normalize(n1, n1);
        v3cross(n2, f0, e2);
        v3normalize(n2, n2);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n0, e0, f1, f0, best);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n1, e1, f2, f1, best);
        _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n2, e2, f0, f2, best);
    }
}
function _findFurthestPointPair(extremals, p0, p1) {
    let maxDist2 = v3squaredDistance(extremals.maxVert[0], extremals.minVert[0]);
    let index = 0;
    for (let i = 1; i < 7; ++i) {
        const dist2 = v3squaredDistance(extremals.maxVert[i], extremals.minVert[i]);
        if (dist2 > maxDist2) {
            maxDist2 = dist2;
            index = i;
        }
    }
    v3copy(p0, extremals.minVert[index]);
    v3copy(p1, extremals.maxVert[index]);
}
const u0 = [0, 0, 0];
function _findFurthestPointFromInfiniteEdge(positions, p0, e0, p) {
    const { data, offsetIdx, strideIdx } = positions;
    let maxDist2 = Number.NEGATIVE_INFINITY;
    let maxIndex = 0;
    for (let i = offsetIdx; i < data.length; i += strideIdx) {
        // inlined _dist2PointInfiniteEdge
        u0[0] = data[i] - p0[0];
        u0[1] = data[i + 1] - p0[1];
        u0[2] = data[i + 2] - p0[2];
        const t = e0[0] * u0[0] + e0[1] * u0[1] + e0[2] * u0[2];
        const sqLen_e0 = e0[0] * e0[0] + e0[1] * e0[1] + e0[2] * e0[2];
        const sqLen_u0 = u0[0] * u0[0] + u0[1] * u0[1] + u0[2] * u0[2];
        const dist2 = sqLen_u0 - (t * t) / sqLen_e0;
        if (dist2 > maxDist2) {
            maxDist2 = dist2;
            maxIndex = i;
        }
    }
    v3copy(p, data, maxIndex);
    return maxDist2;
}
const minmax = [0, 0];
function _findUpperLowerTetraPoints(positions, n, p0, p1, p2, q0, q1) {
    _findExtremalPoints_OneDir(positions, n, minmax, q1, q0);
    const triProj = v3dot(p0, n);
    if (minmax[1] - epsilon <= triProj) {
        // NOTE_TYPES: Added 'as any' to avoid type error
        //q0[0] = undefined; // invalidate
        q0[0] = undefined; // invalidate
    }
    if (minmax[0] + epsilon >= triProj) {
        // NOTE_TYPES: Added 'as any' to avoid type error
        //q1[0] = undefined; // invalidate
        q1[0] = undefined; // invalidate
    }
}
const m0 = [0, 0, 0];
const m1 = [0, 0, 0];
const m2 = [0, 0, 0];
const dmax = [0, 0, 0];
const dmin = [0, 0, 0];
const dlen = [0, 0, 0];
function _findBestObbAxesFromTriangleNormalAndEdgeVectors(positions, n, e0, e1, e2, best) {
    if (v3squaredLength(n) < epsilon) {
        return;
    }
    v3cross(m0, e0, n);
    v3cross(m1, e1, n);
    v3cross(m2, e2, n);
    // The operands are assumed to be orthogonal and unit normals
    _findExtremalProjs_OneDir(positions, n, minmax);
    dmin[1] = minmax[0];
    dmax[1] = minmax[1];
    dlen[1] = dmax[1] - dmin[1];
    const edges = [e0, e1, e2];
    const ems = [m0, m1, m2];
    for (let i = 0; i < 3; ++i) {
        _findExtremalProjs_OneDir(positions, edges[i], minmax);
        dmin[0] = minmax[0];
        dmax[0] = minmax[1];
        _findExtremalProjs_OneDir(positions, ems[i], minmax);
        dmin[2] = minmax[0];
        dmax[2] = minmax[1];
        dlen[0] = dmax[0] - dmin[0];
        dlen[2] = dmax[2] - dmin[2];
        const quality = _getQualityValue(dlen);
        if (quality < best.quality) {
            v3copy(best.b0, edges[i]);
            v3copy(best.b1, n);
            v3copy(best.b2, ems[i]);
            best.quality = quality;
        }
    }
}
const point = [0, 0, 0];
function _findExtremalProjs_OneDir(positions, n, minmax) {
    const { data, offsetIdx, strideIdx } = positions;
    minmax[0] = Number.POSITIVE_INFINITY;
    minmax[1] = Number.NEGATIVE_INFINITY;
    for (let i = offsetIdx; i < data.length; i += strideIdx) {
        const proj = data[i] * n[0] + data[i + 1] * n[1] + data[i + 2] * n[2]; // opt: inline dot product
        minmax[0] = Math.min(minmax[0], proj);
        minmax[1] = Math.max(minmax[1], proj);
    }
}
function _findExtremalPoints_OneDir(positions, n, minmax, minVert, maxVert) {
    const { data, offsetIdx, strideIdx } = positions;
    v3copy(minVert, data, offsetIdx);
    v3copy(maxVert, minVert);
    minmax[0] = v3dot(point, n);
    minmax[1] = minmax[0];
    for (let i = offsetIdx + strideIdx; i < data.length; i += strideIdx) {
        const proj = data[i] * n[0] + data[i + 1] * n[1] + data[i + 2] * n[2];
        if (proj < minmax[0]) {
            minmax[0] = proj;
            v3copy(minVert, data, i);
        }
        if (proj > minmax[1]) {
            minmax[1] = proj;
            v3copy(maxVert, data, i);
        }
    }
}
function _finalizeAxisAlignedOBB(mid, len, obb) {
    v3copy(obb.center, mid);
    v3scale(obb.halfSize, len, 0.5);
    obb.quaternion[0] = 0;
    obb.quaternion[1] = 0;
    obb.quaternion[2] = 0;
    obb.quaternion[3] = 1;
}
const r = [0, 0, 0];
const v = [0, 0, 0];
const w = [0, 0, 0];
const bMin = [0, 0, 0];
const bMax = [0, 0, 0];
const bLen = [0, 0, 0];
// This function is only called if the construction of the large base triangle fails
function _finalizeLineAlignedOBB(positions, u, obb) {
    // Given u, build any orthonormal base u, v, w
    // Make sure r is not equal to u
    v3copy(r, u);
    if (Math.abs(u[0]) > Math.abs(u[1]) && Math.abs(u[0]) > Math.abs(u[2])) {
        r[0] = 0;
    }
    else if (Math.abs(u[1]) > Math.abs(u[2])) {
        r[1] = 0;
    }
    else {
        r[2] = 0;
    }
    if (v3squaredLength(r) < epsilon) {
        r[0] = r[1] = r[2] = 1;
    }
    v3cross(v, u, r);
    v3normalize(v, v);
    v3cross(w, u, v);
    v3normalize(w, w);
    // compute the true obb dimensions by iterating over all vertices
    _computeObbDimensions(positions, u, v, w, bMin, bMax);
    v3subtract(bLen, bMax, bMin);
    _finalizeOBB(u, v, w, bMin, bMax, bLen, obb);
}
function _computeObbDimensions(positions, v0, v1, v2, min, max) {
    _findExtremalProjs_OneDir(positions, v0, minmax);
    min[0] = minmax[0];
    max[0] = minmax[1];
    _findExtremalProjs_OneDir(positions, v1, minmax);
    min[1] = minmax[0];
    max[1] = minmax[1];
    _findExtremalProjs_OneDir(positions, v2, minmax);
    min[2] = minmax[0];
    max[2] = minmax[1];
}
const tmp = [0, 0, 0];
const rot = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const q = [0, 0, 0];
function _finalizeOBB(v0, v1, v2, min, max, len, obb) {
    rot[0] = v0[0];
    rot[1] = v0[1];
    rot[2] = v0[2];
    rot[3] = v1[0];
    rot[4] = v1[1];
    rot[5] = v1[2];
    rot[6] = v2[0];
    rot[7] = v2[1];
    rot[8] = v2[2];
    quatFromMat3(obb.quaternion, rot);
    // midpoint expressed in the OBB's own coordinate system
    v3add(q, min, max);
    v3scale(q, q, 0.5);
    // Compute midpoint expressed in the standard base
    v3scale(obb.center, v0, q[0]);
    v3scale(tmp, v1, q[1]);
    v3add(obb.center, obb.center, tmp);
    v3scale(tmp, v2, q[2]);
    v3add(obb.center, obb.center, tmp);
    v3scale(obb.halfSize, len, 0.5);
}
const numPoints = 7;
class ExtremalPoints {
    constructor(positions) {
        this.minVert = new Array(numPoints);
        this.maxVert = new Array(numPoints);
        // setup storage
        const bufferSize = numPoints * (8 + 8 + 24 + 24);
        this.buffer = new ArrayBuffer(bufferSize);
        let offset = 0;
        this.minProj = new Float64Array(this.buffer, offset, numPoints);
        offset += numPoints * 8;
        this.maxProj = new Float64Array(this.buffer, offset, numPoints);
        offset += numPoints * 8;
        for (let i = 0; i < numPoints; ++i) {
            this.minVert[i] = new Float64Array(this.buffer, offset, 3);
            offset += 24;
        }
        for (let i = 0; i < numPoints; ++i) {
            this.maxVert[i] = new Float64Array(this.buffer, offset, 3);
            offset += 24;
        }
        // init storage
        for (let i = 0; i < numPoints; ++i) {
            this.minProj[i] = Number.POSITIVE_INFINITY;
            this.maxProj[i] = Number.NEGATIVE_INFINITY;
        }
        const minIndices = new Array(numPoints);
        const maxIndices = new Array(numPoints);
        const { data, offsetIdx, strideIdx } = positions;
        // find extremal points
        for (let i = offsetIdx; i < data.length; i += strideIdx) {
            // Slab 0: dir {1, 0, 0}
            let proj = data[i];
            if (proj < this.minProj[0]) {
                this.minProj[0] = proj;
                minIndices[0] = i;
            }
            if (proj > this.maxProj[0]) {
                this.maxProj[0] = proj;
                maxIndices[0] = i;
            }
            // Slab 1: dir {0, 1, 0}
            proj = data[i + 1];
            if (proj < this.minProj[1]) {
                this.minProj[1] = proj;
                minIndices[1] = i;
            }
            if (proj > this.maxProj[1]) {
                this.maxProj[1] = proj;
                maxIndices[1] = i;
            }
            // Slab 2: dir {0, 0, 1}
            proj = data[i + 2];
            if (proj < this.minProj[2]) {
                this.minProj[2] = proj;
                minIndices[2] = i;
            }
            if (proj > this.maxProj[2]) {
                this.maxProj[2] = proj;
                maxIndices[2] = i;
            }
            // Slab 3: dir {1, 1, 1}
            proj = data[i] + data[i + 1] + data[i + 2];
            if (proj < this.minProj[3]) {
                this.minProj[3] = proj;
                minIndices[3] = i;
            }
            if (proj > this.maxProj[3]) {
                this.maxProj[3] = proj;
                maxIndices[3] = i;
            }
            // Slab 4: dir {1, 1, -1}
            proj = data[i] + data[i + 1] - data[i + 2];
            if (proj < this.minProj[4]) {
                this.minProj[4] = proj;
                minIndices[4] = i;
            }
            if (proj > this.maxProj[4]) {
                this.maxProj[4] = proj;
                maxIndices[4] = i;
            }
            // Slab 5: dir {1, -1, 1}
            proj = data[i] - data[i + 1] + data[i + 2];
            if (proj < this.minProj[5]) {
                this.minProj[5] = proj;
                minIndices[5] = i;
            }
            if (proj > this.maxProj[5]) {
                this.maxProj[5] = proj;
                maxIndices[5] = i;
            }
            // Slab 6: dir {1, -1, -1}
            proj = data[i] - data[i + 1] - data[i + 2];
            if (proj < this.minProj[6]) {
                this.minProj[6] = proj;
                minIndices[6] = i;
            }
            if (proj > this.maxProj[6]) {
                this.maxProj[6] = proj;
                maxIndices[6] = i;
            }
        }
        for (let i = 0; i < numPoints; ++i) {
            let index = minIndices[i];
            v3copy(this.minVert[i], data, index);
            index = maxIndices[i];
            v3copy(this.maxVert[i], data, index);
        }
        // Note: Normalization of the extremal projection values can be done here.
        // DiTO-14 only needs the extremal vertices, and the extremal projection
        // values for slab 0-2 (to set the initial AABB).
        // Since unit normals are used for slab 0-2, no normalization is needed.
    }
}
class Orientation {
    constructor() {
        this.b0 = [1, 0, 0]; // OBB orientation
        this.b1 = [0, 1, 0]; // OBB orientation
        this.b2 = [0, 0, 1]; // OBB orientation
        this.quality = 0; // evaluation of OBB for orientation
    }
}
function _getQualityValue(len) {
    return len[0] * len[1] + len[0] * len[2] + len[1] * len[2]; // half box area
}
function v3add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
}
function v3subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
}
function v3scale(out, a, scale) {
    out[0] = a[0] * scale;
    out[1] = a[1] * scale;
    out[2] = a[2] * scale;
}
function v3copy(out, a, inOffset = 0) {
    out[0] = a[inOffset + 0];
    out[1] = a[inOffset + 1];
    out[2] = a[inOffset + 2];
}
function v3cross(out, a, b) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
}
function v3normalize(out, a) {
    const len = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    if (len > 0) {
        const invLen = 1 / Math.sqrt(len);
        out[0] = a[0] * invLen;
        out[1] = a[1] * invLen;
        out[2] = a[2] * invLen;
    }
}
function v3squaredLength(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
}
function v3squaredDistance(a, b) {
    const x = b[0] - a[0];
    const y = b[1] - a[1];
    const z = b[2] - a[2];
    return x * x + y * y + z * z;
}
function v3dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}
function quatFromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    const fTrace = m[0] + m[4] + m[8];
    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        let fRoot = Math.sqrt(fTrace + 1.0); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    }
    else {
        // |w| <= 1/2
        let i = 0;
        if (m[4] > m[0]) {
            i = 1;
        }
        if (m[8] > m[i * 3 + i]) {
            i = 2;
        }
        const j = (i + 1) % 3;
        const k = (i + 2) % 3;
        let fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }
}
//# sourceMappingURL=dito.js.map