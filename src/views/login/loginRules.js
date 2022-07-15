export const phoneRules = [
  { required: true, message: '请填写手机号' },
  {
    pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    message: '请填写正确的手机号'
  }
]
export const codeRules = [
  { required: true, message: '请填写验证码' },
  {
    pattern: /^\d{6}$/,
    message: '请填写正确的验证码'
  }
]
