var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
              "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

var days =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];

export const getTime = (date: Date) => date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit'})
export const getDate = (date: Date) => date.toLocaleDateString([], { month: '2-digit', day:'2-digit', year: 'numeric'})
export const getLongDate = (date: Date) => `at ${getTime(date)} ${getDate(date)} ${days[date.getDay()]}`
export const getShortDate = (date: Date) => `${date.getFullYear()} ${months[date.getMonth()]} ${days[date.getDay()]}`

export const getProgressBarProps = (barRef: React.RefObject<HTMLUListElement>, stepsNumber: number) => {
    const numberOfSpaces: number = stepsNumber === 1 ? 0 : stepsNumber - 1,
        containerWidth: number | undefined = barRef?.current?.offsetWidth, 
        stepWidth: number = 100
    const spaceWidth = containerWidth 
        && numberOfSpaces 
        && (((containerWidth - stepsNumber * stepWidth) / numberOfSpaces) + stepWidth)
    
    return [stepWidth, spaceWidth]
} 