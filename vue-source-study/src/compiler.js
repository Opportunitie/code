// 真实dom转换成虚拟dom
function getVNode(node) {
    let nodeType = node.nodeType;
    let _vnode = null;
    if (nodeType === 1) {
        let nodeName = node.nodeName;
        let attrs = node.attributes; // 伪数组
        let _attrObj = {};
        for (let i = 0; i < attrs.length; i++) {
            _attrObj[attrs[i].nodeName] = attrs[i].nodeValue;
        }
        _vnode = new Vnode(nodeName, _attrObj, undefined, nodeType);

        let childNodes = node.childNodes;
        for (let j = 0; j < childNodes.length; j++) {
            _vnode.appendChild(getVNode(childNodes[j]));
        }
    } else if (nodeType === 3) {
        _vnode = new Vnode(undefined, undefined, node.nodeValue, nodeType);
    }

    return _vnode;
}

// 虚拟DOM转换成真正DOM
function parseVNode(vnode) {
    let nodeType = vnode.type;
    let _node = null;
    if (nodeType === 1) {
        _node = document.createElement(vnode.tag);
        let data = vnode.data;
        Object.keys(data).forEach((key) => {
            let attrName = key;
            let attrValue = data[key];
            _node.setAttribute(attrName, attrValue);
        });

        let children = vnode.children;
        children.forEach((subvnode) => {
            _node.appendChild(parseVNode(subvnode));
        });
    } else if (nodeType === 3) {
        _node = document.createTextNode(vnode.value);
    }
    return _node;
}
// 根据路径访问对象成员
function getValueByPath(obj, path) {
    let res = obj;
    let prop;
    let paths = path.split(".");
    while ((prop = paths.shift())) {
        res = res[prop];
    }
    return res;
}

// 将vnode（带坑的）和data结合生成vnode  模拟（AST -> Vnode）
function combine(vnode, data) {
    const _tag = vnode.tag;
    const _data = vnode.data;
    let _value = vnode.value;
    const _type = vnode.type;
    const _children = vnode.children;

    let _vnode = null;
    if (_type === 3) {
        // 文本节点
        _value = _value.replace(/\{\{(.+?)\}\}/g, function (_, g) {
            return getValueByPath(data, g.trim());
        });
        _vnode = new Vnode(undefined, undefined, _value, _type);
    } else if (_type === 1) {
        // 元素节点
        _vnode = new Vnode(_tag, _data, _value, _type);
        _children.forEach((_subvnode) =>
            _vnode.appendChild(combine(_subvnode, data))
        );
    }
    return _vnode;
}