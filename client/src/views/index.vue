<template>
  <div class="con-box">
    <mu-appbar class="mu-appbar-header" style="width: 100%;" color="primary">
      <mu-button icon slot="left" @click="_goBack">
        <mu-icon size="36" v-if="$route.name === 'Login'" value="insert_emoticon"></mu-icon>
        <mu-icon size="36" v-else value="navigate_before"></mu-icon>
      </mu-button>
      天津商业大学图书馆约座位系统
      <mu-menu slot="right">
        <mu-button flat>菜单</mu-button>
        <mu-list slot="content">
          <mu-list-item button  v-if="$route.name === 'Login'">
            <mu-list-item-content>
              <mu-list-item-title>登陆</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="_logOff" v-if="$route.name !== 'Login'">
            <mu-list-item-content>
              <mu-list-item-title>注销</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button v-if="$route.name !== 'Login'" @click="openSimple = true">
            <mu-list-item-content>
              <mu-list-item-title>格式化</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button v-if="!pedestalState.label && $route.name !== 'Login'" @click="openPed = true">
            <mu-list-item-content>
              <mu-list-item-title>取消约座</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <mu-dialog title="格式化" width="80%" :open.sync="openSimple">
      格式化 将删除所有记录
      <div class="format-but">
        <mu-button color="primary" @click="openSimple = false"><mu-icon left value="grade"></mu-icon>Cancel</mu-button>
        <mu-button @click="_remove">delete<mu-icon right value="delete"></mu-icon></mu-button>
      </div>
    </mu-dialog>
    <mu-dialog title="取消约座" width="80%" :open.sync="openPed">
      取消约座 将去掉你在图书馆的约座记录
      <div class="format-but">
        <mu-button color="primary" @click="openPed = false"><mu-icon left value="grade"></mu-icon>Cancel</mu-button>
        <mu-button @click="_cancelPed">delete<mu-icon right value="delete"></mu-icon></mu-button>
      </div>
    </mu-dialog>
    <div class="mu-content">
      <keep-alive>
        <transition :name="transtion">
          <router-view ></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {format, cancelPed} from '@/api'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Index',
  data () {
    return {
      openSimple: false,
      openPed: false,
      animation: ['slide-left', 'slide-right', 'slide-scale']
    }
  },
  created () {
    this.$nextTick(() => {
      this.$router.push('/login')
    })
  },
  computed: {
    ...mapState([
      'pedestalState'
    ]),
    transtion () {
      return this.animation[Math.floor(Math.random() * this.animation.length)]
    }
  },
  methods: {
    ...mapMutations(['changePed', 'changeState']),
    _goBack () {
      if (this.$route.name === 'Login') return
      this.$router.go(-1)
    },
    _logOff () {
      Cookie.remove('token')
      this.changeState(true)
      this.$router.push('/login')
    },
    async _remove () {
      await format().then((result) => {
        if (!result) return
        Cookie.remove('token')
        this.openSimple = false
        this.$router.push('/login')
      })
    },
    _cancelPed () {
      cancelPed().then((result) => {
        if (!result) return
        this.openPed = false
        this.changePed({label: 'label'})
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
@import '//fonts.useso.com/css?family=Roboto:300,400,500,700,400italic';
@import 'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css';

.slide-left-enter-active {
  transition: all .5s ease;
}
.slide-left-enter, .slide-left-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateY(0%);
  opacity: 1;
}
.slide-right-enter-active {
  transition: all .5s ease;
}
.slide-right-enter, .slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-scale-enter-to {
  transform: scale(2);
  opacity: 1;
}
.slide-scale-enter-active {
  transition: all .3s ease;
}
.slide-scale-enter, .slide-scale-leave-to {
  transform: scale(1);
  opacity: 0;
}
.slide-scale-enter-to {
  transform: scale(2);
  opacity: 1;
}
.con-box {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.mu-appbar-header {
  position: fixed;
}
.mu-content {
  padding-top: 5.6rem;
  flex: 1;
  display: flex;
  flex-direction: column
}
.format-but {
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
