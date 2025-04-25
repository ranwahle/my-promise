type State = 'pending' | 'fullfilled' | 'rejected';

type PromiseCallback = (value: unknown) => unknown;

export class MyPromise<TResult, TError = void> {
private state = 'pending';  
    private value: TResult;
    private error: TError;
    private successCallback: PromiseCallback[] = [];
    private rejectCallback: PromiseCallback[] = [];

    private resolve(value: TResult) {
        this.state = 'fullfilled'
        this.value = value;
        this.successCallback.forEach(cb => cb(value));
        this.successCallback = [];

    }

    private reject(err: TError) {
        this.state = 'fullfilled'
        this.error = err;
        this.rejectCallback.forEach(cb => cb(err));
        this.successCallback = [];

    }

    constructor(callback: (resolve: (value: TResult) => void, reject: (err: TError) => void) => void) {
        callback(value => this.resolve(value), err => this.reject(err));
    }

    then<TCallbackResult, TCallbackError>(onFilfilled: (value: TResult) => TCallbackResult, onRejected?: (err: TError) => TCallbackError  ): MyPromise<TCallbackResult, TCallbackError> {
       
       
       return new MyPromise((resolve, reject) => {
            if (this.state === 'fullfilled') {
                resolve(onFilfilled(this.value) )
            } else if (this.state === 'rejected') {
                reject(onRejected(this.error) )
            }
            this.successCallback.push(res =>  resolve(onFilfilled(this.value)));
            this.rejectCallback.push(res =>  reject(onRejected(this.error)));
       })
    }

    static all<TValue>(promises: (Promise<TValue>)[]): Promise<TValue[]> {
        throw Error('This was not fullfilled')

    }
    
}