"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipelines = void 0;
const base_1 = require("../../base");
const TilesetStages_1 = require("./TilesetStages");
/**
 * Methods to create `Pipeline` objects from JSON input.
 *
 * @internal
 */
class Pipelines {
    /**
     * Creates a `Pipeline` object from the given (untyped) JSON.
     *
     * @param pipelineJson - The JSON object
     * @returns The `Pipeline` object
     * @throws DeveloperError When the input was not valid
     */
    static createPipeline(pipelineJson) {
        if (!pipelineJson.input) {
            throw new base_1.DeveloperError("The pipeline JSON does not define an input");
        }
        if (!pipelineJson.output) {
            throw new base_1.DeveloperError("The pipeline JSON does not define an output");
        }
        // The tilesetStages may be undefined, resulting
        // in an empty array here
        const tilesetStages = [];
        if (pipelineJson.tilesetStages) {
            for (const tilesetStageJson of pipelineJson.tilesetStages) {
                const tilesetStage = TilesetStages_1.TilesetStages.createTilesetStage(tilesetStageJson);
                tilesetStages.push(tilesetStage);
            }
        }
        const pipeline = {
            input: pipelineJson.input,
            output: pipelineJson.output,
            tilesetStages: tilesetStages,
        };
        return pipeline;
    }
}
exports.Pipelines = Pipelines;
//# sourceMappingURL=Pipelines.js.map