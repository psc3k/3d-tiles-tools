"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../src/base");
const tilesets_1 = require("../../../src/tilesets");
const tilesets_2 = require("../../../src/tilesets");
const tilesets_3 = require("../../../src/tilesets");
const tilesets_4 = require("../../../src/tilesets");
const SpecHelpers_1 = require("../../SpecHelpers");
const SPECS_DATA_BASE_DIRECTORY = SpecHelpers_1.SpecHelpers.getSpecsDataBaseDirectory();
async function createTilesetInMemory() {
    const tileset = new tilesets_2.TilesetInMemory();
    await tileset.begin("", true);
    await tileset.addEntry("tileset.json", Buffer.alloc(0));
    await tileset.end();
    return tileset;
}
// The basic contract that is established by the `TilesetSource`
// interface is checked for these implementations:
const testCases = [
    {
        description: "TilesetSourceFs",
        creationFunction: () => new tilesets_1.TilesetSourceFs(),
        sourceName: SPECS_DATA_BASE_DIRECTORY + "/Tileset/",
    },
    {
        description: "TilesetSource3tz",
        creationFunction: () => new tilesets_3.TilesetSource3tz(),
        sourceName: SPECS_DATA_BASE_DIRECTORY + "/tileset.3tz",
    },
    {
        description: "TilesetSource3dtiles",
        creationFunction: () => new tilesets_4.TilesetSource3dtiles(),
        sourceName: SPECS_DATA_BASE_DIRECTORY + "/tileset.3dtiles",
    },
    {
        description: "TilesetInMemory",
        creationFunction: createTilesetInMemory,
        sourceName: SPECS_DATA_BASE_DIRECTORY + "/tileset.3dtiles",
    },
];
for (const testCase of testCases) {
    describe(testCase.description, function () {
        let tilesetSource;
        let sourceName;
        beforeEach(async function () {
            tilesetSource = await testCase.creationFunction();
            sourceName = testCase.sourceName;
        });
        it("throws when trying to access it before calling 'open'", async function () {
            await expectAsync((async function () {
                await tilesetSource.getValue("tileset.json");
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'close' before calling 'open'", async function () {
            await expectAsync((async function () {
                await tilesetSource.close();
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'open' twice", async function () {
            await tilesetSource.open(sourceName);
            await expectAsync((async function () {
                await tilesetSource.open(sourceName);
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("allows access after calling 'open' and before calling 'close'", async function () {
            await tilesetSource.open(sourceName);
            const value = await tilesetSource.getValue("tileset.json");
            expect(value).toBeDefined();
        });
        it("allows iterating over the keys, multiple times, yielding the same results", async function () {
            await tilesetSource.open(sourceName);
            const keys = await tilesetSource.getKeys();
            const keysA = await base_1.Iterables.asyncToArray(keys);
            const keysB = await base_1.Iterables.asyncToArray(keys);
            expect(keysA).toEqual(keysB);
        });
        it("throws when trying to access it after calling 'close'", async function () {
            await tilesetSource.open(sourceName);
            await tilesetSource.close();
            await expectAsync((async function () {
                await tilesetSource.getValue("tileset.json");
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
        it("throws when trying to call 'close' twice", async function () {
            await tilesetSource.open(sourceName);
            await tilesetSource.close();
            await expectAsync((async function () {
                await tilesetSource.close();
            })()
            //  ^ This () is important to really CALL the anonymous function
            // and return a promise.
            ).toBeRejectedWithError();
        });
    });
}
//# sourceMappingURL=TilesetSourceSpec.js.map