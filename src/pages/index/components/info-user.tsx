import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './info.less'
import { TicketForms } from '../../../logic/ticket'
import DynamicInput from '../../../components/DynamicInput'

interface Props {
    form: TicketForms[]
    currentValues: Record<string, any>
    onChange(values: Record<string, any>): void
}
export default class DynamicInfoContainer extends Component<Props> {
    static defaultProps: Props = { form: [] as TicketForms[], currentValues: {}, onChange() {} }
    onChange = (source: string, val: string) => {
        this.props.onChange({ ...this.props.currentValues, [source]: val })
    }
    render() {
        return (
            <View className="container">
                {this.props.form.map(x => (
                    <DynamicInput
                        describe={x}
                        onChange={this.onChange.bind(this, x.key)}
                        currentValues={this.props.currentValues[x.key]}
                    />
                ))}
            </View>
        )
    }
}
