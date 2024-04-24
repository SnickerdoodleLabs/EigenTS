#include <Eigen/Dense>
#include <iostream>
#include <emscripten.h>

extern "C" {
    // Function to multiply matrices
    void multiply(double* aData, int aRows, int aCols, double* bData, int bRows, int bCols, double* resultData) {
        Eigen::Map<Eigen::MatrixXd> a(aData, aRows, aCols);
        Eigen::Map<Eigen::MatrixXd> b(bData, bRows, bCols);
        Eigen::Map<Eigen::MatrixXd> result(resultData, aRows, bCols);
        result = a * b;
    }

    // Function to compute eigenvalues; results placed directly into the provided array
    void computeEigenvalues(double* aData, int size, double* resultData) {
        Eigen::Map<Eigen::MatrixXd> a(aData, size, size);
        Eigen::EigenSolver<Eigen::MatrixXd> solver(a);
        Eigen::Map<Eigen::VectorXd> result(resultData, size);
        result = solver.eigenvalues().real();
    }

    // Function to invert a matrix
    void invert(double* aData, int size, double* resultData) {
        Eigen::Map<Eigen::MatrixXd> a(aData, size, size);
        Eigen::Map<Eigen::MatrixXd> result(resultData, size, size);
        if (a.determinant() == 0) {
            std::cerr << "Matrix is singular and cannot be inverted." << std::endl;
            return;
        }
        result = a.inverse();
    }
}
