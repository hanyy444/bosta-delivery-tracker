import { DeliveryStateType } from "./delivery-states"

interface WorkingDay {
    dayDate: string
    dayName: string
}

export default interface DeliveryInfo {
    CreatedDate: string
    CurrentStatus: DeliveryStateType
    PromisedDate: string
    SupportPhoneNumbers: string[]
    TrackingNumber: string
    TrackingURL: string
    TransitEvents: DeliveryStateType[]
    isEditableShipment: boolean
    nextWorkingDay: WorkingDay[]
    provider: string
    clientName: string
    address: string
    branch: string
}

