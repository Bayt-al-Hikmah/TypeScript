
export function largest(arr:number[]):number{
    let result:number = arr[0] || 0
    for (let item of arr){
        if (item > result){
            result = item
        }
    }
    return result
}

export function smallest(arr:number[]):number{
    let result:number = arr[0] || 0
    for (let item of arr){
        if (item < result){
            result = item
        }
    }
    return result
}

export function average(arr:number[]):number{
    let result:number =  0
    for (let item of arr){
        if (item > result){
            result += item
        }
    }
    return result / arr.length
}

