<template>
  <div class="page has-navbar" v-nav="{title: '新建分享', showBackButton:true} ">
    <div class="page-content text-left">
      <list>
        <item class="item-icon-right" @click.native="onClick(0)">
          选择来源
          <div class="item-note">
            新闻列表
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right" @click.native="onClick(1)">
          推送设备
          <div class="item-note">
            100台
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right">
          强制分享
          <div class="item-note">
              <von-toggle :value.sync="pushNotification"></von-toggle>
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
      </list>
    </div>
  </div>
</template>

<script>
export default{
    data(){
      return {
        pushNotification: true
      }
    },
    methods: {
      onClick (index) {
        if (index == 0) {
          $router.forward('/chooseSource')
        } else if (index == 1) {
          $router.forward('/chooseDevices')
        }
      }
    }
  }
</script>
