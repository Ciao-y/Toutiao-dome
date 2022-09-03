<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <van-icon slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>

    <!-- 导航栏 -->
    <van-form ref="loginForm" @submit="onSubmit" >
      <!-- 设置只能设置数字类型  maxlength 是设置长度 HTML5的新特性-->
      <van-field v-model="user.mobile"
       name="mobile" label="手机号"
       placeholder="请输入手机号"
       :rules="userFormRles.mobile"
       type="number"
       maxlength="11" clearable >
        <!-- slot老式写法 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code"
      name="code" label="密码"
      placeholder="请输入验证码"
      :rules="userFormRles.code"
      maxlength="6" type="number" >
        <!-- slot新式写法 -->
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- time是倒计时的时长  单位为毫秒-->
          <van-count-down :time="1000*10" format=" ss s" @finish="isCownShow=false" v-if="isCownShow" />
          <van-button v-else class="send-sms-btn"
          round size="small" type="default"
           native-type="button"
           @click="onSenSms"
           >发送验证</van-button>
        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '../../api/index.js'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: '246810'
      },
      isCownShow: false,
      // 手机号 验证码的验证
      userFormRles: {
        mobile: [{
          required: true, message: '手机号不能为空'
        }, { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }],
        code:
          [{
            required: true,
            message: '验证码不能为空'
          }, { pattern: /\d{6}$/, message: '请输入正确的验证码' }]
      }
    }
  },
  methods: {
    // 登录
    async onSubmit () {
      // 1. 获取表单元素
      const user = this.user
      // 2.表单验证 必须家this.$才能调用 否则报错 如果加了$还不能使用 就按需引入
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 登录中 禁用背景点击
        duration: 0 // 持续展示加载框 默认是提示两秒 如果为0持续展示
      })
      // 3. 提交请求数据
      // success  fail 可以主动的关闭 就是覆盖掉 加载状态 使用Toast,clear()也可以主动的去关闭
      try {
        const res = await loginAPI(user)
        // console.log('登錄成功', res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登錄成功')
        // 登录成功跳转
        this.$router.back()
      } catch (err) {
        // 发送失败关闭倒计时 倒计时隐藏
        this.isCownShow = false
        console.log(err)
        if (err.response.status === 400) {
          console.log('手机号或验证码错误', err)
          this.$toast.fail('手机号或验证码错误')
        } else {
          // console.log('登录失败，稍后重试', err)
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
      // 3. 根据请求结果处理后续操作
    },
    // 发送验证码前校验手机号
    async onSenSms () {
      try {
        this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过 显示倒计时 发送验证码
      this.isCownShow = true
      try {
        // 数据解构
        await sendSmsAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('请求过于频繁, 请稍后再试')
        } else {
          this.$toast('发送失败, 请稍后再试')
        }
      }
    }

  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 38px;
  }

  .van-field__button {
    height: 46px !important;
  }

  .send-sms-btn {
    width: 152px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
