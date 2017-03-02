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
        console.log("------db-------", this.db);
        //document.getElementById("display").textContent=this.template + ' ' + name;
        //document.getElementById("eventsList").appendTo('eventsList')('<p>TEST</p>')
        $("div#eventsList").children().remove();
        for (var key in this.db) {
          var eventName = this.db[key].name;
          var eventPrice = this.db[key].price * this.db[key].number;
          $(eventBlock(this.db[key].name, this.db[key].price * this.db[key].number)).appendTo("#eventsList");
        }
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
    value: function addOne(name, price) {
      this.db[this.nextId] = {};
      this.db[this.nextId].price = price;
      this.db[this.nextId].name = name;
      this.db[this.nextId].number = 1;
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
    value: function update(name, newValue) {
      for (var key in this.db) {
        if (this.db[key].name === name) {
          var eventID = key;
        }
      }
      this.db[eventID].price = newValue;
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(name, quantity) {
      var eventID;
      for (var key in this.db) {
        console.log("this.db[key].name", this.db[key].name, "name", name);
        console.log("--this.db[key].name--", this.db[key].name == name);
        if (this.db[key].name == name) {
          console.log("--this.db--", this.db);
          eventID = key;
        }
      }
      this.db[eventID].number = parseInt(quantity);
    }
  }, {
    key: "remove",
    value: function remove(key) {
      var eventID;
      for (var i in this.db) {

        if (this.db[i].name == key) {
          eventID = i;
        }
      }
      delete this.db[eventID];
    }
  }]);

  return Model;
}();

var Cart = function (_Model) {
  _inherits(Cart, _Model);

  function Cart() {
    _classCallCheck(this, Cart);

    return _possibleConstructorReturn(this, (Cart.__proto__ || Object.getPrototypeOf(Cart)).apply(this, arguments));
  }

  return Cart;
}(Model);

var Event = function (_Model2) {
  _inherits(Event, _Model2);

  function Event() {
    _classCallCheck(this, Event);

    return _possibleConstructorReturn(this, (Event.__proto__ || Object.getPrototypeOf(Event)).apply(this, arguments));
  }

  return Event;
}(Model);

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
    value: function update(name, valueNew) {

      this.model.update(name, valueNew);
      this.view.render(this.model.getAll());
    }
  }, {
    key: "updateQuantity",
    value: function updateQuantity(name, quantity) {
      this.model.updateQuantity(name, quantity);
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

var eventBlock = function eventBlock(name, price) {
  return "\n<div class=\"thumbnail\">\n<h2 id=\"db\">" + name + "</h2>\n<form>\n<select class=\"form-control\" data-toggle=\"tooltip\" id=\"quantitySelector\" data-placement=\"bottom\" title=\"Change the quantity\">\n<option value=\"1\" selected=\"selected\">1</option>\n<option value=\"2\">2</option>\n<option value=\"3\">3</option>\n<option value=\"4\">4</option>\n<option value=\"5\" >5</option></select>\n<button onclick=\"updating(event)\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Update\" name=\"updateQuantity\">Update</button>\n<button onclick=\"removeFromCart(event)\" type=\"button\" class=\"btn btn-default\" aria-label=\"Delete\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"Delete\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button>\n</form>\n<p class=\"thumbnail pull-right\"><strong>Price: </strong>\u20AC<span id=\"display\" class=\"price\">" + price + "</span></p>\n</div>\n";
};

var mod = new Model();
var brvw = new BrowserView(' ');
var brcn = new BrowserController(mod, brvw);

var updating = function updating(event) {
  event.preventDefault();
  brcn.browse("updateQuantity", $(event.target).closest("div").find("#db").text(), $(event.target).closest("div").find("#quantitySelector option:selected").text());
  $(document).ready(function () {
    var sum = 0;
    $(".price").each(function (i, ele) {
      sum += parseInt($(ele).text());
    });
    $("#cartTot").text(sum);
    $("#Total").text((sum + sum * 0.21).toFixed(2));
  });
};

var removeFromCart = function removeFromCart(event) {
  console.log("----name----", $(event.target).closest("div").find("#db").text());
  event.preventDefault();

  brcn.browse("remove", $(event.target).closest("div").find("#db").text());
  $(document).ready(function () {
    var sum = 0;
    $(".price").each(function (i, ele) {
      sum += parseInt($(ele).text());
    });
    $("#cartTot").text(sum);
    $("#Total").text((sum + sum * 0.21).toFixed(2));
  });
};

var runnin = function runnin(name, price) {
  console.log("------name, price in the bundle------", name, price);
  brcn.browse("post", name, price);

  $(document).ready(function () {
    var sum = 0;
    $(".price").each(function (i, ele) {
      sum += parseInt($(ele).text());
    });
    $("#cartTot").text(sum);
    $("#Total").text((sum + sum * 0.21).toFixed(2));
  });
};
//# sourceMappingURL=bundle.js.map
