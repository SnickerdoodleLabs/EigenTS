// Import the factory function from the compiled output
import { EigenModule } from "./eigen";

describe("WebAssembly Module Functionality", () => {
  let moduleInstance;

  // Before all tests, ensure the module is initialized
  beforeAll(async () => {
    moduleInstance = await EigenModule();  // Wait for the module to initialize
  });

  it("multiplies two matrices correctly", () => {
    // Example usage, you would replace this with actual function calls
    console.log('Module instance:', moduleInstance);
    // Call some function to test, e.g., moduleInstance.multiply(...)
  });

  // Additional tests can be added here to test other functions like computeEigenvalues and invertMatrix
});
