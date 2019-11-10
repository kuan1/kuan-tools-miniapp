import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.less'
import { to } from '../../utils/router'

class index extends Component {

  config = {
    navigationBarTitleText: '前端面试'
  }

  state = {
    otherApps: [
      {
        name: '礼成App',
        src: require('./images/wfc.jpg'),
        appId: 'wxfb609ed38701663f',
      },
      {
        name: '人人宴', src: require('./images/wfc.jpg'),
        appId: 'wx15e1954355f682ae',
      },
      {
        name: '闪个婚', src: require('./images/wfc.jpg'),
        appId: 'wx09302d0a200f5959',
      },
      {
        name: '幻熊科技', src: require('./images/wfc.jpg'),
        appId: 'wx0ee28119b66f26c1',
      },
      {
        name: '结婚登记',
        src: require('./images/registger.png'),
        appId: 'wx4f600619ec804238'
      },
      {
        name: '宾客席位',
        src: require('./images/xiwei.png'),
        appId: 'wx005f85b408e8e316'
      },
      {
        name: '吉日查询',
        src: require('./images/jiri.png'),
        appId: 'wx8821defaed86e9ea'
      },
      {
        name: '结婚预算',
        src: require('./images/yusuan.png'),
        appId: 'wx2b9a9ed6ca7c538e'
      }
    ]
  }

  componentDidMount() { }

  toOtherApp(appId) {
    Taro.navigateToMiniProgram({
      appId
    })
  }

  toDetail(name = 'question') {
    to({
      name
    })
  }

  renderEntry() {
    return (
      <View className='index-card'>
        <View className='index-title'>题目练习</View>
        <View className='entry-content'>
          <View onClick={this.toDetail.bind(this, 'question')} className='entry-item'>
            <View className='entry'>随机练习</View>
          </View>
          <View onClick={this.toDetail.bind(this, 'question')} className='entry-item'>
            <View className='entry'>顺序练习</View>
          </View>
        </View>
      </View>
    )
  }

  renderBack() {
    return (
      <View className='index-card'>
        <View className='index-title'>练习回顾</View>
        <View className='card-content'>
          <View onClick={this.toDetail.bind(this, 'question')} className='unit'>
            <Image className='icon' src={require('./images/error_icon.png')} />
            <View>错题本</View>
          </View>
          <View onClick={this.toDetail.bind(this, 'question')} className='unit'>
            <Image className='icon' src={require('./images/collect_icon.png')} />
            <View>收藏</View>
          </View>
        </View>
      </View>
    )
  }

  renderStatistics() {
    return (
      <View className='index-card'>
        <View className='index-title'>统计分析</View>
        <View onClick={this.toDetail.bind(this, 'question')} className='card-content'>
          <View className='unit'>
            <Image className='icon' src={require("./images/statistics_icon.png")} />
            <View>练习统计</View>
          </View>
        </View>
      </View>
    )
  }

  renderOther() {
    const { otherApps = [] } = this.state
    return (
      <View className='index-card'>
        <View className='index-title'>小程序推荐</View>
        <View className='card-content'>
          {
            otherApps.map(item => (
              <View
                key={item.name}
                onClick={this.toOtherApp.bind(this, item.appId)}
                className='unit'>
                <Image className='icon' src={item.src} />
                <View>{item.name}</View>
              </View>
            ))
          }
        </View>
      </View>
    )
  }

  render() {
    return (
      <View className='index-container'>
        {this.renderEntry()}
        {this.renderBack()}
        {this.renderStatistics()}
        {this.renderOther()}
      </View>
    )
  }
}

export default index