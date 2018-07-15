<template>
  <div class="home-box">
    <mu-button color="primary" class="but" @click="$router.push('/pedestal')">
      <mu-icon left value="touch_app"></mu-icon>
      约 座
    </mu-button>
    <mu-button color="primary" class="but" @click="$router.push('/record')">
      记 录
      <mu-icon right value="arrow_forward"></mu-icon>
    </mu-button>
    <div>
    <mu-dialog title="约座状态" width="360" :open="infoState">
      <div v-if="pedestalState.label === 'fail'">
        你当前没有约到座位
      </div>
      <div v-if="!pedestalState.label || pedestalState.label === 'label'">
        恭喜, 你当前已经约好了座位
        <div class="info-box">
          <div>
             <mu-icon value="favorite" color="red"></mu-icon>
          </div>
          <div>{{pedestalState.studentId}}</div>
        </div>
        <div class="info-box">
          <div>
             <mu-icon value="favorite_border" color="red"></mu-icon>
          </div>
          <div>{{pedestalState.seatNum}}</div>
        </div >
        <div class="info-box">
          <div>
             <mu-icon value="favorite" color="red"></mu-icon>
          </div>
          <div>{{pedestalState.readRoom}}</div>
        </div>
        <div class="info-box">
          <div>
             <mu-icon value="favorite_border" color="red"></mu-icon>
          </div>
          <div>{{pedestalState.bespeakTime}}</div>
        </div>
      </div>
      <mu-button slot="actions" flat color="primary" @click="_close">Close</mu-button>
    </mu-dialog>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      openDrawe: false,
      openSimple: true,
      userInfo: {}
    }
  },
  computed: {
    ...mapState([
      'pedestalState',
      'infoState'
    ])
  },
  methods: {
    ...mapMutations(['changeState']),
    _close () {
      this.changeState(false)
    }
  }
}
</script>

<style>
.home-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.but {
  margin-top: 1rem;
  margin-bottom: 1rem;
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
