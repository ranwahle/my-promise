import { MyPromise } from "./my-promise.ts";

const myPromise = new MyPromise<number>((resolve, reject) => {
    setTimeout(() => {
        console.log('Resolving...');
        resolve(0);
    }, 1000)
    // setTimeout(() => {
    //     console.log('rejecting');
    //     reject(`That's an error`);
    // })


});

// console.log({myPromise});


myPromise.then(res => {
   return `The value returne was ${res}`
}, err => console.log({err, myPromise}) )
    .then(res => console.log(res));

    myPromise.then(res => {
        return `The value returne was ${res}`
     }, err => console.log({err, myPromise}) )
         .then(res => console.log('2', res));
     
const promises = [];

for (let i=0; i < 50; i++) {
    promises.push(new MyPromise((res, rej) => {
        setTimeout(() => res(i), 500);
    }));
}

MyPromise.all(promises).then(values => {
    console.log({values});
})