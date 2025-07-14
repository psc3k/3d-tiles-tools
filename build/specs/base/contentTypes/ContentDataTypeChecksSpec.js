"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("../../../src/base");
const base_2 = require("../../../src/base");
describe("ContentDataTypeChecks", function () {
    it("returns true when included is undefined and excluded is undefined", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = undefined;
        const excluded = undefined;
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeTrue();
    });
    it("returns false when included is empty and excluded is undefined", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [];
        const excluded = undefined;
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeFalse();
    });
    it("returns true when included is undefined and excluded is empty", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = undefined;
        const excluded = [];
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeTrue();
    });
    it("returns false when included is empty and excluded is empty", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [];
        const excluded = [];
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeFalse();
    });
    it("returns true when included contains element and excluded is undefined", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [
            checkedType,
            base_1.ContentDataTypes.CONTENT_TYPE_B3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_I3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_CMPT,
        ];
        const excluded = undefined;
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeTrue();
    });
    it("returns true when included contains element and excluded is empty", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [
            checkedType,
            base_1.ContentDataTypes.CONTENT_TYPE_B3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_I3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_CMPT,
        ];
        const excluded = [];
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeTrue();
    });
    it("returns false when included contains element and excluded contains element", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [
            checkedType,
            base_1.ContentDataTypes.CONTENT_TYPE_B3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_I3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_CMPT,
        ];
        const excluded = [checkedType, base_1.ContentDataTypes.CONTENT_TYPE_JPEG];
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeFalse();
    });
    it("returns false when included does not contain element", async function () {
        const checkedType = base_1.ContentDataTypes.CONTENT_TYPE_GLB;
        const included = [
            base_1.ContentDataTypes.CONTENT_TYPE_B3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_I3DM,
            base_1.ContentDataTypes.CONTENT_TYPE_CMPT,
        ];
        const excluded = undefined;
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeFalse();
    });
    it("returns true when included is undefined and excluded is undefined and type is undefined", async function () {
        const checkedType = undefined;
        const included = undefined;
        const excluded = undefined;
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeTrue();
    });
    it("returns false when included is undefined and excluded contains undefined and type is undefined", async function () {
        const checkedType = undefined;
        const included = undefined;
        const excluded = [undefined];
        const check = base_2.ContentDataTypeChecks.createTypeCheck(included, excluded);
        const result = check(checkedType);
        expect(result).toBeFalse();
    });
});
//# sourceMappingURL=ContentDataTypeChecksSpec.js.map