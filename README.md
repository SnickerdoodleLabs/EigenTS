# EigenTS

A minimalist typescript interface for the [Eigen Tux](https://eigen.tuxfamily.org/) matrix library (calculations run in [WASM](https://webassembly.org/)). Perform fast matrix-matrix multiplies, norm calculations, and system solves (Ax=b) in a mobile or desktop browser. 

Currently, this demo focuses on dense matrix operations, but could easily be extended to include sparse matrix methods as well. 

## Running Eigen in WASM

This package uses [emscripten](https://emscripten.org/) to compile Eigen into a WASM module that can be run in a mobile or desktop browser. 

Compile the Eigen bindings like this: 

```shell
emcc src/eigen/eigen.cpp -o wasm/eigen.html -I ./Eigen -sEXPORTED_FUNCTIONS=_float_norm,_float_random_matrix,_float_matrix_matrix_mult,_float_system_solve,_float_matrix_matrix_add,_free -sEXPORTED_RUNTIME_METHODS=cwrap
```

This will produce a `.wasm` module and a wrapper `.js` file (as well as a demo `.html` page) in the `/wasm` directory.

### Docker Environment

If you don't have or do not want to set up emscripten locally, you can use the supplied [Dockerfile](/Dockerfile) which installs all 
dependencies needed to create the WASM artifacts: 

```shell
docker build -t emcc .
docker run -it --rm --entrypoint bash -v $(pwd)/EigenTS:/root/EigenTS emcc
cd /root/EigenTS
# run emscripten from the mounted repository to build eigen.cpp
```


```shell
emcc src/eigen/eigen.cpp -o wasm/eigen_mod.js -I ./Eigen -sMODULARIZE -sEXPORTED_RUNTIME_METHODS=ccall,cwrap
```