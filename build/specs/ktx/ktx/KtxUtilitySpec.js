"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ktx_1 = require("../../../src/ktx");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const sourceDir = SPECS_DATA_BASE_DIRECTORY + "/images";
const targetDir = SPECS_DATA_BASE_DIRECTORY + "/KtxUtility/output";
const goldenDir = SPECS_DATA_BASE_DIRECTORY + "/KtxUtility/golden";
describe("KtxUtility", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(targetDir);
    });
    it("creates a KTX2 image with ETC1S compression", async function () {
        const sourceFileName = sourceDir + "/CesiumLogo.png";
        const targetFileName = targetDir + "/CesiumLogoEtc1s.ktx2";
        const goldenFileName = goldenDir + "/CesiumLogoEtc1s.ktx2";
        const options = {
            uastc: false,
            compressionLevel: 2,
            qualityLevel: 128,
            transferFunction: "SRGB",
        };
        //KtxUtility.setLogCallback((value: any) => console.log(value));
        await ktx_1.KtxUtility.convertImageFile(sourceFileName, targetFileName, options);
        const targetData = fs_1.default.readFileSync(targetFileName);
        const goldenData = fs_1.default.readFileSync(goldenFileName);
        const passed = targetData.equals(goldenData);
        expect(passed).toBe(true);
    });
    it("creates a KTX2 image with UASTC compression", async function () {
        const sourceFileName = sourceDir + "/CesiumLogo.png";
        const targetFileName = targetDir + "/CesiumLogoUastc.ktx2";
        const goldenFileName = goldenDir + "/CesiumLogoUastc.ktx2";
        const options = {
            uastc: true,
            level: 2,
            rdo_l: 1.75,
            rdo_d: 8192,
            zstd: 1,
            transferFunction: "SRGB",
        };
        //KtxUtility.setLogCallback((value: any) => console.log(value));
        await ktx_1.KtxUtility.convertImageFile(sourceFileName, targetFileName, options);
        const targetData = fs_1.default.readFileSync(targetFileName);
        const goldenData = fs_1.default.readFileSync(goldenFileName);
        const passed = targetData.equals(goldenData);
        expect(passed).toBe(true);
    });
});
//# sourceMappingURL=KtxUtilitySpec.js.map