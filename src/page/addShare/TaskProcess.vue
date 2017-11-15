<template>
    <div class="page has-navbar"
    v-nav="{title: '分享进程',
    onBackButtonClick: back,
    showBackButton:true} ">
      <div class="page-content">
        <list>
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
               <label class="tab_label device_title" v-for="item in this.taskTitles">{{item}}</label>
          </li>
          <li class="device_li" v-for="task in this.contents">
              <img class="task_img tab_label device_title" :src="task.image_url"/>
              <label class="tab_label device_title" >{{task.title}}</label>
              <label class="tab_label device_title" >{{task.desc}}</label>
              <label class="tab_label device_title" >{{task.type}}</label>
          </li>

          <div class="item item-divider">
            设备
          </div>
          <li class="device_li">
               <label class="tab_label device_title" v-for="item in this.deviceTitles">{{item}}</label>
          </li>
          <li class="device_li" v-for='item in this.taskObj.devices'>
            <label class="tab_label"> {{ item.alias }}</label>
            <label class="tab_label"> {{ item.online }}</label>
            <label class="tab_label"> {{ deviceProcessInfo(item, 'push') }}</label>
            <label class="tab_label"> {{ deviceProcessInfo(item, 'share') }}</label>
          </li>
        </list>
      </div>
    </div>
</template>


<script>
import {baseUrl} from '../../config/env'

export default {
  data () {
      return {
        didFinish: '未完成',
        taskTitles :['图像', '标题', '描述', '类型'],
        deviceTitles : ['设备编号', '在线状态', '是否推送', '是否分享'],
        taskId : '',
        taskObj : {},
        task: {},
        user : {},
        contents :{},
        isCancel : false

      }
  },
  created () {
      this.taskId = this.$route.query.taskid;
  },
  mounted () {
      this.loadData()
  },
  distroyed () {
    console.log("-------------distroyed");
  },
  methods : {
    back () {
      this.isCancel = true
      console.log("cancel task");
      $router.go(-1);
    },
      deviceProcessInfo (device, type) {
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
          return finishCount + '/' + messages.length
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
                    var startDate = new Date(this.task.created);
                    var nowDate = new Date();
                    var secs = nowDate.getTime()-startDate.getTime()
                    //一小时以内的才重新请求
                    if (secs < 60 * 60 * 1000) {
                        console.log('3s后下一次刷新');
                        setTimeout(() => {
                            this.loadData()
                        }, 3000)
                    } else {
                        console.log('任务超出1小时');
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

  .device_li {
      display: flex;
      border-bottom: 0.025rem solid #f1f1f1;
      padding: 0.7rem 0.4rem;
      background-color: #fff;
  }

  .device_title {
      color: #422f11;
  }

  .task_img {
      /*background-color: #f00;*/
      padding-left: 20px;
      padding-right: 20px;
      max-height: 30px;
  }

</style>
