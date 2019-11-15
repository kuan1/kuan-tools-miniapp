import Taro, { Component } from "@tarojs/taro";

export default class Index extends Component {
  config = {
    usingComponents: {
      wemark: "../../wemark/wemark"
    }
  };
  static defaultProps = {
    md: ""
  };
  render() {
    const { md } = this.props;
    return <wemark md={md} link highlight type="wemark" />;
  }
}
