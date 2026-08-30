// Working with Decorator

// This is the decorator function

// originalMethod: represent the method we adding decorator to
// context: have the meta data of the method or function we decorating
function logMethod(originalMethod: any, context: ClassMethodDecoratorContext){
    
    const propertyName = String(context.name); 

    // the function that will replace our decorated method
    // - args represent the argument we used in our original method
    function replacementMethod(this: any, ...args: any[]) {
        console.log(`Calling "${propertyName}" with args:`, args);
        
        // calling our original method and applying it logic
        const result = originalMethod.apply(this, args);
        
        console.log(`Method "${propertyName}" returned:`, result);
        return result;
    }

    return replacementMethod;
}

class Calculator {
    // applying decorator to the add method
    @logMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);