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
      //document.getElementById("display").textContent=this.template + ' ' + name;
      //document.getElementById("eventsList").appendTo('eventsList')('<p>TEST</p>')
      $( "div#eventsList" ).children().remove()
      for (var key in this.db) {
        console.log("----db-----", this.db)
        var eventName = this.db[key].name
        var eventPrice = this.db[key].price*this.db[key].number
       $(eventBlock(this.db[key].name, this.db[key].price*this.db[key].number) ).appendTo( "#eventsList" )
      } 
      } else {
        document.getElementById("display").textContent="that doesn't exist";
        document.getElementById("db").textContent=JSON.stringify(this.db);
    }  
  }
}

class Model {
  constructor() {
    this.db = {};
    this.nextId = this.nextId || 0;
  }

  addOne(name, price) {
    this.db[this.nextId] = {};
    this.db[this.nextId].price = price;
    this.db[this.nextId].name = name;
    this.db[this.nextId].number = 1;
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

  update(name, newValue) {
    for (var key in this.db){
      if (this.db[key].name === name) {
        var eventID = key
      }
    }
    this.db[eventID].price = newValue;      
  }

  updateQuantity(name, quantity) {
    var eventID
    for (var key in this.db){
      if (this.db[key].name == name) {
        eventID = key

      }
    }
    this.db[eventID].number = parseInt(quantity);      
  }


  remove(key) {
    var eventID
    for (var i in this.db){

      if (this.db[i].name == key) {
        eventID = i
      }
    }
      delete this.db[eventID]
    }
}

class Cart extends Model {

}

class Event extends Model {

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

  update(name, valueNew) {

    this.model.update(name, valueNew);
    this.view.render(this.model.getAll());
  }

  updateQuantity(name, quantity) {
    this.model.updateQuantity(name, quantity);
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

// class AsyncController extends BrowserController {

//   constructor() {
//     super()
//     // connection
//   }

//   post(key, value) {
//     super(key, value);
//     // post to server
//     // and error catching if you desire
//   }
// }

//-----------------------------

const eventBlock = (name, price) => `
<div class="thumbnail">
<h2 id="db">${name}</h2>
<form>
<select class="form-control" data-toggle="tooltip" id="quantitySelector" data-placement="bottom" title="Change the quantity">
<option value="1" selected="selected">1</option>
<option value="2">2</option>
<option value="3">3</option>
<option value="4">4</option>
<option value="5" >5</option></select>
<button onclick="updating(event)" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Update" name="updateQuantity">Update</button>
<button onclick="removeFromCart(event)" type="button" class="btn btn-default" aria-label="Delete" data-toggle="tooltip" data-placement="bottom" title="Delete"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
</form>
<p class="thumbnail pull-right"><strong>Price: </strong>€<span id="display" class="price">${price}</span></p>
</div>
`

var mod = new Model();
var brvw = new BrowserView(' ');
var brcn = new BrowserController(mod, brvw)

var updating = function(event) {
  event.preventDefault()
  brcn.browse("updateQuantity", $(event.target).closest("div").find("#db").text(), $(event.target).closest("div").find("#quantitySelector option:selected").text());
 $( document ).ready(function() {
  let sum = 0
  $(".price").each((i, ele) => {
    sum += parseInt($(ele).text())
  })
  $("#cartTot").text(sum)
  $("#Total").text((sum+sum*0.21).toFixed(2))
})
};

var removeFromCart = function(event) {
  event.preventDefault()

  brcn.browse("remove", $(event.target).closest("div").find("#db").text());
$( document ).ready(function() {
  let sum = 0
  $(".price").each((i, ele) => {
    sum += parseInt($(ele).text())
  })
  $("#cartTot").text(sum)
  $("#Total").text((sum+sum*0.21).toFixed(2))
})
};

var runnin = function(name, price) {
 brcn.browse("post", name, price);

$( document ).ready(function() {
  let sum = 0
  $(".price").each((i, ele) => {
    sum += parseInt($(ele).text())
  })
  $("#cartTot").text(sum)
  $("#Total").text((sum+sum*0.21).toFixed(2))
})
};



