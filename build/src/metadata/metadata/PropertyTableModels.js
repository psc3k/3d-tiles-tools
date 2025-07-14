"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyTableModels = void 0;
/**
 * Utility methods related to `PropertyTableModel` instances
 *
 * @internal
 */
class PropertyTableModels {
    /**
     * Creates a string representation of the given `PropertyTableModel`.
     *
     * This is mainly intended for testing and debugging. The exact
     * format of the returned string is not specified.
     *
     * @param propertyTableModel - The `PropertyTableModel`
     * @param maxRows - The maximum number of rows. If this is not a
     * positive value, then all rows will be displayed
     * @returns The string
     */
    static createString(propertyTableModel, maxRows) {
        const propertyNames = propertyTableModel.getPropertyNames();
        const count = propertyTableModel.getCount();
        let numRows = count;
        if (maxRows !== undefined) {
            numRows = Math.min(numRows, maxRows);
        }
        const columnWidths = PropertyTableModels.computeColumnWidths(propertyTableModel, propertyNames, numRows);
        let result = "";
        for (let c = 0; c < propertyNames.length; c++) {
            const n = propertyNames[c];
            if (c > 0) {
                result += " | ";
            }
            const columnWidth = columnWidths[n];
            result += PropertyTableModels.pad(n, columnWidth);
        }
        result += "\n";
        for (let r = 0; r < numRows; r++) {
            const row = propertyTableModel.getMetadataEntityModel(r);
            for (let c = 0; c < propertyNames.length; c++) {
                const n = propertyNames[c];
                const columnWidth = columnWidths[n];
                const v = row.getPropertyValue(n);
                const s = JSON.stringify(v);
                if (c > 0) {
                    result += " | ";
                }
                result += PropertyTableModels.pad(s, columnWidth);
            }
            result += "\n";
        }
        if (maxRows !== undefined) {
            if (maxRows < count) {
                result += `(${count - maxRows} rows omitted)`;
            }
        }
        return result;
    }
    /**
     * Computes a mapping from property names to the column widths
     * for a table (i.e. to the lenght of the longest string
     * representation of any value in the respective column)
     *
     * @param propertyTableModel - The `PropertyTableModel`
     * @param propertyNames - The property names
     * @param rows - The number of rows
     * @returns The column widths
     */
    static computeColumnWidths(propertyTableModel, propertyNames, rows) {
        const columnWidths = {};
        for (let c = 0; c < propertyNames.length; c++) {
            const n = propertyNames[c];
            let columnWidth = n.length;
            for (let r = 0; r < rows; r++) {
                const row = propertyTableModel.getMetadataEntityModel(r);
                const v = row.getPropertyValue(n);
                const s = v === undefined ? "undefined" : JSON.stringify(v);
                columnWidth = Math.max(columnWidth, s.length);
            }
            columnWidths[n] = columnWidth;
        }
        return columnWidths;
    }
    /**
     * Create a string representation of the given value, padded
     * with spaces at the left to reach the given width.
     *
     * @param value - The value
     * @param width - The width
     * @returns The padded string
     */
    static pad(value, width) {
        let result = `${value}`;
        if (result.length < width) {
            result += " ".repeat(width - result.length);
        }
        return result;
    }
}
exports.PropertyTableModels = PropertyTableModels;
//# sourceMappingURL=PropertyTableModels.js.map