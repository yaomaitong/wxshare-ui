<template>
  <div class="page has-navbar" v-nav="{title: '设置分享内容', showBackButton:true} ">
    <div class="page-content text-left">
      <list>
        <item class="item-icon-right">
          网址
          <div class="input_text">
            <input type="text" name="urlLink" placeholder="分享的网址" required v-model='inputUrl'>
          </div>
        </item>
        <item class="item-icon-right">
            标题
            <div class="input_text">
                <input type="text" name="shareTitle" placeholder="分享的标题" required v-model='inputTitle'>
            </div>
        </item>
        <item class="item-icon-right">
          图片
            <div style="margin-top:0.5rem">
              <VueImgInputer accept="image/*" capture=false multiple v-model="picValue" theme="light" size="small"></VueImgInputer>
                <!-- <input type="file"> -->
            </div>
            <!-- <md-button class="addImage" @click.native="chooseImg">点击选择图片</md-button> -->
          </item>
      </list>
      <div>
          <md-button class="confirm_button" @click.native="submitInfo">提交</md-button>
      </div>
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
        	data(){
                return{
                    inputUrl:'', // 网址
                    inputTitle:'', // 标题
                    picValue,
                }
            },
            methods: {
              submitInfo(){
                if (this.inputUrl && this.inputTitle) {

                  if (this.picValue) {
                    let size = this.picValue.size / 1024 / 1024
                    size = size.toFixed(2)
                    $toast.show('图片大小'+ size + 'M')

                  } else {
                      $toast.show('图片不能为空！')
                  }
                } else {
                    $toast.show('网址或标题不能为空！')
                }
            },
            chooseImg () {
              // $toast.show('选择图片！')
                  let inputDOM = this.$refs.inputer;
                  // 通过DOM取文件数据
                  this.file    = inputDOM.files[0];
                  this.errText = '';

                  let size = Math.floor(this.file.size / 1024);
                  if (size > 5.0) {
                      // 这里可以加个文件大小控制
                      return false
                  }

                  // 触发这个组件对象的input事件
                  this.$emit('input', this.file);

                  // 这里就可以获取到文件的名字了
                  this.fileName = this.file.name;

                  // 这里加个回调也是可以的
                  this.onChange && this.onChange(this.file, inputDOM.value);
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

.input_text {
  margin-top: 0.3rem;
  border: #333 1px solid;
  padding-left: 0.5rem;
}

</style>
