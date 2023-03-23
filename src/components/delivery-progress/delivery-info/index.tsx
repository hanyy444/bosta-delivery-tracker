import './index.scss'
import { DeliveryInfoType, getArabicDeliveryState, SUCCESS_STATES, FAILURE_STATES, DeliveryStates } from 'types'
import { getLongDate, getShortDate } from 'utils'

const DeliveryInfo = ({ deliveryInfo }: { deliveryInfo: DeliveryInfoType }) => {
    const currentState = deliveryInfo.CurrentStatus.state
    const currentStatus = SUCCESS_STATES.includes(currentState) ? 'success' : 
        FAILURE_STATES.includes(currentState) ? 'failure' 
        : 'in-progress'

    return (
        <div className='delivery-info'>
            <div>
                <span>رقم الشحنة {deliveryInfo.TrackingNumber}</span>
                <span className={`status--${currentStatus}`}>{getArabicDeliveryState(currentState)}</span>
            </div>
            <div>
                <span>اخر تحديث</span>
                <span>{getLongDate(new Date(deliveryInfo.CurrentStatus.timestamp))}</span>
            </div>
            <div>
                <span>اسم التاجر</span>
                <span>{deliveryInfo.clientName}</span>
            </div>
            <div>
                <span>موعد التسليم خلال</span>
                <span>{getShortDate(new Date(deliveryInfo.PromisedDate))}</span>
            </div>
        </div>
    )
}

export default DeliveryInfo