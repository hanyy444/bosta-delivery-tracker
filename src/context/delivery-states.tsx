import { createContext } from "react";
import { DeliveryStates, DeliveryStatesMap, DeliveryStateType, DeliveryStatesContext } from "types";
import { getTime, getDate } from "utils";

const getState = (type: string, prev: DeliveryStatesMap, current: DeliveryStateType) => Object.freeze ({
    ...prev,
    [type]: {
        ...current,
        time: getTime(new Date(current.timestamp)),
        date: getDate(new Date(current.timestamp))
    }
})

const statesReducer = (prev: DeliveryStatesMap, current: DeliveryStateType) => {
    if (current.state in DeliveryStates){
        switch(current.state){
            case DeliveryStates.TICKET_CREATED:
                return getState(DeliveryStates.TICKET_CREATED, prev, current) 
            case DeliveryStates.NOT_YET_SHIPPED:
                return getState(DeliveryStates.NOT_YET_SHIPPED, prev, current)
            case DeliveryStates.IN_TRANSIT:
                return getState(DeliveryStates.IN_TRANSIT, prev, current) 
            case DeliveryStates.PACKAGE_RECEIVED:
                return getState(DeliveryStates.PACKAGE_RECEIVED, prev, current) 
            case DeliveryStates.OUT_FOR_DELIVERY:
                return getState(DeliveryStates.OUT_FOR_DELIVERY, prev, current) 
            case DeliveryStates.WAITING_FOR_CUSTOMER_ACTION:
                return getState(DeliveryStates.WAITING_FOR_CUSTOMER_ACTION, prev, current) 
            case DeliveryStates.DELIVERED:
                return getState(DeliveryStates.DELIVERED, prev, current)
            case DeliveryStates.DELIVERED_TO_SENDER:
                return getState(DeliveryStates.DELIVERED_TO_SENDER, prev, current) 
            case DeliveryStates.CANCELED:
                return getState(DeliveryStates.CANCELED, prev, current)
            default:
                return prev
        }
    } 
    return prev 
}

const DeliveryStatesContext = createContext<DeliveryStatesContext>({
    states: {} as DeliveryStatesMap,
    statesReducer
})

export default DeliveryStatesContext