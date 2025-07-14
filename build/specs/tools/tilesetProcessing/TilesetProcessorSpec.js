"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("../../../src/tools");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
const basicInput = SPECS_DATA_BASE_DIRECTORY + "/tilesetProcessing/basicProcessing";
const basicOutput = SPECS_DATA_BASE_DIRECTORY + "/output/tilesetProcessing/basicProcessing";
const overwrite = true;
/**
 * Tests for the base functionality of the (abstract) TilesetProcessor
 * base class, using one concrete implementation, namely the
 * TilesetDataProcessor
 */
describe("TilesetProcessor", function () {
    afterEach(function () {
        SpecHelpers_1.SpecHelpers.forceDeleteDirectory(SPECS_DATA_BASE_DIRECTORY + "/output/tilesetProcessing");
    });
    it("throws when trying to call 'begin' with invalid path", async function () {
        const tilesetProcessor = new tools_1.TilesetDataProcessor();
        await expectAsync((async function () {
            await tilesetProcessor.begin(basicInput + "_INVALID", basicOutput, overwrite);
        })()
        //^ This () is important to really CALL the anonymous function
        // and return a promise.
        ).toBeRejectedWithError();
    });
    it("throws when trying to call 'begin' twice", async function () {
        const tilesetProcessor = new tools_1.TilesetDataProcessor();
        await tilesetProcessor.begin(basicInput, basicOutput, overwrite);
        await expectAsync((async function () {
            await tilesetProcessor.begin(basicInput, basicOutput, overwrite);
        })()
        //^ This () is important to really CALL the anonymous function
        // and return a promise.
        ).toBeRejectedWithError();
    });
    it("throws when trying to call 'end' without 'begin'", async function () {
        const tilesetProcessor = new tools_1.TilesetDataProcessor();
        await expectAsync((async function () {
            await tilesetProcessor.end();
        })()
        //^ This () is important to really CALL the anonymous function
        // and return a promise.
        ).toBeRejectedWithError();
    });
    it("throws when trying to call 'end' twice", async function () {
        const tilesetProcessor = new tools_1.TilesetDataProcessor();
        await tilesetProcessor.begin(basicInput, basicOutput, overwrite);
        await tilesetProcessor.end();
        await expectAsync((async function () {
            await tilesetProcessor.end();
        })()
        //^ This () is important to really CALL the anonymous function
        // and return a promise.
        ).toBeRejectedWithError();
    });
    it("performs a 'no-op' of just copying the data when when no other functions are called", async function () {
        const tilesetProcessor = new tools_1.TilesetDataProcessor();
        await tilesetProcessor.begin(basicInput, basicOutput, overwrite);
        await tilesetProcessor.end();
        // Ensure that the output directory contains exactly the
        // input files
        const relativeInputFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(basicInput);
        relativeInputFiles.sort();
        const relativeOutputFiles = SpecHelpers_1.SpecHelpers.collectRelativeFileNames(basicOutput);
        relativeOutputFiles.sort();
        expect(relativeOutputFiles).toEqual(relativeInputFiles);
    });
});
//# sourceMappingURL=TilesetProcessorSpec.js.map