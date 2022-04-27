var products = {
  getProducts: function () {
    // Para verificar a validação do frete grátis, trocar a URL do Ajax 

     // Carrinho abaixo de 10
    var urlGistBellow10 =
      "https://gist.githubusercontent.com/rafael-sant/1ab9f823315d0c35b55ad816dd01d28d/raw/49c6249e5f0a249decbeccb0902ad9538bcfdbfc/abaixo-10-reais.json";
      
      // Carrinho acima de 10
    var urlGistAbove10 =
      "https://gist.githubusercontent.com/rafael-sant/1ab9f823315d0c35b55ad816dd01d28d/raw/5006c046956370e7ab6e34eb397863683305eb97/acima-10-reais.json";

    $.ajax({
      url: urlGistBellow10,
      method: "get",
      success: function (data) {
        const personsObject = JSON.parse(data);
        products.formatProducts(personsObject);
      },
      error: function () {
        console.error();
      },
    });
  },

  formatProducts: function (data) {
    var pricesAndNames = [];
    data.items.map(function (precos) {
    pricesAndNames.push(precos)
    });

    data.itemMetadata.items.map(function (produtos) {
        pricesAndNames.push(produtos)
    });

    pricesAndNames.map(function (all) {
      products.addProducts(all)
    });

    var TotalCart = data.totalizers[0].value;
    TotalCart = parseInt(TotalCart);
    TotalCart = TotalCart / 100;
    if(TotalCart > 10) {
      var shippingFree = `<div class="shipping-free">Parabéns, sua compra tem frete grátis!</div>` 
      $(".total-place").append(shippingFree)
    }
    TotalCart = TotalCart.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    $(".total-place span").html(TotalCart);
  },
  addProducts: function(all) {
    var oldPrices = all.price;
    oldPrices = parseInt(oldPrices)
    oldPrices = oldPrices / 100
    oldPrices = oldPrices.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    var sellingPrice = all.sellingPrice;
    sellingPrice = parseInt(sellingPrice)
    sellingPrice = sellingPrice / 100
    sellingPrice = sellingPrice.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
    
    if(all.uniqueId) {
      var formated = `<div class="product-item">
      <div class="product-image">
        <img src="${all.imageUrl}"> 
  
      </div>
      <div class="text-place"> 
        <p>${all.name}</p></span>
        <div class="prices"> 
          <span class="oldPrice">${oldPrices}</span>  
          <span class="current">${sellingPrice}</span>  
        </div>
      </div>
      </div>
      </div>`
  
      $(".cart-main .products-place").append(formated)
    }
  }

};

$(document).ready(function () {
  products.getProducts();
  setTimeout(function(){
    products.formatPrices();
  }, 10)
});
