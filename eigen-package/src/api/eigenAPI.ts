// eigenAPI.ts
import modulePromise, { EigenModule } from "./eigenModule";

// Define wrapped functions outside to avoid re-wrapping
let multiply, computeEigenvalues, invert;

// Load the module and wrap the functions once
modulePromise.then((Module) => {
  multiply = Module.cwrap("multiply", null, [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
  ]);
  computeEigenvalues = Module.cwrap("computeEigenvalues", null, [
    "number",
    "number",
    "number",
  ]);
  invert = Module.cwrap("invert", null, ["number", "number", "number"]);
});

// Helper function to perform WebAssembly operations safely with memory management
async function wasmOperation(
  operation: (Module: EigenModule, ptrs: number[]) => Float64Array,
  sizes: number[]
): Promise<Float64Array> {
  const Module = await modulePromise;
  const ptrs = sizes.map((size) => Module._malloc(size));
  try {
    return operation(Module, ptrs);
  } finally {
    ptrs.forEach((ptr) => Module._free(ptr));
  }
}

export const multiplyMatrices = async (
  a: Float64Array,
  b: Float64Array,
  aRows: number,
  aCols: number,
  bRows: number,
  bCols: number
): Promise<Float64Array> => {
  return wasmOperation(
    (Module, [aPtr, bPtr, resultPtr]) => {
      Module.HEAPF64.set(a, aPtr / Float64Array.BYTES_PER_ELEMENT);
      Module.HEAPF64.set(b, bPtr / Float64Array.BYTES_PER_ELEMENT);
      multiply(aPtr, aRows, aCols, bPtr, bRows, bCols, resultPtr);
      return new Float64Array(Module.HEAPF64.buffer, resultPtr, aRows * bCols);
    },
    [
      a.length * a.BYTES_PER_ELEMENT,
      b.length * a.BYTES_PER_ELEMENT,
      aRows * bCols * Float64Array.BYTES_PER_ELEMENT,
    ]
  );
};

// And similarly for computeEigenvaluesMatrix and invertMatrix:
export const computeEigenvaluesMatrix = async (
  a: Float64Array,
  size: number
): Promise<Float64Array> => {
  return wasmOperation(
    (Module, [aPtr, resultPtr]) => {
      Module.HEAPF64.set(a, aPtr / Float64Array.BYTES_PER_ELEMENT);
      Module.cwrap("computeEigenvalues", null, ["number", "number", "number"])(
        aPtr,
        size,
        resultPtr
      );
      return new Float64Array(Module.HEAPF64.buffer, resultPtr, size);
    },
    [a.length * a.BYTES_PER_ELEMENT, size * Float64Array.BYTES_PER_ELEMENT]
  );
};

export const invertMatrix = async (
  a: Float64Array,
  size: number
): Promise<Float64Array> => {
  return wasmOperation(
    (Module, [aPtr, resultPtr]) => {
      Module.HEAPF64.set(a, aPtr / Float64Array.BYTES_PER_ELEMENT);
      Module.cwrap("invert", null, ["number", "number", "number"])(
        aPtr,
        size,
        resultPtr
      );
      return new Float64Array(Module.HEAPF64.buffer, resultPtr, size * size);
    },
    [
      a.length * a.BYTES_PER_ELEMENT,
      size * size * Float64Array.BYTES_PER_ELEMENT,
    ]
  );
};
