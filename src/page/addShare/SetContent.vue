<template>
  <div class="page">
    <div class="page-content">
      <div class="input-box">
        <span>网址</span>
        <input v-model="inputUrl" class="input" type="text" name="text" value="" placeholder="请输入分享的网址">
      </div>
      <div class="input-box">
        <span>标题</span>
        <input v-model="inputTitle" class="input" type="text" name="text" value="" placeholder="请输入分享的标题">
      </div>
      <div class="input-box">
        <span>描述</span>
        <input v-model="inputDesc" class="input" type="text" name="text" value="" placeholder="请输入分享的描述">
      </div>
      <!-- <von-input type="text" v-model="inputUrl" placeholder="请输入分享的网址" label="网址" floating-label="true"></von-input>
      <von-input type="text" v-model="inputTitle" placeholder="请输入分享的标题" label="标题" floating-label="true"></von-input>
      <von-input type="text" v-model="inputDesc" placeholder="请输入分享的描述" label="描述" floating-label="true"></von-input> -->
      <list>
        <item class="item-icon-right">
          <span>图片</span>
            <div style="margin-top:0.5rem; margin-bottom:1.0rem">
              <VueImgInputer :onChange='onChange' accept="image/*" multiple v-model="picValue" theme="light" size="small"></VueImgInputer>
                <!-- <input type="file"> -->

            </div>
          </item>
          <item class="item-icon-right" v-if="$store.state.customShareInfo.imgUrl">
            当前图片:
              <div style="margin-top:0.5rem;">
                  <img :src="$store.state.customShareInfo.imgUrl" class="last_select_img">
              </div>
            </item>
      </list>
    </div>
    <ConfirmButton btnTitle="确定" :submit='submitInfo' />
  </div>
</template>


<script>
import {baseUrl} from '../../config/env'

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
                inputDesc : this.$store.state.customShareInfo.desc,
                picValue : this.$store.state.customShareInfo.imgUrl
            }
          },
          created () {
            let dd = window.dd
            dd.biz.navigation.setTitle({
                title : '设置分享内容',
                onSuccess : function(result) {
                    /*结构
                    {
                    }*/
                },
                onFail : function(err) {}
            });
          },
          methods: {
              onChange (file, fileName) {
                $toast.show(fileName)
                this.uploadImage()
              },
              uploadImage () {
                $loading.show('正在上传图片...')
                const formData = new FormData()
                formData.append('file', this.picValue)
                this.$http.post(baseUrl + 'v1/upload/image', formData).then(response => {
                    console.log(response);
                    var res = response.body
                    $loading.hide()
                    if (res.code == 0) {
                        var data = res.data
                        var url = data.image
                        //还得做一下再次进入时候的预览
                        console.log('data.image' + url);
                        this.$store.commit('setImageUrl', url)
                        $toast.show('上传成功')
                    } else {
                        $toast.show('操作失败' + res.message)
                    }
                }, response => {
                    $loading.hide()
                    $toast.show('操作失败,请查看consolelog')
                    console.log(response);
                });
              },
              submitInfo(){
                let title = this.inputTitle
                let url = this.inputUrl
                let desc = this.inputDesc
                // console.log('title:' + title);
                // console.log('url:' + url);
                // console.log('desc' + desc);
                // return
                if (title && url) {
                  if (this.$store.state.customShareInfo.imgUrl) {
                    //图片选择完立马上传获取到url 再存储
                    this.$store.commit('setCustomShareInfo', {title, url, desc})
                    //如果需要返回效果  使用
                     // $router.back({ path: '/addShare' })
                     //推出效果
                     this.$router.go(-2)
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

.last_select_img {
    height: 50px;
}

.input-box {
  border-top: 1px solid rgb(230, 230, 230);
  background-color: white;
  padding: 10px 12px;
}

span {
  color: rgba(50, 50, 50);
}

.input {
  width: 100%;
}
</style>
