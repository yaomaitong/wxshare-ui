<template>
    <div class="page">
      <div class="page-content">
        <list style="margin-bottom:40px">
          <item>
            操作人员
            <span class="item-note">
                {{this.user.name}} ( {{this.user.id}} )
            </span>
          </item>
          <item>
              创建时间
              <span class="item-note">
                  {{this.task.created}}({{this.didFinish}})
              </span>
          </item>
          <div class="item item-divider">
            分享信息
          </div>
          <li class="device_li">
               <label class="shareinfo_title" v-for="item in this.taskTitles">{{item}}</label>
          </li>
          <li class="device_li" v-for="task in this.contents">
              <img class="task_img shareinfo_title device_title" :src="task.image_url"/>
              <label class="shareinfo_title device_title" >{{task.title}}</label>
              <label class="shareinfo_title device_title" >{{task.desc}}</label>
          </li>

          <div class="item item-divider">
            设备
          </div>
          <li class="device_li">
               <label class="tab_label" v-for="item in this.deviceTitles">{{item}}</label>
          </li>
          <div v-for='item in this.taskObj.devices'>
            <li class="device_li" @click='deviceAction(item)'>
              <label class="tab_label"> {{ item.alias }}</label>
              <label class="tab_label"> {{ item.online }}</label>
              <label class="tab_label" v-if="pushFinished(item)"> <i class="ion-checkmark-circled" style="color:#0d0"></i></label>
              <label class="tab_label" v-else> {{ deviceProcessCount(item, 'push') }}/{{item.messages.length}}</label>
              <label class="tab_label" v-if="shareFinished(item)"> <i class="ion-checkmark-circled" style="color:#0d0"></i></label>
              <label class="tab_label" v-else> {{ deviceProcessCount(item, 'share') }}/{{item.messages.length}}</label>
            </li>
            <div :class="selectDeviceId == item.id ? 'message_show' : 'message_hide'">
              <item class="message_li" v-for='message in item.messages'>
                <span style="padding-top:5px;padding-left:12px">{{taskInfoForId(message.id)}}</span>
                <span><md-button v-if="message.share_status==false" class="retry_btn" @click.native="retryAction(message)">重试</md-button></span>
              </item>
            </div>

          </div>

        </list>
      </div>
    </div>
</template>

<!-- force_share:false
id:"1e2eea2dde87423cbaea007d1bbdbb9d"
push_status:true -->

<script>
import {baseUrl} from '../../config/env'

