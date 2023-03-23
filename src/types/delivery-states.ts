
export interface DeliveryStateType {
    state: string
    timestamp: string
    time?: string
    date?: string
    hub?: string
    reason?: string
}

export enum DeliveryStates {
    TICKET_CREATED = 'TICKET_CREATED',
    IN_TRANSIT = 'IN_TRANSIT',
    PACKAGE_RECEIVED = 'PACKAGE_RECEIVED',
    NOT_YET_SHIPPED = 'NOT_YET_SHIPPED',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    WAITING_FOR_CUSTOMER_ACTION = 'WAITING_FOR_CUSTOMER_ACTION',
    DELIVERED = 'DELIVERED',
    DELIVERED_TO_SENDER = 'DELIVERED_TO_SENDER',
    CANCELED = 'CANCELED' 
}


export const getArabicDeliveryState = (state: string) => {
    switch (state) {
        case DeliveryStates.TICKET_CREATED:
            return 'تم إنشاء التذكرة'
        case DeliveryStates.IN_TRANSIT:
            return 'قيد الشحن'
        case DeliveryStates.PACKAGE_RECEIVED:
            return 'تم استلام الشحنة'
        case DeliveryStates.NOT_YET_SHIPPED:
            return 'لم يتم الشحن بعد'
        case DeliveryStates.OUT_FOR_DELIVERY:
            return 'خارج للتوصيل'
        case DeliveryStates.WAITING_FOR_CUSTOMER_ACTION:
            return 'بانتظار اتخاذ إجراء من قبل العميل'
        case DeliveryStates.DELIVERED:
            return 'تم التوصيل'
        case DeliveryStates.DELIVERED_TO_SENDER:
            return 'تم التوصيل للمرسل';
        case DeliveryStates.CANCELED:
            return 'تم الإلغاء'
        default:
            return ''
    }
}

export type DeliveryStatesMap = { 
    [key in DeliveryStates]?: DeliveryStateType
}

export interface DeliveryStatesContext {
    states: DeliveryStatesMap
    statesReducer: (prev: DeliveryStatesMap, current: DeliveryStateType) => DeliveryStatesMap
}

export const SUCCESS_STATES: string[] = [DeliveryStates.DELIVERED, 
    DeliveryStates.DELIVERED_TO_SENDER, 
    DeliveryStates.OUT_FOR_DELIVERY,
    DeliveryStates.TICKET_CREATED,
    DeliveryStates.PACKAGE_RECEIVED,
    DeliveryStates.DELIVERED_TO_SENDER] 
// const IN_PROGRESS_STATES: string[] = [
//     DeliveryStates.NOT_YET_SHIPPED,
//     DeliveryStates.IN_TRANSIT,
//     DeliveryStates.WAITING_FOR_CUSTOMER_ACTION
// ]
export const FAILURE_STATES: string[] = [
    DeliveryStates.CANCELED    
]