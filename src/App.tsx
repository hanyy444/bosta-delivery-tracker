import './app.scss'
import { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { DeliveryInfoType, DeliveryStatesMap } from 'types'
import DeliveryStatesContext from 'context/delivery-states'
import { Navbar, DeliveryProgress, DeliveryDetails, DeliveryAddress, Feedback } from 'components'
import { getTrackingData } from 'api'
import { AxiosError } from 'axios'

const DEFAULT_TRACKING_NUMBER: number = 9442984 

function App() {

    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoType | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetch = useCallback(async (trackingNumber: number) => {
      try {
        setLoading(true)
        const deliveryInfo = await getTrackingData(trackingNumber)
        setDeliveryInfo({ 
          // ...temp, 
          ...deliveryInfo,
          clientName: 'SOUQ.COM', 
          address: 'Cairo ,,, امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 32',
          branch: 'مدينة نصر'
        })
      } catch (error) {
        setError((error as AxiosError).message)
      } finally {
        setLoading(false)
      }
    }, [])

    useEffect(()=>{
      const timeout = setTimeout(()=>setError(null), 2000)
      return () => clearTimeout(timeout)
    },[error])

    useEffect(()=>{
      fetch(DEFAULT_TRACKING_NUMBER)
    },[])

    const { statesReducer } = useContext(DeliveryStatesContext)

    const states: DeliveryStatesMap = useMemo(() => {
        const _states: DeliveryStatesMap = {}

        if (!deliveryInfo) return _states

        return deliveryInfo?.TransitEvents.reduce<DeliveryStatesMap>(statesReducer, _states)

    }, [deliveryInfo])

    return (
      <DeliveryStatesContext.Provider value={{ states, statesReducer }}>
        <div className="app">
          <div className="container">
            {!!error && <Feedback message={error}/>}
            <Navbar getTrackingData={fetch}/>
            {deliveryInfo && !loading && <div className="main">
              <DeliveryProgress deliveryInfo={deliveryInfo}/>
              <DeliveryDetails branch={deliveryInfo.branch}/>
              <DeliveryAddress deliveryAddress={deliveryInfo.address}/>
            </div>}
          </div>
        </div>
      </DeliveryStatesContext.Provider>
    )
}

export default App
