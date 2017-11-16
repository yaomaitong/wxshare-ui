<template>
  <div class="page">
      <div class="page-content">
        <router-link :to="{path: '/taskProcess', query:{ taskid: task.id, from : 'list' }}" v-for="task in this.taskListArr" class="task_list">
            <img class="task_li_img" :src=task.user_avatar />
            <span class="right_content">
            <div>
              <span>{{task.user_name}}({{task.user_id}})</span>
            </div>
            <div>
              <span>{{getDeviceDesc(task)}}</span>
            </div>
            <div>
              <span>分享了{{task.push_content.length}}个内容</span>
            </div>
            <div>
              <span>创建时间: {{task.created}}</span>
            </div>
            </span>
        </router-link>
      </div>
  </div>
</template>

<script>
    import {baseUrl} from '../../config/env'

    export default {
        data () {
            return {
                taskListArr : [],
                pageNo : 1
            }
        },
        created () {
          let dd = window.dd
          dd.biz.navigation.setTitle({
              title : '历史分享',
              onSuccess : function(result) {
                  /*结构
                  {
                  }*/
              },
              onFail : function(err) {}
          });
        },
        mounted () {
            this.loadData()
        },
        methods : {
            getDeviceDesc (task) {
                var deviceStr = task.device_ids
                console.log("99999");
                console.log(deviceStr);
                var deviceArr = deviceStr.split(",")
                return "共"+deviceArr.length+"台设备"
            },
            loadData () {
              var url = baseUrl + 'v1/task/list?page=' + this.pageNo
              this.$http.get(url).then(response=> {
                  var res = response.body
                  console.log(res);
                  if (res.code == 0) {
                      this.taskListArr = res.data
                  } else {
                      $toast.show('请求数据失败:'+res.message)
                  }
              }, response=> {
                  $toast.show('请求数据失败:'+response)
                  console.log(response.body);
              })

            }
        }
    }
</script>


<style>
    .task_li_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    };
    .task_list {
      display: flex;
      border-bottom: 0.025rem solid #f1f1f1;
      padding: 0.7rem 0.4rem;
      background-color: #fff;
      border-radius: 10px;
      margin-top: 5px;
      margin-left: 5px;
      margin-right: 5px;
      color: #555;
      text-decoration: none;
    }
    .right_content {
      margin-left: 10px;
      margin-top: 5px;
    }
</style>
