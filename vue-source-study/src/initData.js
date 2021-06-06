let ARRAY_METHOD = [
    "push",
    "pop",
    "shift",
    "unshift",
    "reverse",
    "sort",
    "splice",
];
// let arr = []

// 继承关系： arr-> Array.prototype -> Object.prototype -> null
// 改变继承关系： arr -> 改写的方法 -> Array.prototype -> Object.prototype -> null
let array_methods = Object.create(Array.prototype);

ARRAY_METHOD.forEach((method) => {
    array_methods[method] = function () {
        console.log(`调用的是拦截的${method}方法`);
        // 进行响应式化
        for (let i = o; i < arguments.length; i++) {
            observer(arguments[i]) // 有个问题，引入watcher 后解决
        }
        let res = Array.prototype[method].apply(this, arguments);
        return res;
    };
});
// arr.__proto__ = array_methods // 如果浏览器支持__proto__那么就这么做，如果不支持就用混入法，对所有方法遍历，变成当前对象的属性
// 将将对象的基本类型数组值变成响应式
function defineReactive(target, key, value, enumerable) {
    // 函数内部是一个局部作用域，这个value 就只在函数内使用（闭包）
    let that = this
    // if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    if (value !== null && typeof value === "object") {
        observer(value, that);
    }
    let dep = new Dep()
    dep__propName__  = key
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: !!enumerable,
        get() {
            console.log(`读取对象的${key}属性`);
            // 依赖收集
            // if(Dep.target){
                dep.depend()
            // }
            return value;
        },
        set(newValue) {
            console.log(`设置对象的${key}属性`);

            // vue实例中 watcher里面处理
            // value = reactify(newValue,vm)  // 解决直接赋值，对应的值变成响应式
            // 将重新赋值的数据变成响应式的，如果传入的是对象类型，就需要用observer
            if (typeof newValue === 'object' && newValue !== null) {
                observer(newValue)
            }
            value = newValue;
            dep.notify()
            typeof that.mountComponent === 'function' && that.mountComponent() // 临时
        },
    });
}

// 将对象里面的全部内容变成响应式
// function reactify(obj, vm) {
//     const keys = Object.keys(obj);
//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         const value = obj[key];
//         /*
//          * 判断属性是否为引用类型，判断是否为数组
//          * 如果是引用类型就递归，如果不是就不用递归
//          * 如果不是引用类型，就需要用defineReactive将其变成响应式的
//          * 如果是引用类型，还是需要调用defineReactive将其变成响应式
//          * 如果是数组？就需要循环数组，将数组里面的元素变成响应式的
//          */

//         if (Array.isArray(value)) {
//             // 数组
//             value.__proto__ = array_methods
//             for (let j = 0; j < value.length; j++) {
//                 reactify(value[j], vm);
//             }
//         } else {
//             // 对象或值类型
//             defineReactive.call(vm, obj, key, value, true);
//         }
//     }
// }

function observer(obj, vm) {
    if (Array.isArray(obj)) {
        obj.__proto__ = array_methods
        for (let i = 0; i < obj.length; i++) {
            observer(obj[i], vm)
            defineReactive.call(vm, obj, i, obj[i], true)
        }
    } else {
        let keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            let prop = keys[i];
            defineReactive.call(vm, obj, prop, obj[prop], true)
        }
    }
}

function proxy(target, prop, key) {
    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: true,
        get() {
            return target[prop][key]
        },
        set(newValue) {
            target[prop][key] = newValue
        }
    })
}

MyVue.prototype.initData = function () {
    // 遍历this._data 的成员， 将属性转换为响应式（上），将直接属性，代理到实例上
    let keys = Object.keys(this._data)
    for (let i = 0; i < keys.length; i++) {
        // 将对象this._data[keys[i]]变成响应式
        observer(this._data, this)
    }

    for (let i = 0; i < keys.length; i++) {
        // 将this._data[keys[i]]映射到this[keys[i]]上
        // 就是要让this提供keys[i]这个属性
        // 访问这个属性的时候，相当于在访问this._data的这个属性
        proxy(this, '_data', keys[i])
    }
}

