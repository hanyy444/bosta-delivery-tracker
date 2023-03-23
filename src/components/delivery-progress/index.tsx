import './index.scss'
import ProgressBar from 'components/delivery-progress/progress-bar'
import DeliveryInfo from './delivery-info'
import { DeliveryInfoType } from 'types'

const DeliveryProgress = ({ deliveryInfo }: { deliveryInfo: DeliveryInfoType }) => (
    <div className='delivery-progress'>
        <DeliveryInfo deliveryInfo={deliveryInfo} />
        <div className="divider"/>
        <ProgressBar CurrentStatus={deliveryInfo.CurrentStatus} />
    </div>
)


export default DeliveryProgress