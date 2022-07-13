<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <van-nav-bar title="登录" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" color="#fff" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        type="number"
        maxlength="11"
        name="phoneNum"
        placeholder="请输入11位手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '请填写正确的手机号'
          }
        ]"
      >
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        maxlength="6"
        name="phoneNum"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '请填写正确的验证码'
          }
        ]"
      >
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <van-count-down
            :time="6 * 1000"
            v-if="countDownShow"
            @finish="countDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            round
            class="codeBtn"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI, sendSmsAPI } from '@/api/index'
export default {
  data() {
    return {
      countDownShow: false,
      // 手机输入框内容和验证码内容
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 点击提交,满足规则触发提交事件
    async onSubmit() {
      try {
        const res = await loginAPI(this.user)
        // console.log(res)
        // 将token存入vuex中并存入本地
        this.$store.commit('setUserToken', res.data.data)
        this.$router.back()
      } catch (err) {
        // console.log(err)
        if (err.response && err.response.status === 400) {
          this.$toast.fail('手机号或者验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍微再试')
        }
      }
    },
    // 发送验证码事件
    async onSendSms() {
      // 验证手机号是否正确
      this.$refs.loginForm.validate('phoneNum')
      // 让倒计时显现
      this.countDownShow = true
      // 发送验证码请求
      try {
        const res = await sendSmsAPI(this.user.mobile)
        // console.log(res)
        if (res.status === 200) {
          this.$toast.success('短信验证码发送成功')
        }
      } catch (err) {
        this.$toast.fail('发送失败，请稍微再试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  // 顶部
  .van-nav-bar {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 31px;
    }
  }
  //表单部分
  .van-form {
    /deep/ .van-field__left-icon {
      margin-right: 40px !important;
      .iconfont {
        font-size: 37px;
      }
    }
    // 发送验证码按钮
    .codeBtn {
      width: 152px;
      height: 46px;
      background-color: #ededed;
      border-radius: 23px;
      font-size: 22px;
      padding: 0;
      color: #666666;
    }
  }
}
</style>
