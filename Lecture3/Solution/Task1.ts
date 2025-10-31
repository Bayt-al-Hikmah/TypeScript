function isPrime(n: number):boolean{

    if (n < 2){
        return false;
    }else if(n == 2){
        return true
    }
    for (let i:number = 2; i <= Math.sqrt(n); i++){
        if(n % i == 0){
            return false
        }
    }
    return true

}
console.log("5 is prime", isPrime(5))
console.log("25 is prime", isPrime(25))
console.log("9 is prime", isPrime(9))
console.log("2 is prime", isPrime(2))