# 本线项目主要用于学习vue源码
- 工具：
    - vscode
- 插件
    - live server
1. 虚拟Dom的render方法
思考： 模板转换成抽象语法树需要执行几次！！
- 页面一开始加载需要渲染
- 每一个属性（响应式）数据在发生变化的时候 要渲染
- watch， computed等等

render的作用是将虚拟Dom转换为真正的Dom加载到页面
- 一个项目运行的时候，模板是不会变的，就表示AST是不会变的

我们可以将代码进行优化，将虚拟DOM缓存起来，生成一个函数，函数 只需要传入数据就可以得到真正的DOM

# 响应式原理
- 我们在使用VUE时候，赋值属性获得属性都是直接使用的Vue实例
- 我们在设计属性值的时候，页面的数据更新

    ```js
    Object.defineProperty(target,atts,{
        writable,
        cofigurable,
        enumerable, // 控制是否可枚举，是不是可以被for-in取出来
        set(){}, // 赋值触发
        get(){} // 取值触发
    })
    ```
- 实际开发中对象一般有多级,使用递归处理
```js
    let o = {
        list: [{}],
        ads: [{}],
        user: {}
    }
```
对于对象可以使用递归来响应式化，但是数组也需要处理
 - push
 - pop
 - shift
 - unShift
 - reverse
 - sort
 - splice

 1. 在该改变数组数据的时候，要发出通知
    - vue2中的缺陷，数组发生变化，设置length没法通知（vue3中使用proxy语法Es6的语法解决了这个问题）
 2. 加入元素应该变成响应式的
 
 技巧：一个函数已经定义了，但是我们需要扩展其功能，一般的处理方法：

 1. 使用一个临时的函数名存储函数
 2. 重新定义原来的函数
 3. 定义扩展的功能
 4. 调用临时的那个函数

扩展数组的push和pop怎么处理？？？

- 修改要进行响应式化的数组的原型 （_proto_）

# 事件模型发布订阅者模式
![发布订阅者模型](./assets/image/publishSubscriberModel.png)

- vue中Observer 与 Watcher 和 Dep的关系 [三者关系](https://segmentfault.com/a/1190000008377887) 
# observer

# watcher
1. 只考虑修改后刷新
2. 再考虑依赖收集
在vue中提供一个构造函数
Watcher 会有一些方法
- get() 用来进行计算或者执行处理函数(处理页面渲染)
- update() 公开的外部方法， 该方法会触发内部的run方法
- run() 运行，用来判断内部是使用异步运行还是同步运行等，脏值检测，最终会调用get方法
- cleanupDep() 简单理解为清除队列

页面渲染上面get()执行的

watcher实例有一个属性vm，表示的是当前的vue实例

# Dep对象
该对象提供依赖收集（depend）的功能，和派发更新（notify）的功能

在notify 中去调用watcher的update方法

# watcher 与 Dep [图解](./assets/image/Dep（依赖收集与页面渲染）.png) 
之前将渲染Wathcer放在全局作用域上，这样处理是由问题的
- vue项目中包含很多的组件，各个组件的***自治*
    - 那么watcher就可能有多个
    - 每一个watcher用于描述一个渲染行为 或者计算行为
        - 子组件发生数据的更新，页面需要重新渲染（真正的vue中时局部渲染）
        - 例如vue中推荐使用计算属性 代替复杂的插值描述
            - 计算属性就会伴随其使用的属性变化而变化 
            - `name： () => this.firstname + this.lastName`
                - 计算属性依赖于属性firstName 和属性lastName
                - 只要被依赖的属性发生变化，那么就会促使计算属性重新计算（watcher）
- 依赖收集与派发更新是怎么运行起来的

**访问的时候 就会进行收集，修改的时候就会更新，收集什么，更新什么**
所谓的依赖收集 **实际上就是告诉当前watcher什么属性被访问量了**，
那么在这个watcher就算的时候 或渲染页面的时候 就会将这些收集到的属性进行更新

如何将属性与当前watcher进行关联
- 在全局准备一个targetStack（watcher栈， 简单的理解为watcher数组，把一个操作中需要使用的watcher 都存储起来）
- 在watcher调用get 方法的时候，将当前watcher放到全局，在get执行结束的时候（之后），将这个全局的watcher移除。提供两个方法： pushTarget popTarget
- 在每一个属性中都有一个Dep对象

在访问对象属性的时候（get）,渲染watcher就在全局中
将属性与watcher关联，其实就是将当前的渲染watcher存储到属性相关的dep中，同时，将dep也存储到当前的watcher中，（相互引用的关系）

- 属性引用了当前的渲染watcher， 属性知道谁渲染它
- 当前渲染watcher引用了访问的属性（Dep），**当前的Watcher知道渲染了什么属性**

dep有一个方法，叫做notify()

内部就是将dep中的subs取出来，依次调用其update方法

subs中存储的是 **知道要渲染什么属性的watcher**



# Observer


# Vue源码解读
1. 各个文件夹的作用
2. Vue初始化流程

## 各个文件夹的作用
1. compiler 的作用
    - vue使用**字符串**作为模板
    - 在编译文件中存放对模板字符串的解析算法，抽象语法树，优化等
2. core核心 vue构造函数，生命周期等方法的部分
3. platforms 平台
    - 针对运行的环境（设备）有不同的实现
    - vue的入口
4. server 服务端，主要将vue用在服务端的处理代码（暂时没看）
5. sfc 单文件组件（暂时没看，用在vue-cli）
6. shared 公共工具，方法

# 主要内容
1. vue源码
    1. Observer
    2. watch 和 computed
    3. 简单说明一下 patch
# observer 文件夹中各个文件的作用
- array.js 创建含有重写， 数组方法的数组，让所有的响应式数组继承自该数组
- dep.js Dep类
- index.js Observer类，observe的工厂函数
- scheduler.js vue中任务调度的工具，watcher执行的核心
- traverse.js 遍历递归响应式数据，目的是触发依赖收集
- watcher.js Watcher类

面试题： 对数组去重
```js
let a = [1,2,2,2,3,3,4,2,5,6]
let _set = { }
let _newArry = []
a.forEach( item => _set[item] || (_set[item] = true, _newArray.push(item)))
```