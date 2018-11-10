module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ArtispaceCore',
      externals: {
        react: 'React'
      }
    }
  }
}
