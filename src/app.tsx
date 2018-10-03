import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'

import './app.less'

class App extends Component {
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        pages: ['pages/index/index'],
        window: {
            backgroundTextStyle: 'light',
            navigationBarBackgroundColor: '#fff',
            navigationBarTitleText: 'WeChat',
            navigationBarTextStyle: 'black',
        },
    }

    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentCatchError() {}

    render() {
        return <Index />
    }
}

Taro.render(<App />, document.getElementById('app'))
