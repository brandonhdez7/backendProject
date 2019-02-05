// $.get('/auth', (data)=> {
//     $('#get-auth-data').slideUp(function() {
//         var authData = data.auth;
//         var isAch = authData.numbers.ach.length > 0;
//         var routingLabel = isAch ? 'Routing #' : 'Institution and Branch #';

//         var html = `<tr><th><strong>Name</strong></th><th><strong>Balance</strong></th><th><strong>Account #</strong></th><th><strong>${routingLabel}</strong></th></tr>`;
//         if (isAch) {
//             authData.numbers.ach.forEach((achNumbers, idx)=> {
//             // Find the account associated with this set of account and routing numbers
//             var account = authData.accounts.filter(function(a) {
//             return a.account_id == achNumbers.account_id;
//             })[0];
//             html += `<tr>
//                 <td>${account.name}</td>
//                 <td>${(account.balances.available != null ? account.balances.available : account.balances.current)}</td>
//                 <td>${achNumbers.account}</td>
//                 <td>${achNumbers.routing}</td>
//                 </tr>`;
//             });
//         } else {
//             authData.numbers.eft.forEach((eftNumber, idx)=> {
//             // Find the account associated with this set of account and routing numbers
//             var account = authData.accounts.filter(function(a) {
//             return a.account_id == eftNumber.account_id;
//         })[0];
//             html += `<tr>
//                 <td>${account.name}</td>;
//                 <td>${account.balances.available != null ? account.balances.available : account.balances.current}</td>
//                 <td>${eftNumber.account}</td>;
//                 <td>${eftNumber.institution}${eftNumber.branch}</td>;
//                 </tr>`;
//             });
//         }
//     $(this).html(html).slideDown();
//     });
// });

$.get('/transactions',(data)=>{
    console.log(data)
    $('#transactions').slideUp(function() {
        // var html = '<tr><th><strong>Name</strong></th><th><strong>Amount</strong></th></tr>';
        var html = ''
        data.transactions.transactions.forEach((txn, idx)=>{
            html += `<tr>
                <td>${txn.name}</td>
                <td>$${txn.amount}</td>;
                </tr>`;
            });
            $(this).slideUp(function() {
            $(this).html(html).slideDown();
        });
    });
});

$.get('/balance', (data)=>{
    $('#status').slideUp(function() {
        let balData = data.balance
        let html = '<tr><th><strong>Name</strong></th><th><strong>Balance</strong></th><th><strong>Subtype</strong></th></tr>'
        balData.accounts.forEach((account, idx)=>{
            html += `<tr>
                <td>${account.name}</td>
                <td>${account.balances.available != null ? account.balances.available : account.balances.current}</td>
                <td>${account.subtype}</td>
                <tr>`
        });
        $(this).html(html).slideDown();
    })
})
