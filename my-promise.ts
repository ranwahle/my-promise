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
        console.trace('resolve', value);
        this.state = states.fullFilled;
        this.value = value;

    }

    constructor(callback: (resolve: (value: TValue) => void, reject: (err: any) => void) => void) {
        callback(value => this.resolve(value), () => {
            console.log('There are no rejections');
        })
    }

    then(callback: (value: TValue | void) => TValue): MyPromise<TValue> {
       this.successCallback = callback;
       
       return new MyPromise((resolve, reject) => {

            resolve(callback(this.value) )
       })
    }

    static all<TValue>(promises: (Promise<TValue>)[]): Promise<TValue[]> {
        throw Error('This was not fullfilled')

    }
    
}