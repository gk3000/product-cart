class View {
  constructor(template) {
    this.template = template;
  }

  render(value) {
    var compiled = this.template + value;
    console.log(compiled);
  }
}

class BrowserView extends View {
  constructor(template) {
    super(template);
  }

  render(name) {
    if (name !== undefined) {
      document.getElementById("display").textContent=this.template + ' ' + name;
      document.getElementById("db").textContent=JSON.stringify(this.db);
    } else {
      document.getElementById("display").textContent="that doesn't exist";
      document.getElementById("db").textContent=JSON.stringify(this.db);
    }  
  }
}

class Model {
  constructor() {
    this.db = {};
    this.nextId = 0;
  }

  addOne(key, val) {
    this.db[key] = {};
    this.db[key].val = {};
    this.db[key].val =  " " + val;
    this.db[key]._id = this.nextId;
    this.nextId ++;
  }

  getOne(key) {
    return this.db[key];
  }

  getAll() {
    var values = [];
    for (var key in this.db) {
      values.push(this.db[key].val)
    }
    return values;
  }

  update(key, newValue) {
    this.db[key].val = newValue;
  }

  remove(key) {
    delete this.db[key];
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // quite hackly
    this.view.db = this.model.db;
  }

  getOne(key) {
    var value = this.model.db[key].val;
    this.view.render(value)
  }

  getAll() {
    this.view.render(this.model.getAll());
  }

  update(key, valueNew) {
    this.model.update(key, valueNew);
    this.view.render(this.model.getAll());
  }

  post(key, value) {
    this.model.addOne(key, value);
    this.getAll();
  }

  remove(key) {
    this.model.remove(key);
    this.getAll();
  }
}

class BrowserController extends Controller {
  browse(meth, arg1, arg2) {
    this[meth](arg1, arg2);
  }
}

//-----------------------------

var mod = new Model();
var brvw = new BrowserView('yo there ');
var brcn = new BrowserController(mod, brvw)

var runnin = function() {
  brcn.browse(document.getElementById("first").value, document.getElementById("second").value, document.getElementById("third").value);
};

