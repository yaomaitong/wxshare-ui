<template>
  <div class="page has-navbar"
      v-nav="{
          title: '选择设备',
          showBackButton:true,
          showMenuButton: true,
          menuButtonText:'全选',
          onMenuButtonClick: chooseAll
        }">
    <div class="page-content text-left">
      <von-checkbox :options="devices" v-model="chosenDevices" theme="positive"></von-checkbox>
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>

<script>
export default {
    data () {
      return {
          chosenDevices: [],
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
          // this.$router.go(-1);
        },
        chooseAll () {
          //先清空已选择
          this.chosenDevices.splice(0,this.chosenDevices.length);
          for (var i = 0; i < this.devices.length; i++) {
              this.chosenDevices.push(i);
          }
        }
    }
}
</script>
