function MyVue(options) {
    this._data = options.data;
    const elm = document.querySelector(options.el);
    this._template = elm;
    this._parent = elm.parentNode;
    // 进行响应式处理
    // reactify(this._data,this)
    this.initData() // 将data进行响应式转换，然后进行代理
    this.mount(); //挂载
}