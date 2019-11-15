import Taro, { Component } from "@tarojs/taro";

export default class Index extends Component {
  config = {
    usingComponents: {
      wemark: "../../wemark/wemark"
    }
  };
  state = {
    md: `# test`
  };
  render() {
    const { md } = this.state;
    return <wemark md={md} link highlight type='wemark' />;
  }
}
