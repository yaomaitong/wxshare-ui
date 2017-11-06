<template>
  <div class="page has-navbar" v-nav="{title: '新建分享', showBackButton:true} ">
    <div class="page-content">
      <list>
        <item class="item-icon-right" @click.native="onClick(0)">
          选择来源
          <div class="item-note">
            {{ $store.state.sourceType }}
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right" @click.native="onClick(1)">
          推送设备
          <div class="item-note">
            {{ $store.state.deviceCount }}
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right">
          强制分享
          <div class="item-note">
              <div>
                  <!-- <von-toggle v-model="pushNotification"></von-toggle> -->
                  <!-- <div class="item item-divider">开关状态: <span>{{ pushNotification ? '开启' : '关闭' }}</span> -->
              </div>
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
      </list>
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        pushNotification: false,
      }
    },
    methods: {
      onClick (index) {
        if (index == 0) {
          $router.forward('/chooseSource')
        } else if (index == 1) {
          $router.forward('/chooseDevices')
        }
      },
      submitInfo () {
        this.$store.commit('changeDeviceCount', 1008)
        this.$store.commit('changeSourceType', '你是个傻B')

        // $toast.show('强制分享：' + this.pushNotification)
      }
    }
}
</script>
