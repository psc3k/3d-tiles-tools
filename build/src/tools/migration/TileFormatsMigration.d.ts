/// <reference types="node" />
/// <reference types="node" />
import { Document } from "@gltf-transform/core";
/**
 * Methods for converting "legacy" tile formats into glTF assets
 * that use metadata extensions to represent the information from
 * the legacy formats.
 *
 * @internal
 */
export declare class TileFormatsMigration {
    static readonly DEBUG_LOG_FILE_CONTENT = false;
    /**
     * Convert the given PNTS data into a glTF asset
     *
     * @param pntsBuffer - The PNTS buffer
     * @returns The GLB buffer
     */
    static convertPntsToGlb(pntsBuffer: Buffer): Promise<Buffer>;
    /**
     * Convert the given B3DM data into a glTF asset
     *
     * @param b3dmBuffer - The B3DM buffer
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given B3DM, defaulting to "Y".
     * @returns The GLB buffer
     */
    static convertB3dmToGlb(b3dmBuffer: Buffer, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
    /**
     * Convert the given I3DM data into a glTF asset
     *
     * @param i3dmBuffer - The I3DM buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the I3DM uses `header.gltfFormat=0`
     * (meaning that the payload is not GLB data, but only a GLB URI).
     * @param gltfUpAxis - The up-axis to assume for the glTF data in
     * the given I3DM, defaulting to "Y".
     * @returns The GLB buffer
     */
    static convertI3dmToGlb(i3dmBuffer: Buffer, externalResourceResolver: (uri: string) => Promise<Buffer | undefined>, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
    /**
     * Convert the given CMPT data into a single glTF asset
     *
     * @param cmptBuffer - The CMPT buffer
     * @param externalResourceResolver - A function that will be used to resolve
     * external resources, like GLB data if the CMPT contains I3DM that use
     * `header.gltfFormat=0` (meaning that the payload is not GLB data,
     * but only a GLB URI).
     * @param gltfUpAxis - The glTF up-axis, defaulting to "Y"
     * @returns The GLB buffer
     */
    static convertCmptToGlb(cmptBuffer: Buffer, externalResourceResolver: (uri: string) => Promise<Buffer | undefined>, gltfUpAxis: "X" | "Y" | "Z" | undefined): Promise<Buffer>;
    /**
     * Apply the transform for the given glTF up-axis to the given document.
     *
     * When the input glTF document was part of a (pre-1.0) legacy tileset,
     * then this tileset may have specified an `asset.gltfUpAxis` that could
     * be `X`, `Y`, or `Z`, denoting the up-axis to assume for the glTF.
     * (With glTF 2.0, the up-axis became specified as "Y").
     *
     * If the given glTF up axis is not ("Y" or undefined), then this
     * will insert a root node into the given glTF that matches the
     * transform that was applied by clients to handle the `gltfUpAxis`.
     *
     * @param document - The document
     * @param gltfUpAxis - The glTF up axis, defaulting to "Y"
     */
    static applyGltfUpAxis(document: Document, gltfUpAxis: "X" | "Y" | "Z" | undefined): void;
    /**
     * Apply the given RTC_CENTER to the given glTF-Transform document,
     * by inserting a new root node that carries the given RTC_CENTER
     * as its translation, taking into account the y-up-vs-z-up
     * transform.
     *
     * @param document - The glTF-Transform document
     * @param rtcCenter - The RTC_CENTER
     */
    static applyRtcCenter(document: Document, rtcCenter: number[]): void;
    /**
     * Apply the given translation to the given glTF-Transform document,
     * by inserting a new root node that carries the given translation
     *
     * @param document - The glTF-Transform document
     * @param rtcCenter - The RTC_CENTER
     */
    private static applyTranslation;
    /**
     * Apply the given transform to a new root in the given glTF-Transform
     * document.
     *
     * The given transform is assumed to be a 16-element array that
     * describes the 4x4 transform matrix, in column major order.
     *
     * @param document - The glTF-Transform document
     * @param transform - The transform
     */
    static applyTransform(document: Document, transform: number[]): void;
    /**
     * Make sure that each scene in the given document has a single
     * root node. If there is a scene that contains multiple nodes
     * directly, then remove these nodes and insert a new root
     * that has the former scene nodes as its children.
     *
     * @param document - The glTF-Transform document
     */
    static makeSingleRoot(document: Document): void;
}
//# sourceMappingURL=TileFormatsMigration.d.ts.map