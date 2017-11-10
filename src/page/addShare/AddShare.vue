<template>
  <div class="page has-navbar"
   v-nav="{
     title: '新建分享',
     showBackButton:true,
     onBackButtonClick: back
   }">
    <div class="page-content has_bottom_button">
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
        <von-toggle text="强制分享" v-model="isforce" @change.native='change'></von-toggle>

        <!-- 预览手动设置的信息 -->
        <list v-if="$store.state.sourceType == '手动设置'">
          <div class="item item-divider">
            手动设置信息预览:
          </div>
          <item>
            标题
            <span class="item-note">
                {{$store.state.customShareInfo.title}}
            </span>
          </item>
          <item>
            描述
            <span class="item-note">
                {{$store.state.customShareInfo.desc}}
            </span>
          </item>
          <item>
              网址
            <span class="item-note">
                {{$store.state.customShareInfo.url}}
            </span>
          </item>
          <item>
              图片
              <span>
                  <img class="previewImg" :src="$store.state.customShareInfo.imgUrl">
              </span>
          </item>
        </list>

        <!-- 预览新闻选择信息 -->
        <list v-if="$store.state.sourceType == '新闻列表'">
            <div class="item item-divider">
                已选择新闻:
            </div>
            <item v-for='item in $store.state.chosenNews'>
              <img class="news_icon" :src=item.previewImg.middle />
              <span class="news_title">
                {{ item.postTitle }}
              </span>
            </item>
        </list>

      </list>
    </div>
    <ConfirmButton btnTitle="确定" :submit='submitInfo' />
  </div>
</template>

<script>
import {baseUrl} from '../../config/env'

export default {
    data() {
      return {
        isforce: false,
      }
    },
    methods: {
        change () {
            // $toast.show('开关' + this.isforce)
        },
        back () {
            //清除数据
            this.$store.commit('clear')
            $router.back({path: '/'})
        },
        onClick (index) {
            if (index == 0) {
                $router.forward('/chooseSource')
            } else if (index == 1) {
                $router.forward({path : '/chooseDevices', query : {type : 'choose'}})
            }
        },
        submitInfo () {
            if (this.$store.state.sourceType == '请选择') {
                $toast.show('请选择分享来源')
                return
            }
            if (this.$store.state.deviceCount == 0) {
                $toast.show('请选择分享的设备')
                return
            }
            var contentArr = []
            if (this.$store.state.sourceType == '手动设置') {
                var content = {
                                "id": '0',
                                "type": "manual",
                                "title":this.$store.state.customShareInfo.title,
                                "image_url":this.$store.state.customShareInfo.imgUrl,
                                "url":this.$store.state.customShareInfo.url,
                                "desc":this.$store.state.customShareInfo.desc,
                                "force_share": this.isforce
                              }
                contentArr.push(content)
            } else {
                for (var i = 0; i < this.$store.state.chosenNews.length; i++) {
                      var news = this.$store.state.chosenNews[i]
                      var content = { "id":news.id,
                                      "type": "news",
                                      "title":news.postTitle,
                                      "image_url":news.previewImg.middle,
                                      "url":news.url,
                                      "force_share": this.isforce,
                                      "desc":news.postExcerpt
                                    }
                      contentArr.push(content)
                }
            }

            var deviceArr = []
            if (this.$store.state.isAllDevice == false) {
                for (var i = 0; i < this.$store.state.chosenDevices.length; i++) {
                    var device = this.$store.state.chosenDevices[i]
                    deviceArr.push(device.id)
                }
            }

            var sendParams = {'contents':contentArr, 'push_devices': deviceArr}
            var url = baseUrl + 'v1/task/create' + '?userId=3403048125'
            this.$http.post(url, sendParams)
            .then(response => {
                var res = response.body
                console.log(res);
                if (res.code == 0) {
                    var taskId = res.data.task_id
                    $router.forward({path : '/taskProcess', query : {taskid : taskId}})
                    // $toast.show('操作成功:'+res.data)
                } else {
                    $toast.show('操作失败' + res.message)
                }
            }, response => {
                $toast.show('操作失败,请查看consolelog')
                console.log(response);
            });
         }
    }
}
</script>

<style>
  .has_bottom_button {
      margin-bottom: 60px;
  }
  .toggle-force {
      position: absolute;
      right:5%;
      top:51%;
      transform: translateY(-49%);
      width: 6rem;
      height: 1.5rem;
  };
  .preview {
      margin-top: 10px;
      background-color: #ffffff;
  };
  .previewImg {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  .news_icon {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .news_title {
      margin-left: 30px;
  }
</style>
