<template>
  <div class="article-page">
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    <!-- 文章标题 -->
    <h3 class="article-title">
      {{ artInfo.title }}
    </h3>
    <!-- 文章作者 -->
    <van-cell :title="artInfo.aut_name" class="author">
      <template #icon>
        <van-image
          round
          width="0.9333rem"
          height="0.9333rem"
          :src="artInfo.aut_photo"
          class="headPic"
        />
      </template>
      <template #label>
        <p class="time">{{ articleLabel }}</p>
      </template>
      <template>
        <van-button
          round
          type="info"
          @click="attentionAuthor"
          v-if="!isFollowed"
          ><van-icon name="plus" />关注</van-button
        >
        <van-button round type="info" @click="cancelAttention" v-else
          ><van-icon name="success" />已关注</van-button
        >
      </template>
    </van-cell>
    <!-- 文章内容 -->
    <div v-html="artInfo.content" class="main"></div>
    <!-- 分割线 -->
    <van-divider>正文结束</van-divider>
    <!-- 评论区 -->
    <div class="commentList" v-if="artCommentList.length > 0">
      <van-list
        v-model="loadingCom"
        :finished="finishedCom"
        finished-text="没有更多了"
        @load="onLoadCom"
      >
        <van-cell
          :title="item.aut_name"
          class="author"
          v-for="item in artCommentList"
          :key="item.com_id"
        >
          <!-- 头像 -->
          <template #icon>
            <van-image
              round
              width="0.9333rem"
              height="0.9333rem"
              :src="item.aut_photo"
              class="headPic"
            />
          </template>
          <!-- 评论的内容 -->
          <template #label>
            <p class="comment-content">{{ item.content }}</p>
            <p class="time">
              <span>{{ item.pubdate | commentTimer }}</span>
              <van-button round type="default" @click="showComInComFn(item)"
                >回复{{ item.reply_count }}</van-button
              >
            </p>
          </template>
          <template>
            <van-icon name="good-job-o" />
            <span>赞</span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!-- 底部导航 -->
    <van-cell class="bottom-nav">
      <template #title>
        <van-button round type="default" @click="showComArea = true"
          >写评论</van-button
        >
        <van-icon name="comment-o" :badge="artInfo.comm_count" />
        <van-icon
          name="star-o"
          :class="{ shoucang: isCollected }"
          @click="collectArt"
        />
        <van-icon name="good-job-o" />
        <van-icon name="share" />
      </template>
    </van-cell>
    <!-- 弹出层填写评论 -->
    <van-popup
      class="popupArea"
      v-model="showComArea"
      position="bottom"
      :style="{ height: '20%' }"
    >
      <van-field
        class="comArea"
        v-model="comArea"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <div>
        <van-button
          type="default"
          class="prpupBtn"
          :class="{ highlighted: comArea.length > 0 }"
          :disabled="comArea.length === 0"
          @click="releaseFn"
          >提交</van-button
        >
      </div>
    </van-popup>
    <!-- 弹出层 楼中楼 -->
    <van-popup
      v-model="showComInCom"
      position="bottom"
      :style="{ height: '100%' }"
      class="popup-comIncom"
    >
      <van-nav-bar left-arrow @click-left="ClickLeftComCom">
        <template #title> {{ ComInComInfo.reply_count }}回复 </template>
      </van-nav-bar>
      <van-cell :title="ComInComInfo.aut_name" class="author">
        <!-- 头像 -->
        <template #icon>
          <van-image
            round
            width="0.9333rem"
            height="0.9333rem"
            :src="ComInComInfo.aut_photo"
            class="headPic"
          />
        </template>
        <!-- 评论的内容 -->
        <template #label>
          <p class="comment-content">{{ ComInComInfo.content }}</p>
          <p class="time">
            <span>{{ ComInComInfo.pubdate | commentTimer }}</span>
            <van-button round type="default"
              >回复{{ ComInComInfo.reply_count }}</van-button
            >
          </p>
        </template>
        <template>
          <van-icon name="good-job-o" />
          <span>赞</span>
        </template>
      </van-cell>
      <!-- 评论中的评论列表 -->
      <van-cell title="全部回复" />
      <div class="mainCom">
        <van-list
          v-model="loadingComInCom"
          :finished="finishedComInCom"
          finished-text="没有更多了"
          @load="onLoadComInCom"
          :immediate-check="false"
        >
          <van-cell
            :title="ComInComInfo.aut_name"
            class="author"
            v-for="item in ComInComAll"
            :key="item.com_id"
          >
            <!-- 头像 -->
            <template #icon>
              <van-image
                round
                width="0.9333rem"
                height="0.9333rem"
                :src="item.aut_photo"
                class="headPic"
              />
            </template>
            <!-- 评论的内容 -->
            <template #label>
              <p class="comment-content">{{ item.content }}</p>
              <p class="time">
                <span>{{ item.pubdate | commentTimer }}</span>
                <van-button round type="default"
                  >回复{{ item.reply_count }}</van-button
                >
              </p>
            </template>
            <template>
              <div
                @click="comInComGoodjob(item)"
                :class="{ curGoodJob: item.is_liking }"
              >
                <van-icon name="good-job-o" />
                <span>赞</span>
                <span v-show="item.like_count !== 0">{{
                  item.like_count
                }}</span>
              </div>
            </template>
          </van-cell>
        </van-list>
      </div>
      <!-- 楼中楼底部评论按钮 -->
      <van-button
        round
        type="primary"
        size="large"
        class="comInComBtn"
        @click="showComIncomArea"
        >发布评论</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import {
  articleConAPI,
  commentAPI,
  releaseCommentAPI,
  attentionAPI,
  cancelAttentionAPI,
  collectArtAPI,
  cancelCollectAPI,
  goodJobAPI,
  cancelgoodJobAPI
} from '@/api/article'
// 时间处理
import dayjs from '@/utils/dayjs'
// 引入图片预览
import { ImagePreview } from 'vant'
export default {
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  data() {
    return {
      // 文章信息
      artInfo: {},
      // 文章评论列表
      artCommentList: [],
      // 最后一条评论的id
      lastCommitId: '',
      loadingCom: false,
      finishedCom: false,
      // 评论输入框
      showComArea: false,
      comArea: '',
      // 楼中楼
      showComInCom: false,
      ComInComInfo: {},
      ComInComAll: [],
      lastComInComId: '',
      loadingComInCom: false,
      finishedComInCom: false,
      // 关注按钮
      isFollowed: false,
      isCollected: false,
      flag: 1 // 1表示对当前文章评论
    }
  },
  computed: {
    // 文章发布时间，几年前
    articleLabel() {
      const time = dayjs(this.artInfo.pubdate).fromNow()
      return time
    }
  },
  filters: {
    // 评论发布时间
    commentTimer: (comtime) => {
      const time = dayjs(comtime).fromNow()
      return time
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go('-1')
    },
    // 获取新闻详细内容
    async geiContent() {
      const res = await articleConAPI(this.$route.params.id)
      // console.log(res)
      this.artInfo = res.data.data
    },
    // 获取文章评论内容
    async getArtComment(type, id, offset) {
      try {
        const res = await commentAPI(type, id, offset)
        // console.log(res)
        // 没有数据就设置加载完成
        if (res.data.data.results.length === 0) {
          return (this.finishedCom = true)
        }
        this.artCommentList.push(...res.data.data.results)
        this.lastCommitId =
          this.artCommentList[this.artCommentList.length - 1].com_id
        this.loadingCom = false
      } catch (error) {
        this.$toast.fail('获取评论失败')
      }
    },
    // 获取楼中楼评论内容
    async getComInComment(type, id, offset) {
      try {
        const res = await commentAPI(type, id, offset)
        // console.log(res)
        // 没有数据就设置加载完成
        if (res.data.data.results.length === 0) {
          return (this.finishedComInCom = true)
        }
        this.ComInComAll.push(...res.data.data.results)
        this.lastComInComId = res.data.data.end_id
        this.loadingComInCom = false
      } catch (error) {
        this.$toast.fail('获取评论失败')
      }
    },
    // 楼中楼列表加载更多
    async onLoadComInCom() {
      await this.getComInComment(
        'c',
        this.ComInComInfo.com_id,
        this.lastComInComId
      )
    },
    // 加载文章更多评论
    async onLoadCom() {
      await this.getArtComment('a', this.$route.params.id, this.lastCommitId)
    },
    // 发布评论发起请求的方法
    async releaseComment(target, val, id) {
      // 对当前文章发布评论
      try {
        await releaseCommentAPI(target, val, id)
        this.$toast.success('发布评论成功')
        this.comArea = ''
      } catch (error) {
        this.$toast.fail('发布评论失败')
      }
    },
    // 发布评论
    async releaseFn() {
      // 如果处于楼中楼状态就评论楼中楼
      if (this.showComInCom) {
        this.flag = 0
      }
      if (this.flag === 1) {
        // 对当前文章评论
        await this.releaseComment(this.$route.params.id, this.comArea)
        this.showComArea = false
        this.artCommentList = []
        // 更新页面
        await this.getArtComment('a', this.$route.params.id)
        await this.geiContent('a', this.$route.params.id)
      } else {
        // console.log(this.$route.params.id)
        // 楼中楼评论
        await this.releaseComment(
          this.ComInComInfo.com_id,
          this.comArea,
          this.$route.params.id
        )
        this.showComArea = false
        // 更新页面
        this.artCommentList = []
        await this.getArtComment('a', this.$route.params.id)
        this.ComInComAll = []
        this.lastComInComId = ''
        await this.getComInComment('c', this.ComInComInfo.com_id)
        this.ComInComInfo = this.artCommentList.find((item) => {
          return item.com_id === this.ComInComInfo.com_id
        })
        // 重置为评论文章状态
        this.flag = 1
        this.finishedComInCom = false
      }
    },
    // 显示楼中楼
    async showComInComFn(obj) {
      this.showComInCom = true
      this.ComInComInfo = obj
      this.ComInComAll = []
      this.finishedComInCom = false
      await this.getComInComment('c', this.ComInComInfo.com_id)
    },
    // 关闭楼中楼
    ClickLeftComCom() {
      this.showComInCom = false
    },
    // 关注用户
    async attentionAuthor() {
      try {
        await attentionAPI(this.artInfo.aut_id)
        this.isFollowed = true
      } catch (error) {
        this.$toast.fail('关注失败')
      }
    },
    // 取消关注用户
    async cancelAttention() {
      try {
        await cancelAttentionAPI(this.artInfo.aut_id)
        this.isFollowed = false
      } catch (error) {
        this.$toast.fail('取消关注失败')
      }
    },
    // 收藏文章
    async collectArt() {
      // 如果未收藏就收藏
      if (this.isCollected === false) {
        try {
          await collectArtAPI(this.artInfo.art_id)
          this.isCollected = true
          this.$toast.success('收藏成功')
        } catch (error) {
          this.$toast.fail('收藏失败')
        }
        return
      }
      // 已收藏就取消
      try {
        await cancelCollectAPI(this.artInfo.art_id)
        this.isCollected = false
        this.$toast.success('取消收藏成功')
      } catch (error) {
        this.$toast.fail('取消关注失败')
      }
    },
    // 弹出评论框楼中楼
    showComIncomArea() {
      this.showComArea = true
    },
    // 楼中楼点赞
    async comInComGoodjob(item) {
      console.log(item)
      if (!item.is_liking) {
        // 点赞的情况
        try {
          await goodJobAPI(item.com_id)
          this.$toast.success('点赞成功')
          // 更新页面
          this.ComInComAll = []
          this.lastComInComId = ''
          await this.getComInComment('c', this.ComInComInfo.com_id)
        } catch (error) {
          this.$toast.fail('点赞失败')
        }
      } else {
        //  取消楼中楼点赞
        try {
          const res = await cancelgoodJobAPI(item.com_id)
          console.log(res)
          this.$toast.success('取消点赞成功')
          // 更新页面
          this.ComInComAll = []
          this.lastComInComId = ''
          await this.getComInComment('c', this.ComInComInfo.com_id)
        } catch (error) {
          this.$toast.fail('取消点赞失败')
        }
      }
    }
  },
  // cerated阶段
  async created() {
    // 获取新闻内容
    await this.geiContent('a', this.$route.params.id)
    // 获取文章评论内容
    await this.getArtComment('a', this.$route.params.id)
    this.isFollowed = this.artInfo.is_followed
    this.isCollected = this.artInfo.is_collected
  },
  mounted() {
    // 图片预览
    this.$nextTick(function () {
      const main = document.querySelector('.main')
      // console.log(main)
      main.addEventListener('click', function (e) {
        const imgs = document.querySelectorAll('.main img')
        // console.log(imgs)
        const arr = []
        imgs.forEach((item) => {
          arr.push(item.currentSrc)
        })
        // 判断元素是不是img图片
        if (e.target.nodeName === 'IMG') {
          const startPosition = arr.findIndex((item) => {
            return item === e.target.src
          })
          ImagePreview({ images: arr, startPosition })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.article-page {
  padding-bottom: 100px;
  .van-nav-bar {
    background-color: #3296fa;

    /deep/ .van-nav-bar__title {
      color: #fff;
    }
    /deep/ .van-icon {
      color: #fff;
    }
  }
  .article-title {
    font-size: 40px;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .headPic {
    margin-top: 10px;
    margin-right: 20px;
  }
  .author {
    padding-top: 0;
    padding-bottom: 0;
    .van-cell__label {
      margin: 0;
    }
    .time {
      margin: 0;
      .van-button {
        position: relative;
        top: -10px;
        margin-left: 20px;
        width: 130px;
        height: 48px;
        line-height: 48px;
        font-size: 12px;
        color: #222;
      }
    }
    .comment-content {
      font-size: 32px;
      color: #222;
      word-break: break-all;
      text-align: justify;
    }
    .van-button {
      margin-top: 10px;
      font-size: 0.32rem;
      padding: 0;
      width: 170px;
      height: 60px;
    }
  }
  .main {
    word-break: break-all;
    box-sizing: border-box;
    width: 100%;
    padding: 55px 32px;
    font-size: 12px;
    /deep/ img {
      width: 100%;
    }

    /deep/ pre {
      padding: 0.21333rem;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 0.04rem;
    }
  }
  // 底部导航
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    .van-cell__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .van-button {
      width: 282px;
      height: 46px;
      color: #ccc;
    }
    .van-icon {
      font-size: 40px;
    }
  }
  // 弹出层
  .popupArea {
    display: flex;
    .prpupBtn {
      margin-top: 90px;
      width: 120px;
      border: 0;
    }
    .highlighted {
      color: red;
    }
  }
  .comArea {
    /deep/ .van-cell__value {
      padding: 20px 32px;
      background-color: #f5f7f9;
      /deep/ .van-field__body {
        width: 600px;
        height: 180px;
      }
    }
  }
  .comInComBtn {
    position: fixed;
    bottom: 0;
  }
  .popup-comIncom {
    .mainCom {
      padding-bottom: 100px;
    }
  }
  .shoucang {
    color: #3296fa;
  }
  .curGoodJob {
    color: #3296fa;
  }
}
</style>
