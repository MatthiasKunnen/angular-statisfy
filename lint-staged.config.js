function mapFilenames(filenames) {
    return filenames.map(filename => `"${filename}"`).join(' ');
}

module.exports = {
    '*': () => [
        'yarn run test:ts',
        'yarn run lint',
    ],
    '**/*.js': (filenames) => [
        `eslint --fix --cache ${mapFilenames(filenames)}`,
    ],
    '**/*.ts': (filenames) => [
        `eslint --fix --cache ${mapFilenames(filenames)}`,
    ],
};
