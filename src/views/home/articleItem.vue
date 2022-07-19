<template>
  <div>
    <!-- 一张图片 -->
    <van-cell
      v-if="obj.cover.type === 1"
      :title="obj.title"
      :label="articleLabel"
    >
      <template>
        <van-image width="2.8rem" height="1.8rem" :src="obj.cover.images[0]" />
      </template>
    </van-cell>
    <!-- 无图片 -->
    <van-cell
      v-if="obj.cover.type === 0"
      :title="obj.title"
      :label="articleLabel"
    />
    <!-- 三张图片 -->
    <van-cell v-if="obj.cover.type === 3" :title="obj.title" class="pic3">
      <template #label>
        <van-image width="2.8rem" height="1.8rem" :src="obj.cover.images[0]" />
        <van-image width="2.8rem" height="1.8rem" :src="obj.cover.images[1]" />
        <van-image width="2.8rem" height="1.8rem" :src="obj.cover.images[2]" />
        <span>{{ articleLabel }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    obj: {
      type: Object,
      require: true
    }
  },
  computed: {
    articleLabel() {
      const time = dayjs(this.obj.pubdate).fromNow()
      return `${this.obj.aut_name} ${this.obj.comm_count}评论 ${time}`
    }
  }
}
</script>

<style lang="less" scoped>
.pic3 {
  /deep/ .van-image {
    margin-right: 12px;
  }
}
</style>
