<template>
    <md-button class="confirm_button button button-assertive button-block" @click.native="submitInfo">{{btnTitle}}</md-button>
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
      left: 10px;
      right: 10px;
      bottom: 0;
    }
</style>
