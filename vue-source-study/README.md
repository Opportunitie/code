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

- vue中Observer 与 Watcher 和 Dep的关系
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