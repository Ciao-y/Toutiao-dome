<template>
  <div class="birdthday">
    <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="onConfirm"
/>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { updateUserProfileAPI } from '@/api'
import dayjs from 'dayjs'

export default {
// import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      minDate: new Date(1970, 0, 1), // 可选的最小日期
      maxDate: new Date(), // 可选的最大日期
      currentDate: new Date(this.value)

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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfileAPI({
          birthday: currentDate
        })
        //   更新视图
        this.$emit('input', currentDate)
        // 关闭弹层
        this.$emit('close')
        // 修改成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败,请检查网络')
      }
    }
  }

}
</script>
<style scoped>

</style>
