import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import { getAvailableTickets, Ticket } from '../../logic/ticket'

import TicketSelector from './components/selector'

interface State {
    data: Ticket[]
    selected: Map<string, number>
}
export default class Index extends Component<{}, State> {
    config: Config = {
        navigationBarTitleText: '首页',
    }
    state: State = { data: [], selected: new Map() }
    async componentDidMount() {
        const data = await getAvailableTickets()
        this.setState({ data })
    }
    selectTicket = (id: string, value: number) => {
        const map = this.state.selected
        map.set(id, value)
        this.setState({ selected: map })
    }
    render() {
        return (
            <View className="index">
                <View className="title">
                    <Text>选择票种</Text>
                </View>
                {this.state.data.map(x => (
                    <View className="ticket-selector-container">
                        <TicketSelector
                            ticket={x}
                            selected={this.state.selected.get(x.id) || 0}
                            onChange={this.selectTicket.bind(this, x.id)}
                        />
                    </View>
                ))}
            </View>
        )
    }
}
