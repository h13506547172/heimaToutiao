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
        :rules="phoneRules"
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
        :rules="codeRules"
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
// 引入手机校验规则,引入的校验规则要先在data注册
import { phoneRules, codeRules } from './loginRules'
export default {
  data() {
    return {
      // 表单校验规则
      phoneRules,
      codeRules,
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
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const res = await loginAPI(this.user)
        // console.log(res)
        this.$toast.success('登录成功')
        // 将token存入vuex中并存入本地
        this.$store.commit('setUserToken', res.data.data)
        this.$router.back()
        // 先跳转再显示跳转成功
        this.$toast.success('登录成功')
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
      try {
        // 验证手机号是否正确.validate返回一个promise对象
        await this.$refs.loginForm.validate('phoneNum')
        // 发送验证码请求
        const res = await sendSmsAPI(this.user.mobile)
        // console.log(res)
        if (res.status === 200) {
          this.$toast.success('短信验证码发送成功')
        }
        // 让倒计时显现
        this.countDownShow = true
      } catch (err) {
        // 表单验证失败的情况
        if (!err.response) {
          this.$toast.fail('输入的手机号有误')
        } else {
          // 后端返回错误
          console.log(err)
          const status = err.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(err.response.data.message)
          }
        }
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
