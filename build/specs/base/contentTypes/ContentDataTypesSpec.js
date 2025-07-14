"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../src/base");
const base_2 = require("../../../src/base");
const base_3 = require("../../../src/base");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
describe("ContentDataTypeRegistry.findContentDataType", function () {
    it("detects GLB", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.glb";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_GLB);
    });
    it("detects B3DM", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.b3dm";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_B3DM);
    });
    it("detects I3DM", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.i3dm";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_I3DM);
    });
    it("detects CMPT", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.cmpt";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_CMPT);
    });
    it("detects PNTS", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.pnts";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_PNTS);
    });
    it("detects GEOM", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.geom";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_GEOM);
    });
    it("detects VCTR", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.vctr";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_VCTR);
    });
    it("detects SUBT", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.subtree";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_SUBT);
    });
    it("detects PNG", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.png";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_PNG);
    });
    it("detects JPEG", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.jpg";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_JPEG);
    });
    it("detects GIF", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.gif";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_GIF);
    });
    it("detects GEOJSON", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.geojson";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_GEOJSON);
    });
    it("detects 3TZ", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.3tz";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_3TZ);
    });
    it("detects glTF", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.gltf";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_GLTF);
    });
    it("detects tileset", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.json";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toEqual(base_1.ContentDataTypes.CONTENT_TYPE_TILESET);
    });
    it("returns undefined for unknown content types", async function () {
        const contentUri = SPECS_DATA_BASE_DIRECTORY + "/contentTypes/content.txt";
        const c = base_2.BufferedContentData.create(contentUri);
        const type = await base_3.ContentDataTypeRegistry.findContentDataType(c);
        expect(type).toBeUndefined();
    });
});
//# sourceMappingURL=ContentDataTypesSpec.js.map