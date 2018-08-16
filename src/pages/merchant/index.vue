<template>
  <div class="container">
    <div style="width: 100%">
      <!--<image :src="userInfo.avatarUrl" slot="footer" alt="需要账户登录"/>-->
      <i-cell i-class="width-default" link-type="navigateTo" is-link :url="'/pages/merchant/main'">
        <i-avatar :src="userInfo.avatarUrl" size="large" shape="square"></i-avatar>
        <div style="display: inline">
          <span class="text-info">{{userInfo.nickName}}</span>
          <span class="text-other" style="display: block;line-height: 1.2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">这是一个非常长的文本.这是一个非常长的文本.这是一个非常长的文本.这是一个非常长的文本.这是一个非常长的文本.这是一个非常长的文本.这是一个非常长的文本.</span>
        </div>
      </i-cell>
      <div v-for="(item, index, key) in menu" :key="key">
        <i-panel i-class="width-default" v-if="item.pages.length" class="cell-panel-demo" :title="item.name">
          <i-cell-group>
            <i-cell v-for="(page, pageIndex, key) in item.pages" :key="key" :title="page.name" link-type="navigateTo"
                    is-link :url="'/pages/merchant/'+item.group+'/'+page.url+'/main'">
              <i-icon size="28" slot="icon" :type="page.icon"/>
            </i-cell>
          </i-cell-group>
        </i-panel>
        <i-panel v-else class="cell-panel-demo" :title="item.name">
          <i-cell title="功能待添加"></i-cell>
        </i-panel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // 数据
    data: {
      menu: [
        {
          group: 'groupBuy',
          name: '团购',
          open: true,
          icon: '购物车',
          pages: [
            {
              name: '新建团购',
              url: 'addAndEdit',
              icon: 'add'
            },
            {
              name: '管理团购',
              url: 'manage',
              icon: 'setup'
            }
          ]
        },
        {
          group: 'member',
          name: '会员',
          icon: '会员',
          open: true,
          pages: []
        },
        {
          group: 'order',
          name: '订单',
          icon: '账单',
          open: true,
          pages: [
            {
              name: '查看订单',
              url: 'showList',
              icon: 'search'
            },
            {
              name: '商品销售统计',
              url: 'soldGoodsCount',
              icon: 'dynamic'
            }
          ]
        },
        {
          group: 'setting',
          name: '设置',
          icon: '设置',
          open: true,
          pages: [
            {
              name: '我的群',
              url: 'myMasses',
              icon: 'group'
            },
            {
              name: '我的助理',
              url: 'myAssistant',
              icon: 'clock'
            }
          ]
        }
      ]
    },
    // 接收父组件传递的值,父类参数可能会动态刷新该值,但是子组件不能修改props
    props: [],
    // 计算属性
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    // 函数集合
    methods: {},
    // 组件注册
    component: {},
    // 侦听属性
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .cell-panel-demo {
    size: 18px;
  }

  .width-default {
    width: 100%;
  }
</style>
