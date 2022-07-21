<template>
  <div class="history-page">
    <van-cell title="搜索历史">
      <template #default>
        <i class="iconfont icon-shanchu" @click="editFn" v-if="editShow"></i>
        <div v-else>
          <span @click="removeList">全部删除</span>
          <span class="finishBtn" @click="editShow = true">完成</span>
        </div>
      </template>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in historyList"
      :key="index"
      @click="searORreomve(item, index)"
    ></van-cell>
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from '@/utils/localStorage'

export default {
  watch: {
    historyList(val) {
      console.log(val)
    }
  },
  data() {
    return {
      editShow: true,
      historyList: getItem('SEARCH_HIS') || []
    }
  },
  methods: {
    editFn() {
      this.editShow = false
    },
    searORreomve(val, index) {
      // 不处于编辑状态就传值
      if (this.editShow) {
        this.$parent.iptVal = val
        this.$parent.onSearch()
      } else {
        console.log(index)
        this.historyList.splice(index, 1)
        setItem('SEARCH_HIS', this.historyList)
      }
    },
    removeList() {
      this.historyList = []
      removeItem('SEARCH_HIS')
    }
  }
}
</script>

<style lang="less" scoped>
.finishBtn {
  margin-left: 20px;
}
</style>
