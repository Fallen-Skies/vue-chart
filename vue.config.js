const path = require('path')

module.exports = {
	lintOnSave: false,
	productionSourceMap: false, // 设为false打包时不生成.map文件
	devServer: {
		open: true, // 自动打开浏览器
		host: '0.0.0.0',
		port: '9520', // 前台代理端口号
		
	},
}