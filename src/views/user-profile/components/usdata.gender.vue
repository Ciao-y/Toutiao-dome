<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="uodata_gender">
   <van-picker
  title="标题"
  show-toolbar
  :columns="columns"
  @change="onChange"
  @confirm="onConfirm"
  @cancel="$emit('close')"
   :default-index="value"

/>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { updateUserProfileAPI } from '@/api'

export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async onConfirm () {
      try {
        const localGender = this.localGender

        const res = await updateUserProfileAPI({
          gender: localGender
        })
        console.log(res)
        //   更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        // 修改成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.localGender = index
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {}
  // 生命周期 - 挂载完成（可以访问 DOM 元素）

}
</script>
<style scoped>

</style>
