"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TilesetTargetFs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const base_1 = require("../../base");
const TilesetError_1 = require("./TilesetError");
/**
 * Implementation of a TilesetTarget that writes into
 * a directory of a file system
 *
 * @internal
 */
class TilesetTargetFs {
    /**
     * Default constructor
     */
    constructor() {
        this.fullOutputName = undefined;
        this.overwrite = false;
    }
    /** {@inheritDoc TilesetTarget.begin} */
    async begin(fullOutputName, overwrite) {
        if (this.fullOutputName) {
            throw new TilesetError_1.TilesetError("Target already opened");
        }
        const extension = path_1.default.extname(fullOutputName);
        if (extension === "") {
            this.fullOutputName = fullOutputName;
        }
        else {
            this.fullOutputName = path_1.default.dirname(fullOutputName);
        }
        this.overwrite = overwrite;
        if (!fs_1.default.existsSync(this.fullOutputName)) {
            fs_1.default.mkdirSync(this.fullOutputName, { recursive: true });
        }
    }
    /** {@inheritDoc TilesetTarget.addEntry} */
    async addEntry(key, content) {
        if (!this.fullOutputName) {
            throw new TilesetError_1.TilesetError("Target is not opened. Call 'begin' first.");
        }
        const fullOutputFileName = path_1.default.join(this.fullOutputName, key);
        if (fs_1.default.existsSync(fullOutputFileName)) {
            if (!this.overwrite) {
                throw new TilesetError_1.TilesetError("File already exists: " + fullOutputFileName);
            }
        }
        base_1.Paths.ensureDirectoryExists(path_1.default.dirname(fullOutputFileName));
        fs_1.default.writeFileSync(fullOutputFileName, content);
    }
    /** {@inheritDoc TilesetTarget.end} */
    async end() {
        if (!this.fullOutputName) {
            throw new TilesetError_1.TilesetError("Target is not opened. Call 'begin' first.");
        }
        this.fullOutputName = undefined;
        this.overwrite = false;
    }
}
exports.TilesetTargetFs = TilesetTargetFs;
//# sourceMappingURL=TilesetTargetFs.js.map