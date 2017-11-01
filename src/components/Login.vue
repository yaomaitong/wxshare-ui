<template>
  <div class="page" v-nav="{title: '用户登录', showBackButton: false}">

    <div class="page-content padding-top">

      <!-- type: text, password, email, tel -->
      <von-input type="text" v-model="username" placeholder="用户名" label="用户名"></von-input>
      <von-input type="password" v-model="password" placeholder="密码" label="密码" style="margin-bottom: 5px;"></von-input>

      <div class="padding">
        <button class="button button-positive button-block">登录</button>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    }
  }
</script>
