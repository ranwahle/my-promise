const states = {
    fullFilled: Symbol('fullfilled'),
    rejected: Symbol('rejected'),
    pending: Symbol('pending')

}

export class MyPromise<TValue> {
    private state = states.pending;
    private value: TValue;
    private successCallback: (value: TValue) => TValue | void;

    private resolve(value: TValue) {
        this.state = states.fullFilled;
        this.value = value;
        this.successCallback?.(value);

    }

    constructor(callback: (resolve: (value: TValue) => void, reject: (err: any) => void) => void) {
        callback(value => this.resolve(value), () => {
            console.log('There are no rejections');
        })
    }

    then(callback: (value: TValue | void) => TValue | void): MyPromise<TValue | void> {
    
       return new MyPromise((resolve, reject) => {
            if (this.state === states.fullFilled)
            {
                resolve(callback(this.value) )
            } else {
                this.successCallback = value => resolve(callback(value));
            }
            
       })
    }

    static all<TValue>(promises: (Promise<TValue>)[]): Promise<TValue[]> {
        throw Error('This was not fullfilled')

    }
    
}