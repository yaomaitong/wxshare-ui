<template>
  <div class="page has-navbar" v-nav="{title: '药脉通分享'} ">

    <div class="page-content text-center">
      <swiper direction="horizontal" ref="swiper" width="100%" height="30%">
        <swiper-item>
          <img src="../../img/home.png" width="100%" height="100%" />
        </swiper-item>

        <swiper-item>
          <img src="../../img/home.png" width="100%" height="100%" />
        </swiper-item>

        <swiper-item>
          <img src="../../img/home.png" width="100%" height="100%" />
        </swiper-item>
      </swiper>

      <div>
        <cells :items="entrances" :on-cell-click="onCellClick" row="12" col="1"></cells>
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
    methods: {
      onCellClick (obj) {
        if (obj == 0) {
            $router.forward('/addShare')
        } else if (obj == 2) {
            $router.forward('/chooseDevices')
        }
        // $toast.show("item clicked.")
      }
    }
  }
</script>
<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }

  .page.has-navbar .page-content {
    padding-top: 44px;
  }
</style>
