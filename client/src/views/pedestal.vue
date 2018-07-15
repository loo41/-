<template>
  <div>
    <div>
      <mu-expansion-panel>
        <div slot="header">信息邮箱</div>
        <mu-text-field v-model="pedestal.email" label="Email" label-float help-text="邮箱用于接收约座信息" icon="mail_outline"></mu-text-field>
      </mu-expansion-panel>
      <mu-expansion-panel>
        <div slot="header">约座教室</div>
        <div class="class-box">
          <div>
            <mu-radio v-model="position" value="1" label="社科借阅室"></mu-radio>
            <mu-radio v-model="position" value="2" label="科技借阅室"></mu-radio>
          </div>
          <div>
            <mu-radio v-model="position" value="3" label="期刊借阅室"></mu-radio>
            <mu-radio v-model="position" value="4" label="报纸借阅室"></mu-radio>
          </div>
        </div>
        <div class="location">约座位置</div>
        <div>
          <mu-text-field
            v-model="pedestal.seat"
            full-width
            label-float
            :label="label"
            icon="favorite">
          </mu-text-field>
        </div>
      </mu-expansion-panel>
      <mu-expansion-panel>
        <div slot="header">约座时间</div>
        <div class="date-type-box">
          <mu-radio v-model="dateType" value="1" label="单天"></mu-radio>
          <mu-radio v-model="dateType" value="2" label="多天" :disabled="disabled"></mu-radio>
          <mu-radio v-model="dateType" value="3" label="多天间隔" :disabled="disabled"></mu-radio>
        </div>
        <div class="but-box" v-if="dateType === '3'">
          <mu-button fab small color="primary" @click="_add">
            <mu-icon value="add"></mu-icon>
          </mu-button>
          <mu-button  fab small color="red" @click="_remove">
            <mu-icon value="remove"></mu-icon>
          </mu-button>
        </div>
        <div>
          <mu-date-input v-if="dateType !== '3'"
            v-model="pedestal.startDate"
            label="选择开始日期"
            value-format="YYYY-MM-DD"
            :min-date="minDate"
            :max-date="maxDate"
            label-float full-width/>
          <mu-date-input
            v-if="dateType === '2'"
            v-model="pedestal.endDate"
            label="选择结束日期"
            :min-date="minDate"
            :max-date="maxDate"
            value-format="YYYY-MM-DD"
            label-float full-width/>
          <mu-date-input v-if="dateType === '3'"
            v-for="(item, index) in dateArray"
            :key="index" label="选择日期"
            v-model="item.value"
            :min-date="minDate"
            :max-date="maxDate"
            value-format="YYYY-MM-DD"
            label-float full-width/>
        </div>
      </mu-expansion-panel>
    </div>
    <div class="buttom-box">
    <mu-button color="primary" @click="_submit">
      <mu-icon left value="open_in_browser" ></mu-icon>
      submit
    </mu-button>
    <mu-button @click="_clear">
      clear
      <mu-icon right value="delete"></mu-icon>
    </mu-button>
    </div>
    <div class="radio-box">
      <mu-radio value="1" v-model="radioType"  label="多约几天"></mu-radio>
      <mu-radio value="2" v-model="radioType"  label="现在就约"></mu-radio>
    </div>
    <mu-snackbar :open="openOrClose" color="info" :message="message">
      <mu-button flat slot="action" @click="openOrClose = false">Close</mu-button>
    </mu-snackbar>
    <mu-dialog title="约座状态" width="360" :open="stateSwitch">
      <div v-if="stateInfo.label === 'fail'">
        你当前没有约到座位
      </div>
      <div v-if="!stateInfo.label">
        恭喜, 你当前已经约好了座位
        <div class="info-box">
          <div>
             <mu-icon value="favorite" color="red"></mu-icon>
          </div>
          <div>{{stateInfo.studentId}}</div>
        </div>
        <div class="info-box">
          <div>
             <mu-icon value="favorite_border" color="red"></mu-icon>
          </div>
          <div>{{stateInfo.seatNum}}</div>
        </div >
        <div class="info-box">
          <div>
             <mu-icon value="favorite" color="red"></mu-icon>
          </div>
          <div>{{stateInfo.readRoom}}</div>
        </div>
        <div class="info-box">
          <div>
             <mu-icon value="favorite_border" color="red"></mu-icon>
          </div>
          <div>{{stateInfo.bespeakTime}}</div>
        </div>
      </div>
      <mu-button slot="actions" flat color="primary" @click="stateSwitch = false">Close</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import validator from 'validator'
