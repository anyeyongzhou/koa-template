const Koa = require('koa')
const app = new Koa()
//用于后端编写页面的（不是主流前后端分离的开发方法）
const views = require('koa-views')
//用于数据转换
const json = require('koa-json')
//用于错误
const onerror = require('koa-onerror')
//用于请求内容的解析器（报文里包含json,form等）
const bodyparser = require('koa-bodyparser')
//用于日志打印，只能打印请求拦截的信息，功能比较薄弱，还需要打印log4js
const logger = require('koa-logger')
//日志打印错误信息
const log4js = require('./utils/log4j.js')

//导入路由，核心部分
//后端提供服务的入口
const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)

app.use(json())
app.use(logger())
//koa-static静态web服务托管中间件，后端用相对路径访问不到静态资源，必须使用中间件
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug'
  })
)

// logger
app.use(async (ctx, next) => {
  //log4js.debug('some debug message')
  await next()
})

// routes  注册路由         allowedMethods允许哪些请求方式，默认为get
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
  log4js.error(err)
})

module.exports = app