export default {
  data () {
      return {
        didFinish: '未完成',
        taskTitles :['图像', '标题', '描述'],
        deviceTitles : ['设备编号', '在线状态', '是否推送', '是否分享'],
        taskId : '',
        from : '',
        taskObj : {},
        task: {},
        user : {},
        contents :{},
        isCancel : false,
        selectDeviceId : ''
      }
  },
  created () {
      this.taskId = this.$route.query.taskid;
      this.from = this.$route.query.from;

      let dd = window.dd
      dd.biz.navigation.setTitle({
          title : '分享进程'
      });

      if (this.from == 'add') {
        let that = this
        dd.biz.navigation.setLeft({
            control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            text: '',//控制显示文本，空字符串表示显示默认文本
            onSuccess : function(result) {
                that.$router.go(-2)
            },
            onFail : function(err) {}
        });
      }
  },
  mounted () {
      this.loadData()
  },
  destroyed () {
    this.isCancel = true
    // $toast.show("cancel task");
    if (this.from == 'add') {
      let that = this
      dd.biz.navigation.setLeft({
          control: false,//是否控制点击事件，true 控制，false 不控制， 默认false
      });
    }
  },
  methods : {
    retryAction (message) {
      var url = baseUrl + 'v1/message/replay?message_id=' + message.id
      this.$http.post(url).then(response => {
          var res = response.body
          console.log(res);
          if (res.code == 0) {
              $toast.show('操作成功')
          } else {
              $toast.show('操作失败:' + res.message)
          }
      }, response => {
          $toast.show('操作失败,请查看consolelog')
          console.log(response);
      });

      // $toast.show('messageId:'+message.id)
    },
      taskInfoForId(id) {
        var task = null
        for (var i = 0; i < this.contents.length; i++) {
          var content = this.contents[i]
          if (content.id == id) {
              task = content
              break
          }
        }
        var title = this.subStringWithL(task.title,18)
        return title
      },
      deviceAction(item) {
        if (this.selectDeviceId == '') {
            this.selectDeviceId = item.id
        } else {
            this.selectDeviceId = ''
        }
      },
      subStringWithL (text, length) {
        var res = text
          if (res.length > 8) {
              res = text.substr(0, length) + '...'
          }
          return res
      },
      pushFinished (device) {
        var pushedCount = this.deviceProcessCount(device, 'push')
        if (pushedCount == device.messages.length) {
            return true
        }
        return false
      },
      shareFinished (device) {
        var sharedCount = this.deviceProcessCount(device, 'share')
        if (sharedCount == device.messages.length) {
            return true
        }
        return false
      },
      deviceProcessCount (device, type) {
          var messages = device.messages
          let finishCount = 0
            for (var i = 0; i < messages.length; i++) {
                var item = messages[i]
                if (type == 'push') {
                    if (item.push_status) {
                        finishCount ++
                    }
                } else {
                    if (item.share_status) {
                        finishCount ++
                    }
                }
            }
          return finishCount
      },
      loadData () {
        if (this.isCancel) {
          console.log("推出页面，定时器停止");
          return false
        }
        console.log('请求数据');
        var url = baseUrl + 'v1/task/detail?task_id=' + this.taskId
        this.$http.get(url).then(response=> {
            var res = response.body
            if (res.code == 0) {
                this.taskObj = res.data
                this.task = this.taskObj.task
                this.user = this.task.user
                this.contents = this.task.contents
                this.didFinish = this.task.status == 'finished' ? '已完成' : '未完成'
                if (this.task.status == 'process') {
                    let time = this.task.created
                    time = time.replace(/-/g,':').replace(' ',':');
                    time = time.split(':');
                    var startDate = new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5]);
                    var nowDate = new Date();
                    var secs = nowDate.getTime()-startDate.getTime()
                    //一小时以内的才重新请求
                    if (secs < 60 * 60 * 1000) {
                        console.log('3s后下一次刷新');
                        // $toast.show('3s后下一次刷新');
                        setTimeout(() => {
                            this.loadData()
                        }, 3000)
                    } else {
                        $toast.show('任务超出1小时, 不再自动刷新');
                    }
                }
            } else {
                $toast.show('请求数据失败:'+res.message)
            }
            console.log(response.body);
        }, response=> {
            $toast.show('请求数据失败:'+response)
            console.log(response.body);
        })
      }
  }
}

</script>

<style>
  .tab_label {
      text-align: center;
      width: 25%;
      line-height: 25px;
  }

  .shareinfo_title {
    width: 33%;
    text-align: center;
  }

  .device_li {
      display: flex;
      border-bottom: 0.025rem solid #f1f1f1;
      padding: 0.7rem 0.4rem;
      background-color: #fff;
  }

  .device_title {
      color: #422f11;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      max-height: 32px;
      line-height: 1.2;
  }

  .task_img {
      /*background-color: #f00;*/
      margin-left: 20px;
      padding-right: 20px;
      /*width: 30px;*/
      /*max-height: 30px;*/
      max-height: 50px;
      /*max-width: 50px;*/
  }

  .message_li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
    background-color: #f0f0f0;
  }

  .message_show {
    display: block;
  }

  .message_hide {
    display: none;
  }

  .retry_btn {
    background-color: #4875de;
    border-radius: 3px;
    width: 45px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 5px;
    /*top: 50%;
    transform: translateY(-50%);*/
  }

</style>
