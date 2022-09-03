<template>
  <div class="channel_edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title_text">我的频道</div>
      <van-button type="danger" plain round size="mini" class="edtd_btn" @click="isEdit = !isEdit">{{ isEdit ? "完成" :
          "编辑"
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my_grid">
      <van-grid-item class="grid_item" v-for="(item, index) in Channellist" :key="index"
        @click="onMyChannelClick(item, index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fiexChannels.includes(item.id)"></van-icon>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
              item.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title_text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend_itme">
      <van-grid-item icon="plus" class="grid_item" v-for="(channel, index) in recommendChannels" :key="index"
        :text="channel.name" @click="channel_btn(channel)" />
    </van-grid>
  </div>
</template>

<script>
// 这里可以导入其他文件(比如: 组件、工具js、第三方插件js、json文件、图片文件...)
// 例如: import <组件名称> from '<组件路径>';
import { ChannelAPI, addUserChannel, deleteUserChannel } from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage.js'

export default {
  // import 引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    Channellist: {
      tepe: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    // 这里存放数据
    return {
      // 所有频道
      Allchannels: [],
      // 控制关闭按钮 编辑状态的显示
      isEdit: false,
      fiexChannels: [0] // 禁止删除的id
    }
  },

  // 计算属性 类似于 data 概念
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      return this.Allchannels.filter((channel) => {
        // const channels = []
        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return !this.Channellist.find((Channellist) => {
          return Channellist.id === channel.id
        })

        // return channels
      })
    }
  },
  // 监控 data 中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getchannelAPI () {
      try {
        const { data } = await ChannelAPI()
        this.Allchannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
        console.log(err)
      }
    },
    //   添加频道
    async channel_btn (channel) {
      // 不可以直接修改父组件传递过来的参数，所以拷贝一份在data中
      // eslint-disable-next-line vue/no-mutating-props
      this.Channellist.push(channel)
      // 数据持久化处理
      // 未登录，把数据储存到本地
      // 一登录, 把数据请求接口放到线上
      if (this.user) {
        // 已登录
        try {
          // 已登录，数据存储到线上
          await addUserChannel({
            id: channel.id, // 频道 id
            seq: this.Allchannels.length // 频道的 序号
          })
          this.$toast('添加成功')
        } catch (err) {
          this.$toast('保存失败')
        }
      } else {
        // 未登陆 把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.Channellist)
      }
    },
    //   删除频道
    onMyChannelClick (item, index) {
      // 如果是编辑状态执行删除频道
      if (this.isEdit) {
        // 如果是固定频道就不删除
        if (this.fiexChannels.includes(item.id)) {
          return
        }
        // 编辑状态,执行删除频道
        // 参数一要删除的元素的开始索引(包括)
        // 参数二 删除的个数 如果不指定,则从1开始一直删除
        if (index <= this.active) {
          // 让激活频道的索引减1
          this.$emit('upactive', this.active - 1, true)
        }
        // eslint-disable-next-line vue/no-mutating-props, no-lone-blocks
        { this.Channellist.splice(index, 1) }
        // 数据持久化
        this.deleteChannel(item)
      } else {
        // 非编辑状态执行切换频道
        this.$emit('upactive', index)
      }
      // 定义删除的方法
    },
    // 删除数据持久化
    async deleteChannel (item) {
      try {
        if (this.user) {
          // 已登录，将数据存储到线上
          // eslint-disable-next-line no-undef
          await deleteUserChannel(item.id)
        } else {
          // 未登录，将数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.Allchannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前 this 实例）
  created () {
    this.getchannelAPI()
  }
}
</script>
<style scoped lang="less">
.channel_edit {
  padding: 80px 0;

  .title_text {
    font-size: 32px;
    color: #333;
  }

  .edtd_btn {
    width: 104px;
    height: 48px;
    font-size: 27px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/.grid_item {
    width: 160px;
    height: 86px;
  }

  /deep/.van-grid-item__content {
    background-color: #f4f5f6;
    white-space: nowrap;

    .text {
      font-size: 28px;
      margin-top: 0;
      color: #222;
      z-index: 9999;
    }

    .active {
      color: red;
    }

    .van-grid-item__icon-wrapper {
      // 去除定位
      position: unset;
    }

    .van-grid-item__text {
      font-size: 28xp;
      margin-top: 0;
      color: #222;
    }
  }

  /deep/.my_grid {
    .grid_item {
      .van-icon-clear {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2s;
      }
    }
  }

  /deep/.grid_itme {
    .van-grid-item__content {
      flex-direction: row;
    }

    .van-icon-plus {
      font-size: 28px;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }

  /deep/.recommend_itme {
    .grid_item {
      .van-grid-item__content {
        flex-direction: row;

        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
