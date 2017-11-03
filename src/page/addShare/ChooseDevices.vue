<template>
  <div class="page has-navbar" v-nav="{title: '选择设备', showBackButton:true} ">
    <div class="page-content text-left">
      <list>
        <item class="item-icon-right">
          小米1
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right">
          小米1
          <span class="icon ion-ios-arrow-right"></span>
        </item>
        <item class="item-icon-right">
          小米1
          <span class="icon ion-ios-arrow-right"></span>
        </item>
      </list>
      <ConfirmButton btnTitle="确定" :submit='submitInfo' />
    </div>
  </div>
</template>

<script>
export default {
  methods : {
      submitInfo () {
        $toast.show('选择好设备')
      }
  }
}
</script>
