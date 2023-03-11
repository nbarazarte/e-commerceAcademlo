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

(async () => {
  const res = JSON.parse(window.localStorage.getItem('products')) || await getProducts();

  console.log(res);


})();