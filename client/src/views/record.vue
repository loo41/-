<template>
  <div class="record-box">
    <mu-load-more @refresh="refresh" class="load" :refreshing="refreshing" :loading="loading" @load="load" >
      <div v-if="shift === '1'">
        <mu-expansion-panel v-for="(item, index) in record[0]" :key="index" @change="toggle(`${index}p`)" :expand="panel === `${index}p`">
          <div slot="header">{{item.seat}}</div>
          <div class="flex-box">
            <div>教室: </div>
            <div v-if="item.position === '1'">社科借阅室</div>
            <div v-if="item.position === '2'">科技借阅室</div>
            <div v-if="item.position === '3'">期刊借阅室</div>
            <div v-if="item.position === '4'">报纸借阅室</div>
          </div>
          <div class="flex-box">
            <div>时间: </div>
            <div v-if="item.type === '1'">{{item.time}}</div>
            <div v-if="item.type === '2'">{{item.time[0]}} 到 {{item.time[1]}}</div>
            <div v-if="item.type === '3'">{{item.time[0]}} 到 {{item.time[item.time.length-1]}}</div>
          </div>
          <div class="but-box">
            <mu-button @click="_delect(index)">
              delete
              <mu-icon right value="delete"></mu-icon>
            </mu-button>
          </div>
        </mu-expansion-panel>
      </div>
      <div v-if="shift === '2'">
        <mu-expansion-panel v-for="(item, index) in record[1]" :key="index"  @change="toggleF(`${index}f`)" :expand="panelf === `${index}f`">
          <div slot="header">{{item.seat}}</div>
          <div class="flex-box">
            <div>教室: </div>
            <div v-if="item.position === '1'">社科借阅室</div>
            <div v-if="item.position === '2'">科技借阅室</div>
            <div v-if="item.position === '3'">期刊借阅室</div>
            <div v-if="item.position === '4'">报纸借阅室</div>
          </div>
          <div class="flex-box">
            <div>时间: </div>
            <div v-if="item.type === '1'">{{item.time}}</div>
            <div v-if="item.type === '2'">{{item.time[0]}}-{{item.time[1]}}</div>
            <div v-if="item.type === '3'">{{item.time[0]}}--{{item.time[item.time.length-1]}}</div>
          </div>
        </mu-expansion-panel>
      </div>
      <div v-if="shift === '3'">
        <mu-grid-list cols="1" >
          <mu-sub-header>Success</mu-sub-header>
          <mu-grid-tile v-for="(tile, index) in record[2]" :key="'tile' + index" title-position="top" >
            <div class="success-box">
              <div>学号: </div>
              <div>{{tile.studentId}}</div>
            </div>
            <div class="success-box">
              <div>座位号:</div>
              <div>{{tile.seatNum}}</div>
            </div>
            <div class="success-box">
              <div>教室:</div>
              <div>{{tile.readRoom}}</div>
            </div>
            <div class="success-box">
              <div>时间:</div>
              <div>{{tile.bespeakTime}}</div>
            </div>
            <span slot="title">{{tile.label}}</span>
            <mu-button slot="action" icon>
              <mu-icon value="mood"></mu-icon>
            </mu-button>
          </mu-grid-tile>
        </mu-grid-list>
      </div>
      <div v-if="shift === '4'">
        <mu-grid-list cols="1" >
          <mu-sub-header>Fail</mu-sub-header>
          <mu-grid-tile v-for="(tile, index) in record[3]" :key="'tile' + index" title-position="top" >
            <div class="success-box">
              <div>TITLE: </div>
              <div>{{tile.label}}</div>
            </div>
          </mu-grid-tile>
        </mu-grid-list>
      </div>
    </mu-load-more>
    <mu-bottom-nav :value.sync="shift" shift class="navbar">
      <mu-bottom-nav-item value="1" title="Padding" icon="hdr_strong"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="2" title="Finish" icon="hdr_weak"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="3" title="Success " icon="lens"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="4" title="Fail" icon="adjust"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
import {pedestalRecord, removePed} from '@/api'
export default {
  data () {
    return {
      shift: '1',
      refreshing: false,
      loading: false,
      record: [],
      panel: '',
      panelf: ''
    }
  },
  created () {
    this._getInfo()
  },
  methods: {
    _getInfo () {
      this.refreshing = true
      pedestalRecord().then((result) => {
        if (!result) return
        this.record = result.data
        this.refreshing = false
      })
    },
    _delect (i) {
      let less = this.record[0][i]
      removePed({_id: less._id}).then((result) => {
        if (!result) return
        this.record[0].splice(i, 1)
      })
    },
    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel
    },
    toggleF (panel) {
      this.panelf = panel === this.panelf ? '' : panel
    },
    async refresh () {
      await this._getInfo()
    },
    load () {}
  }
}
</script>

<style>
.record-box {
  height: 100%;
  padding-bottom: 5.6rem;
  display: flex;
  flex-direction: column;
}
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.load {
  flex: 1
}
.flex-box {
  display: flex;
  justify-content: space-between;
}
.flex-box div{
  min-height: 4rem;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.but-box {
  height: 7rem;
  justify-content: flex-end;
  align-items: center;
  display: flex;
}
.success-box {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.success-box div{
  min-height: 4rem;
  font-size: 16px;
  display: flex;
  align-items: center;
}
.success-box div:nth-child(1) {
  display: flex;
  width: 30%;
  box-sizing: border-box;
  padding-left: 1.5rem;
  justify-content: flex-start
}
.success-box div:nth-child(2) {
  display: flex;
  flex: 1;
  justify-content: flex-start
}
</style>
