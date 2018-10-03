import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './number.less'
interface Props {
    current: number
    max?: number
    onChange(newVal: number): void
}
export default class NumberSelector extends Component<Props> {
    left = () => {
        if (this.props.current === 0) return
        this.props.onChange(this.props.current - 1)
    }
    right = () => {
        if ((this.props.max || Infinity) <= this.props.current) return
        this.props.onChange(this.props.current + 1)
    }
    render() {
        return (
            <View className="container">
                <View onClick={this.left} className={this.props.current > 0 ? 'left active' : 'left'}>
                    <Text>-</Text>
                </View>
                <View className="number">
                    <Text>{this.props.current}</Text>
                </View>
                <View
                    onClick={this.right}
                    className={(this.props.max || Infinity) > this.props.current ? 'right active' : 'right'}>
                    <Text>+</Text>
                </View>
            </View>
        )
    }
}
