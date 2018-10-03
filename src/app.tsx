import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

class App extends Component {
    config: Config = {
        pages: ['pages/index/index'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
        },
    }
    render() {
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
