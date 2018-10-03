import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './number.less'
interface Props {
    current: number
    max?: number
    onChange(newVal: number): void
}
export default class NumberSelector extends Component<Props> {
    static defaultProps: Props = {
        current: 0,
        max: Infinity,
        onChange() {},
    }
    onLeftClick = () => {
        if (this.props.current === 0) return
        this.props.onChange(this.props.current - 1)
    }
    onRightClick = () => {
        if (!(this.max() > this.props.current)) return
        this.props.onChange(this.props.current + 1)
    }
    max = () => {
        if (this.props.max === undefined) return Infinity
        return this.props.max
    }
    render() {
        console.log(this.props.max, this.props.current, this.max() > this.props.current)
        return (
            <View className="container">
                <View onClick={this.onLeftClick} className={this.props.current > 0 ? 'left active' : 'left'}>
                    <Text>-</Text>
                </View>
                <View className="number">
                    <Text>{this.props.current}</Text>
                </View>
                <View
                    onClick={this.onRightClick}
                    className={!!(this.max() > this.props.current) ? 'right active' : 'right'}>
                    <Text>+</Text>
                </View>
            </View>
        )
    }
}
