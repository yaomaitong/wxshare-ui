<template>
  <div class="page has-navbar" v-nav="{title: '任务列表', showBackButton:true} ">
      <div class="page-content">
        <router-link :to="{path: '/taskProcess', query:{taskid:task.id}}" v-for="task in this.taskListArr" class="task_list">
            <img class="task_li_img" :src=task.user_avatar />
            <div>
              <span>{{task.user_name}}({{task.user_id}})</span>
            </div>
              <span>创建时间:{{task.created}}</span>
        </router-link>
      </div>
  </div>
</template>

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
</style>

<script>
    import {baseUrl} from '../../config/env'

    export default {
        data () {
            return {
                taskListArr : [],
                pageNo : 1
            }
        },
        mounted () {
            this.loadData()
        },
        methods : {
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
                  console.log(response.body);
              }, response=> {
                  $toast.show('请求数据失败:'+response)
                  console.log(response.body);
              })

            }
        }
    }

</script>
