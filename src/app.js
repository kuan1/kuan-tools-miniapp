import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import * as Action from '@/actions/question'
import * as Api from '@/api/question'
import store from "@/store";

import Index from "./pages/index/index";

import "./styles/index.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: ["pages/index/index", "pages/question/index", "pages/test/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "前端面试题库",
      navigationBarTextStyle: "black"
    },
    navigateToMiniProgramAppIdList: [
      "wxfb609ed38701663f",
      "wx15e1954355f682ae",
      "wx09302d0a200f5959",
      "wx0ee28119b66f26c1",
      "wx4f600619ec804238",
      "wx005f85b408e8e316",
      "wx8821defaed86e9ea",
      "wx2b9a9ed6ca7c538e"
    ]
  };

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    const data = await Api.list()
    const { list = [], total = 0 } = data
    store.dispatch(Action.changeQuestion({
      list,
      total,
      current: 0
    }))
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
