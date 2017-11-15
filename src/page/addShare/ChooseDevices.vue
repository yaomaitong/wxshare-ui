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
      <list>
          <div v-for="item in devices">
            <!-- 设置页面 -->
            <div v-if="(promotionIndex == 1 && item.status == true) || (promotionIndex == 0 && item.status == false)">
              <item>
              <span>{{item.device_alias}}</span>

              <div class="device_toggle">
                <toggle-button
                  v-model="item.status"
                  :width=70
                  :height=35
                  @change="activeDevice(item)"
                  :color="{checked: '#4875de', unchecked: '#ccc'}"
                 :labels="{checked: '休眠', unchecked: '激活'}"/>
               </div>
               </item>
                <!-- <von-toggle v-if="type == 'set'" :text=item.device_alias v-model='item.status'  @click.native='activeDevice(item)'></von-toggle> -->
            </div>

            <!-- 选择页面 -->
            <item v-if="type == 'choose'" @click.native='chooseDevice(item)' class="list_container">
                {{ item.device_alias }}
                    <md-button class="btn_choose" :class="isChosen(item) ? 'select': 'unselect'"></md-button>
            </item>
          </div>
      </list>
    </div>
    <div v-if="type == 'choose'">
        <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
    <div v-if="type == 'set'" class="padding light-bg segment">
      <button-bar theme="assertive" :tab-items="promotions" :tab-index="promotionIndex"
        :on-tab-click="onTabClick"></button-bar>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../style/public.scss';

.list_container {
    position: relative;
}

.segment {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

.device_toggle {
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
}

</style>

<script>
import {baseUrl} from '../../config/env'

export default {
    data () {
      return {
          type : '',
          promotions:["未激活", "已激活"],
          promotionIndex: 0,
          isforce : false,
          chosenDevices: [],
          devices: [],
      }
    },
    created () {
      this.type = this.$route.query.type;
    },
    mounted () {
        this.initData()
    },
    deactivated () {
      console.log("------devices------deactivated");
    },
    beforeDistroy () {
      console.log("------devices------before-distroyed");
    },
    distroyed () {
      console.log("------devices-------distroyed");
    },
    methods : {
        onTabClick(index) {
            this.promotionIndex = index
        },
        async initData () {
            this.loadData();
        },
        indexOfArr (array, val) {
          for (var i = 0; i < array.length; i++) {
            var obj = array[i]
            if (obj.id == val.id) return i;
          }
          return -1;
        },
        isChosen (item) {
          for(var i = 0;i < this.chosenDevices.length; i++) {
            var obj = this.chosenDevices[i]
              if(obj.id == item.id)
                  return true;
          }
          return false;
        },
        chooseDevice(item) {
            if (this.isChosen(item)) {
                var index = this.indexOfArr(this.chosenDevices, item)
                if (index > -1) {
                    this.chosenDevices.splice(index, 1);
                }
            } else {
                this.chosenDevices.push(item);
            }
        },
        activeDevice (item) {
            var toActive = item.status
            console.log('shouldActive:' + toActive);
            const formData = new FormData()
            formData.append('id', item.id)
            formData.append('status', toActive)

            var url = baseUrl + 'v1/device/activation'
            this.$http.post(url, formData).then(response => {
                var res = response.body
                console.log(res);
                if (res.code == 0) {
                    item.status = toActive
                    $toast.show('操作成功')
                } else {
                    $toast.show('操作失败'+res.message)
                    item.status = !toActive
                }
            }, response => {
                $toast.show(response)
                item.status = false
                console.log(response);
            });
        },
        change(item) {
            $toast.show(item)
        },
        submitInfo () {
          let chosenCount = this.chosenDevices.length
          if (chosenCount <= 0) {
              $toast.show('请选择设备')
              return
          }
          let allDeviceCount = this.devices.length
          var isAll = chosenCount == allDeviceCount
          console.log('isall' + isAll);
          console.log(this.chosenDevices);
          // var array = []
          // for (var i = 0; i < this.chosenDevices.length; i++) {
          //     var item = this.chosenDevices[i]
          //     array.push(item)
          // }
          this.$store.commit('changeChosenDevices', {'devices':this.chosenDevices, 'isAll' :isAll})
          //返回上一页
          this.$router.go(-1);
        },
        chooseAll () {
            //先清空已选择
            this.chosenDevices.splice(0,this.chosenDevices.length);
            for (var i = 0; i < this.devices.length; i++) {
                var item = this.devices[i]
                this.chosenDevices.push(item);
            }
        },
        loadData () {
            var url = baseUrl + 'v1/device/list'
            this.$http.get(url).then(response => {
                var res = response.body
                console.log(res);
                if (res.code == 0) {
                    if (this.type == 'choose') {
                      for (var i = 0; i < res.data.length; i++) {
                          var item = res.data[i]
                          if (item.status) {
                              this.devices.push(item)
                              if (this.$store.state.isAllDevice) {
                                  this.chosenDevices.push(item)
                              } else if (this.$store.state.chosenDevices.length) {
                                  this.chosenDevices = this.$store.state.chosenDevices
                              }
                          }
                      }
                    } else {
                        this.devices = res.data
                    }
                } else {
                    $toast.show(res.message)
                }
            }, response => {
                $toast.show(response.body)
            });
        }
    }
}
</script>
