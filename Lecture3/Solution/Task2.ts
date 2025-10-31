function toBinary(n:number):number{
    if(n == 0){
        return 0
    }
    return n % 2 + toBinary(Math.floor(n / 2)) * 10
}

console.log("5 represented binary as",toBinary(5))
console.log("1 represented binary as",toBinary(1))
console.log("10 represented binary as",toBinary(10))