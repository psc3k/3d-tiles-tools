"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iterables = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DeveloperError_1 = require("./DeveloperError");
/**
 * Utility methods for iterable objects.
 *
 * @internal
 */
class Iterables {
    /**
     * Creates an iterable that represents a concatenation of the given ones
     *
     * @param delegateIterable - The delegate
     * @returns The iterable
     */
    static concatAsync(delegateIterables) {
        const resultIterable = {
            [Symbol.asyncIterator]: async function* () {
                for (const delegateIterable of delegateIterables) {
                    for await (const element of delegateIterable) {
                        yield element;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an asynchronous iterable from the given synchronous one.
     *
     * @param delegateIterable - The delegate
     * @returns The iterable
     */
    static makeAsync(delegateIterable) {
        const resultIterable = {
            [Symbol.asyncIterator]: async function* () {
                for (const element of delegateIterable) {
                    yield element;
                }
            },
        };
        return resultIterable;
    }
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filterAsync(iterable, include) {
        const resultIterable = {
            [Symbol.asyncIterator]: async function* () {
                for await (const element of iterable) {
                    const included = include(element);
                    if (included) {
                        yield element;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an iterable from the given one, applying the
     * given function to each element.
     *
     * @param iterable - The iterable object
     * @param mapper - The mapper function
     * @returns The mapped iterable
     */
    static mapAsync(iterable, mapper) {
        const resultIterable = {
            [Symbol.asyncIterator]: async function* () {
                for await (const element of iterable) {
                    yield Promise.resolve(mapper(element));
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an iterable that is a flat view on the given
     * iterable.
     *
     * @param iterable - The iterable object
     * @returns The flat iterable
     */
    static flattenAsync(iterable) {
        const resultIterable = {
            [Symbol.asyncIterator]: async function* () {
                for await (const element of iterable) {
                    for (const innerElement of element) {
                        yield innerElement;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an array from the given iterable
     *
     * @param iterable - The iterable
     * @returns The array
     */
    static async asyncToArray(iterable) {
        const array = [];
        for await (const element of iterable) {
            array.push(element);
        }
        return array;
    }
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
    static overFiles(directory, recurse) {
        const resultIterable = {
            [Symbol.iterator]: function* () {
                const fileNames = fs_1.default.readdirSync(directory);
                for (const fileName of fileNames) {
                    const rawPath = path_1.default.join(directory.toString(), fileName);
                    const fullPath = rawPath.replace(/\\/g, "/");
                    const isDirectory = fs_1.default.statSync(fullPath).isDirectory();
                    if (isDirectory && recurse) {
                        yield* Iterables.overFiles(fullPath, recurse);
                    }
                    else if (!isDirectory) {
                        yield fullPath;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filter(iterable, include) {
        const resultIterable = {
            [Symbol.iterator]: function* () {
                for (const element of iterable) {
                    const included = include(element);
                    if (included) {
                        yield element;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Returns filtered view on the given iterable
     *
     * @param iterable - The iterable
     * @param include - The include predicate
     * @returns The filtered iterable
     */
    static filterWithIndex(iterable, include) {
        const resultIterable = {
            [Symbol.iterator]: function* () {
                let index = 0;
                for (const element of iterable) {
                    const included = include(element, index);
                    if (included) {
                        yield element;
                    }
                    index++;
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an iterable from the given one, applying the
     * given function to each element.
     *
     * @param iterable - The iterable object
     * @param mapper - The mapper function
     * @returns The mapped iterable
     */
    static map(iterable, mapper) {
        const resultIterable = {
            [Symbol.iterator]: function* () {
                for (const element of iterable) {
                    yield mapper(element);
                }
            },
        };
        return resultIterable;
    }
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
    static segmentize(iterable, segmentSize) {
        if (segmentSize <= 0) {
            throw new DeveloperError_1.DeveloperError(`The segment size must be positive, but is ${segmentSize}`);
        }
        const resultIterable = {
            [Symbol.iterator]: function* () {
                let current = [];
                for (const element of iterable) {
                    current.push(element);
                    if (current.length === segmentSize) {
                        const result = current;
                        current = [];
                        yield result;
                    }
                }
            },
        };
        return resultIterable;
    }
    /**
     * Creates an iterable that is a flat view on the given
     * iterable.
     *
     * @param iterable - The iterable object
     * @returns The flat iterable
     */
    static flatten(iterable) {
        const resultIterable = {
            [Symbol.iterator]: function* () {
                for (const element of iterable) {
                    for (const innerElement of element) {
                        yield innerElement;
                    }
                }
            },
        };
        return resultIterable;
    }
}
exports.Iterables = Iterables;
//# sourceMappingURL=Iterables.js.map