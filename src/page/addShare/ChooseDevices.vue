<template>
  <div class="page has-navbar" v-nav="{title: '选择设备', showBackButton:true} ">
    <div class="page-content text-left">
        <div class="item item-divider">
            选择需要转发的设备:
        </div>
      <!-- <list>
        <item class="item-icon-right" v-for="item in devices">
          {{ item.name }}
        </item>
      </list> -->

      <von-checkbox :options="devices" v-model="chosenDevices" theme="positive"></von-checkbox>

      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
        chosenDevices: [0, 1, 2],
        devices: ['小米1' , '小米2', '小米3']//接口获取后把需要显示的相关信息提取出来
      }
    },
    methods : {
        submitInfo () {
          let deviceCount = this.chosenDevices.length
          this.$store.commit('changeDeviceCount', deviceCount)
          // let isAll = (deviceCount == this.topics.length)
          // this.$store.commit('changeIsAllDevice', isAll)
          // $toast.show('选择设备个数'+ isAll + deviceCount)

          //返回上一页
          this.$router.go(-1);
        }
    }
}
</script>
