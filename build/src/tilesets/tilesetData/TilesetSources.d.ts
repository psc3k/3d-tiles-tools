/// <reference types="node" />
/// <reference types="node" />
import { TilesetEntry } from "./TilesetEntry";
import { TilesetSource } from "./TilesetSource";
/**
 * Methods related to `TilesetSource` instances
 *
 * @internal
 */
export declare class TilesetSources {
    /**
     * Convenience method to create and open a tileset source for
     * the given name.
     *
     * This will call `TilesetSources.create` for the extension of
     * the given name, and immediately call `open(name)` on the
     * resulting source.
     *
     * @param name - The name
     * @returns The `TilesetSource`
     * @throws TilesetError If the input can not be opened
     */
    static createAndOpen(name: string): Promise<TilesetSource>;
    /**
     * Create a tileset source from a given (full) name.
     *
     * The given name may have the extension `.3tz`, `.3dtiles`,
     * or `.json`, or no extension to indicate a directory.
     *
     * If the given name as the extension `.json`, then a source
     * for the directory that contains the given file is created.
     *
     * @param name - The name
     * @returns The `TilesetSource`
     * @throws TilesetError If the input can not be opened
     */
    static createFromName(name: string): TilesetSource;
    /**
     * Creates a TilesetSource, based on the given
     * file extension
     *
     * @param extension - The extension: '.3tz' or '.3dtiles'
     * or the empty string (for a directory)
     * @returns The TilesetSource, or `undefined` if the extension
     * is invalid
     */
    static create(extension: string): TilesetSource | undefined;
    /**
     * Parses the JSON from the value with the given key (file name),
     * and returns the parsed result.
     *
     * This handles the case that the input data may be compressed
     * with GZIP, and will uncompress the data if necessary.
     *
     * @param tilesetSource - The `TilesetSource`
     * @param key - The key (file name)
     * @returns The parsed result
     * @throws TilesetError If the source is not opened, the specified
     * entry cannot be found, or the entry data could not be unzipped
     * (if it was zipped), or it could not be parsed as JSON.
     */
    static parseSourceValue<T>(tilesetSource: TilesetSource, key: string): Promise<T>;
    /**
     * Obtains the value for the given key from the given tileset source,
     * throwing an error if the source is not opened, or when the
     * given key cannot be found.
     *
     * @param tilesetSource - The `TilesetSource`
     * @param key - The key (file name)
     * @returns The value (file contents)
     * @throws DeveloperError When the source is not opened
     * @throws TilesetError When the given key cannot be found
     */
    static getSourceValue(tilesetSource: TilesetSource, key: string): Promise<Buffer>;
    /**
     * Returns an iterable iterator over the entries of the given
     * tileset source.
     *
     * @param tilesetSource - The `TilesetSource`
     * @returns The iterator over the entries
     */
    static getEntries(tilesetSource: TilesetSource): Promise<AsyncIterable<TilesetEntry>>;
}
//# sourceMappingURL=TilesetSources.d.ts.map