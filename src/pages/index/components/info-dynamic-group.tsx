import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import '../index.less'
import { Ticket } from '../../../logic/ticket'
import DynamicInfoContainer from './info-dynamic'

export default class DynamicInfoContainerGroup extends Component<{
    ticket: Ticket
    values: Record<string, any>
    onChange(index: number, val: Record<string, any>): void
    times: number
}> {
    render() {
        const time = Array(this.props.times).fill(1)
        return time.map((_, index) => (
            <View key={index}>
                <View className="title">
                    <Text>
                        {this.props.ticket.ticketName} (第 {index + 1} 张票)
                    </Text>
                </View>
                <DynamicInfoContainer
                    form={this.props.ticket.form}
                    currentValues={this.props.values[index]}
                    onChange={this.props.onChange.bind(this, index)}
                />
            </View>
        ))
    }
}
