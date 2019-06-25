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
        'node_modules/(?!(lodash-es|@dhis2/d2-ui-[a-z-]+)/)',
    ],
}
