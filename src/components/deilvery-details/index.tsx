import './index.scss'
import Table from 'rc-table'
import { useContext } from 'react'
import DeliveryStatesContext from 'context/delivery-states'
import { DeliveryStates } from 'types'

const columns = [
    {
        title: 'تفاصيل',
        dataIndex: 'details',
        key: 'details',
        width: 300
    },
    {
        title: 'الوقت',
        dataIndex: 'time',
        key: 'time',
        width: 100,
    },
    {
        title: 'التاريخ',
        dataIndex: 'date',
        key: 'date',
        width: 100,
    },
    {
        title: 'الفرع',
        dataIndex: 'branch',
        key: 'branch',
        width: 100,
    },
]

interface rowType {
    key: number, 
    branch: string, 
    date?: string, 
    time?: string, 
    details: string
}


const DeliveryDetails = ({ branch }: { branch: string }) => {
    const { states } = useContext(DeliveryStatesContext)
    let tableRows: rowType[] = [];
    Object.values(states || {}).forEach((state, i) => {
        switch(state.state){
            case DeliveryStates.TICKET_CREATED:
                tableRows.push({ 
                    key: i, 
                    branch, 
                    date: states.TICKET_CREATED?.date, 
                    time:states.TICKET_CREATED?.time, 
                    details: 'تم إنشاء الشحنة' 
                })
                break
            case DeliveryStates.PACKAGE_RECEIVED:
                tableRows.push({ 
                    key: i, 
                    branch, 
                    date: states.PACKAGE_RECEIVED?.date, 
                    time:states.PACKAGE_RECEIVED?.time, 
                    details: 'تم إستلام الشحنة من التاجر' 
                })
                break
            case DeliveryStates.OUT_FOR_DELIVERY:
                tableRows.push({ 
                    key: i, 
                    branch, 
                    date: states.OUT_FOR_DELIVERY?.date, 
                    time:states.OUT_FOR_DELIVERY?.time, 
                    details: 'الشحنة خرجت للتسليم' 
                })
                break
            case DeliveryStates.DELIVERED:
                tableRows.push({ 
                    key: i, 
                    branch, 
                    date: states.DELIVERED?.date, 
                    time:states.DELIVERED?.time, 
                    details: 'تم التسليم' 
                })
                break
            default: break
        }
    })

    return (
        <div className='delivery-details'>
            <h4>تفاصيل الشحنة</h4>
            <Table columns={columns} data={tableRows}/>
        </div>
    )
}

export default DeliveryDetails