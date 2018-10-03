export interface Ticket {
    id: string
    ticketName: string
    summary: string
    priceInCent: number
    ticketLeft?: number
    form: TicketForms[]
}
export type TicketForms = TicketFormNormal | TicketFormRadio
interface TicketForm {
    key: string
    title: string
    type: string
    verify?: Partial<TicketFormVerify>
}

interface TicketFormNormal extends TicketForm {
    type: 'number' | 'text' | 'idcard'
    placeholder: string
}

interface TicketFormRadio extends TicketForm {
    type: 'radio'
    options: {
        value: string
        text: string
    }[]
}

interface TicketFormVerify {
    maxlength: number
}

const sleep = (t: number) => new Promise(resolve => setTimeout(resolve, t))
export async function getAvailableTickets(): Promise<Ticket[]> {
    // Fake web request
    await sleep(500)
    const normal: Ticket = {
        ticketName: '普通票',
        id: 'vanilla',
        priceInCent: 4999,
        ticketLeft: 5,
        summary: '能看普通的表演',
        form: [
            {
                key: 'name',
                placeholder: '请输入您的真实姓名',
                title: '姓名',
                type: 'number',
            },
            {
                key: 'idcard',
                placeholder: '请输入您的身份证号',
                title: '身份证',
                type: 'idcard',
                verify: { maxlength: 18 },
            },
            {
                key: 'gender',
                title: '性别',
                type: 'radio',
                options: [
                    { text: '男性', value: 'male' },
                    { text: '女性', value: 'female' },
                    { text: '其他', value: 'other' },
                    { text: '不愿透露', value: 'unknown' },
                ],
            },
        ],
    }
    const cloud: Ticket = {
        ticketName: '云观光票',
        id: 'cloud',
        priceInCent: 233,
        summary: '「我真的去过啦！」',
        form: [
            {
                key: 'name',
                placeholder: '请输入您的网名',
                title: '称呼',
                type: 'text',
            },
            {
                key: 'email',
                placeholder: '请输入您的 QQ 号',
                title: 'QQ',
                type: 'number',
            },
        ],
    }
    return [normal, cloud]
}
