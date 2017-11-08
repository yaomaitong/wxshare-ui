<template>
  <div class="page has-navbar"
   v-nav="{
     title: '新建分享',
     showBackButton:true,
     onBackButtonClick: back
   }">
    <div class="page-content has_bottom_button">
      <list>
        <item class="item-icon-right" @click.native="onClick(0)">
          选择来源
          <div class="item-note">
            {{ $store.state.sourceType }}
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right" @click.native="onClick(1)">
          推送设备
          <div class="item-note">
            {{ $store.state.deviceCount }}
          </div>
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <von-toggle text="强制分享" v-model="isforce"></von-toggle>

        <!-- 预览手动设置的信息 -->
        <div class="padding item-icon-right preview" v-if="$store.state.sourceType == '手动设置'">
            <h5>手动设置信息预览:</h5>
            标题:{{$store.state.customShareInfo.title}}
            <br>
            网址:{{$store.state.customShareInfo.url}}
            <br>
            图片:
            <div>
                <img class="previewImg" src="../../img/home.png">
            </div>
        </div>

        <!-- 预览新闻选择信息 -->
        <div class="padding item-icon-right preview" v-if="$store.state.sourceType == '新闻列表'">
          <h5>已选择新闻:</h5>
            <list v-for='item in $store.state.chosenNews'>
                <p>
                  {{ item.postTitle }}
                </p>
            </list>
        </div>
      </list>
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        isforce: false,
      }
    },
    methods: {
        back () {
            //清除数据
            this.$store.commit('clear')
            $router.back({path: '/'})
        },
        onClick (index) {
            if (index == 0) {
                $router.forward('/chooseSource')
            } else if (index == 1) {
                $router.forward('/chooseDevices')
            }
        },
        submitInfo () {
            if (this.$store.state.sourceType == '请选择') {
                $toast.show('请选择分享来源')
                return
            }
            if (this.$store.state.deviceCount == 0) {
                $toast.show('请选择分享的设备')
                return
            }

            $toast.show('OK,强制分享:' + this.isforce + ',可以提交了')
        }
    }
}
</script>

<style>
  .has_bottom_button {
      margin-bottom: 60px;
  }
  .toggle-force {
      position: absolute;
      right:5%;
      top:51%;
      transform: translateY(-49%);
      width: 6rem;
      height: 1.5rem;
  };
  .preview {
      background-color: #ffffff;
  };
  .previewImg {
    width: 30%;
  }
</style>
