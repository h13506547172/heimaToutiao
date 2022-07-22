<template>
  <div class="user-page">
    <van-nav-bar title="个人信息" @click-left="$router.back()">
      <template #left>
        <van-icon name="cross" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 个人信息项 -->
    <van-cell title="头像" class="mes" @click="upImg">
      <template>
        <van-image
          class="head-pic"
          round
          width="0.8rem"
          height="0.8rem"
          :src="userInfo.photo"
        />
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <!-- 昵称 -->
    <van-cell title="昵称" @click="showNameUpFn">
      <template>
        <span>{{ userInfo.name }}</span>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <!-- 性别 -->
    <van-cell title="性别" @click="showSexPopup = true">
      <template>
        <span>{{ userInfo.gender == 1 ? '女' : '男' }}</span>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <!-- 生日 -->
    <van-cell title="生日" @click="showDayPopupFn">
      <template>
        <span>{{ userInfo.birthday }}</span>
        <van-icon name="arrow" />
      </template>
    </van-cell>
    <!-- 隐藏的文件上传框 -->
    <van-uploader :after-read="afterRead" v-show="false" id="upimgBtn" />
    <!-- 图片裁剪弹出层 -->
    <van-popup
      v-model="showImgUpPopup"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 图片裁剪 -->
      <div style="width: 100%; height: 100%">
        <vue-cropper autoCrop :img="this.baseImg" ref="cropper" centerBox />
      </div>
      <div class="toolbar">
        <span @click="showImgUpPopup = false">取消</span>
        <span @click="getCropData">确认</span>
      </div>
    </van-popup>
    <!-- 更新昵称弹出层 -->
    <van-popup
      v-model="showNameUp"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-nav-bar
        class="name-navbar"
        title="更新昵称"
        left-text="返回"
        right-text="确认"
        @click-left="showNameUp = false"
        @click-right="upNameFn"
      ></van-nav-bar>
      <van-field
        v-model="nameArea"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </van-popup>
    <!-- 更新性别 -->
    <van-popup
      v-model="showSexPopup"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-area
        title="更新性别"
        :area-list="sexList"
        :columns-num="1"
        @confirm="confirmFn"
        @cancel="showSexPopup = false"
      />
    </van-popup>
    <!-- 更新日期 -->
    <van-popup
      v-model="showDayPopup"
      position="bottom"
      :style="{ height: '45%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="upDayFn"
        @cancel="showDayPopup = false"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { userInfoAPI, upImgAPI, upUserInfoAPI } from '@/api/user'
export default {
  async created() {
    await this.getUserInfo()
  },
  data() {
    return {
      userInfo: {},
      // 图片裁剪弹出层
      showImgUpPopup: false,
      // base64图片
      baseImg: null,
      // 上传的file文件
      file: null,
      // 更新name
      showNameUp: false,
      nameArea: '',
      // 更新性别
      showSexPopup: false,
      sexList: {
        province_list: {
          110100: '男',
          120100: '女'
        }
      },
      // 更新生日
      showDayPopup: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  methods: {
    async getUserInfo() {
      const res = await userInfoAPI()
      // console.log(res)
      this.userInfo = res.data.data
    },
    // 点击上传图片
    upImg() {
      const upimgBtn = document.getElementById('upimgBtn')
      upimgBtn.click()
    },
    afterRead(file) {
      // console.log(file)
      this.baseImg = file.content
      this.showImgUpPopup = true
    },
    // 裁剪图片并上传
    async getCropData() {
      try {
        this.$refs.cropper.getCropData(async (data) => {
          // console.log(data)
          this.file = this.base64ImgtoFile(data)
          // console.log(this.file)
          const form = new FormData()
          form.append('photo', this.file)
          await upImgAPI(form)
          this.$toast.success('上传图片成功')
          this.showImgUpPopup = false
          this.getUserInfo()
        })
      } catch (error) {
        this.$toast.fail('上传图片失败')
      }
    },
    // base64转file文件
    base64ImgtoFile(dataurl, filename = 'file') {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const suffix = mime.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    // 更新个人信息的API
    async upUserInfo(name, gender, birthday, intro) {
      try {
        await upUserInfoAPI({
          name,
          gender,
          birthday,
          intro
        })
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    // 更新名字
    showNameUpFn() {
      this.showNameUp = true
      this.nameArea = this.userInfo.name || 'noname'
    },
    async upNameFn() {
      await this.upUserInfo(this.nameArea)
      this.showNameUp = false
      this.getUserInfo()
    },
    // 更新性别
    async confirmFn(val) {
      // console.log(val)
      const sexNum = val[0].name === '男' ? 0 : 1
      await this.upUserInfo(null, sexNum)
      this.showSexPopup = false
      this.getUserInfo()
    },
    // 更新生日
    showDayPopupFn() {
      this.showDayPopup = true
      const curDay = this.userInfo.birthday.replace('-', ',').replace('-', ',')
      this.currentDate = new Date(curDay)
    },
    async upDayFn(value) {
      // console.log(value)
      const day = dayjs(value).format('YYYY-MM-DD')
      await this.upUserInfo(null, null, day)
      this.showDayPopup = false
      this.getUserInfo()
    }
  }
}
</script>

<style lang="less" scoped>
.user-page {
  .van-nav-bar {
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      color: #fff;
      font-size: 31px;
    }
  }
  .mes {
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
    }
    .head-pic {
      margin-top: 10px;
    }
    /deep/ .van-icon {
      padding-top: 20px;
      font-size: 36px;
    }
  }
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  /deep/ .name-navbar {
    color: #fff;
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>
