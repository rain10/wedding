<template>
    <div class="map" v-if="action">
        <image mode="aspectFit" class="head-img" src="../../static/images/t1.png"/>
        <map class="content" id="map" :longitude="longitude" :latitude="latitude" :markers="markers" scale="18" @tap="toNav">
        </map>
        <div class="call">
            <div class="left" @tap="linkHe">
                <image src="../../static/images/he.png"/>
                <span>郎情</span>
            </div>
            <div class="right" @tap="linkShe">
                <image src="../../static/images/she.png"/>
                <span>妾意</span>
            </div>
        </div>
        <image class="footer" src="../../static/images/grren-flower-line.png"/>
    </div>
    <div v-else class="map">
      <image class="footer" src="../../static/images/grren-flower-line.png"/>
      <image class="content" id="myVideo" :src="videoUrl"   controls :poster="videoPic" @tap="audioPlay"/>
        <div class="call">
            <div class="left" @tap="linkHe">
                <image src="../../static/images/he.png"/>
                <span>郎情</span>
            </div>
            <div class="right" @tap="linkShe">
                <image src="../../static/images/she.png"/>
                <span>妾意</span>
            </div>
        </div>
        <image class="footer" src="../../static/images/grren-flower-line.png"/>
        <audio id="myAudio" :src="audioUrl" autoplay loop></audio>
    </div>
</template>

<script>
/* eslint-disable */
import tools from 'common/js/h_tools'
export default {
  name: 'Map',
  data () {
    return {
      latitude: 30.826961,
      longitude: 103.856260,
      groomPhone: '18000000000',
      bridePhone: '18000000000',
      action: true,
      videoUrl: '',
      videoPic: '',
      audioUrl: '',
      audioCtx: '',
      isPlay: false,
      markers: [{
        iconPath: '../../static/images/nav.png',
        id: 0,
        latitude: 30.826961,
        longitude: 103.856260,
        width: 50,
        height: 50
      }]
    }
  },
  onShow () {
    const that = this
    that.audioCtx = wx.createAudioContext('myAudio')
    that.getInfo()
  },
  methods: {
    audioPlay () {
      const that = this
      if (that.isPlay) {
        that.audioCtx.pause()
        that.isPlay = false
        tools.showToast('背景音乐已暂停')
      } else {
        that.audioCtx.play()
        that.isPlay = true
        tools.showToast('背景音乐已开启')
      }
    },
    getInfo () {
      const db = wx.cloud.database()
      const map = db.collection('mapInfo')
      map.get().then(res => {
        const val = res.data[0]
        this.latitude = val.latitude
        this.longitude = val.longitude
        this.groomPhone = val.groomPhone
        this.bridePhone = val.bridePhone
        this.markers[0].latitude = val.latitude
        this.markers[0].longitude = val.longitude
        this.action = val.action
        this.videoUrl = val.videoUrl
        this.videoPic = val.videoPic
        this.audioUrl = val.audioUrl
        if(this.isPlay) {
          that.audioCtx.play()
        }
      })
    },
    toNav () {
      wx.openLocation({
        latitude: this.latitude,
        longitude: this.longitude,
        scale: 18
      })
    },

    linkHe () {
      wx.makePhoneCall({
        phoneNumber: this.groomPhone
      })
    },

    linkShe () {
      wx.makePhoneCall({
        phoneNumber: this.bridePhone
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.map
    height 100%
    background #fff
    .head-img
      width 100%
      height 180rpx
      margin-bottom 50rpx
    .content
      width 690rpx
      margin-left 30rpx
      height 600rpx
      margin-bottom 30rpx
      border-radius 16rpx
    .call
      display flex
      justify-content space-around
      align-items center
      width 100%
      margin-bottom 20rpx
      .left, .right
        flex 1
        display flex
        flex-direction column
        justify-content center
        align-items center
        image
          height 64rpx
          width 64rpx
        span
          height 50rpx
          line-height 50rpx
          font-size 24rpx
          color #6B4F4E
    .footer
      height 80rpx
      width 716rpx
      margin-left 17rpx
</style>
