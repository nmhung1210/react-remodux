const { NODE_ENV } = process.env

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['ie >= 11']
        },
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
        modules: false,
        loose: true
      }
    ]
  ],
  plugins: [
    '@babel/proposal-class-properties',
    // don't use `loose` mode here - need to copy symbols when spreading
    '@babel/proposal-object-rest-spread',
    NODE_ENV === 'test' && '@babel/transform-modules-commonjs'
  ].filter(Boolean)
}
