var client = localStorage.getItem('client')

const clientId = localStorage.getItem('clientId')

console.log(clientId) 
// var clientId = localStorage.getItem('clientId')
// console.log(clientId)
var ACCESS_TOKEN = 'access-sandbox-02f9b2c9-cafc-4880-9823-507e3f63f5a5'
$('#get-auth-btn').click(()=>{
  // const selectQuery = `SELECT `
    client.getAuth(ACCESS_TOKEN, {}, (err, results) => {
        // Handle err
          var accountData = results.accounts;
          accountData.forEach((data)=>{
            console.log(data.name)
          })
        if (results.numbers.ach.length > 0) {
        // Handle ACH numbers (US accounts)
          var achNumbers = results.numbers.ach;
          console.log(achNumbers)
      } else if (results.numbers.eft.length > 0) {
        // Handle EFT numbers (Canadian accounts)
          var eftNumbers = results.numbers.eft;
          console.log(eftNumbers)
        }
    });
})  
$('#get-transactions-btn').click(()=>{
    var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, (err, results)=>{
      const transactions = results.transactions;
      // console.log(transactions)
    })
});
$('#get-balance-data').click(()=>{
    client.getBalance(ACCESS_TOKEN, (err, result)=>{
      const accounts = result.accounts;
      console.log(accounts)
    })
})