"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const tools_1 = require("../../../src/tools");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
describe("GltfTransform::getIO", function () {
    it("can read a GLB without compression", async function () {
        const glb = fs_1.default.readFileSync(SPECS_DATA_BASE_DIRECTORY + "/gltf/Box.glb");
        const io = await tools_1.GltfTransform.getIO();
        const document = await io.readBinary(glb);
        expect(document).toBeDefined();
    });
    it("can read a GLB with Draco compression", async function () {
        const glb = fs_1.default.readFileSync(SPECS_DATA_BASE_DIRECTORY + "/gltf/BoxDraco.glb");
        const io = await tools_1.GltfTransform.getIO();
        const document = await io.readBinary(glb);
        expect(document).toBeDefined();
    });
    it("can read a GLB with meshopt compression", async function () {
        const glb = fs_1.default.readFileSync(SPECS_DATA_BASE_DIRECTORY + "/gltf/BoxMeshopt.glb");
        const io = await tools_1.GltfTransform.getIO();
        const document = await io.readBinary(glb);
        expect(document).toBeDefined();
    });
});
//# sourceMappingURL=GltfTransformSpec.js.map