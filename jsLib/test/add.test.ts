var eigenFactory = require('../../wasm/eigen_mod.js');
import { makeAPI } from "../src/api/API";
import { PointerUtils } from "../src/utils/PointerUtils";


describe('Eigen', () => {

    it('should add two matrices', async () => {
        const api =  await eigenFactory().then((eigen: any) => {
            return makeAPI(eigen);
        });
        const pointerUtils = new PointerUtils();


        const mat1 = Float32Array.from([1, 2, 3, 4]);
        const mat2 = Float32Array.from([5, 6, 7, 8]);
        const expected = Float32Array.from([6, 8, 10, 12]);
        // console.log('api', api);
        let mat1ptr = pointerUtils.vector2Float32Ptr(api, mat1);
        // console.log('mat1ptr', mat1ptr);
        // console.log('mat1ptr to array again', float32Ptr2Vector(api, mat1ptr, 4));
        let mat2ptr = pointerUtils.vector2Float32Ptr(api, mat2);
        // console.log('mat2ptr', mat2ptr);
        // console.log('mat2ptr to array again', float32Ptr2Vector(api, mat2ptr, 4));
        expect(mat1).toEqual(pointerUtils.float32Ptr2Vector(api, mat1ptr, 4));

        // console.log(api);
        let resultPtr =  pointerUtils.vector2Float32Ptr(api, Float32Array.from({ length: 4 }));

        api.add(1, 1, 1, 4, mat1ptr, mat2ptr, resultPtr);
        const result = pointerUtils.float32Ptr2Vector(api, resultPtr, 4);
        // console.log('result', result);
        // const result = eigen.float_matrix_matrix_add(1, 1, 1, 4, mat1, mat2);
        // console.log("result", result);
        expect(result).toEqual(expected);
    });
});