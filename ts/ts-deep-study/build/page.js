"use strict";
var Components;
(function (Components) {
    var SubConponents;
    (function (SubConponents) {
        var Test = /** @class */ (function () {
            function Test() {
            }
            return Test;
        }());
        SubConponents.Test = Test;
    })(SubConponents = Components.SubConponents || (Components.SubConponents = {}));
    var Header = /** @class */ (function () {
        function Header() {
            var elem = document.createElement("div");
            elem.innerText = "This is Header";
            document.body.appendChild(elem);
        }
        return Header;
    }());
    Components.Header = Header;
    var Conetent = /** @class */ (function () {
        function Conetent() {
            var elem = document.createElement("div");
            elem.innerText = "This is Conetent";
            document.body.appendChild(elem);
        }
        return Conetent;
    }());
    Components.Conetent = Conetent;
    var Footer = /** @class */ (function () {
        function Footer() {
            var elem = document.createElement("div");
            elem.innerText = "This is Footer";
            document.body.appendChild(elem);
        }
        return Footer;
    }());
    Components.Footer = Footer;
})(Components || (Components = {}));
var Home;
(function (Home) {
    var Page = /** @class */ (function () {
        function Page() {
            new Components.Header();
            new Components.Conetent();
            new Components.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
