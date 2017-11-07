<template>
  <div class="page has-navbar" v-nav="{title: '选择新闻', showBackButton:true} ">
      <div class="newslist_container page-content">
        <ul  v-if="newsListArr.length" type="1">
        <!-- v-load-more="loaderMore" -->
        <router-link :to="{path: '/setContent'}"  v-for="item in newsListArr" class="shop_li">
          <section>
            <img :src="item.previewImg.large" class="news_img">
          </section>
          <hgroup class="shop_right">
            <header class="shop_detail_header">
              <h4 :class="item.postType == 2 ? 'premium': ''" class="shop_title ellipsis">{{item.postTitle}}</h4>
            </header>
            <h5 class="rating_order_num">
              <section class="rating_order_num_left">
                  <span class="rating_num">{{item.postExcerpt}}</span>
              </section>
              <section class="rating_order_num_right">
                  <span class="delivery_style  rating_order_num">{{item.postDate}}</span>
              </section>
            </h5>
          </hgroup>
        </router-link>
      </ul>
    </div>
    <ConfirmButton btnTitle="确定" :submit='submitInfo' />
  </div>
</template>

<script>

import {newsList} from 'src/service/getData'
export default{
    data(){
        return {
          pageNo: 1,
          pageSize: 20,
          newsListArr:[] // 店铺列表数据
        }
    },
    mounted (){
        this.initData();
    },
    methods : {
      submitInfo () {
        $toast.show('选择完新闻')
      },
        async initData () {
          //获取数据
          // let res = await newsList(this.pageNo, this.pageSize);
          this.newsListArr =
          [
{
id: "1e2eea2dde87423cbaea007d1bbdbb9d",
url: "https://h5.yaomaitong.cn/v2/news/detail/1e2eea2dde87423cbaea007d1bbdbb9d",
postAuthor: "药脉通头条",
postDate: "2017-10-24 13:55:47",
publishTime: "10-24 13:55",
postTitle: "倒计时2天，山东药交会、医博会正在报名！",
postContent: null,
postScanCount: 20777,
postExcerpt: "2017年11月03日，山东；11月17日，湖南；11月22日，江苏！",
previewImg: {
imageName: "458581a1978fe319971ba72fc71d435a.jpg",
large: "http://cdnimg1.yaomaitong.cn/post-image/458581a1978fe319971ba72fc71d435a.jpg?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/458581a1978fe319971ba72fc71d435a.jpg?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/458581a1978fe319971ba72fc71d435a.jpg?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 30,
diggCount: 36,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: true
},
{
id: "7d6f4dd3d0ef4ecf906c671d96be47c6",
url: "https://h5.yaomaitong.cn/v2/news/detail/7d6f4dd3d0ef4ecf906c671d96be47c6",
postAuthor: "药脉通头条",
postDate: "2017-11-01 15:14:06",
publishTime: "29分钟前",
postTitle: "一只小小打火机给医药代表家庭带来的“巨震”",
postContent: null,
postScanCount: 26,
postExcerpt: "我知道，我也快挂了",
previewImg: {
imageName: "8295d08142a6fef3f8092271b1bc0437.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/8295d08142a6fef3f8092271b1bc0437.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/8295d08142a6fef3f8092271b1bc0437.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/8295d08142a6fef3f8092271b1bc0437.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "ed6bce5cf3b04582b68c5f7329917d26",
url: "https://h5.yaomaitong.cn/v2/news/detail/ed6bce5cf3b04582b68c5f7329917d26",
postAuthor: "药脉通头条",
postDate: "2017-11-01 11:52:11",
publishTime: "3小时前",
postTitle: "降价开始！江苏药品二次议价呼啸而至",
postContent: null,
postScanCount: 4230,
postExcerpt: "日前，江苏省医药人士发来一份《苏州市竞价、议价、限价挂网药品带量采购工作实施方案（征求意见稿）》",
previewImg: {
imageName: "3d2e8fde1af85b4d797f3bc106328388.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/3d2e8fde1af85b4d797f3bc106328388.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/3d2e8fde1af85b4d797f3bc106328388.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/3d2e8fde1af85b4d797f3bc106328388.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 1,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "4463b671dfc74ac3b02d9e1c616d4a17",
url: "https://h5.yaomaitong.cn/v2/news/detail/4463b671dfc74ac3b02d9e1c616d4a17",
postAuthor: "药脉通头条",
postDate: "2017-11-01 10:57:14",
publishTime: "4小时前",
postTitle: "5家连锁药店被吞！又一霸主诞生",
postContent: null,
postScanCount: 5667,
postExcerpt: "看来，又将有一家大型连锁药店要崛起了！ ",
previewImg: {
imageName: "bfb95c6cc23b8709bdd37b06df7116c1.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/bfb95c6cc23b8709bdd37b06df7116c1.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/bfb95c6cc23b8709bdd37b06df7116c1.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/bfb95c6cc23b8709bdd37b06df7116c1.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "622e12baf64f430a820360014a1ea8b4",
url: "https://h5.yaomaitong.cn/v2/news/detail/622e12baf64f430a820360014a1ea8b4",
postAuthor: "药脉通头条",
postDate: "2017-11-01 10:29:36",
publishTime: "5小时前",
postTitle: "总局：24种药材、47种中成药含马兜铃酸",
postContent: null,
postScanCount: 6407,
postExcerpt: "国家食品药品监督总局发布了《含马兜铃属药材的已上市中成药品种名单》和《可能含有马兜铃酸的马兜铃科药材名单》",
previewImg: {
imageName: "84e47e757a1977ba89f6c46ca7cd4b94.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/84e47e757a1977ba89f6c46ca7cd4b94.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/84e47e757a1977ba89f6c46ca7cd4b94.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/84e47e757a1977ba89f6c46ca7cd4b94.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "da67e90b59264915957a361fb004cff7",
url: "https://h5.yaomaitong.cn/v2/news/detail/da67e90b59264915957a361fb004cff7",
postAuthor: "药脉通头条",
postDate: "2017-11-01 09:28:51",
publishTime: "6小时前",
postTitle: "安徽卫计系统300多人被查办",
postContent: null,
postScanCount: 11540,
postExcerpt: "安徽卫生计生系统“严肃行业纪律·预防职务犯罪”专项活动目前取得阶段性进展",
previewImg: {
imageName: "4bb1c694fe35a8e52a702e7ee730fa2b.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/4bb1c694fe35a8e52a702e7ee730fa2b.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/4bb1c694fe35a8e52a702e7ee730fa2b.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/4bb1c694fe35a8e52a702e7ee730fa2b.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 5,
diggCount: 9,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "475f32bfa8a3450d901187734bdddd7d",
url: "https://h5.yaomaitong.cn/v2/news/detail/475f32bfa8a3450d901187734bdddd7d",
postAuthor: "药脉通头条",
postDate: "2017-11-01 08:23:24",
publishTime: "7小时前",
postTitle: "旧器械经营要被禁，百亿市场要消失",
postContent: null,
postScanCount: 6449,
postExcerpt: "国家拟对《医疗器械监管条例》再修正，明确禁止经营已使用的医疗器械。 ",
previewImg: {
imageName: "062d193f3fe6da809155077d43173f29.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/062d193f3fe6da809155077d43173f29.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/062d193f3fe6da809155077d43173f29.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/062d193f3fe6da809155077d43173f29.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "0ffa091e2acc4d99997837897c3645af",
url: "https://h5.yaomaitong.cn/v2/news/detail/0ffa091e2acc4d99997837897c3645af",
postAuthor: "药脉通头条",
postDate: "2017-11-01 08:13:15",
publishTime: "7小时前",
postTitle: "又一外资大品种出问题，全国禁用！",
postContent: null,
postScanCount: 10378,
postExcerpt: "暂停销售使用德国B.BraunMelsungen AG中长链脂肪乳/氨基酸（16）/葡萄糖（16%）注射液及ω-3鱼油中/长链脂肪乳注射液",
previewImg: {
imageName: "14cc2093a43cec8432b458a5f9d3e363.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/14cc2093a43cec8432b458a5f9d3e363.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/14cc2093a43cec8432b458a5f9d3e363.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/14cc2093a43cec8432b458a5f9d3e363.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 1,
diggCount: 8,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "4d268fcae37f473194438ff609fdc322",
url: "https://h5.yaomaitong.cn/v2/news/detail/4d268fcae37f473194438ff609fdc322",
postAuthor: "药脉通头条",
postDate: "2017-10-31 19:54:01",
publishTime: "19小时前",
postTitle: "控费！医院停药，还有后续动作",
postContent: null,
postScanCount: 14534,
postExcerpt: "医院一数据惊动卫计委！不少药品受牵连",
previewImg: {
imageName: "e3dacde375525afc3bac0a563131ce25.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/e3dacde375525afc3bac0a563131ce25.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/e3dacde375525afc3bac0a563131ce25.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/e3dacde375525afc3bac0a563131ce25.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 8,
diggCount: 5,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "78df0183c3ff4a7ba243f5fa109ed9dd",
url: "https://h5.yaomaitong.cn/v2/news/detail/78df0183c3ff4a7ba243f5fa109ed9dd",
postAuthor: "药脉通头条",
postDate: "2017-10-31 19:53:34",
publishTime: "19小时前",
postTitle: "美国药企弄虚作假，CFDA重罚！",
postContent: null,
postScanCount: 4581,
postExcerpt: "涉嫌提交了虚假的美国FDA签发510K文件",
previewImg: {
imageName: "487155069d16b9565df61bc9b0d7deb1.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/487155069d16b9565df61bc9b0d7deb1.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/487155069d16b9565df61bc9b0d7deb1.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/487155069d16b9565df61bc9b0d7deb1.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 1,
diggCount: 4,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "86874d42ebac4ac9839c6297da72fde5",
url: "https://h5.yaomaitong.cn/v2/news/detail/86874d42ebac4ac9839c6297da72fde5",
postAuthor: "药脉通头条",
postDate: "2017-10-31 16:48:46",
publishTime: "22小时前",
postTitle: "别给孩子留下终身遗憾！预防儿童严重药物不良反应",
postContent: null,
postScanCount: 5211,
postExcerpt: "儿童药物严重不良反应发生率较高，危害很大，可能影响孩子一辈子",
previewImg: {
imageName: "cc74ebfc69c2761957d170adf1f72062.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/cc74ebfc69c2761957d170adf1f72062.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/cc74ebfc69c2761957d170adf1f72062.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/cc74ebfc69c2761957d170adf1f72062.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 0,
diggCount: 4,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "b928ec8b4deb4c07806ca64c9152309c",
url: "https://h5.yaomaitong.cn/v2/news/detail/b928ec8b4deb4c07806ca64c9152309c",
postAuthor: "药脉通头条",
postDate: "2017-10-31 16:35:10",
publishTime: "23小时前",
postTitle: "未来最赚钱的17个新兴产业，医疗健康占了5个！",
postContent: null,
postScanCount: 5092,
postExcerpt: "未来十年，有哪些新产业值得我们期待？",
previewImg: {
imageName: "49ed5706da3d9787fa6a6a39a612529e.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/49ed5706da3d9787fa6a6a39a612529e.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/49ed5706da3d9787fa6a6a39a612529e.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/49ed5706da3d9787fa6a6a39a612529e.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 4,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "28e053f0afa1437e8e58d9f0e984c180",
url: "https://h5.yaomaitong.cn/v2/news/detail/28e053f0afa1437e8e58d9f0e984c180",
postAuthor: "药脉通头条",
postDate: "2017-10-31 16:29:02",
publishTime: "23小时前",
postTitle: "29种医保药品受限",
postContent: null,
postScanCount: 4795,
postExcerpt: "山西省人社厅发布《关于规范部分价格昂贵医保药品使用管理的通知》",
previewImg: {
imageName: "d448805f9512a7a50b5793f6e95af2dd.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/d448805f9512a7a50b5793f6e95af2dd.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/d448805f9512a7a50b5793f6e95af2dd.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/d448805f9512a7a50b5793f6e95af2dd.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "39d81414e2fe4bc598bedd9bf31eba7e",
url: "https://h5.yaomaitong.cn/v2/news/detail/39d81414e2fe4bc598bedd9bf31eba7e",
postAuthor: "药脉通头条",
postDate: "2017-10-31 15:58:42",
publishTime: "23小时前",
postTitle: "300亿市场，国内却仅有不到20家企业布局",
postContent: null,
postScanCount: 5235,
postExcerpt: "或许也将在未来医药创新领域掀起一股潮流",
previewImg: {
imageName: "7d7966b9baf1e3c654fb175ae3f8b71d.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/7d7966b9baf1e3c654fb175ae3f8b71d.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/7d7966b9baf1e3c654fb175ae3f8b71d.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/7d7966b9baf1e3c654fb175ae3f8b71d.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 0,
diggCount: 4,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "f05d281579e44651bd320284058598e8",
url: "https://h5.yaomaitong.cn/v2/news/detail/f05d281579e44651bd320284058598e8",
postAuthor: "药脉通头条",
postDate: "2017-10-31 15:36:36",
publishTime: "10-31 15:36",
postTitle: "逼医生流动起来！除了北京上海，各地也都在取消普门诊",
postContent: null,
postScanCount: 4498,
postExcerpt: "大医院减少门诊、取消窗口挂号，这些患者将分流到哪？谁将受益？",
previewImg: {
imageName: "c50417e3deeff71f43331ad3934ec612.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/c50417e3deeff71f43331ad3934ec612.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/c50417e3deeff71f43331ad3934ec612.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/c50417e3deeff71f43331ad3934ec612.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 1,
diggCount: 5,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "3003bd65fa8e4c9b8cec3af6cadc75df",
url: "https://h5.yaomaitong.cn/v2/news/detail/3003bd65fa8e4c9b8cec3af6cadc75df",
postAuthor: "药脉通头条",
postDate: "2017-10-31 11:41:03",
publishTime: "10-31 11:41",
postTitle: "四川开启新一轮药品增补",
postContent: null,
postScanCount: 5085,
postExcerpt: "《川药械采〔2017〕200号四川省药械集中采购服务中心关于开展四川省公立医院药品集中采购等相关工作的通知》",
previewImg: {
imageName: "98c33dc5a35a831727914f25c6f83835.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/98c33dc5a35a831727914f25c6f83835.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/98c33dc5a35a831727914f25c6f83835.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/98c33dc5a35a831727914f25c6f83835.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 1,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "d36d044ea9d3439186c71274be33c0b5",
url: "https://h5.yaomaitong.cn/v2/news/detail/d36d044ea9d3439186c71274be33c0b5",
postAuthor: "药脉通头条",
postDate: "2017-10-31 10:57:40",
publishTime: "10-31 10:57",
postTitle: "冬虫夏草被确认根本不抗癌，有药店仍宣称其抗癌功效",
postContent: null,
postScanCount: 4557,
postExcerpt: "​最新研究揭示冬虫夏草不可能含抗癌成分，但走访发现药店宣称其抗癌功效",
previewImg: {
imageName: "d8668099ece7d69338c07a28bde983ee.jpg",
large: "http://cdnimg1.yaomaitong.cn/post-image/d8668099ece7d69338c07a28bde983ee.jpg?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/d8668099ece7d69338c07a28bde983ee.jpg?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/d8668099ece7d69338c07a28bde983ee.jpg?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 0,
diggCount: 6,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "fe3ac6e46be0431087f49a9ed36acc69",
url: "https://h5.yaomaitong.cn/v2/news/detail/fe3ac6e46be0431087f49a9ed36acc69",
postAuthor: "药脉通头条",
postDate: "2017-10-31 10:09:09",
publishTime: "10-31 10:09",
postTitle: "国内首仿花落谁家？21家药企抢两款全球重磅产品",
postContent: null,
postScanCount: 4449,
postExcerpt: "阿哌沙班片和磷酸西格列汀片都属于全球重磅产品，进入了新版医保目录，那么国内药企谁能抢到首仿呢?",
previewImg: {
imageName: "d04398d148aa40244c2969e4aefe23a3.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/d04398d148aa40244c2969e4aefe23a3.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/d04398d148aa40244c2969e4aefe23a3.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/d04398d148aa40244c2969e4aefe23a3.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 2,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "289d1256fc804904982f951779fa0524",
url: "https://h5.yaomaitong.cn/v2/news/detail/289d1256fc804904982f951779fa0524",
postAuthor: "药脉通头条",
postDate: "2017-10-31 09:46:21",
publishTime: "10-31 09:46",
postTitle: "中国医械供应商排行榜来了，国产进口大混战！",
postContent: null,
postScanCount: 7131,
postExcerpt: "中国医疗器械市场究竟谁执牛耳？ ",
previewImg: {
imageName: "69c39ea5238b4cd9562d15142f6195f6.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/69c39ea5238b4cd9562d15142f6195f6.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/69c39ea5238b4cd9562d15142f6195f6.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/69c39ea5238b4cd9562d15142f6195f6.png?x-oss-process=style/img_s"
},
postType: 2,
commentCount: 1,
diggCount: 6,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
},
{
id: "2efead1d90604760b78e35576a542a40",
url: "https://h5.yaomaitong.cn/v2/news/detail/2efead1d90604760b78e35576a542a40",
postAuthor: "药脉通头条",
postDate: "2017-10-31 08:56:20",
publishTime: "10-31 08:56",
postTitle: "医药界最有钱的5位女企业家",
postContent: null,
postScanCount: 4575,
postExcerpt: "10月26日，胡润研究院发布《2017胡润女企业家榜》，医药行业共有5位女企业家上榜",
previewImg: {
imageName: "e34b86e7506f1a4babf9702bb6338399.png",
large: "http://cdnimg1.yaomaitong.cn/post-image/e34b86e7506f1a4babf9702bb6338399.png?x-oss-process=style/img_l",
middle: "http://cdnimg1.yaomaitong.cn/post-image/e34b86e7506f1a4babf9702bb6338399.png?x-oss-process=style/img_m",
small: "http://cdnimg1.yaomaitong.cn/post-image/e34b86e7506f1a4babf9702bb6338399.png?x-oss-process=style/img_s"
},
postType: 1,
commentCount: 0,
diggCount: 2,
bottomImg: null,
bottomLink: null,
hideComment: false,
wxShare: null,
digg: false
}
];
          // console.log('获取数据：' + res);
        }
    }
}
</script>

<style lang="scss" scoped>
	@import 'src/style/mixin';
	.newslist_container{
		background-color: #fff;
		margin-bottom: 60px;
    overflow-y: auto;
    overflow-x: hidden;

	}
	.shop_li{
		display: flex;
    text-decoration: none;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.7rem 0.4rem;
	}
	.news_img{
		@include wh(2.7rem, 2.7rem);
		display: block;
		margin-right: 0.4rem;
	}
	.list_back_li{
		height: 4.85rem;
		.list_back_svg{
			@include wh(100%, 100%)
		}
	}
	.shop_right{
		flex: auto;
		.shop_detail_header{
			@include fj;
			align-items: center;
			.shop_title{
				width: 8.5rem;
				color: #333;
				// padding-top: .01rem;
				@include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
				font-weight: 700;
			}
			.premium::before{
				content: '热点';
				display: inline-block;
				font-size: 0.5rem;
				line-height: 1.0rem;
				color: #ffffff;
				background-color: #ff0000;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
				margin-right: 0.2rem;
			}
			.shop_detail_ul{
				display: flex;
				transform: scale(.8);
				margin-right: -0.3rem;
				.supports{
					@include sc(0.5rem, #999);
					border: 0.025rem solid #f1f1f1;
					padding: 0 0.04rem;
					border-radius: 0.08rem;
					margin-left: 0.05rem;
				}
			}
		}
		.rating_order_num{
			@include fj(space-between);
			height: 0.6rem;
			margin-top: 0.52rem;
			.rating_order_num_left{
				@include fj(flex-start);
				.rating_section{
					display: flex;
					.rating_num{
						@include sc(0.4rem, #ff6000);
						margin: 0 0.2rem;
					}
				}
				.order_section{
					transform: scale(.8);
					margin-left: -0.2rem;
					@include sc(0.4rem, #666);
				}
			}
			.rating_order_num_right{
				display: flex;
				align-items: center;
				transform: scale(.7);
				min-width: 5rem;
				justify-content: flex-end;
				margin-right: -0.8rem;
				.delivery_style{
					font-size: 0.4rem;
					padding: 0.04rem 0.08rem 0;
					border-radius: 0.08rem;
					margin-left: 0.08rem;
					border: 1px;
				}
				.delivery_left{
					color: #fff;
					background-color: $blue;
					border: 0.025rem solid $blue;
				}
				.delivery_right{
					color: $blue;
					border: 0.025rem solid $blue;
				}
			}
		}
		.fee_distance{
			margin-top: 0.52rem;
			@include fj;
			@include sc(0.5rem, #333);
			.fee{
				transform: scale(.9);
				@include sc(0.5rem, #666);
			}
			.distance_time{
				transform: scale(.9);
				span{
					color: #999;
				}
				.order_time{
					color: $blue;
				}
				.segmentation{
					color: #ccc;
				}
			}
		}
	}
	.loader_more{
		@include font(0.6rem, 3);
		text-align: center;
	    color: #999;
	}
	.empty_data{
		@include sc(0.5rem, #666);
		text-align: center;
		line-height: 2rem;
	}
	.return_top{
		position: fixed;
		bottom: 3rem;
		right: 1rem;
		.back_top_svg{
			@include wh(2rem, 2rem);
		}
	}
	.loading-enter-active, .loading-leave-active {
		transition: opacity 1s
	}
	.loading-enter, .loading-leave-active {
		opacity: 0
	}

  .shop_list_container{
  margin-top: .4rem;
  border-top: 0.025rem solid $bc;
  background-color: #fff;
  .shop_header{
    .shop_icon{
      fill: #999;
      margin-left: 0.6rem;
      vertical-align: middle;
      @include wh(0.6rem, 0.6rem);
    }
    .shop_header_title{
      color: #999;
      @include font(0.55rem, 1.6rem);
    }
  }
}
</style>
