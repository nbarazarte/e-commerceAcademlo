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

  const productsHTML = document.querySelector('.products');

  let html = '';

  count = 0;

  for (const product of db.products) {
      console.log(product);

      html += `<div class="cardProd mix ${product.category}" data-myorder="${count}">

      <div class="imgProducts">
          <img src="${product.image}" alt="">
      </div>

      <div class="detailProducts">
          <div class="priceStock">
              <span class="productPrice">$${product.price}</span>
              <span class="stock">Stock: ${product.quantity}</span>
              <span class="addToCart">
                  <box-icon name='plus'></box-icon>
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

(async () => {

  const res = JSON.parse(window.localStorage.getItem('products')) || await getProducts();

   //console.log(res, 'esto viene del local storage');

  const db = {
    products: res,
    cart: {},
  }

  printProducts(db);
 //console.log(db.products);

})();