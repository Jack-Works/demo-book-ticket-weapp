import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

import { getAvailableTickets, Ticket } from '../../logic/ticket'

import TicketSelector from './components/selector'
import HolderInfo from './components/info-holder'
import DynamicInfoContainerGroup from './components/info-dynamic-group'
import Checkout from './components/checkout'

interface State {
    data: Ticket[]
    selected: Map<string, number>
    holderInfo: { phone?: string; email?: string }
    /** Record<票类型, 票信息[]> */
    selectedInfo: Record<string, Record<string, any>[]>
}
export default class Index extends Component<{}, State> {
    config: Config = {
        navigationBarTitleText: '首页',
    }
    state: State = { data: [], selected: new Map(), holderInfo: {}, selectedInfo: {} }
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
    dynamicInfoOnChange = (ticketType: string, ticketIndex: number, newInfo: Record<string, any>) => {
        const newArr = [...(this.state.selectedInfo[ticketType] || [])]
        newArr[ticketIndex] = newInfo
        this.setState({ selectedInfo: { ...this.state.selectedInfo, [ticketType]: newArr } })
    }
    render() {
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
                {Array.from(this.state.selected.entries()).map(x => {
                    const [key, times] = x
                    const ticket = this.state.data.find(y => y.id === key)!
                    return (
                        <DynamicInfoContainerGroup
                            ticket={ticket}
                            values={this.state.selectedInfo[ticket.id]}
                            onChange={this.dynamicInfoOnChange.bind(this, ticket.id)}
                            times={times}
                            key={ticket.id}
                        />
                    )
                })}
                <Checkout />
            </View>
        )
    }
}
