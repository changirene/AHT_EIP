const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.17.100.110:3000',
        changeOrigin: true,
      },
    },
  },
})
