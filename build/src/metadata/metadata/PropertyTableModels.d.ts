import { PropertyTableModel } from "./PropertyTableModel";
/**
 * Utility methods related to `PropertyTableModel` instances
 *
 * @internal
 */
export declare class PropertyTableModels {
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
    static createString(propertyTableModel: PropertyTableModel, maxRows?: number): string;
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
    private static computeColumnWidths;
    /**
     * Create a string representation of the given value, padded
     * with spaces at the left to reach the given width.
     *
     * @param value - The value
     * @param width - The width
     * @returns The padded string
     */
    private static pad;
}
//# sourceMappingURL=PropertyTableModels.d.ts.map