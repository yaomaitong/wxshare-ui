/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = ''
if (process.env.NODE_ENV == 'development') {
		baseUrl = 'http://192.168.50.16:9000/'
} else if (process.env.NODE_ENV == 'production'){
		baseUrl = 'http://web1.robintse.cn/'
}

export {
		baseUrl
}
