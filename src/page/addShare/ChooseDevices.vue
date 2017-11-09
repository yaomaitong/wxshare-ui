<template>
  <div class="page has-navbar"
      v-nav="{
          title: this.type == 'set' ? '手机管理' : '选择设备',
          showBackButton:true,
          showMenuButton: this.type == 'set' ? false : true,
          menuButtonText:'全选',
          onMenuButtonClick: chooseAll
        }">

    <div class="page-content text-left">
      <!-- 设置页面 -->
      <list>
          <div v-for="item in devices">
            <von-toggle v-if="type == 'set'" :text=item.name v-model=item.active  @change.native='change(item)'></von-toggle>
            <item v-else @click.native='chooseDevice(item)' class="list_container">
                {{ item.name }}
                    <md-button class="btn_choose" :class="item.active ? 'select': 'unselect'"></md-button>
            </item>
          </div>
      </list>
    </div>
    <div v-if="type == 'choose'">
      <!-- <von-checkbox :options="devices" v-model="chosenDevices" theme="positive"></von-checkbox> -->
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>


<style lang="scss">
@import '../../style/public.scss';

.list_container {
    position: relative;
}

</style>

<script>
export default {
    data () {
      return {
          type : '',
          isforce : false,
          chosenDevices: [],
          devices: [{'name' : '小米1', 'active' : false } , {'name' : '小米1', 'active' : false }, {'name' : '小米1', 'active' : false }]//接口获取后把需要显示的相关信息提取出来
      }
    },
    created(){
      this.type = this.$route.query.type;
    },
    methods : {
        chooseDevice(item) {
            // $toast.show(item)
            item.active = !item.active
        },
        change(item) {
            $toast.show(item)
        },
        submitInfo () {
          let deviceCount = this.chosenDevices.length
          this.$store.commit('changeDeviceCount', deviceCount)
          // let isAll = (deviceCount == this.topics.length)
          // this.$store.commit('changeIsAllDevice', isAll)
          // $toast.show('选择设备个数'+ isAll + deviceCount)

          //返回上一页
          this.$router.go(-1);
        },
        chooseAll () {
          //先清空已选择
          this.chosenDevices.splice(0,this.chosenDevices.length);
          for (var i = 0; i < this.devices.length; i++) {
            var item = this.devices[i]
            item.active = true
              // this.chosenDevices.push(i);
          }
        }
    }
}
</script>
