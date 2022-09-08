<template>
  <div user_profile>
    <!-- 头部导航栏 -->
    <van-nav-bar
      left-arrow
      class="page-nav-bar"
      title="个人信息"
      @click-left="$router.back()"
    />
    <!-- 头部导航栏 / -->
    <input type="file" ref="file" @change="onFileChange" hidden />
    <!-- 个人信息 -->
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image round class="avater" fit="cover" :src="user.photo" />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isShow = true" />
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isgenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayShow = true"
    />
    <!-- 个人信息 / -->
    <!-- 编辑昵称 -->
    <van-popup style="height: 100%" position="bottom" v-model="isShow">
      <updataName v-if="isShow" @close="isShow = false" v-model="user.name" />
    </van-popup>
    <!-- 编辑昵称 /-->
    <!-- 编辑性别 -->
    <van-popup position="bottom" v-model="isgenderShow">
      <updataGender
        @close="isgenderShow = false"
        v-if="isgenderShow"
        v-model="user.gender"
      />
    </van-popup>
    <!-- 编辑性别/ -->
    <!-- 编辑生日 -->
    <van-popup position="bottom" v-model="isBirthdayShow">
      <updataBirthday
        v-if="isBirthdayShow"
        v-model="user.birthday"
        @close="isBirthdayShow = false"
      />
    </van-popup>
    <!-- 编辑生日 /-->
    <!-- 编辑头像 -->
    <van-popup position="bottom" v-model="isPhotoShow" style="height: 100%">
      <updataPhoto :img="img"
      v-if="isPhotoShow"
       @close="isPhotoShow = false"
       @update-photo="user.photo=$event" />
    </van-popup>
    <!-- 编辑头像 /-->
  </div>
</template>
<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { getUserProfilePI } from '@/api'
import updataName from './components/updata-name.vue'
import updataGender from './components/usdata.gender.vue'
import updataBirthday from './components/updata-biorthday.vue'
import updataPhoto from './components/updata-photo.vue'

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {
    updataName,
    updataGender,
    updataBirthday,
    updataPhoto
  },
  props: {},
  data () {
    // 这里存放数据
    return {
      user: {}, // 用户的个人信息
      isShow: false, // 昵称弹出层
      isgenderShow: false, // 性别弹出层
      isBirthdayShow: false, // 生日弹出层
      isPhotoShow: false, // 头像的弹出层
      img: null
    }
  },

  // 计算属性 类似于 data 概念
  computed: {},
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfilePI()
        //   console.log(data)
        this.user = data.data
      } catch (err) {
        this.$toast('获取用户信息失败,请稍后再试')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文件对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      console.log(this.img)
      // 展示预览图片弹出层
      this.isPhotoShow = true
      // file-input 如果选中了同一个文件不会触发chenge事件
      // 解决方法是 每次使用完毕 把它的value清空
      this.$refs.file.value = ''
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {
    this.loadUserProfile()
  }
  // 生命周期 - 挂载完成（可以访问 DOM 元素）
}
</script>
<style scoped lang="less">
.user_profile {
  .avater {
    width: 60px;
    height: 60px;
  }
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
