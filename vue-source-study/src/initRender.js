MyVue.prototype.mount = function () {
    // 需要提供一个render方法：生成虚拟DOm
    this.render = this.createRenderFn(); //
    this.mountComponent();
};

/*
      在真正的Vue中使用了二次提交的设计结构
      1. 在页面中的DOM和虚拟DOM是意义对应的关系
      2. 先由AST和Data生成Vnode（新的虚拟DOM ，render）
      3. 将旧的Vnode 和 新的Vnode比较（diff），更新（update）
  */
MyVue.prototype.mountComponent = function () {
    let mount = () => {
        this.update(this.render());
    };
    // 这个Watcher就是全局的Watcher，在任何一个位置都可以访问它（简化的写法）
    new Watcher(this, mount)
    // mount();
};
// 生成AST并且缓存，（使用虚拟DOM来模拟）
MyVue.prototype.createRenderFn = function () {
    let _ast = getVNode(this._template);
    return function render() {
        let _temp = combine(_ast, this._data);
        return _temp;
    };
};
// 将虚拟DOM渲染到页面上， diff算法就在这里面
MyVue.prototype.update = function (vnode) {
    // 直接生成HTML DOM replaceChild
    let realDom = parseVNode(vnode);
    this._parent.replaceChild(realDom, document.querySelector("#root"));
    // 直接替换真实DOM，在vue中是部分替换
};
  //  取代原来的reactify方法， 将对象转换为响应式
  // function observcer(obj, vm){
  //   // 查看对象的成员 ，递归
  //   // 调用defineReactive 方法
  //   let keys = Object.keys(obj)
  //   for(let i = 0; i < keys.length; i++){
  //     // 将this._data[keys[i]]映射到this[keys[i]]上
  //   }
  // }