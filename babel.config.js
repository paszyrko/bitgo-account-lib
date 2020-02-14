module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-typescript'],
    [
      '@babel/preset-env',
      {
        targets: {
          node: '6.12.3',
        },
        debug: true,
        modules: 'commonjs',
      },
    ],
  ];
  const plugins = ['@babel/plugin-proposal-export-default-from'];

  return {
    presets,
    plugins,
  };
};
