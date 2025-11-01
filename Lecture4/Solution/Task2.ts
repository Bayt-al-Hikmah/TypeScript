
function toUpperCase(originalMethod: any, context: ClassMethodDecoratorContext) {

  function replacementMethod(this: any, ...args: any[]) {

    const result = originalMethod.apply(this, args);
    if (typeof result === 'string') {
      return result.toUpperCase();
    }
    return result;
  }
  return replacementMethod;
}


class Greeter {

  @toUpperCase
  sayHello(name: string): string {
    return `Hello, ${name}. Welcome!`;
  }

  @toUpperCase
  getAge(): number {
    return 30;
  }
}


const greeter = new Greeter();

const greeting = greeter.sayHello("Alice");
console.log(greeting); 

const age = greeter.getAge();
console.log(age);