<template>
  <div class="input-box">
    <mu-text-field
      v-model="info.username"
      full-width
      hintText="UserName"
      label="学号"
      label-float
      icon="account_circle"
      class="input-text">
    </mu-text-field>
    <mu-text-field
      v-model="info.password"
      full-width
      hintText="Password"
      label-float
      label="密码"
      icon="locked"
      :action-icon="visibility ? 'visibility_off' : 'visibility'" :action-click="() => (visibility = !visibility)" :type="visibility ? 'text' : 'password'"
      class="input-text">
    </mu-text-field>
    <div class="input-text but-box">
        <mu-button color="primary" @click.enter="_suer">sure</mu-button>
    </div>
    <mu-snackbar :open="openOrClose" color="info" :message="message">
      <mu-button flat slot="action" @click="openOrClose = false">Close</mu-button>
    </mu-snackbar>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import {login} from '@/api'
import validator from 'validator'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      visibility: false,
      openOrClose: false,
      message: '',
      onClick: false,
      info: {
        username: '',
        password: ''
      }
    }
  },
  created () {
    this._judgeIsLogin()
  },
  methods: {
    ...mapMutations(['changePed']),
    async _judgeIsLogin () {
      let token = await Cookie.get('token')
      if (!token) return
      this.$router.push('/home')
    },
    async _suer () {
      if (this.onClick) return
      this.onClick = true
      const {username, password} = this.info
      if (!validator.isNumeric(username) || !validator.isNumeric(password)) {
        this.openOrClose = true
        this.onClick = false
        this.message = '数据不正确'
        setTimeout(() => { this.openOrClose = false }, 2000)
        return
      }
      await login({username, password}).then((result) => {
        if (!result) {
          this.openOrClose = true
          this.message = '登陆失败'
          setTimeout(() => { this.openOrClose = false }, 2000)
          this.onClick = false
          return
        }
        this.changePed(result.state)
        Cookie.set('token', result.token)
        this.$router.push('/home')
        this.onClick = false
      }).catch(() => { this.onClick = false })
    }
  }
}
</script>

<style>
.input-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
  padding: 2rem;
}
.input-text {
  margin-top: 5rem;
}
.but-box {
  display: flex;
  justify-content: flex-end
}
</style>
