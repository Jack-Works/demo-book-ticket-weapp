import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import DynamicInput from '../../../components/DynamicInput'

interface Props {}
export default class Checkout extends Component<Props> {
    render() {
        return (
            <View className="checkout">
                <View className="price">
                    <Text>共</Text>
                    <Text className="total-count">14</Text>
                    <Text>张票</Text>
                    <View />
                    <Text>合计</Text>
                    <Text className="price-main">388</Text>
                    <Text className="price-secondary">.68</Text>
                    <Text>元</Text>
                </View>
                <View className="payment">
                    <Button className="action">立即支付</Button>
                </View>
            </View>
        )
    }
}
