"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecEntryProcessor = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const path_1 = __importDefault(require("path"));
const base_1 = require("../../../src/base");
/**
 * Utility class for processing tileset entries for the specs.
 *
 * It offers "dummy" methods for
 * - modification of the URIs (file names)
 * - content processing (just changing the file name)
 * and stores all processed source entry names so that
 * the exact set of processed entries may be checked
 * in the tests.
 */
class SpecEntryProcessor {
    constructor() {
        this.processedKeys = [];
        this.processUri = (uri) => {
            const dirname = path_1.default.dirname(uri);
            const baseName = path_1.default.basename(uri);
            const newBaseName = "PROCESSED_" + baseName;
            const newUri = base_1.Paths.join(dirname, newBaseName);
            return newUri;
        };
        this.processEntry = async (sourceEntry, type) => {
            this.processedKeys.push(sourceEntry.key);
            return {
                key: this.processUri(sourceEntry.key),
                value: sourceEntry.value,
            };
        };
    }
}
exports.SpecEntryProcessor = SpecEntryProcessor;
//# sourceMappingURL=SpecEntryProcessor.js.map