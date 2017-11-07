<template>
    <div>
        <md-button class="confirm_button" @click.native="submitInfo">{{btnTitle}}</md-button>
    </div>
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
      color: #ffffff;
      font-size: 18px;
      position:fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ff0000;
      text-align: center;
      height: 3rem;
      line-height: 3rem;
    }
</style>
