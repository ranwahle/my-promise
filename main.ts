import { MyPromise } from "./my-promise.ts";

const myPromise = new MyPromise<number>((resolve, reject) => {
    setTimeout(() => {
        console.log('Resolving...');
        resolve(0);
    }, 1000)


});

console.log({myPromise});


myPromise.then(res => {
    console.log({res, myPromise});
});