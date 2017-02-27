"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
  function View(template) {
    _classCallCheck(this, View);

    this.template = template;
  }

  _createClass(View, [{
    key: "render",
    value: function render(value) {
      var compiled = this.template + value;
      console.log(compiled);
    }
  }]);

  return View;
}();

var BrowserView = function (_View) {
  _inherits(BrowserView, _View);

  function BrowserView(template) {
    _classCallCheck(this, BrowserView);

    return _possibleConstructorReturn(this, (BrowserView.__proto__ || Object.getPrototypeOf(BrowserView)).call(this, template));
  }

  _createClass(BrowserView, [{
    key: "render",
    value: function render(name) {
      if (name !== undefined) {
        document.getElementById("display").textContent = this.template + ' ' + name;
        document.getElementById("db").textContent = JSON.stringify(this.db);
      } else {
        document.getElementById("display").textContent = "that doesn't exist";
        document.getElementById("db").textContent = JSON.stringify(this.db);
      }
    }
  }]);

  return BrowserView;
}(View);

var Model = function () {
  function Model() {
    _classCallCheck(this, Model);

    this.db = {};
    this.nextId = 0;
  }

  _createClass(Model, [{
    key: "addOne",
    value: function addOne(key, val) {
      this.db[key] = {};
      this.db[key].val = {};
      this.db[key].val = " " + val;
      this.db[key]._id = this.nextId;
      this.nextId++;
    }
  }, {
    key: "getOne",
    value: function getOne(key) {
      return this.db[key];
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var values = [];
      for (var key in this.db) {
        values.push(this.db[key].val);
      }
      return values;
    }
  }, {
    key: "update",
    value: function update(key, newValue) {
      this.db[key].val = newValue;
    }
  }, {
    key: "remove",
    value: function remove(key) {
      delete this.db[key];
    }
  }]);

  return Model;
}();

var Controller = function () {
  function Controller(model, view) {
    _classCallCheck(this, Controller);

    this.model = model;
    this.view = view;
    // quite hackly
    this.view.db = this.model.db;
  }

  _createClass(Controller, [{
    key: "getOne",
    value: function getOne(key) {
      var value = this.model.db[key].val;
      this.view.render(value);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      this.view.render(this.model.getAll());
    }
  }, {
    key: "update",
    value: function update(key, valueNew) {
      this.model.update(key, valueNew);
      this.view.render(this.model.getAll());
    }
  }, {
    key: "post",
    value: function post(key, value) {
      this.model.addOne(key, value);
      this.getAll();
    }
  }, {
    key: "remove",
    value: function remove(key) {
      this.model.remove(key);
      this.getAll();
    }
  }]);

  return Controller;
}();

var BrowserController = function (_Controller) {
  _inherits(BrowserController, _Controller);

  function BrowserController() {
    _classCallCheck(this, BrowserController);

    return _possibleConstructorReturn(this, (BrowserController.__proto__ || Object.getPrototypeOf(BrowserController)).apply(this, arguments));
  }

  _createClass(BrowserController, [{
    key: "browse",
    value: function browse(meth, arg1, arg2) {
      this[meth](arg1, arg2);
    }
  }]);

  return BrowserController;
}(Controller);

//-----------------------------

var mod = new Model();
var brvw = new BrowserView('yo there ');
var brcn = new BrowserController(mod, brvw);

var runnin = function runnin() {
  brcn.browse(document.getElementById("first").value, document.getElementById("second").value, document.getElementById("third").value);
};
//# sourceMappingURL=bundle.js.map
