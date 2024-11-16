module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: [ 'js', 'json', 'node'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            useESM: true, // Enable ESM support
        },
    },
};