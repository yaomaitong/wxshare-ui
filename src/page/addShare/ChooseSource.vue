<template>
  <div class="page has-navbar" v-nav="{title: '选择来源', showBackButton:true} ">
    <div class="page-content text-left">
      <list>
        <item class="item-icon-right" @click.native="onClick(0)">
          手动设置
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right" @click.native="onClick(1)">
          药脉通新闻资讯
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right" @click.native="onClick(2)">
          新浪微博
          <span class="icon ion-ios-arrow-right"></span>
        </item>
      </list>
      <ConfirmButton :submit='submitInfo' />
    </div>
  </div>
</template>

<script>
import ConfirmButton from '../../components/ConfirmButton.vue'
export default {
  components : {
    ConfirmButton,
  },
  methods: {
    submitInfo () {
        $toast.show('来源选择')
    },
    onClick (index) {
      if (index == 0) {
        $router.forward('/setContent')
      } else if (index == 1) {
        $router.forward('/newsList')
      }
    }
  }
}
</script>
