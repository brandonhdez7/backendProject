// graph one

var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        legend:{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        
        }   
    }
});

myChart.canvas.style.height = '160px';


var ctx = document.getElementById("myChart2").getContext('2d');
var myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
myChart2.canvas.style.height = '175px';

// upload image

// $("#profileImage1").click(function(e) {
//     $("#imageUpload").click();
// });

// function fasterPreview( uploader ) {
//     if ( uploader.files && uploader.files[0] ){
//           $('#profileImage1').attr('src', 
//              window.URL.createObjectURL(uploader.files[0]) );
//     }
// }


$("#imageUpload").change(function(){
    fasterPreview( this );
});

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

// $.get('/transactions',(data)=>{
//     $('#get-transactions-data').slideUp(function() {
//         var html = '<tr><th><strong>Name</strong></th><th><strong>Amount</strong></th><th><strong>Date</strong></th></tr>';
//         data.transactions.transactions.forEach((txn, idx)=>{
//             html += `<tr>
//                 <td>${txn.name}</td>
//                 <td>${txn.amount}</td>;
//                 <td>${txn.date}</td>;
//                 </tr>`;
//             });
//             $(this).slideUp(function() {
//             $(this).html(html).slideDown();
//         });
//     });
// });

// $.get('/balance', (data)=>{
//     $('#get-balance-data').slideUp(function() {
//         let balData = data.balance
//         let html = '<tr><th><strong>Name</strong></th><th><strong>Balance</strong></th><th><strong>Subtype</strong></th><th><strong>Mask</strong></th></tr>'
//         balData.accounts.forEach((account, idx)=>{
//             html += `<tr>
//                 <td>${account.name}</td>
//                 <td>${account.balances.available != null ? account.balances.available : account.balances.current}</td>
//                 <td>${account.subtype}</td>
//                 <td>${account.mask}</td>
//                 <tr>`
//         });
//         $(this).html(html).slideDown();
//     })
// })

// $("#imageUpload").change(function(){
//     fasterPreview( this );
// });

