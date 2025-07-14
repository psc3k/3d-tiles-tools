/// <reference types="node" />
/// <reference types="node" />
import { KtxOptions } from "./KtxOptions";
/**
 * Utility class for converting images into KTX2 format.
 *
 * @internal
 */
export declare class KtxUtility {
    /**
     * An optional callback that will receive log messages
     */
    private static logCallback;
    /**
     * Set the optional callback that will receive log messages containing
     * information about the encoded image and encoding options.
     *
     * @param logCallback - The log callback
     */
    static setLogCallback(logCallback: ((value: any) => void) | undefined): void;
    /**
     * Apply KTX compression to the specified input file, and write
     * the result to the specified output file.
     *
     * The exact set of input formats that are supported is not
     * specified, but they include JPG and PNG.
     *
     * @param inputFileName - The input file name
     * @param outputFileName - The output file name
     * @param options - The options for the KTX compression
     * @throws KtxError If the input data could not be read or
     * encoded to KTX
     */
    static convertImageFile(inputFileName: string, outputFileName: string, options: KtxOptions | undefined): Promise<void>;
    /**
     * Apply KTX compression to the given input image data, and return
     * the result as a buffer.
     *
     * The exact set of input formats that are supported is not
     * specified, but they include JPG and PNG.
     *
     * @param inputImageData - The input file name
     * @param options - The options for the KTX compression
     * @returns The KTX compressed data
     * @throws KtxError If the input data could not be read or
     * encoded to KTX
     */
    static convertImageData(inputImageData: Buffer, options: KtxOptions | undefined): Promise<Buffer>;
    /**
     * Encode the given RGBA pixels with KTX, and reuturn the
     * result as a buffer.
     *
     * @param imageWidth - The image width
     * @param imageHeight - The image height
     * @param rgbaPixels - The pixels
     * @param options - The options for the KTX compression
     * @returns The KTX data
     * @throws KtxError If the input data could not be
     * encoded to KTX
     */
    private static encodeImageData;
    /**
     * Apply the given options to the given encoder.
     *
     * Depending on whether `options.uastc` is true, this will
     * delegate to `applyUastcOptions` or `applyEtc1sOptions`
     *
     * @param basisEncoder - The `BasisEncoder`
     * @param options - The options
     */
    private static applyOptions;
    /**
     * Apply the given UASTC compression options to the given encoder.
     *
     * @param basisEncoder - The `BasisEncoder`
     * @param options - The options
     */
    private static applyUastcOptions;
    /**
     * Apply the given ETC1S compression options to the given encoder.
     *
     * @param basisEncoder - The `BasisEncoder`
     * @param options - The options
     */
    private static applyEtc1sOptions;
}
//# sourceMappingURL=KtxUtility.d.ts.map