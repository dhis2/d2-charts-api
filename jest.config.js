module.exports = {
    testPathIgnorePatterns: ['node_modules', '<rootDir>/build'],
    verbose: true,
    transform: {
        '^.+\\.jsx$': 'babel-jest',
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx'],
    moduleDirectories: ['node_modules'],
    transformIgnorePatterns: [
        'node_modules/(?!@dhis2/d2-ui-[a-z-]+/)',
    ],
    moduleNameMapper: {
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    }
}
