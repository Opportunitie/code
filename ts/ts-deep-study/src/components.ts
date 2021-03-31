namespace Components {
  export namespace SubConponents{
    export class Test{}
  }
  export class Header {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Header";
      document.body.appendChild(elem);
    }
  }

  export class Conetent {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Conetent";
      document.body.appendChild(elem);
    }
  }

  export class Footer {
    constructor() {
      const elem = document.createElement("div");
      elem.innerText = "This is Footer";
      document.body.appendChild(elem);
    }
  }
}
