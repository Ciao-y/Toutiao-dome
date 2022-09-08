<template>
  <div class="updata_photo">
    <img :src="img"  class="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhotoAPI } from '@/api/index'
export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      cropper: null
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    onConfirm () {
      // console.log(this.cropper.getData())
      this.cropper.getCroppedCanvas().toBlob(async blob => {
      //   console.log(blob)
      //   updateUserPhotoAPI({
      //     photo: blob
      //   })
        this.updateUserPhotoAPI(blob)
      })
    },
    async updateUserPhotoAPI (blob) {
      const formData = new FormData()
      formData.append('photo', blob)
      const { data } = await updateUserPhotoAPI(formData)
      //   关闭弹出层
      this.$emit('close')
      //   更新视图
      this.$emit('update-photo', data.data.photo)
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
  mounted () {
    // 获取图片页面元素
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 定义裁剪模式，0：裁剪框可以扩展到画布外， 1,2,3会将裁剪框限制在画布内
      dragMode: 'move', // 拖动模式 move: 移动画布
      aspectRatio: 1, // 截图比例, 1:1可以简写为1
      autoCropArea: 1, // 自动截图区
      cropBoxMovable: false, // 截图区域是否可以移动
      cropBoxResizable: false, // 截图区的缩放功能
      background: false, // 是否显示默认背景
      movable: true // 背景图片是否可以移动，默认true
      // crop (event) { // 当移动图片是会返回的各种数据（今天的案例中不需要使用）
      //   console.log(event.detail.x)
      //   console.log(event.detail.y)
      //   console.log(event.detail.width)
      //   console.log(event.detail.height)
      //   console.log(event.detail.rotate)
      //   console.log(event.detail.scaleX)
      //   console.log(event.detail.scaleY)
      // }
    })
  },
  // 生命周期 - 创建之前
  beforeCreate () {},
  // 生命周期 - 挂载之前
  beforeMount () {},
  // 生命周期 - 更新之前
  beforeUpdate () {},
  // 生命周期 - 更新之后
  updated () {},
  // 生命周期 - 销毁之前
  beforeDestroy () {},
  // 生命周期 - 销毁完成
  destroyed () {},
  // 如果页面有 keep-alive 缓存功能，这个函数会触发
  activated () {}
}
</script>
<style scoped lang="less">
.updata_photo {
   background-color: #000;
   height: 100%;

  .toolbar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    left: 0;
    right: 0;
    bottom: 0;
    .cancel,
    .confirm {
      margin-bottom: 40px;
      width: 90px;
      height: 20px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }.img {
    max-width: 100%;
    display: block;
  }
}
</style>
