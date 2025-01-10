export function TimeLocalizeFunction(timeDirty: string) {
    const time = timeDirty.split(':')
    const clean = (two: string)  => (two == "00" ? null : two[0] == "0" ? two[1] : two)
    const resultHours = `${clean(time[0])} час`
    const resultMinuts = `${clean(time[1])} минут`
    const result = `${clean(time[0]) == null ? '' : resultHours} ${clean(time[1]) == null ? '' : resultMinuts}`
    return result
}

export function TimeConverter(hoursDirty: number, minutesDirty: number) {
    const hours = String(hoursDirty).length < 2 ? `0${hoursDirty}` : hoursDirty
    const minutes = String(minutesDirty).length < 2 ? `0${minutesDirty}` : minutesDirty
    console.log(`${hours}:${minutes}:00`)
    return `${hours}:${minutes}:00`
}

