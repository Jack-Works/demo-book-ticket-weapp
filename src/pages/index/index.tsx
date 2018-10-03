import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import { getAvailableTickets, Ticket } from '../../logic/ticket'

import TicketSelector from './components/selector'

interface State {
    data: Ticket[]
}
export default class Index extends Component<{}, State> {
    config: Config = {
        navigationBarTitleText: '首页',
    }
    state: State = { data: [] }
    async componentDidMount() {
        const data = await getAvailableTickets()
        this.setState({ data })
    }
    render() {
        return (
            <View className="index">
                <View className="title">
                    <Text>选择票种</Text>
                </View>
                {this.state.data.map(x => (
                    <View className="ticket-selector-container">
                        <TicketSelector ticket={x} selected={2} />
                    </View>
                ))}
            </View>
        )
    }
}
