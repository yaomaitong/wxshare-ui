<template>
    <div class="page has-navbar" v-nav="{title: '药脉通分享'} ">
        <div class="page-content">
            <div class="head_img_container text-center">
              <img src="http://static.dingtalk.com/media/lADOAXFzyM0Cfs0CgA_640_638.jpg" class="head_img" />
              <p>
                瓜皮
              </p>
            </div>
            <div>
                <cells :items="entrances" :on-cell-click="onCellClick" row="2" col="2"></cells>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
          entrances: [
              '<div class="entrance assertive"><i class="icon ion-ios-flame"></i><br><span>新建分享</span></div>',
              '<div class="entrance energized"><i class="icon ion-ios-search"></i><br><span>历史分享</span></div>',
              '<div class="entrance balanced"><i class="icon ion-ios-location"></i><br><span>手机管理</span></div>',
              '<div class="entrance positive"><i class="icon ion-ios-star"></i><br><span>设置</span></div>',
            ]
      }
    },
    // mounted () {
    // },
    methods: {
      onCellClick (obj) {
        if (obj == 0) {
            $router.forward('/addShare')
        } else if (obj == 2) {
            $router.forward({path : '/chooseDevices', query : {type : 'set'}})
        }
      }
    }
  }
</script>

<!-- 加上lang="scss"预编译，样式才能写在样式里面 -->
<style lang="scss">
    .entrance {
      height: 100px;
      padding: 35px 0;
      .icon {
        font-size: 30px;
        line-height: 30px;
        width: 30px;
        height: 30px;
        margin-bottom: 6px;
      }
      span {
        font-size: 15px;
        line-height: 15px;
      }
    };

  .head_img_container {
      padding-top: 30px;
      padding-bottom: 20px;
      // background-color: #4875de;
  }

  .head_img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
  }

  .page.has-navbar .page-content {
    // margin-top: 44px;
  }
</style>
