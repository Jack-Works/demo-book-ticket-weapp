import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Ticket } from '../../../logic/ticket'
import './selector.less'
import NumberSelector from '../../../components/NumberSelector'
interface Props {
    ticket: Ticket
    selected: number
    onChange(val: number): void
}
export default class TicketSelector extends Component<Props> {
    render() {
        return (
            <View className="ticket-selector">
                <View className="ticket-info">
                    <Text className="ticket-title">{this.props.ticket.ticketName}</Text>
                    <Text className="ticket-summary">{this.props.ticket.summary}</Text>
                    <Text className="ticket-price main">{Math.floor(this.props.ticket.priceInCent / 100)}</Text>
                    <Text className="ticket-price secondary">.{this.props.ticket.priceInCent % 100}</Text>
                    {this.props.ticket.ticketLeft ? (
                        <Text className="ticket-left">仅剩 {this.props.ticket.ticketLeft} 张</Text>
                    ) : null}
                </View>
                <View className="number-selector">
                    <NumberSelector
                        current={this.props.selected}
                        max={this.props.ticket.ticketLeft}
                        onChange={this.props.onChange}
                    />
                </View>
            </View>
        )
    }
}
