import { EigenModule as createEigenModule } from "./eigen";

console.log("Imported createEigenModule:", createEigenModule);

// Assuming createEigenModule is a function returning a promise that resolves to an instance of the module
export interface EigenModule extends EmscriptenModule {
  _malloc: typeof createEigenModule._malloc;
  _free: typeof createEigenModule._free;
  HEAPF64: Float64Array;
  cwrap: typeof createEigenModule.cwrap;
}

const modulePromise = createEigenModule().then((module: any) => {
  console.log("Module loaded and initialized:", module);
  return module as EigenModule; // Ensuring the module is correctly typed
});

export default modulePromise;
