import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import DynamicInput from '../../../components/DynamicInput'

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
                <DynamicInput
                    describe={{
                        key: 'phone',
                        title: '手机号',
                        type: 'number',
                        placeholder: '请输入您的手机号，将用于接受出票短信',
                    }}
                    currentVal={this.props.phone}
                    onChange={this.onChange.bind(this, 'phone')}
                />
                <DynamicInput
                    describe={{
                        key: 'email',
                        title: '电子邮箱',
                        type: 'text',
                        placeholder: '请输入您的电子邮箱，将用于接受出票邮件',
                    }}
                    currentVal={this.props.email}
                    onChange={this.onChange.bind(this, 'email')}
                />
            </View>
        )
    }
}
