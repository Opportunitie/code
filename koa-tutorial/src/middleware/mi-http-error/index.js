const Path = require("path");
const nunjucks = require("nunjucks");

module.exports = (opts = {}) => {
  // 400.html 404.html other.html 的存放位置
  const folder = opts.errorPageFolder;
  // 添加环境变量，用来传入到视图中，方便调试
  const env = opts.env || process.env.NODE_ENV || "development";
  let filename = "other";
  // 指定默认模板文件
  const templatePath = Path.resolve(__dirname, "./error.html");
  return async (ctx, next) => {
    try {
      await next();
      /**
       * 如果没有更改过，response 的 status，则 Koa 默认的 status 是404
       */
      if (ctx.response.status === 404 && !ctx.response.body) {
        ctx.throw(404);
      }
    } catch (e) {
      let status = parseInt(e.status);
      const message = e.message;
      if (status >= 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            filename = status;
            break;
          default:
            filename = "other";
        }
      } else {
        (status = 500), (filename = status);
      }
      // 确定最终filePath路径
      const filePath = folder
        ? Path.join(folder, `${fileName}.html`)
        : templatePath;

      // 渲染对应错误类型的视图，并传入参数对象
      try {
        // 指定视图目录
        nunjucks.configure(folder ? folder : __dirname);
        const data = await nunjucks.render(filePath, {
          env: env, // 指定当前环境参数
          status: e.status || e.message, // 如果错误信息中没有 status， 就显示为message
          error: e.message, // 错误信息
          stack: e.stack, // 错误的堆栈信息
        });
      } catch (e) {
        ctx.throw(500, `错误页渲染失败：${e.message}`);
      }
    }
  };
};
