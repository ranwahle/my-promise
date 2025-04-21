const states = {
    fullFilled: Symbol('fullfilled'),
    rejected: Symbol('rejected'),
    pending: Symbol('pending')

}

export class MyPromise<TValue> {
    private state = states.pending;
    private value: TValue;
    private successCallback: (value: TValue) => TValue | void;
    private error: any;
    private rejectCallback: (error: any) => any | void;

    private resolve(value: TValue) {
        this.state = states.fullFilled;
        this.value = value;
        this.successCallback?.(value);
  
    }

    reject(error: any): void {
        this.state = states.rejected;
        this.error = error;
        this.rejectCallback?.(error);
    }

    constructor(callback: (resolve: (value: TValue) => void, reject: (err: any) => void) => void) {
        callback(value => this.resolve(value), (error) => this.reject(error));
    }
    

    then(scueesCallback: (value: TValue | void) => TValue | void,
rejectCallback: (err: any) => any): MyPromise<TValue | void> {
    
       return new MyPromise((resolve, reject) => {
            if (this.state === states.fullFilled)
            {
                resolve(scueesCallback(this.value) )
            } else if (this.state === states.rejected) {
                reject(rejectCallback?.(this.error));
            } 
            else {
                this.successCallback = value => resolve(scueesCallback(value));
                this.rejectCallback = error => reject(rejectCallback?.(error));
            }
            
       })
    }

    static all<TValue>(promises: (Promise<TValue>)[]): Promise<TValue[]> {
        throw Error('This was not fullfilled')

    }
    
}