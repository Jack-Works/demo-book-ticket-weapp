import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, RadioGroup, Radio } from '@tarojs/components'

import { BaseEvent } from '@tarojs/components/types/common'
import { TicketForms } from '../../logic/ticket'

import './index.less'

interface Props {
    describe: TicketForms
    onChange(val: string): void
    currentValues: any
}
export default class DynamicInput extends Component<Props> {
    static defaultProps: Props = {
        describe: { key: 'unknown', title: '', type: 'text', placeholder: '' },
        onChange() {},
        currentValues: undefined,
    }
    handleInput = (v: BaseEvent) => this.props.onChange((v.currentTarget as HTMLInputElement).value)
    render() {
        if (this.props.describe.type === 'radio') {
            return (
                <View className="field">
                    <Text className="title">{this.props.describe.title}</Text>
                    <RadioGroup name={this.props.describe.key} onChange={this.handleInput}>
                        {this.props.describe.options.map(x => (
                            <Radio className="radio" checked={this.props.currentValues === x.value} value={x.value}>
                                {x.text}
                            </Radio>
                        ))}
                    </RadioGroup>
                </View>
            )
        }
        return (
            <View className="field">
                <Text className="title">{this.props.describe.title}</Text>
                <Input
                    className="input"
                    type={this.props.describe.type}
                    placeholder={this.props.describe.placeholder}
                    onInput={this.handleInput}
                    value={this.props.currentValues}
                />
            </View>
        )
    }
}
