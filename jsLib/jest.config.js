/** @type {import('jest').Config} */
const config = {
    verbose: true,
    moduleNameMapper: {
      "api/(.*)": "<rootDir>/src/api/$1",
      "apiUtils/(.*)": "<rootDir>/src/utils/$1",
    }
  };
  
module.exports = config;