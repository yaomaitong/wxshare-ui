<template>
  <div class="page has-navbar">
    <!-- 用 title / left / right 三个slot分发标题、左按钮、右按钮 -->
    <von-header theme="dark">
      <button class="button button-icon ion-ios-arrow-back" slot="left"></button>
      <span slot="title">标题文字</span>
      <button class="button button-icon ion-navicon" slot="right"></button>
    </von-header>

    <div class="page-content text-center">
      <h2 class="padding" v-text="msg"></h2>

      <router-link class="button button-assertive" to="/about">
        <i class="ion-information-circled"></i> About
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        msg: 'Hello! Vonic.'
      }
    }
  }
</script>
<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }

  .page.has-navbar .page-content {
    padding-top: 100px;
  }
</style>
