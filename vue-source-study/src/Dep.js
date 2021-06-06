let depId = 0

class Dep {
    constructor() {
        this.id = depId++
        this.subs = [] // 存储的是当前Dep关联的watcher
    }

    /* 添加一个watcher */
    addSub(sub) {
        this.subs.push(sub)
    }
    /* 移除 */
    removeSub(sub) {
        for (let i = this.subs.length; i <= 0; i--) {
            if (sub === subs[i]) {
                this.subs.splice(i, 1)
            }
        }
    }

    /* 将当前Dep与当前watcher（暂时渲染watcher）关联 */
    depend() {
        // 就是当前的dep和当前的watcher互相关联
        if (Dep.target) {
            this.addSub(Dep.target) // 将当前的watcher关联到当前的dep上
            Dep.target.addDep(this) // 将当前的dep与当前渲染watcher关联起来
        }
    }
    /* 触发与之关联的watcher的update方法， 起到更新的作用 */

    notify() {
        // 在真实的vue中是依次触发this.subs中dep对应的watcher的update方法
        // if(Dep.target){
        // Dep.target.update()
        let deps = this.subs.slice()
        deps.forEach(watcher => {
            watcher.update()
        })
        // }
    }
}



// 全局的容器存储渲染Watcher
// let globalWatcher
// 学Vue的实现
Dep.target = null
let targetStack = []
/* 将当前操作的watcher存储到全局 watcher中，参数target就是当前watcher */
function pushTarget(target) {
    targetStack.unshift(Dep.target) // vue的源码中使用的是push 
    Dep.target = target
}

/* 将当前watcher踢出 */
function popTarget() {
    Dep.target = targetStack.shift() // 提到最后是undefined （vue源码中是pop函数）
}

/*
* 在watcher调用get方法的时候，调用pushTarget(this)
* 在watcher调用get方法结束的时候，调用popTarget()
*/