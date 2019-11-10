import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.less'

class Question extends Component {

  config = {
    navigationBarTitleText: '前端题库'
  }

  componentDidMount() { }

  renderTitle() {
    return (
      <View className='title'>

      </View>
    )
  }

  render() {
    return (
      <View className='question-container'>
        {this.renderTitle()}
      </View>
    )
  }
}

export default Question