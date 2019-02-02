(function($){
    // console.log(PLAID_PRODUCTS)
    let products = ('PLAID_PRODUCTS', 'transactions').split(',');


    var handler = Plaid.create({
      apiVersion: 'v2',
      clientName: 'The Budget Hobo',
      env: 'sandbox',
      product: products,
      key: '6131daca2965f9a28481697d1aa0d4',
      onSuccess: (public_token)=>{
        $.post('/get_access_token', {
          public_token: public_token
        }),
        (data)=> {
          $('.head').fadeOut('fast', ()=>{

          })
        }
      }
    })
    var accessToken = qs('access_token');
    if (accessToken != null && accessToken != '') {
      $.post('/set_access_token', {
        access_token: accessToken
      }, (data)=>{

      });
    }
    $('.login').click(()=> {
      console.log('hello')
      handler.open();
    });
  })(jQuery)
  function qs(key) {
  key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
  var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }