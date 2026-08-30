// Object Oriented Programming

// Encapsulation

class BankAccount {
    private balance: number = 0;

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// console.log(account.balance); // Error: Property 'balance' is private...