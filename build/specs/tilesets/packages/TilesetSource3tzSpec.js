"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tilesets_1 = require("../../../src/tilesets");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
describe("TilesetSource3tz", function () {
    it("works with a valid package", async function () {
        const tilesetSource = new tilesets_1.TilesetSource3tz();
        await tilesetSource.open(SPECS_DATA_BASE_DIRECTORY + "/packages/valid.3tz");
        await tilesetSource.close();
    });
    it("works with a valid package", async function () {
        const tilesetSource = new tilesets_1.TilesetSource3tz();
        await tilesetSource.open(SPECS_DATA_BASE_DIRECTORY + "/packages/validSmall.3tz");
        await tilesetSource.close();
    });
    it("works with a valid package that has extra bytes in ZIP headers", async function () {
        const tilesetSource = new tilesets_1.TilesetSource3tz();
        await tilesetSource.open(SPECS_DATA_BASE_DIRECTORY +
            "/packages/validWith64byteExtrasInZipFileHeader.3tz");
        await tilesetSource.close();
    });
});
//# sourceMappingURL=TilesetSource3tzSpec.js.map