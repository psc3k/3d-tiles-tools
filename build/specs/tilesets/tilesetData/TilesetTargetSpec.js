"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tilesets_1 = require("../../../src/tilesets");
const tilesets_2 = require("../../../src/tilesets");
const tilesets_3 = require("../../../src/tilesets");
const tilesets_4 = require("../../../src/tilesets");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
// The basic contract that is established by the `TilesetTarget`
// interface is checked for these implementations:
const testCases = [
    {
        description: "TilesetTargetFs",
        creationFunction: () => new tilesets_1.TilesetTargetFs(),
        targetName: SPECS_DATA_BASE_DIRECTORY + "/output/target/Tileset/",
    },
    {
        description: "TilesetTarget3tz",
        creationFunction: () => new tilesets_3.TilesetTarget3tz(),
        targetName: SPECS_DATA_BASE_DIRECTORY + "/output/target/tileset.3tz",
    },
    {
        description: "TilesetTarget3dtiles",
        creationFunction: () => new tilesets_4.TilesetTarget3dtiles(),
        targetName: SPECS_DATA_BASE_DIRECTORY + "/output/target/tileset.3dtiles",
    },
    {
        description: "TilesetInMemory",
        creationFunction: () => new tilesets_2.TilesetInMemory(),
        targetName: "",
    },
];
for (const testCase of testCases) {
    describe(testCase.description, function () {
        let tilesetTarget;
        let targetName;
        beforeEach(async function () {
            tilesetTarget = testCase.creationFunction();
            targetName = testCase.targetName;
        });
        afterEach(async function () {
            // If there is an open target, then make sure that
            // 'end' was called to release the output file
            // (ignoring possible errors)
            if (tilesetTarget) {
                try {
                    await tilesetTarget.end();
                }
                catch (e) {
                    // Ignored
                }
            }
            SpecHelpers_1.SpecHelpers.forceDeleteDirectory(SPECS_DATA_BASE_DIRECTORY + "/output/target");
        });
        it("throws when trying to access it before calling 'begin'", async function () {
            await expectAsync((async function () {
                return await tilesetTarget.addEntry("tileset.json", Buffer.alloc(1));
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'end' before calling 'begin'", async function () {
            await expectAsync((async function () {
                return await tilesetTarget.end();
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'begin' twice", async function () {
            await expectAsync((async function () {
                await tilesetTarget.begin(targetName, true);
                await tilesetTarget.begin(targetName, true);
                return await tilesetTarget.end();
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("allows access after calling 'begin' and before calling 'end'", async function () {
            await tilesetTarget.begin(targetName, true);
            await tilesetTarget.addEntry("tileset.json", Buffer.alloc(1));
            await tilesetTarget.end();
        });
        it("throws when trying to access it after calling 'end'", async function () {
            await expectAsync((async function () {
                await tilesetTarget.begin(targetName, true);
                await tilesetTarget.end();
                return await tilesetTarget.addEntry("tileset.json", Buffer.alloc(1));
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'end' twice", async function () {
            await expectAsync((async function () {
                await tilesetTarget.begin(targetName, true);
                await tilesetTarget.end();
                return await tilesetTarget.end();
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
    });
}
//# sourceMappingURL=TilesetTargetSpec.js.map