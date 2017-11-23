<template>
    <div class="page">
        <div class="page-content">
            <div class="head_img_container text-center">
              <img :src=this.$store.state.user.avatar class="head_img" />
              <p class="user_name">
                {{this.$store.state.user.name }}
              </p>
            </div>
            <div>
                <cells :items="entrances" :on-cell-click="onCellClick" row="2" col="2"></cells>
            </div>
        </div>
    </div>
</template>

<script src="https://g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js" type="text/javascript" charset="utf-8"></script>

<script>
import './dingtalk.js'
import {baseUrl} from '../../config/env'

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
    created () {
      // $toast.show("清除数据")
      this.$store.commit('clear')
      let dd = window.dd
      dd.biz.navigation.setTitle({
          title : '药脉通分享',
      });
      let username = this.$store.state.user.name
      let isdev = false//(process.env.NODE_ENV == 'development')
      if (username || isdev) {
        return 0
      }

      // $loading.show('正在验证身份信息...')
      var url = baseUrl + 'dingtalk/auth?url=' + window.location
      console.log(url);
      this.$http.get(url).then(response => {
          var res = response.body
          console.log(res);
          if (res.code == 0) {
            var config = res.data
            this.authDingTalk(config)
          } else {
              $toast.show('dingtalk/auth:'+res.message)
          }
      }, response => {
          $toast.show(response.body)
      });
    },
    methods: {
      authDingTalk (_config) {
        console.log("begin auth");
        let dd = window.dd
        let that = this
        dd.config({
            agentId: _config.agentId,
            corpId: _config.corpId,
            timeStamp: _config.timeStamp,
            nonceStr: _config.nonceStr,
            signature: _config.signature,
            jsApiList: [
                'runtime.info',
                'device.notification.prompt',
                'biz.chat.pickConversation',
                'device.notification.confirm',
                'device.notification.alert',
                'device.notification.prompt',
                'biz.chat.open',
                'biz.util.open',
                'biz.user.get',
                'biz.contact.choose',
                'biz.telephone.call',
                'biz.ding.post'] //必填，需要使用的jsapi列表
        });

        dd.ready(function () {
            dd.runtime.info({
                onSuccess: function (info) {
                    // alert('runtime info: ' + JSON.stringify(info));
                },
                onFail: function (err) {
                    alert('runtime fail: ' + JSON.stringify(err));
                }
            });

            dd.runtime.permission.requestAuthCode({
                corpId: _config.corpId, //企业id
                onSuccess: function (info) {
                    // alert('authcode' + info.code + "然后开始请求" + that);
                    var url = baseUrl + 'dingtalk/userinfo?code=' + info.code
                    console.log(url);
                    that.$http.get(url).then(response => {
                        var res = response.body
                        console.log(res);
                        if (res.code == 0) {
                            $loading.hide()
                            var data = res.data
                            var userId = data.user_id
                            var userName = data.name
                            var userAvatar = data.avatar
                            that.$store.commit('setUserInfo', {id:userId, name:userName, avatar:userAvatar})
                          // alert(JSON.stringify(data))
                        } else {
                            $toast.show('getuserinfo:'+res.message)
                        }
                    }, response => {
                        $toast.show(response.body)
                    });
                },
                onFail: function (err) {
                    alert('requestAuthCode fail: ' + JSON.stringify(err));
                }
            });

        });

        dd.error(function (err) {
            alert('dd error: ' + JSON.stringify(err));
        });

      },
      onCellClick (obj) {
        switch (obj) {
          case 0:
              $router.forward('/addShare')
            break;
          case 1:
              $router.forward('/taskList')
            break;
          case 2:
              $router.forward({path : '/chooseDevices', query : {type : 'set'}})
            break;
          case 3:
              $toast.show("敬请等待...")
            break;
          default:
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

  .user_name {
    margin-top: 10px;
    font-size: 18px;
  }
</style>
