export class PointerUtils {

    public makeVectorFloat32Ptr(eigen: any, size: number) {
        const ptr = eigen.malloc(size * Float32Array.BYTES_PER_ELEMENT);
        return ptr;
    }
    
    public vector2Float32Ptr(eigen: any, vector: Float32Array) {
        const ptr = eigen.malloc(vector.length * Float32Array.BYTES_PER_ELEMENT);
        // eigen.HEAPF32.set(vector, ptr);
        eigen.HEAPF32.set(vector, ptr / Float32Array.BYTES_PER_ELEMENT);
        return ptr;
    }
    
    public float32Ptr2Vector(eigen: any, ptr: number, size: number): Float32Array {
        return eigen.HEAPF32.subarray(ptr / Float32Array.BYTES_PER_ELEMENT, ptr / Float32Array.BYTES_PER_ELEMENT + size);
    }
    
}