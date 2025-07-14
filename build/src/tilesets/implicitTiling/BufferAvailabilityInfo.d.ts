/// <reference types="node" />
/// <reference types="node" />
import { AvailabilityInfo } from "./AvailabilityInfo";
/**
 * Implementation of an `AvailabilityInfo` that is backed by
 * a Buffer.
 *
 * @internal
 */
export declare class BufferAvailabilityInfo implements AvailabilityInfo {
    private readonly _buffer;
    private readonly _length;
    constructor(buffer: Buffer, length: number);
    /** {@inheritDoc AvailabilityInfo.length} */
    get length(): number;
    /** {@inheritDoc AvailabilityInfo.isAvailable} */
    isAvailable(index: number): boolean;
}
//# sourceMappingURL=BufferAvailabilityInfo.d.ts.map