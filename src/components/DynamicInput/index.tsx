import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, RadioGroup, Radio } from '@tarojs/components'

import './info.less'
import { BaseEvent } from '@tarojs/components/types/common'
import { TicketForms } from '../../logic/ticket'

import './index.less'

interface Props {
    describe: TicketForms
    onChange(val: string): void
    currentVal: any
}
export default class DynamicInput extends Component<Props> {
    static defaultProps: Props = {
        describe: { key: 'unknown', title: '', type: 'text', placeholder: '' },
        onChange() {},
        currentVal: undefined,
    }
    handleInput = (v: BaseEvent) => this.props.onChange((v.currentTarget as HTMLInputElement).value)
    render() {
        if (this.props.describe.type === 'radio') {
            return (
                <View className="field">
                    <Text className="title">{this.props.describe.title}</Text>
                    <RadioGroup name={this.props.describe.key}>
                        {this.props.describe.options.map(x => (
                            <Radio
                                checked={this.props.currentVal === x.value}
                                value={x.value}
                                onClick={this.props.onChange.bind(x.value)}>
                                {x.text}
                            </Radio>
                        ))}
                    </RadioGroup>
                </View>
            )
        }
        const policy = this.props.describe.verify || {}
        return (
            <View className="field">
                <Text className="title">{this.props.describe.title}</Text>
                <Input
                    className="input"
                    type={this.props.describe.type}
                    placeholder={this.props.describe.placeholder}
                    maxLength={policy.maxlength}
                    onInput={this.handleInput}
                    value={this.props.currentVal}
                />
            </View>
        )
    }
}
