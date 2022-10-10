const productionPlugns = []

if (process.env.NODE_ENV == 'production')
  productionPlugns.push(["transform-remove-console", { "exclude": ["error", "warn", "info"] }]);

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: productionPlugns
}
