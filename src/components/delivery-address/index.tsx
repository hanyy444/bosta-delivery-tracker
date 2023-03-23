import './index.scss'

const DeliveryAddress = ({ deliveryAddress} : { deliveryAddress: string }) => {
  return (
    <div className='delivery-address'>
        <h4>عنوان التسليم</h4>
        <p className="address">{deliveryAddress}</p>    
        <div className="complaint">
            <img src="" alt="" />
            <div>
                <p>هل يوجد مشكلة في شحنتك؟</p>
                <button type="button" className='button'>إبلاغ عن المشكلة</button>
            </div>
        </div>
    </div>
  )
}

export default DeliveryAddress