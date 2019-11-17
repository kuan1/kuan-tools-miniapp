import Taro, { Component } from "@tarojs/taro";
import { View, Icon, Image } from "@tarojs/components";
import { connect } from '@tarojs/redux'

import * as Actions from '@/actions/question'
import { toast } from "@/utils/feedBack";
import TaroMd from "@/components/TaroMd";

import "./index.less";

@connect(({ question }) => {
  const { current, list, total } = question
  return {
    list,
    data: list[current] || {},
    current,
    total
  }
})
class Question extends Component {
  config = {
    navigationBarTitleText: "前端题库"
  };

  static defaultProps = {
    data: {},
    total: 0
  }

  collect = () => {
    const { data = {} } = this.props
    if (!data.id) return
    // todo
    toast('功能开发中')
  }

  toNext = () => {
    const { current, list = [] } = this.props
    let newCurrent = current < list.length - 1 ? current + 1 : 0
    this.props.dispatch(Actions.changeQuestion({ current: newCurrent }))
  }

  toPrev = () => {
    const { current } = this.props
    if (current === 0) return
    this.props.dispatch(Actions.changeQuestion({ current: current - 1 }))
  }

  renderTitle() {
    const { data = {} } = this.props;
    const { title = '', tag = '' } = data
    return (
      <View className="title">
        <View className='title-top'>
          <View className='t-tag'>题目:</View>
          <View className='tag-container'>
            {tag.split(',').map(item => (
              <View key={item} className='tag'>{item}</View>
            ))}
          </View>
        </View>
        <TaroMd md={title || ''} />
      </View>
    );
  }

  renderContent() {
    const { data = {} } = this.props;
    return (
      <View className="content">
        <View className='t-tag'>答案：</View>
        <TaroMd md={data.content || ''} />
      </View>
    );
  }

  renderFooter() {
    const { total, current } = this.props
    return (
      <View>
        <View className='buttons'>
          {!!current && <View onClick={this.toPrev.bind(this)} className='f-button prev'>上一道</View>}
          <View onClick={this.toNext.bind(this)} className='f-button next'>下一道</View>
        </View>
        <View className="question-footer">
          <View onClick={this.collect} className='footer-item'>
            <Image src={require('./images/collection.png')} className="icon" />
            <Text>收藏</Text>
          </View>
          <View className='footer-item'>
            <Image className='icon' src={require('./images/all.png')} />
            <Text>{current + 1}/{total}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View className="question-container">
        {this.renderTitle()}
        {this.renderContent()}
        {this.renderFooter()}
      </View>
    );
  }
}

export default Question;
