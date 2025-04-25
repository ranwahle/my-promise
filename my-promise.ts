type State = 'pending' | 'fullfilled' | 'rejected';

type PromiseCallback = (value: unknown) => unknown;

export class MyPromise<TResult, TError = void> {
private state = 'pending';  
    private value: TResult;
    private error: TError;
    private successCallback: PromiseCallback[] = [];   
    private finallyCallbacks:PromiseCallback[] = [];
    private rejectCallback: PromiseCallback[] = [];

    private resolve(value: TResult) {
        this.state = 'fullfilled'
        this.value = value;
        this.successCallback.forEach(cb => cb(value));
        this.successCallback = [];
        this.finallyCallbacks.forEach(cb => cb(void 0));
        this.finallyCallbacks = [];

    }

    private reject(err: TError) {
        this.state = 'fullfilled'
        this.error = err;
        this.rejectCallback.forEach(cb => cb(err));
        this.successCallback = [];
        this.finallyCallbacks.forEach(cb => cb(void 0));
        this.finallyCallbacks = [];
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

    static all<TValue>(promises: (Promise<TValue>)[]): MyPromise<TValue[]> {
        return new MyPromise<TValue[]>((resolve, reject)=> {
            const result = [];

            const callback = (value: TValue) => {
                result.push(value);
                if (result.length === promises.length) {
                    resolve(result);
                }
            };

            promises.forEach(p => p.then(callback));


        })

    }

    finally(onfinally?: () => void): MyPromise<TResult, TError> {
        if (this.state !== 'pending') {
            onfinally?.();
        }
        else {
            this.finallyCallbacks.push(onfinally);
        }
        return this;
    }
    
}