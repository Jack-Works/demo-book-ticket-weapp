import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'

import './info.less'
import { BaseEvent } from '@tarojs/components/types/common'

interface Props {
    phone?: string
    email?: string
    onChange(phone: string | undefined, email: string | undefined): void
}
export default class HolderInfo extends Component<Props> {
    static defaultProps: Props = { onChange() {} }
    onChange = (source: 'phone' | 'email', event: BaseEvent) => {
        const val = (event.currentTarget as HTMLInputElement).value
        if (source === 'email') this.props.onChange(this.props.phone, val)
        if (source === 'phone') this.props.onChange(val, this.props.email)
    }
    render() {
        return (
            <View className="container">
                <View className="field">
                    <Text className="title">手机号</Text>
                    <Input
                        className="input"
                        type="number"
                        placeholder="请输入您的手机号，将用于接受出票短信"
                        value={this.props.phone}
                        onInput={this.onChange.bind(this, 'phone')}
                    />
                </View>
                <View className="field">
                    <Text className="title">电子邮箱</Text>
                    <Input
                        className="input"
                        type="text"
                        placeholder="请输入您的电子邮箱，将用于接受出票邮件"
                        value={this.props.email}
                        onInput={this.onChange.bind(this, 'email')}
                    />
                </View>
            </View>
        )
    }
}
