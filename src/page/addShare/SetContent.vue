<template>
  <div class="page has-navbar" v-nav="{title: '设置分享内容', showBackButton:true} ">
    <div class="page-content">
      <list>
        <item class="item-icon-right">
          网址
          <div class="input_text">
            <input type="text" placeholder="分享的网址" v-model='inputUrl'>
          </div>
        </item>
        <item class="item-icon-right">
            标题
            <div class="input_text">
                <input type="text" placeholder="分享的标题" v-model='inputTitle'>
            </div>
        </item>
        <item class="item-icon-right">
          图片
            <div style="margin-top:0.5rem; margin-bottom:1.5rem">
              <VueImgInputer accept="image/*" multiple v-model="picValue" theme="light" size="small"></VueImgInputer>
                <!-- <input type="file"> -->
            </div>
          </item>
      </list>
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>


<script>
    // import '../../components/global'
// npm install vue-img-inputer -D
    import VueImgInputer from 'vue-img-inputer'
    export default {
          components: {
              VueImgInputer
          },
          data () {
            return {
              inputUrl : '',
              inputTitle : '',
              picValue : ''
            }

          },
            methods: {
              submitInfo(){
                if (this.inputUrl && this.inputTitle) {

                  if (this.picValue) {
                    let size = this.picValue.size / 1024 / 1024
                    size = size.toFixed(2)
                    $toast.show('图片大小'+ size + 'M')
                    customUrl = this.inputUrl
                    customTitle = this.inputTitle
                    customImg = this.picValue
                    // $router.back('/chooseSource')
                  } else {
                      $toast.show('图片不能为空！')
                  }
                } else {
                    $toast.show('网址或标题不能为空！')
                }
            }
          }
      }
</script>

<style>

.addImage {
  /*margin-top: 0.3rem;*/
  /*width: 8rem;*/
  /*height: 1.5rem;*/
  /*line-height: 1.5rem;*/
  /*text-align: center;*/
}

.input_text {
  margin-top: 0.3rem;
  border: #333 1px solid;
  padding-left: 0.5rem;
}

</style>
