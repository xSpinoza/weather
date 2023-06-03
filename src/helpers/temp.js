const tempFun = (data, deg) => {
    if(deg === 'f') {
        const fa = 1.8 * (data - 273) + 32
        return Math.round(fa)
    } else{
        const ce = data - 273.15
        return Math.round(ce)
    }
}

export default tempFun