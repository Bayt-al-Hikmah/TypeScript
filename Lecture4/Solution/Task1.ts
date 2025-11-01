class InsufficientFundsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InsufficientFundsError";
    Object.setPrototypeOf(this, InsufficientFundsError.prototype);
  }
}

class BankAccount {
  private balance: number = 0;

  public deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be greater than 0.");
    }
    this.balance += amount;
    console.log(`Deposited: $${amount}. Balance: $${this.balance}`);
  }

  public withdraw(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdraw amount must be greater than 0.");
    }
    if (amount > this.balance) {
      throw new InsufficientFundsError("Insufficient balance to withdraw.");
    }
    this.balance -= amount;
    console.log(`Withdrew: $${amount}. Balance: $${this.balance}`);
  }
}

const account = new BankAccount();

try {
  account.deposit(100);
  account.withdraw(50);
  account.withdraw(100);
} catch (error) {
  if (error instanceof InsufficientFundsError) {
    console.error("Error:", error.message);
  } else {
    console.error("Unexpected error:", error);
  }
}