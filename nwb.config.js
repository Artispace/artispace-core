module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'Artispace',
      externals: {
        react: 'React'
      }
    }
  }
}
