// eigenFunctions.d.ts

export declare function multiplyMatrices(
    a: Float64Array, b: Float64Array,
    aRows: number, aCols: number,
    bRows: number, bCols: number
): Promise<Float64Array>;

export declare function computeEigenvaluesMatrix(
    a: Float64Array, size: number
): Promise<Float64Array>;

export declare function invertMatrix(
    a: Float64Array, size: number
): Promise<Float64Array>;
