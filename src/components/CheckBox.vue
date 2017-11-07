<template>
    <md-button class=":unchecked">{{checked}}</md-button>
</template>

<script>
    export default {
      props: {
          checked: {
            type : Boolean,
            default : false
          },
      },
    }
</script>

<style>
    .check-box {
      position: absolute;
      right:5%;
      top:50%;
      transform: translateY(-50%);
      background-position: center;
      background-size: 1.5rem 1.5rem;
      border-radius: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      .checked {
        background-image: url('../img/select.png');
      }
      .unchecked {
        background-image: url('../img/unselect.png');
      }
    }


</style>
