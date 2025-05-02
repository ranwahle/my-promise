import { MyPromise } from "./my-promise.ts";

const myPromise = new MyPromise<number>((resolve, reject) => {
    setTimeout(() => {
        console.log('Resolving...');
        resolve(0);
    }, 1000)
});




async function awaitMypormise() {
const value = await myPromise;

   console.log({ value})
}
awaitMypormise();



