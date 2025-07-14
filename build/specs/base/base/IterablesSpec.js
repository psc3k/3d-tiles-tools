"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../src/base");
// Note: These tests obtain iterable objects, most of them create
// arrays from these iterable objects TWICE, to make sure that
// the returned iterable is iterable multiple times
describe("Iterables", function () {
    it("filter filters the right elements", function () {
        const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = base_1.Iterables.filter(input, (i) => i < 4);
        const actualA = [...result];
        const actualB = [...result];
        const expected = [0, 1, 2, 3];
        expect(actualA).toEqual(expected);
        expect(actualB).toEqual(expected);
    });
    it("filterWithIndex filters the right elements", function () {
        const input = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = base_1.Iterables.filterWithIndex(input, (v, i) => i % 3 != 2);
        const actualA = [...result];
        const actualB = [...result];
        const expected = [0, 1, 3, 4, 6, 7, 9];
        expect(actualA).toEqual(expected);
        expect(actualB).toEqual(expected);
    });
    it("map applies a mapping", function () {
        const input = [0, 1, 2, 3, 4];
        const result = base_1.Iterables.map(input, (i) => i * 2);
        const actualA = [...result];
        const actualB = [...result];
        const expected = [0, 2, 4, 6, 8];
        expect(actualA).toEqual(expected);
        expect(actualB).toEqual(expected);
    });
    it("segmentize throws an error for non-positive segment size", function () {
        expect(function () {
            const input = [0, 1, 2, 3, 4];
            const segmentSize = 0;
            base_1.Iterables.segmentize(input, segmentSize);
        }).toThrowError();
    });
    it("segmentize segmentizes", function () {
        const input = [0, 1, 2, 3, 4];
        const segmentSize = 2;
        const result = base_1.Iterables.segmentize(input, segmentSize);
        const actualA = [...result];
        const actualB = [...result];
        const expected = [
            [0, 1],
            [2, 3],
        ];
        expect(actualA).toEqual(expected);
        expect(actualB).toEqual(expected);
    });
    it("flatten flattens", function () {
        const input = [[0, 1, 2], [3, 4], [5]];
        const result = base_1.Iterables.flatten(input);
        const actualA = [...result];
        const actualB = [...result];
        const expected = [0, 1, 2, 3, 4, 5];
        expect(actualA).toEqual(expected);
        expect(actualB).toEqual(expected);
    });
});
//# sourceMappingURL=IterablesSpec.js.map