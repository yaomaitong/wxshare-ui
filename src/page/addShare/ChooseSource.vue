<template>
  <div class="page">
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
      </list>
    </div>
    <ConfirmButton :submit='submitInfo' />
  </div>
</template>

<script>
    export default {
        created () {
          let dd = window.dd
          dd.biz.navigation.setTitle({
              title : '选择来源',
              onSuccess : function(result) {
                  /*结构
                  {
                  }*/
              },
              onFail : function(err) {}
          });
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
