type State = 'pending' | 'fullfilled' | 'rejected';

type PromiseCallback = (value: unknown) => unknown;

export class MyPromise<TValue> {
    private state = 'pending';
    private value: TValue;
    private successCallback: PromiseCallback[] = [];

    private resolve(value: TValue) {
        this.state = 'fullfilled'
        this.value = value;
        this.successCallback.forEach(cb => cb(value));
        this.successCallback = [];

    }

    constructor(callback: (resolve: (value: TValue) => void, reject: (err: any) => void) => void) {
        callback(value => this.resolve(value), () => {
            console.log('There are no rejections');
        })
    }

    then<TResult>(callback: (value: TValue) => TResult): MyPromise<TResult> {
       
       
       return new MyPromise((resolve, reject) => {
            if (this.state === 'fullfilled') {
                resolve(callback(this.value) )
            }
            this.successCallback.push(res =>  resolve(callback(this.value)));
       })
    }

    static all<TValue>(promises: (Promise<TValue>)[]): Promise<TValue[]> {
        throw Error('This was not fullfilled')

    }
    
}