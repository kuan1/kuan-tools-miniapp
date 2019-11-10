import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

class index extends Component {

  config = {
    navigationBarTitleText: '前端面试'
  }

  componentWillMount() { }

  componentDidMount() { }

  render() {
    const prefixCls = 'ehome-index'

    return (
      <View className={prefixCls}>

      </View>
    )
  }
}

export default index