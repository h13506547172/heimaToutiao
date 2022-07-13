<template>
  <!-- 登录页面 -->
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.phoneNum"
        type="number"
        name="phoneNum"
        placeholder="请输入11位手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="phoneNum"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <!-- 验证码按钮 -->
        <template #button>
          <van-button round class="codeBtn">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        phoneNum: '',
        code: ''
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
      font-size:22px;
      padding: 0;
      color: #666666;
    }
  }
}
</style>
