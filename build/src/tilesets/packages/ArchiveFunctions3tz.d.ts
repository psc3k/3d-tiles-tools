/// <reference types="node" />
/// <reference types="node" />
import { IndexEntry } from "./IndexEntry";
/**
 * @internal
 */
export interface ZipLocalFileHeader {
    signature: number;
    compression_method: number;
    comp_size: number;
    filename_size: number;
    extra_size: number;
}
/**
 * @internal
 */
export declare class ArchiveFunctions3tz {
    private static readonly ZIP_END_OF_CENTRAL_DIRECTORY_HEADER_SIG;
    private static readonly ZIP_START_OF_CENTRAL_DIRECTORY_HEADER_SIG;
    private static readonly ZIP64_EXTENDED_INFORMATION_EXTRA_SIG;
    private static readonly ZIP_LOCAL_FILE_HEADER_STATIC_SIZE;
    private static readonly ZIP_CENTRAL_DIRECTORY_STATIC_SIZE;
    private static getLastCentralDirectoryEntry;
    private static getFileContents;
    private static parseIndexData;
    static md5LessThan(md5hashA: Buffer, md5hashB: Buffer): boolean;
    static zipIndexFind(zipIndex: IndexEntry[], searchHash: Buffer): number;
    private static searchIndex;
    private static parseLocalFileHeader;
    static readZipLocalFileHeader(fd: number, offset: number | bigint, path: string): ZipLocalFileHeader;
    private static normalizePath;
    static readZipIndex(fd: number): IndexEntry[];
    static readFileName(fd: number, offset: number | bigint): string;
    static readEntry(fd: number, zipIndex: IndexEntry[], path: string): {
        compression_method: number;
        data: Buffer;
    } | undefined;
}
//# sourceMappingURL=ArchiveFunctions3tz.d.ts.map