import {submit} from '@/api'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      openOrClose: false,
      minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
      maxDate: new Date(2020, 10, 25),
      flag: false,
      radioType: '1',
      disabled: false,
      stateSwitch: false,
      stateInfo: {},
      message: '',
      pedestal: {
        email: '',
        seat: '',
        startDate: '',
        endDate: ''
      },
      position: '1',
      dateType: '1',
      label: '请输入001-574之间的座位号',
      dateArray: [{
        value: ''
      }]
    }
  },
  watch: {
    position () {
      let {position} = this
      if (position === '1') this.label = '请输入001-574之间的座位号'
      if (position === '2') this.label = '请输入001-574之间的座位号'
      if (position === '3') this.label = '请输入001-689之间的座位号'
      if (position === '4') this.label = '请输入001-087之间的座位号'
    },
    radioType () {
      this._clear()
      if (this.radioType === '1') {
        this.minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
        this.maxDate = new Date(2020, 10, 25)
        this.disabled = false
        return
      }
      this.minDate = new Date()
      this.maxDate = new Date()
      this.disabled = true
    }
  },
  methods: {
    ...mapMutations(['changePed']),
    _add () {
      this.dateArray.push({value: ''})
    },
    _remove () {
      this.dateArray.splice(this.dateArray.length - 1, 1)
    },
    _clear () {
      this.pedestal = {}
      this.position = '1'
      this.dateType = '1'
      this.label = '请输入001-574之间的座位号'
      this.dateArray = [{
        value: ''
      }]
    },
    _submit () {
      setTimeout(() => { this.flag = false }, 3000)
      if (this.flag) return
      this.flag = true
      let {email, seat, startDate, endDate} = this.pedestal
      let {position, dateType, dateArray, radioType, pedestal} = this
      if (!validator.isEmail(email) || !validator.isLength(seat, 3, 3) || !validator.isNumeric(seat) || (validator.isEmpty(startDate) && dateType !== '3')) {
        this.openOrClose = true
        this.message = '认证错误'
        setTimeout(() => { this.openOrClose = false }, 2000)
        return
      }
      if (dateType === '2' && validator.isEmpty(endDate)) return
      if (dateType === '3' && !dateArray.every((less) => !validator.isEmpty(less.value))) return
      submit({pedestal, radioType, dateArray, dateType, position}).then((result) => {
        if (result.state) {
          this.stateInfo = result.state
          this.stateSwitch = true
          this.changePed(result.state)
          return
        }
        if (!result) {
          this.openOrClose = true
          this.message = '提交失败'
          setTimeout(() => { this.openOrClose = false }, 2000)
          return
        }
        this.openOrClose = true
        this.message = '提交成功'
        setTimeout(() => { this.openOrClose = false }, 2000)
        this._clear()
      })
    }
  }
}
</script>

<style>
.class-box div{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.location {
  height: 5rem;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
}
.but-box {
  display: flex;
  justify-content: flex-end;
}
.date-type-box {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
}
.buttom-box {
  height: 10rem;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.radio-box {
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 2rem
}
.info-box {
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.info-box div:nth-child(1) {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-box div:nth-child(2) {
  flex: 1;
  font-size: 16px;
}
</style>
