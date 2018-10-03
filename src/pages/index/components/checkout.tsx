import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { Ticket } from '../../../logic/ticket'

interface Props {
    tickets: Ticket[]
    selection: Record<string, number>
}
export default class Checkout extends Component<Props> {
    calcTickets = () => Object.values(this.props.selection).reduce((x, y) => x + y)
    calcPrice = () =>
        Object.entries(this.props.selection)
            .map(([id, number]) => this.props.tickets.find(y => y.id === id)!.priceInCent * number)
            .reduce((x, y) => x + y)
    render() {
        const price = this.calcPrice()
        return (
            <View className="checkout">
                <View className="price">
                    <Text>共</Text>
                    <Text className="total-count">{this.calcTickets()}</Text>
                    <Text>张票</Text>
                    <View />
                    <Text>合计</Text>
                    <Text className="price-main">{Math.floor(price / 100)}</Text>
                    <Text className="price-secondary">.{price % 100}</Text>
                    <Text>元</Text>
                </View>
                <View className="payment">
                    <Button className="action">立即支付</Button>
                </View>
            </View>
        )
    }
}
