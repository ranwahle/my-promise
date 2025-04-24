
type States = 'pending' | 'fulfilled' | 'rejected';


export class MyPromise<TValue> implements Promise<TValue> {
    get [Symbol('PromiseState')]() {
        return this.state;
    }

    private state: States = 'pending';
    private value: TValue;
    private successCallback: (value: TValue) => TValue | void;
    private error: any;
    private rejectCallback: (error: any) => any | void;
    private onFinally: () => void;

    toString() {
        return `{${this.state}}`;
    }

    private resolve(value: TValue) {
        this.state = 'fulfilled';
        this.value = value;
        this.successCallback?.(value);
        this.onFinally?.();
  
    }

    reject(error: any): void {
        this.state = 'rejected';
        this.error = error;
        this.rejectCallback?.(error);
        this.onFinally?.();
    }

    constructor(callback: (resolve: (value: TValue) => void, reject: (err: any) => void) => void) {
        callback(value => this.resolve(value), (error) => this.reject(error));
    }

    catch<TResult = never>(onrejected?: (reason: any) => TResult | PromiseLike<TResult>): Promise<TValue | TResult> {
        return new MyPromise<TResult>((resolve, reject) => {
            if (this.state === 'rejected') {
                reject(onrejected?.(this.error))
            } else {
                this.rejectCallback = reason =>  reject(onrejected?.(reason));
            }
        })
    }

    finally(onfinally?: () => void): Promise<TValue> {
        if (this.state !== 'pending') {
            onfinally?.();
        }
        else {
            this.onFinally = onfinally;
        }
        return this;
    }
    

    then<TSucessValue>(scueesCallback: (value: TValue ) => TSucessValue,
rejectCallback?: (err: any) => any): MyPromise<TSucessValue> {
    
       return new MyPromise((resolve, reject) => {
            if (this.state === 'fulfilled')
            {
                resolve(scueesCallback(this.value) )
            } else if (this.state === 'rejected') {
                reject(rejectCallback?.(this.error));
            } 
            else {
                this.successCallback = value => resolve(scueesCallback(value));
                this.rejectCallback = error => reject(rejectCallback?.(error));
            }
            
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
    
}