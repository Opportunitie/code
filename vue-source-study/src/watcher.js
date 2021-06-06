let watcherId = 0;

/* Watcher 观察者，用户发射更新的行为 */
class Watcher {
    /*
     * {object} vm MyVue实例
     * {String|Function} expOrfn如果是渲染watcher,传入的是渲染函数，
     * 如果是计算watcher传入的是路径表达式（a.b.c）（暂时只考虑为函数情况）
     */
    constructor(vm, expOrfn, callback) {
        this.vm = vm;
        this.getter = expOrfn;
        this.id = watcherId++;
        this.deps = []; // 依赖项
        this.depIds = {}; // 是一个Set类型，用户保证依赖项的唯一性(简化的代码在那时不实现这一块)

        // 一开始需要渲染：真实vue中：this.lazy? undefined: ths.get()
        this.get();
    }

    get() {
        pushTarget(this);
        this.getter.call(this.vm, this.vm); // 上下文的问题解决了
        popTarget();
    }
    /*
     * 执行，并判断是懒加载，还是同步执行，还是异步执行
     * 现在只考虑异步执行（简化的是同步执行）
     */
    run() {
        this.get();
    }

    /*
     * 对外公共的函数，用于在属性发生变化时触发的接口
     */

    update() {
        this.run();
    }

    /* 清空依赖队列 */
    cleanupDep() { }
    // 将当前的dep与当前的watcher关联
    addDep(dep) {
        this.deps.push(dep);
    }
}
