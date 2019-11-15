import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import TaroMd from "@/components/TaroMd";

import "./index.less";

class Question extends Component {
  config = {
    navigationBarTitleText: "前端题库"
  };

  state = {
    title: `输出斐波那契数列的前20个数
1 1 2 3 5 8 13 21 ...`,
    md: `## test \n test \n\n test`
  };

  componentDidMount() {}

  renderTitle() {
    const { title } = this.state;
    return (
      <View className="title">
        <Text className="tag">基础常识</Text>
        <Text decode className="text">
          {title}
        </Text>
      </View>
    );
  }

  renderContent() {
    const { md } = this.state;
    return (
      <View className="content">
        <TaroMd md={md} />
      </View>
    );
  }

  renderFooter() {
    return (
      <View className="question-footer">
        <View>测试</View>
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
