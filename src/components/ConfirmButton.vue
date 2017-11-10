<template>
    <md-button class="confirm_button" @click.native="submitInfo">{{btnTitle}}</md-button>
</template>

<script>
  export default {
    props: {
        btnTitle: {
          type : String,
          default : "提交"
        },
        submit: {
            default: null,
            type: Function
      },
    },
    methods : {
      submitInfo () {
        // if (this.submit) {
            this.submit()
        // } else {
            // $toast.show('默认的方法')
        // }
      }
    }
  }
</script>

<style>
    .confirm_button {
      position:fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #EA5A49;
      height: 44px;
      color: #fff;
      font-size: 18px;
      text-align: center;
      line-height: 44px;
      z-index: 9;
    }
</style>
