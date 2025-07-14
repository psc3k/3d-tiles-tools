import { Transform } from "@gltf-transform/core";
import { KtxEtc1sOptions } from "../../ktx";
import { KtxUastcOptions } from "../../ktx";
/**
 * Methods to process textures in glTF assets (specifically,
 * glTF assets that are given as a glTF-Transform `Document`)
 *
 * @internal
 */
export declare class GltfTransformTextures {
    /**
     * Creates a glTF-Transform `Transform` that encodes all textures
     * in a given glTF asset to KTX.
     *
     * Some details about the behavior are intentionally not specified here.
     *
     * @param etc1sOptions - The options for ETC1S compression
     * @param uastcOptions - The options for UASTC compression
     * @returns The transform
     */
    static createTransformTexturesToKtx(etc1sOptions: KtxEtc1sOptions, uastcOptions: KtxUastcOptions): Transform;
    /**
     * Encodes all textures in the given document to KTX.
     *
     * Some details about the behavior are intentionally not specified here.
     *
     * @param document - The document
     * @param etc1sOptions - The options for ETC1S compression
     * @param uastcOptions - The options for UASTC compression
     */
    private static encodeTexturesToKtx;
    /**
     * Encodes the given texture to KTX.
     *
     * If the input texture already has the `image/ktx2` MIME type,
     * or does not contain valid PNG or JPG image data, then `false`
     * is returned.
     *
     * Otherwise, this will encode the texture to KTX and return `true`.
     *
     * (This includes updating the MIME type and the file extension of
     * the URI)
     *
     * By default, normal/occlusion/metallicRoughness textures will be
     * encoded to UASTC, and all other textures to ETC1S.
     *
     * @param texture - The texture
     * @param etc1sOptions - The options for ETC1S compression
     * @param uastcOptions - The options for UASTC compression
     * @returns Whether the texture was encoded
     */
    private static encodeTextureToKtx;
    /**
     * Returns whether UASTC compression should be used for the
     * given texture.
     *
     * The `KHR_texture_basisu` specification carries an implementation note:
     *
     * "As a general rule, textures with color data should use ETC1S while
     * textures with non-color data (such as roughness-metallic or
     * normal maps) should use UASTC.""
     *
     * Based on this, this method returns `true` iff one of the "slots"
     * that the texture is associated with is `normalTexture`,
     * `occlusionTexture`, or `metallicRoughnessTexture`.
     *
     * @param texture - The texture
     * @returns Whether UASTC should be used for the texture
     */
    private static useUastc;
    /**
     * Returns whether any of the given elements is included in
     * the given array.
     *
     * @param included - The iterable over the elements to check
     * @param including - The array that may include one of the elements
     * @returns Whether the array includes one of the elements
     */
    private static includesAny;
}
//# sourceMappingURL=GltfTransformTextures.d.ts.map