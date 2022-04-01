const path = require("path");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
const isProduction = process.env.NODE_ENV !== "development";
const devNeedCdn = false;
const devUrl = "http://dev.ruanxiaoer.vbooster.cn";
const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: "Vue",
    vuex: "Vuex",
    "vue-router": "VueRouter",
  },
  // cdn的css链接
  css: [],
  // cdn的js链接
  js: [
    "https://cdn.staticfile.org/vue/2.6.10/vue.min.js",
    "https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js",
    "https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js",
  ],
};
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false,
  transpileDependencies: [
    /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]src/,
    /[/\\]node_modules[/\\](.+?)?element-ui(.*)[/\\]package/,
    /[/\\]node_modules[/\\](.+?)?f-render(.*)/,
    /[/\\]node_modules[/\\](.+?)?quill-image-drop-module(.*)/,
    /[/\\]node_modules[/\\](.+?)?vue-ele-form(.*)/,
    /[/\\]node_modules[/\\](.+?)?vue-ele-form-bmap(.*)/,
    /[/\\]node_modules[/\\](.+?)?vue-baidu-map(.*)/,
    /[/\\]node_modules[/\\](.+?)?vue-ele-upload-image(.*)/,
  ],
  productionSourceMap: false,
  css: {
    // requireModuleExtension: false,
    loaderOptions: {
      // css: {
      //   // 注意：以下配置在 Vue CLI v4 与 v3 之间存在差异。
      //   // Vue CLI v3 用户可参考 css-loader v1 文档
      //   // https://github.com/webpack-contrib/css-loader/tree/v1.0.1
      //   modules: {
      //     localIdentName: '[name]-[hash]'
      //   },
      //   localsConvention: 'camelCaseOnly'
      // }
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "src/common/less/variable.less")], // 引入全局样式变量
    },
  },
  chainWebpack: (config) => {
    // ============压缩图片 start============
    // config.module
    // 	.rule('images')
    // 	.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //     .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .options({ bypassOnDebug: true })
    // 	.end()
    // ============注入cdn start============
    // config.module
    //   .rule("js")
    //   .include.add(path.resolve(__dirname, "src"))
    //   .add(path.resolve(__dirname, "./node_modules/element-ui"))
    //   .end()
    //   .use("babel")
    //   .loader("babel-loader")
    //   .end()
    // .options({
    //   presets: [
    //     [
    //       "@babel/preset-env",
    //       {
    //         modules: false,
    //       },
    //     ],
    //   ],
    // });

    config.plugin("html").tap((args) => {
      if (isProduction || devNeedCdn) args[0].cdn = cdn;
      args[0].NODE_ENV = JSON.stringify(process.env.NODE_ENV);
      return args;
    });
  },
  configureWebpack: (config) => {
    const plugins = [];
    if (isProduction || devNeedCdn) {
      // 为生产环境修改配置...
      config.mode = "production";
      config.externals = cdn.externals;
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      };
      Object.assign(config, {
        optimization,
      });
      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          // 'element-ui': path.resolve(__dirname, './static/element-ui')
        },
      },
    });
    config.plugins = [...config.plugins, ...plugins];
  },
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      // 登录模块
      "/sip-auth": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sip-auth": "/sip-auth",
        },
      },
      "/sip-commodity": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sip-commodity": "/sip-commodity",
        },
      },
      "/sip-sys": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sip-sys": "/sip-sys",
        },
      },
      "/sip-notice": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sip-notice": "/sip-notice",
        },
      },
      "/sip-miniprogram": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/sip-miniprogram": "/sip-miniprogram",
        },
      },

      "/pc": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/pc": "/pc",
        },
      },

      "/common": {
        target: devUrl,
        changeOrigin: true,
        pathRewrite: {
          "^/common": "/common",
        },
      },
    },
  },
};
