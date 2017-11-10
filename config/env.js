/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = 'http://192.168.50.16:9000/'
//'http://web1.robintse.cn/';
let routerMode = 'history';
let imgBaseUrl = 'http://images.cangdu.org/';

if (process.env.NODE_ENV == 'development') {

} else if (process.env.NODE_ENV == 'production'){

	// https://web1.robintse.cn/v1/news_list?page=1&page_size=20
}

export {
	baseUrl,
	routerMode,
	imgBaseUrl,
}
