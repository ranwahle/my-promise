import { MyPromise } from "./my-promise.ts";

const myPromise = new MyPromise<number>((resolve, reject) => {
    setTimeout(() => {
        console.log('Resolving...');
        resolve(0);
    }, 3000)


});

console.log({myPromise});


myPromise.then(res => console.log(1, {res}));
myPromise.then(res => res + 4).then(res => console.log(2, {res}));