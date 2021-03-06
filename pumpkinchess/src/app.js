import Taro, { Component } from '@tarojs/taro'
import MainPage from './pages/MainPage'
import { Provider } from '@tarojs/mobx'
import store from './mobx/store'
import 'taro-ui/dist/style/index.scss'

import './app.css'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  config = {
    pages: [
      'pages/MainPage'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '南瓜棋',
      navigationBarTextStyle: 'black'
    },
    projectName: '南瓜棋',
    date: '2019-3'
    //designWidth: 375
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
