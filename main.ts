import { MyPromise } from "./my-promise.ts";

const myPromise = new MyPromise<number>((resolve, reject) => {
    // setTimeout(() => {
    //     console.log('Resolving...');
    //     resolve(0);
    // }, 1000)
    setTimeout(() => {
        console.log('rejecting');
        reject(`That's an error`);
    })


});

// console.log({myPromise});


myPromise.then(res => {
    console.log({res, myPromise})
}, err => console.log({err, myPromise}) );