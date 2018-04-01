/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$.ajax({
    url: '/Savvy0.5/UserServlet?type=retrieveUser',
    dataType: 'json',
    success: function (data) {
        $("#usernamelist").html("");
        var i;
        $("#usernamelist").append("<option value=''>" + "Choose User" + "</option>");
        for (i in data) {
            $("#usernamelist").append("<option value='" + data[i].username + "'>" + data[i].username + "</option>");
        }

    }
});
$("#usernamelist").change(function () {
    var info = $(this.value);
    var username = info.selector;
    var data = {
        username: username,
        type: "forecastAgentTwelveMonths"
    };

    $.ajax({
        url: "/Savvy0.5/ForecastServlet",
        datatype: 'json',
        data: data,
        success: function (responseJson) {
            var strings = responseJson.split(",");
            ctx = document.getElementById('myChart').getContext('2d');
            myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                    datasets: [{
                            label: 'Forecasted Sales',
                            data: [strings[12], strings[13], strings[14], strings[15], strings[16], strings[17], strings[18], strings[19], strings[20], strings[21], strings[22], strings[23]],
                            backgroundColor: "rgba(153,255,51,0.4)"
                        }]
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    max: 0,
                                    min: 20000
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'First Year Commission',
                                    fontColor: "#546372"
                                }
                            }
                        ],
                        xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'For Year 2018-2019'
                                }
                            }]
                    }
                }
            });

        },
        error: function (xhr, status, error) {
            alert(error);
        }

    });

});
$(document).ready(function () {


});










