<template>
  <div class="page has-navbar" v-nav="{title: '设置分享内容', showBackButton:true} ">
    <div class="page-content">
      <list>
        <von-input type="text" v-model="inputUrl" placeholder="请输入分享的网址" label="网址" floating-label="true"></von-input>
        <von-input type="text" v-model="inputTitle" placeholder="请输入分享的标题" label="标题" floating-label="true"></von-input>
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

// npm install vue-img-inputer -D
    import VueImgInputer from 'vue-img-inputer'
    export default {
          components: {
              VueImgInputer
          },
          data () {
            return {
              inputUrl : this.$store.state.customShareInfo.url,
              inputTitle : this.$store.state.customShareInfo.title,
              picValue : this.$store.state.customShareInfo.img
            }
          },
            methods: {
              uploadImage () {
                //

                const formData = new FormData()
                formData.append('file', this.picValue)
                this.$http.post('https://web1.robintse.cn/v1/upload/image', formData).then()
              },
              submitInfo(){
                let title = this.inputTitle
                let url = this.inputUrl
                if (title && url) {
                  let img = this.picValue
                  if (img) {
                    //提示图片size
                    // let size = this.picValue.size / 1024 / 1024
                    // size = size.toFixed(2)
                    // $toast.show('图片大小'+ size + 'M')

                    //图片选择完立马上传获取到url 再存储
                    this.$store.commit('setCustomShareInfo', {title, url, img})
                    //如果需要返回效果  使用
                     $router.back({ path: '/addShare' })
                     //推出效果
                     // this.$router.go(-2)

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

.input_text {
  margin-top: 0.3rem;
  border: #333 1px solid;
  padding-left: 0.5rem;
}

</style>
