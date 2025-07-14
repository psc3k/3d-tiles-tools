/// <reference types="node" />
/// <reference types="node" />
import { TilesetEntry } from "../../../src/tilesets";
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
export declare class SpecEntryProcessor {
    processedKeys: string[];
    processUri: (uri: string) => string;
    processEntry: (sourceEntry: TilesetEntry, type: string | undefined) => Promise<{
        key: string;
        value: Buffer;
    }>;
}
//# sourceMappingURL=SpecEntryProcessor.d.ts.map