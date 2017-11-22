<template>
  <div class="page">
    <div class="page-content text-left has_bottom_button">
      <list>
          <div v-for="item in devices">
            <!-- 设置页面 -->
            <div v-if="(promotionIndex == 1 && item.status == true) || (promotionIndex == 0 && item.status == false)">
              <item v-if="type == 'set'">
                <div style="font-size:15px">
                  <div>
                    <span >编号:{{item.device_alias}}</span>
                  </div>
                  <div style="padding-top:10px">
                    <span>电量:{{item.power}}%</span>
                  </div>
                </div>

              <div class="device_toggle">
                <ToggleButton
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
    <div v-if="type == 'set'" class="segment">
      <button-bar class="segment_control" theme="assertive" :tab-items="promotions" :tab-index="promotionIndex"
        :on-tab-click="onTabClick"></button-bar>
    </div>
  </div>
</template>

<script>
import {baseUrl} from '../../config/env'

export default {
    data () {
      return {
          type : '',
          promotions:["未激活(0)", "已激活(0)"],
          promotionIndex: 1,
          isforce : false,
          chosenDevices: [],
          devices: [],
      }
    },
    created () {
      this.type = this.$route.query.type;
      let dd = window.dd
      dd.biz.navigation.setTitle({
          title : this.type == 'set' ? '手机管理' : '选择设备',
      });
      if (this.type == 'choose') {
        let that = this
        dd.biz.navigation.setRight({
            show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '全选',//控制显示文本，空字符串表示显示默认文本
            onSuccess : function(result) {
                that.chooseAll()
            },
            onFail : function(err) {}
        });
      }
    },
    mounted () {
        this.initData()
    },
    destroyed () {
        let dd = window.dd
        if (this.type == 'choose') {
          let that = this
          dd.biz.navigation.setRight({
              show: true,
              text: '',
          });
        }
    },
    methods : {
        onTabClick(index) {
            this.promotionIndex = index
        },
        async initData () {
            $loading.show()
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
                this.undatePromotions()
            }, response => {
                $toast.show(response)
                item.status = !toActive
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
          this.$store.commit('changeChosenDevices', {'devices':this.chosenDevices, 'isAll' :isAll})
          //返回上一页
          this.$router.go(-1);
        },
        chooseAll () {
            //先清空已选择
            if (this.chosenDevices.length == this.devices.length) {
                this.chosenDevices.splice(0,this.chosenDevices.length);
                return false
            }
            this.chosenDevices.splice(0,this.chosenDevices.length);
            for (var i = 0; i < this.devices.length; i++) {
                var item = this.devices[i]
                this.chosenDevices.push(item);
            }
        },
        undatePromotions () {
            let activeCount = 0
            let unactiveCount = 0
            for (var i = 0; i < this.devices.length; i++) {
               var device = this.devices[i]
               if (device.status) {
                 activeCount ++
               } else {
                 unactiveCount ++
               }
            }
            let activeStr = "已激活(" + activeCount + ")"
            let unactiveStr = "未激活(" + unactiveCount + ")"
            this.promotions = [unactiveStr, activeStr]
            console.log("更新promotions");
        },
        sortArr(arr){
            for(var i=0;i<arr.length-1;i++){
                for(var j=0;j<arr.length-1-i;j++){
                    var item1 = arr[j]
                    var item2 = arr[j+1]
                    if(parseInt(item1.device_alias) > parseInt(item2.device_alias)){
                        var temp=arr[j];
                        arr[j]=arr[j+1];
                        arr[j+1]=temp;
                    }
                }
            }
            return arr;
        },
        loadData () {
            var url = baseUrl + 'v1/device/list'
            this.$http.get(url).then(response => {
                var res = response.body
                console.log(res);
                $loading.hide()
                if (res.code == 0) {
                    this.sortArr(res.data)
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
                        this.undatePromotions()
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

.segment_control {
  border: none;
  background-color: #fff;
}

.von-button-bar .button-small {
  font-size: 18px;
  height: 50px;
  padding-top: 11px;
  border-radius: 0;
}

.von-button-bar {
  margin: 0 0;
}

.von-button-bar > .button:first-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
}

.von-button-bar > .button:last-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
}

.device_toggle {
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
}

</style>
