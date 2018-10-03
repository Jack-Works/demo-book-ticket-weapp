import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import { getAvailableTickets, Ticket } from '../../logic/ticket'

import TicketSelector from './components/selector'
import HolderInfo from './components/info-holder'

interface State {
    data: Ticket[]
    selected: Map<string, number>
    holderInfo: { phone?: string; email?: string }
}
export default class Index extends Component<{}, State> {
    config: Config = {
        navigationBarTitleText: '首页',
    }
    state: State = { data: [], selected: new Map(), holderInfo: {} }
    async componentDidMount() {
        const data = await getAvailableTickets()
        this.setState({ data })
    }
    selectTicket = (id: string, value: number) => {
        const map = this.state.selected
        map.set(id, value)
        this.setState({ selected: map })
    }
    modifyHolderInfo = (phone: string, email: string) => this.setState({ holderInfo: { phone, email } })
    render() {
        console.log(this.state.holderInfo)
        return (
            <View className="index">
                <View className="title">
                    <Text>选择票种</Text>
                </View>
                <View className="ticket-selector-container">
                    {this.state.data.map(x => (
                        <View className="item">
                            <TicketSelector
                                ticket={x}
                                selected={this.state.selected.get(x.id) || 0}
                                onChange={this.selectTicket.bind(this, x.id)}
                            />
                        </View>
                    ))}
                </View>
                <View className="title">
                    <Text>购票人信息</Text>
                </View>
                <HolderInfo
                    phone={this.state.holderInfo.phone}
                    email={this.state.holderInfo.email}
                    onChange={this.modifyHolderInfo}
                />
            </View>
        )
    }
}
