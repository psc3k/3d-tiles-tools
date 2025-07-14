import { TilesetSource } from "../../tilesets";
import { TilesetTarget } from "../../tilesets";
/**
 * Methods for converting tilesets between different storage formats.
 * (i.e. the file system, or 3D Tiles archives/packages).
 *
 * @internal
 */
export declare class TilesetConverter {
    /**
     * Convert a source tileset to a target tileset.
     *
     * The source and target names can be
     * - The path to a tileset JSON file
     * - A directory that contains a `tileset.json` file
     * - A 3D Tiles package (with `.3tz` or `.3dtiles` extension)
     *
     * Package files are required to contain a `tileset.json` file for the
     * top-level tileset. When the source was a specific tileset JSON file,
     * then this file will be renamed to `tileset.json` if necessary for
     * writing it into a package (and if this causes a duplicate entry, then
     * an error will be thrown). Otherwise, it is expected that the source
     * contains a file that matches the required file for the output.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the tileset JSON file
     * in the source
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the tileset JSON file
     * in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError If the requirements for the tileset JSON
     * file names (stated above) are not met.
     */
    static convert(tilesetSourceName: string, tilesetSourceJsonFileName: string | undefined, tilesetTargetName: string, overwrite: boolean): Promise<void>;
    /**
     * Convert a source tileset to a target tileset.
     *
     * The specified source JSON file name will be assumed to be the
     * top-level tileset JSON file. It will be written into the
     * specified target JSON file. If this causes a duplicate entry, then
     * an error will be thrown.
     *
     * The caller is responsible for calling `open` on the given
     * source and `begin` on the given target before calling this
     * method, and `close` on the source and `end` on the target
     * after calling this method.
     *
     * @param tilesetSource - The tileset source
     * @param tilesetSourceJsonFileName - The name of the tileset JSON file
     * in the source
     * @param tilesetTarget - The tileset target
     * @param tilesetTargetJsonFileName - The name of the tileset JSON file
     * in the target
     * @returns A promise that resolves when the process is finished
     * @throws TilesetError If the requirements for the tileset JSON
     * file names (stated above) are not met.
     */
    static convertData(tilesetSource: TilesetSource, tilesetSourceJsonFileName: string, tilesetTarget: TilesetTarget, tilesetTargetJsonFileName: string): Promise<void>;
}
//# sourceMappingURL=TilesetConverter.d.ts.map