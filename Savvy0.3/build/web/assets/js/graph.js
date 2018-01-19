/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ctx;
var myChart;

$(document).ready(function () {
    display();



    // is this method needed?             
    refresh();
});

function quarterly(chart) {
    //remove data 
    myChart.destroy();
    //create new chart which is quartered

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar'],
            datasets: [{
                    label: 'Current Sales',
                    data: [12, 10, 3],
                    backgroundColor: "rgba(153,255,51,0.4)"
                }, {
                    label: 'Forecasted Sales',
                    data: [10, 20, 22],
                    backgroundColor: "rgba(255,153,0,0.4)"
                }]
        }
    });
}

function biannually(chart) {
    //TODO:
//   myChart.destroy(); 
//
//   myChart = new Chart(ctx, {  
//  type: 'line',  
//  data: {  
//    labels: ['Jan', 'Feb', 'Mar'],  
//    datasets: [{  
//      label: 'Current Sales',  
//      data: [12, 10, 3] , 
//      backgroundColor: "rgba(153,255,51,0.4)"  
//    }, {  
//      label: 'Forecasted Sales',  
//      data: [10, 20, 22],  
//      backgroundColor: "rgba(255,153,0,0.4)"  
//    }]  
//  }  
//});  
}

function display() {
    //process json here?
    //then throw into data:[]
//    ctx = document.getElementById('myChart').getContext('2d');  
//    myChart = new Chart(ctx, {  
//     type: 'line',  
//     data: {  
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],  
//       datasets: [{  
//         label: 'Current Sales',  
//         data: [12, 10, 3, 17, 6, 3, 7],  
//         backgroundColor: "rgba(153,255,51,0.4)"  
//       }, {  
//         label: 'Forecasted Sales',  
//         data: [10, 20, 22, 23, 24, 25, 26, 20, 23, 22, 20],  
//         backgroundColor: "rgba(255,153,0,0.4)"  
//       }]  
//     }  
//   });  
    $.get("/Savvy0.3/TestServlet?type=forecastAgent", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
//         labels: ['stuff','morestuff', 'stuffsupreme'],  
//       datasets: [{  
//         label: 'Current Sales',  
//         data: [2,3,4],  
//         backgroundColor: "rgba(153,255,51,0.4)"  
//       }]  
                labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                datasets: [{
                        label: 'Current Sales',
                        data: [strings[12], strings[13], strings[14], strings[15], strings[16], strings[17], strings[18], strings[19], strings[20], strings[21], strings[22], strings[23]],
                        backgroundColor: "rgba(153,255,51,0.4)"
                    }]
            }
        });
    });
}

function refresh() {
    //TODO
}

