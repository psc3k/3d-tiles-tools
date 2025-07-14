"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TileContentProcessors = void 0;
/**
 * Methods related to `TileContentProcessor` instances
 *
 * @internal
 */
class TileContentProcessors {
    /**
     * Concatenates the given `TileContentProcessor` instances.
     *
     * This creates a `TileContentProcessor` that applies the given
     * processors, in the given order, to the input data.
     *
     * This assumes that none of the given processors changes the
     * _type_ of the input data (even though it _may_ change the
     * type, if subsequent processors are agnostic of that...)
     *
     * @param tileContentProcessors - The `TileContentProcessor` instances
     * @returns The concatenated `TileContentProcessor`
     */
    static concat(...tileContentProcessors) {
        const result = async (inputContentData, type) => {
            let currentContentData = inputContentData;
            for (const tileContentProcessor of tileContentProcessors) {
                currentContentData = await tileContentProcessor(currentContentData, type);
            }
            return currentContentData;
        };
        return result;
    }
}
exports.TileContentProcessors = TileContentProcessors;
//# sourceMappingURL=TileContentProcessors.js.map