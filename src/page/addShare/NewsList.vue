<template>
  <div class="page has-navbar" v-nav="{title: '选择新闻', showBackButton:true} ">
      <scroll  class="newslist_container page-content"
        :on-infinite="onInfinite">

          <li v-for="item in newsListArr"  class="shop_li" @click='choose(item)'>
              <img :src="item.previewImg.middle" class="news_img">
              <span>
                    <div :class="item.postType == 2 ? 'premium': ''" class="news_title"> {{item.postTitle}} </div>
                    <div class="news_desc">{{item.postExcerpt}}</div>
                    <div class="news_time">{{item.postDate}}</div>
              </span>
              <span style="color:#fff">_______</span>
              <!-- @click.native='choose(item)' -->
              <md-button class="btn_choose" :class="isChosen(item) ? 'select': 'unselect'" ></md-button>
          </li>
          <div v-if="pageNo >= 3" slot="infinite" class="text-center">没有更多数据</div>
      </scroll>
    <ConfirmButton btnTitle="确定" :submit='submitInfo' />
  </div>
</template>

<script>
import {baseUrl} from '../../../config/env'

export default{
    data(){
        return {
          pageNo: 1,
          newsListArr:[], // 店铺列表数据
          chosenNews : this.$store.state.chosenNews,//这里好像不管用？？？
        }
    },
    mounted (){
        this.initData();
    },
    methods : {
      onInfinite(done) {
        setTimeout(() => {
          if (this.pageNo < 3) {
            this.pageNo++
            this.loadData()
          }

          done()
        }, 1500)
      },
      indexOfArr (array, val) {
        for (var i = 0; i < array.length; i++) {
          var obj = array[i]
          if (obj.id == val.id) return i;
        }
        return -1;
      },
      isChosen (item) {
        for(var i = 0;i < this.chosenNews.length; i++) {
          var obj = this.chosenNews[i]
            if(obj.id == item.id)
                return true;
        }
        return false;
      },
      choose (item) {
        if (this.isChosen(item)) {
            var index = this.indexOfArr(this.chosenNews, item)
            if (index > -1) {
                this.chosenNews.splice(index, 1);
            }
        } else {
            this.chosenNews.push(item);
        }
      },
      submitInfo () {
        //提交新闻
        this.$store.commit('setChosenNews', this.chosenNews)
        $router.back('/addShare')
      },
      loadData () {
        //获取数据
        var url = baseUrl + 'v1/news_list?page='+ this.pageNo + '&page_size=20'
        this.$http.get(url).then(response => {
            var res = response.body
            if (res.code == 0) {
                this.newsListArr = this.newsListArr.concat(res.data)
                console.log(res.data);
            } else {
                $toast.show(res.message)
            }
        }, response => {
            $toast.show(response.body)
        });
      },
      async initData () {
          this.pageNo = 1
          this.loadData();
      }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/public.scss';

	@import 'src/style/mixin';
	.newslist_container {
		background-color: #fff;
		margin-bottom: 60px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 44px;
	}

	.shop_li {
		display: flex;
    text-decoration: none;
		border-bottom: 0.025rem solid #f1f1f1;
		padding: 0.7rem 0.4rem;
    position: relative;
	}
	.news_img{
    width: 70px;
    height: 70px;
		display: block;
		margin-right: 0.4rem;
	}
  .news_title {
      font-weight: bold;
      color: #333;
  }
  .news_desc {
      font-size: 13px;
      color: #666;
      width:180px;
      overflow:hidden;     //让元素超出隐藏
      white-space: nowrap;     //一行显示
      text-overflow:  ellipsis;       //超出显示省略号
  }
  .news_time {
      font-size: 11px;
  }

  .premium::bevfore{
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

</style>
