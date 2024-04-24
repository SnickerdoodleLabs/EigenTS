jest.mock("./eigen", () => ({
  EigenModule: () => ({
    _malloc: jest.fn(),
    _free: jest.fn(),
    HEAPF64: new Float64Array(),
    cwrap: jest.fn(),
  }),
}));
