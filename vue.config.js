const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 配置代理，拦截请求
// 当遇到请求以'/api'开头时，会将'/api'替换为target目标地址，实现跨域请求
module.exports = {
  devServer: {
      proxy: {
        '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
            target: "https://trefle.io", //目标地址，一般是指后台服务器地址（只到域名即可）
            changeOrigin: true, //是否跨域
            // pathRewrite: {  //重写路径（将带有api换成空字符串）
            //   '^/api': ''
            // }
        },
        '/baidu': { // 
          target: "http://api.fanyi.baidu.com/api/trans/vip/fieldtranslate", //目标地址，一般是指后台服务器地址（只到域名即可）
          changeOrigin: true, //是否跨域
          pathRewrite: {  //重写路径（将带有/baidu换成空字符串）
            '^/baidu': ''
          }
        },

    }
  }
}