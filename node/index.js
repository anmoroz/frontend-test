'use strict'

const App= require('koa')
const AppStatic= require('koa-static')

App()
    .use(AppStatic('.'))
    .listen(1337)
;
