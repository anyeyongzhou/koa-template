const log4j = require('log4js')

//日志的一些配置
log4j.configure({
  //设置追加器  默认 error
  appenders: {
    //出口
    out: {
      //log文件存储的类型，名称，还可以存在类于SMTP的中间件里，详情见文档
      type: 'file',
      filename: 'logs/common.log'
    },
    error: {
      type: 'dateFile', //也是日志输出到文件，但是可以按照日期进行滚动，每一天都会生产一个文件，例如2023-3-2.log
      filename: 'logs/error-',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true //日志文件名称为filename+—pattern的组合体
    }
  },
  //指定类别
  categories: {
    default: {
      appenders: ['out'],
      level: 'debug'
    },
    info: {
      appenders: ['out'],
      level: 'info'
    },
    error: {
      appenders: ['error'],
      level: 'error'
    }
  }
})

module.exports = {
  debug(content) {
    const logger = log4j.getLogger()
    logger.level = 'debug'
    logger.debug(content)
  },
  info(content) {
    const logger = log4j.getLogger('info')
    logger.level = 'info'
    logger.info(content)
  },
  error(content) {
    const logger = log4j.getLogger('error')
    logger.level = 'error'
    logger.error(content)
  }
}
