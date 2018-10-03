import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.less'

import { getAvailableTickets, Ticket } from '../../logic/ticket'

import TicketSelector from './components/selector'
import HolderInfo from './components/info-booker'
import DynamicInfoContainerGroup from './components/info-user-group'
import Checkout from './components/checkout'

interface State {
    data: Ticket[]
    bookedTicketsCount: Record<string, number>
    bookerInfo: { phone: string; email: string }
    /** Record<票类型, 票信息[]> */
    userInfo: Record<string, Record<string, string>[]>
}
export default class Index extends Component<{}, State> {
    config: Config = {
        navigationBarTitleText: '暗之城市立大学魔法与技术展',
    }
    state: State = { data: [], bookedTicketsCount: {}, bookerInfo: {} as any, userInfo: {} }
    async componentDidMount() {
        const data = await getAvailableTickets()
        this.setState({ data })
    }
    /** 修改需要购票的数量 */
    changeTicketsCount = (id: string, value: number) =>
        this.setState({ bookedTicketsCount: { ...this.state.bookedTicketsCount, [id]: value } })
    /** 修改购票人信息 */
    changeBookerInfo = (phone: string, email: string) => this.setState({ bookerInfo: { phone, email } })
    /** 修改用户信息 */
    changeUserInfo = (ticketType: string, ticketIndex: number, newInfo: Record<string, string>) => {
        const newArr = [...(this.state.userInfo[ticketType] || [])]
        newArr[ticketIndex] = newInfo
        this.setState({ userInfo: { ...this.state.userInfo, [ticketType]: newArr } })
    }
    render() {
        return (
            <View>
                <ScrollView scrollY className="index">
                    <View className="title">
                        <Text>选择票种</Text>
                    </View>
                    <View className="ticket-selector-container">
                        {this.state.data.map(x => (
                            <View className="item">
                                <TicketSelector
                                    ticket={x}
                                    selected={this.state.bookedTicketsCount[x.id] || 0}
                                    onChange={this.changeTicketsCount.bind(this, x.id)}
                                />
                            </View>
                        ))}
                    </View>
                    <View className="title">
                        <Text>购票人信息</Text>
                    </View>
                    <HolderInfo
                        phone={this.state.bookerInfo.phone}
                        email={this.state.bookerInfo.email}
                        onChange={this.changeBookerInfo}
                    />
                    {Object.entries(this.state.bookedTicketsCount).map(x => {
                        const [key, times] = x
                        const ticket = this.state.data.find(y => y.id === key)!
                        return (
                            <DynamicInfoContainerGroup
                                ticket={ticket}
                                values={this.state.userInfo[ticket.id]}
                                onChange={this.changeUserInfo.bind(this, ticket.id)}
                                times={times}
                                key={ticket.id}
                            />
                        )
                    })}
                </ScrollView>
                <Checkout
                    tickets={this.state.data}
                    order={this.state.bookedTicketsCount}
                    bookerInfo={this.state.bookerInfo}
                    userInfo={this.state.userInfo}
                />
            </View>
        )
    }
}
