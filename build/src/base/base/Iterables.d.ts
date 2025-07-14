/// <reference types="node" />
import { PathLike } from "fs";
/**
 * Utility methods for iterable objects.
 *
 * @internal
 */
export declare class Iterables {
    /**
     * Creates an iterable that represents a concatenation of the given ones
     *
     * @param delegateIterable - The delegate
     * @returns The iterable
     */
    static concatAsync<T>(delegateIterables: Iterable<AsyncIterable<T>>): AsyncIterable<T>;
    /**
     * Creates an asynchronous iterable from the given synchronous one.
     *
     * @param delegateIterable - The delegate
     * @returns The iterable
     */
    static makeAsync<T>(delegateIterable: Iterable<T>): AsyncIterable<T>;
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filterAsync<T>(iterable: AsyncIterable<T>, include: (element: T) => boolean): AsyncIterable<T>;
    /**
     * Creates an iterable from the given one, applying the
     * given function to each element.
     *
     * @param iterable - The iterable object
     * @param mapper - The mapper function
     * @returns The mapped iterable
     */
    static mapAsync<S, T>(iterable: AsyncIterable<S>, mapper: (element: S) => Promise<T>): AsyncIterable<T>;
    /**
     * Creates an iterable that is a flat view on the given
     * iterable.
     *
     * @param iterable - The iterable object
     * @returns The flat iterable
     */
    static flattenAsync<T>(iterable: AsyncIterable<T[]>): AsyncIterable<T>;
    /**
     * Creates an array from the given iterable
     *
     * @param iterable - The iterable
     * @returns The array
     */
    static asyncToArray<T>(iterable: AsyncIterable<T>): Promise<T[]>;
    /**
     * Creates a generator that allows iterating over all files
     * in the given directory, and its subdirectories if
     * `recurse` is `true`.
     *
     * @param directory - The directory
     * @param recurse - Whether the files should
     * be listed recursively
     * @returns The generator for path strings
     */
    static overFiles(directory: string | PathLike, recurse: boolean): Iterable<string>;
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filter<T>(iterable: Iterable<T>, include: (element: T) => boolean): Iterable<T>;
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filterWithIndex<T>(iterable: Iterable<T>, include: (element: T, index: number) => boolean): Iterable<T>;
    /**
     * Creates an iterable from the given one, applying the
     * given function to each element.
     *
     * @param iterable - The iterable object
     * @param mapper - The mapper function
     * @returns The mapped iterable
     */
    static map<S, T>(iterable: Iterable<S>, mapper: (element: S) => T): Iterable<T>;
    /**
     * Creates an iterable from the given one, returning arrays
     * that always contain `segmentSize` elements from the
     * input.
     *
     * If the number of elements that are provided by the
     * given iterable is not divisible by `segmentSize`,
     * then the last (incomplete) arrays will be omitted.
     *
     * @param iterable - The iterable object
     * @param segmentSize - The segment size
     * @returns The segmentized iterable
     * @throws DeveloperError If the segment size is not positive
     */
    static segmentize<T>(iterable: Iterable<T>, segmentSize: number): Iterable<T[]>;
    /**
     * Creates an iterable that is a flat view on the given
     * iterable.
     *
     * @param iterable - The iterable object
     * @returns The flat iterable
     */
    static flatten<T>(iterable: Iterable<T[]>): Iterable<T>;
}
//# sourceMappingURL=Iterables.d.ts.map