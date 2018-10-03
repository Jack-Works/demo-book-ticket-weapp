import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'

import './info.less'

interface Props {}
export default class HolderInfo extends Component {
    static defaultProps: Props = {}
    render() {
        return (
            <View className="container">
                <View className="field">
                    <Text className="title">手机号</Text>
                    <Input className="input" type="text" placeholder="请输入您的手机号，将用于接受出票短信" />
                </View>
                <View className="field">
                    <Text className="title">电子邮箱</Text>
                    <Input className="input" type="text" placeholder="请输入您的电子邮箱，将用于接受出票邮件" />
                </View>
            </View>
        )
    }
}
