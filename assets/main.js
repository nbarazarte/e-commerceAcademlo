$(function(){
  $('#Container').on('mixLoad', function() {
    console.log('[event-handler] MixItUp Loaded');
  });
  
  $('#Container').on('mixStart', function() {
    console.log('[event-handler] Animation Started')
  });
  
  $('#Container').on('mixEnd', function() {
    console.log('[event-handler] Animation Ended')
  });
  
  $('#Container').mixItUp({
    callbacks: {
      onMixLoad: function() {
        console.log('[callback] MixItUp Loaded');
      },
      onMixStart: function() {
        console.log('[callback] Animation Started');
      },
      onMixEnd: function() {
        console.log('[callback] Animation Ended');
      }
    }
  });
});

async function getProducts(){

  try {
    const data = await fetch("https://ecommercebackend.fundamentos-29.repl.co/");

    const res = await data.json();

    window.localStorage.setItem('products', JSON.stringify(res));

    //console.log(res);
    return res;

  } catch (error) {
    console.log(error);
  }
}

function printProducts(db){

  const productsHTML = document.querySelector('.container');

  let html = '';
  let count = 0;

  for (const product of db.products) {
      //console.log(product);

      html += `<div class="cardProd mix ${product.category}" data-myorder="${count}">
                <div class="imgProducts">
                    <img src="${product.image}" alt="">
                </div>
                <div class="detailProducts">
                    <div class="priceStock">
                        <span class="productPrice">$${product.price}</span>
                        <span class="stock">Stock: ${product.quantity}</span>
                        <span class="addToCart">
                            <box-icon name='plus' class="iconPlus" id='${product.id}'></box-icon>
                        </span>
                    </div>
                    <div class="description">
                        <p> ${product.name}</p>
                    </div>
                </div>
            </div>`;
    count++
  }
  //console.log(html);
  //console.log(productsHTML);
  productsHTML.innerHTML = html;
}

function handlerShowCart(){

  const iconBagCartHTML = document.querySelector('.bagCart');
  const cartHTML = document.querySelector('.cart');
  const countCartHTML = document.querySelector('.countCart');
  const closeCartHTML = document.querySelector('.closeCart');

  closeCartHTML.addEventListener('click', function (){
    cartHTML.classList.toggle('cart__show')
  });

  countCartHTML.addEventListener('click', function (){
    cartHTML.classList.toggle('cart__show')
  });

  iconBagCartHTML.addEventListener('click', function (){
    cartHTML.classList.toggle('cart__show')
  });

}

function addToCartFromProducts(db){

  const productsHTML = document.querySelector('.container');

  productsHTML.addEventListener('click', function (e){

    if(e.target.classList.contains('iconPlus')){

      const id = Number(e.target.id);
        
      const productFind = db.products.find(
        (product) => product.id === id
      )
        console.log(productFind.name);

      if(db.cart[productFind.id]){
        if( productFind.quantity === db.cart[productFind.id].amount ){
          return alert(`${productFind.name}: fuera de stock`)
        }
        db.cart[productFind.id].amount++;
      }else{
        db.cart[productFind.id] = {...productFind, amount: 1};
      }

      window.localStorage.setItem('cart', JSON.stringify(db.cart));

      printProductsInCart(db);
      printTotals(db);
    }

  });
}

function printProductsInCart(db){

  const cartProducts = document.querySelector('.cart__products');
  
  let html = ''

  for (const product in db.cart) {
    const {quantity, name, price, image, amount, id, category} = db.cart[product]
    
    html += `
        <div class="cartOnProducts" >
          <div class="card__product--img">
              <img src="${image}" alt="imagen">
          </div>
          <div class="card__product--body" id="${id}">
            <h4>${name} | $${price}</h4>
            <h4>Stock: ${quantity} | ${amount} unit</h4>
            <box-icon class="iconOnCart minus" name='minus'></box-icon>
            <box-icon class="iconOnCart plus" name='plus'></box-icon>
            <box-icon class="iconOnCart trash" name='trash'></box-icon>
          </div>          
        </div>
    `;
  }

  cartProducts.innerHTML = html;

}

function handlerProductsInCart(db){

  const cart__productsHTML = document.querySelector('.cart__products');
  
  cart__productsHTML.addEventListener('click', function (e){

    if(e.target.classList.contains('plus')){

      const id = Number(e.target.parentElement.id);

      const productFind = db.products.find(
        (product) => product.id === id
      )
      //console.log(productFind.name);

      if( productFind.quantity === db.cart[productFind.id].amount ){
        return alert(`${productFind.name}: fuera de stock`)
      }

      db.cart[productFind.id].amount++;
    }

     if(e.target.classList.contains('minus')){

      const id = Number(e.target.parentElement.id);

      const productFind = db.products.find(
        (product) => product.id === id
      )

      if( db.cart[productFind.id].amount === 1 ){
        const response = confirm('¿Desea eliminar el articulo completamente?');
        if (!response) return
        delete db.cart[productFind.id];
      }else{
        db.cart[productFind.id].amount--;
      }
    }
    
    if(e.target.classList.contains('trash')){

      const id = Number(e.target.parentElement.id);

      const productFind = db.products.find(
        (product) => product.id === id
      )
      const response = confirm('¿Desea eliminar el articulo completamente?');
      if (!response) return
      delete db.cart[productFind.id];
    }    

    window.localStorage.setItem('cart', JSON.stringify(db.cart));
    printProductsInCart(db);
    printTotals(db);
  });
}

function printTotals(db) {

  const info__totalHTML = document.querySelector('.info__total');
  const info__amountHTML = document.querySelector('.info__amount');

  let totalPrice = 0;
  let amounProducts = 0;

  for (const product in db.cart) {
    const {amount, price } = db.cart[product];
    totalPrice += price * amount;
    amounProducts += amount;
  }

  info__totalHTML.textContent = '$'+totalPrice;
  info__amountHTML.textContent = amounProducts + ' units';

  //console.log({amounProducts, totalPrice});  
}

(async () => {

  const res = JSON.parse(window.localStorage.getItem('products')) || await getProducts();
   //console.log(res, 'esto viene del local storage');

  const db = {
    products: res,
    cart: JSON.parse(window.localStorage.getItem('cart')) || {},
  }

   //console.log(db.products);
  printProducts(db);
  handlerShowCart();
  addToCartFromProducts(db);
  printProductsInCart(db);
  handlerProductsInCart(db);
  printTotals(db);

})();