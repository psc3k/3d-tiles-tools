"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const base_1 = require("../../../src/base");
const tools_1 = require("../../../src/tools");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const sourceDir = SPECS_DATA_BASE_DIRECTORY + "/updateAlignment";
const targetDir = SPECS_DATA_BASE_DIRECTORY + "/updateAlignment/output";
const goldenDir = SPECS_DATA_BASE_DIRECTORY + "/updateAlignment/golden";
function updateAlignmentForSpec(fileName) {
    const sourceFileName = sourceDir + "/" + fileName;
    const targetFileName = targetDir + "/" + fileName;
    const goldenFileName = goldenDir + "/" + fileName;
    const sourceData = fs_1.default.readFileSync(sourceFileName);
    const targetData = tools_1.ContentOps.updateAlignment(sourceData);
    base_1.Paths.ensureDirectoryExists(targetDir);
    fs_1.default.writeFileSync(targetFileName, targetData);
    const goldenData = fs_1.default.readFileSync(goldenFileName);
    const passed = targetData.equals(goldenData);
    return passed;
}
describe("ContentOps", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(targetDir);
    });
    it("updateAlignment updates the alignment of a B3DM file", async function () {
        const fileName = "batchedColors.b3dm";
        const passed = updateAlignmentForSpec(fileName);
        expect(passed).toBe(true);
    });
    it("updateAlignment updates the alignment of an I3DM file", async function () {
        const fileName = "instancedScale.i3dm";
        const passed = updateAlignmentForSpec(fileName);
        expect(passed).toBe(true);
    });
    it("updateAlignment updates the alignment of a PNTS file", async function () {
        const fileName = "pointCloudRGB.pnts";
        const passed = updateAlignmentForSpec(fileName);
        expect(passed).toBe(true);
    });
    it("updateAlignment updates the alignment of a CMPT file", async function () {
        const fileName = "testComposite.cmpt";
        const passed = updateAlignmentForSpec(fileName);
        expect(passed).toBe(true);
    });
});
//# sourceMappingURL=UpdateAlignmentSpec.js.map