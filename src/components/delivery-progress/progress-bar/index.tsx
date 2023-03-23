import './index.scss'
import {useRef, ReactElement, useContext, useMemo } from 'react'
import { FaTruck, FaCheck, FaSave } from 'react-icons/fa'
import { DeliveryStateType, DeliveryStates, getArabicDeliveryState, SUCCESS_STATES, FAILURE_STATES } from 'types'
import { useWindowWidth } from 'hooks'
import DeliveryStatesContext from 'context/delivery-states'
import { getProgressBarProps } from 'utils'

interface Step {
    icon: ReactElement
    text: string
    success: boolean
    state: string
}

const NUMBER_OF_STEPS: number = 4

const ProgressBar = ({ CurrentStatus } : { CurrentStatus: DeliveryStateType }) => {
    const {states} = useContext(DeliveryStatesContext)
    
    const currentState = CurrentStatus.state
    const currentStatus = SUCCESS_STATES.includes(currentState) ? 'success' : 
        FAILURE_STATES.includes(currentState) ? 'failure' 
        : 'in-progress'
    
    const customerAction: string | undefined = states.WAITING_FOR_CUSTOMER_ACTION?.reason || states.CANCELED?.reason || undefined
    
    // respond to screen width (re-renders on resize)
    useWindowWidth()

    const barRef = useRef<HTMLUListElement>(null)
    const [stepWidth, spaceWidth] = getProgressBarProps(barRef, NUMBER_OF_STEPS)
    const steps: Step[] = useMemo(() => [
        {
            icon: <FaCheck/>,
            text: getArabicDeliveryState(DeliveryStates.TICKET_CREATED),
            state: DeliveryStates.TICKET_CREATED,
            success: DeliveryStates.TICKET_CREATED in states      
        },
        {
            icon: <FaCheck/>,
            text: getArabicDeliveryState(DeliveryStates.PACKAGE_RECEIVED),
            success: DeliveryStates.PACKAGE_RECEIVED in states,
            state: DeliveryStates.PACKAGE_RECEIVED,
        },
        {
            icon: DeliveryStates.OUT_FOR_DELIVERY in states && !(DeliveryStates.CANCELED in states) ? <FaCheck/> : <FaTruck className='big-icon'/>,
            text: getArabicDeliveryState(DeliveryStates.OUT_FOR_DELIVERY),
            success: DeliveryStates.OUT_FOR_DELIVERY in states,
            state: DeliveryStates.CANCELED ?? DeliveryStates.OUT_FOR_DELIVERY,
        },
        {
            icon: DeliveryStates.DELIVERED in states || DeliveryStates.DELIVERED_TO_SENDER in states ? <FaCheck/> : <FaSave className='big-icon'/>,
            text: getArabicDeliveryState(DeliveryStates.DELIVERED),
            success: DeliveryStates.DELIVERED in states || DeliveryStates.DELIVERED_TO_SENDER in states,
            state: DeliveryStates.DELIVERED || DeliveryStates.DELIVERED_TO_SENDER
        }
    ], [states])

    const currentStepIndex = steps.findIndex(step => step.state === currentState)

    return (
        <ul className="progress-bar" ref={barRef}>
            {steps.map((step, index) => (
                <li className='step' key={index} style={{ width: stepWidth }}>
                    <i className={`progress ${step.success && currentStatus}`}>
                        {step.icon}
                        {
                            index!==steps.length-1 ? (steps[index+1]?.success ? 
                                (<span className='space' style={{ width: spaceWidth }}/>) : null
                            ) : null                            
                        }
                    </i>
                    <span>{step.text}</span>
                    {
                        currentStatus !== 'success' && 
                        currentStepIndex === index && 
                        <span className={currentStatus}>{customerAction}</span>
                    }
                </li>
            ))}
        </ul>
    )
}

export default ProgressBar