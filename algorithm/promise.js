
const PENDDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
    that = this
    that.state = PENDDING
    that.value = null
    that.resovedCallbacks = []
    that.rejectedCallbacks = []

    function resolve(value){
        if(that.state = PENDDING){
            that.state = RESOLVED
            that.value = value
            resovedCallbacks.map(cb => cb(that.value))
        }
    }

    function reject(value){
        if(that.state === PENDDING){
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    }

    try {
        fn(resolve, reject)
    } catch (error) {
        reject(error)

    }
}

MyPromise.prototype.then = function(onFulfilled, onRejected){
    const that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : v => v;

    if(that.state === PENDDING){
        that.rejectedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }
    if(that.state === RESOLVED){
        onFulfilled(that.value)
    }

    if(that.state === REJECTED){
        onRejected(that.value)
    }

}


let myPromise = new MyPromise((resolve,reject) => {
    resolve(1)
})
myPromise.then(value => console.log(1))

