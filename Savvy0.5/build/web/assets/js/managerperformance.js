var ctx;
var ctx2;
var myChart;
var myChart2;
var person;
var month;
var date = new Date().getMonth();

var monthNames = ["Year-To-Date", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
$("#monthlist").html("");

for (var i = 0; i < date + 2; i++) {
    $("#monthlist").append("<option value='" + i + "'>" + monthNames[i] + "</option>");
}


$("#monthlist").change(function () {
    var info = $(this.value);
    myChart2.destroy();
    month = info.selector;
    if (month === "0") {
        var data = {
            type: "managerTeamOverviewYTD"
        };
        $.ajax({
            type: "POST",
            url: "/OverviewServlet",
            datatype: 'json',
            data: data,
            success: function (responseJson) {
                var strings = responseJson.split(",");
                var index = (strings.length - 1) / 2;
                var labels = [];
                var dataPoints = [];
                var totalYTDsales = strings[strings.length - 1];
                var htmlcode = "<th>Total Year-to-Date Sales:  <\/th><td>" + totalYTDsales + "<\/td>";
                $("#trans_table3").html(htmlcode);
                for (var i = 0; i < index; i++) {
                    labels[i] = strings[i];
                }
                for (var j = index; j < strings.length - 1; j++) {
                    dataPoints[j - index] = strings[j];
                }
                ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                myChart2 = new Chart(ctx2, {
                    type: 'horizontalBar',
                    data: {
                        labels: labels,
                        datasets: [{
                                label: 'Closed Sales',
                                backgroundColor: [
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue"
                                ],
                                data: dataPoints
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        fontSize: 18
                                    },
                                    stacked: true,
                                    scaleLabel: {
                                        fontSize: 25,
                                        display: true,
                                        labelString: 'FYC per Individual'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        fontSize: 18
                                    },
                                    stacked: true,
                                    scaleLabel: {
                                        fontSize: 20,
                                        display: true,
                                        labelString: 'Financial Agent'
                                    }
                                }
                            ]
                        }
                    }
                });

            },
            error: function (xhr, status, error) {
                alert(error);
            }

        });
        $.ajax({
            url: '/OverviewServlet?type=managerRetrieveCaseBreakdownYTD',
            dataType: 'json',
            success: function (data) {
                if (data[0].Life) {
                    $("#life").html("");
                    $("#life").append(data[0].Life);
                } else {
                    $("#life").html("");
                    $("#life").append("NIL");
                }
                if (data[0].Investment) {
                    $("#investment").html("");
                    $("#investment").append(data[0].Investment);
                } else {
                    $("#investment").html("");
                    $("#investment").append("NIL");
                }
                if (data[0].Savings) {
                    $("#savings").html("");
                    $("#savings").append(data[0].Savings);
                } else {
                    $("#savings").html("");
                    $("#savings").append("NIL");
                }
                if (data[0].Hospitalisation) {
                    $("#hospitalisation").html("");
                    $("#hospitalisation").append(data[0].Hospitalisation);
                } else {
                    $("#hospitalisation").html("");
                    $("#hospitalisation").append("NIL");
                }
                if (data[0].Retirement) {
                    $("#retirement").html("");
                    $("#retirement").append(data[0].Retirement);
                } else {
                    $("#retirement").html("");
                    $("#retirement").append("NIL");
                }
                if (data[0].Others) {
                    $("#others").html("");
                    $("#others").append(data[0].Others);
                } else {
                    $("#others").html("");
                    $("#others").append("NIL");
                }
            }
        });
    } else {
        var data = {
            month: month,
            type: "managerTeamOverviewOneMonth"
        };
        $.ajax({
            url: "/OverviewServlet",
            datatype: 'json',
            data: data,
            success: function (responseJson) {
                var strings = responseJson.split(",");
                var index = (strings.length - 1) / 2;
                var labels = [];
                var dataPoints = [];
                var totalYTDsales = strings[strings.length - 1];
                var htmlcode = "<th>Total Year-to-Date Sales:  <\/th><td>" + totalYTDsales + "<\/td>";
                $("#trans_table3").html(htmlcode);
                for (var i = 0; i < index; i++) {
                    labels[i] = strings[i];
                }
                for (var j = index; j < strings.length - 1; j++) {
                    dataPoints[j - index] = strings[j];
                }
                ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                myChart2 = new Chart(ctx2, {
                    type: 'horizontalBar',
                    data: {
                        labels: labels,
                        datasets: [{
                                label: 'Closed Sales',
                                backgroundColor: [
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue",
                                    "crimson",
                                    "gold",
                                    "yellowgreen",
                                    "deepskyblue"
                                ],
                                data: dataPoints
                            }
                        ]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [
                                {
                                    ticks: {
                                        fontSize: 18
                                    },
                                    stacked: true,
                                    scaleLabel: {
                                        fontSize: 25,
                                        display: true,
                                        labelString: 'FYC per Individual'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    ticks: {
                                        fontSize: 18
                                    },
                                    stacked: true,
                                    scaleLabel: {
                                        fontSize: 20,
                                        display: true,
                                        labelString: 'Financial Agent'
                                    }
                                }
                            ]
                        }
                    }
                });

            },
            error: function (xhr, status, error) {
                alert();
            }

        });
        $.ajax({
            url: '/OverviewServlet?month=' + month + '&type=managerRetrieveCaseBreakdownMonth',
            dataType: 'json',
            success: function (data) {
                if (data[0].Life) {
                    $("#life").html("");
                    $("#life").append(data[0].Life);
                } else {
                    $("#life").html("");
                    $("#life").append("NIL");
                }
                if (data[0].Investment) {
                    $("#investment").html("");
                    $("#investment").append(data[0].Investment);
                } else {
                    $("#investment").html("");
                    $("#investment").append("NIL");
                }
                if (data[0].Savings) {
                    $("#savings").html("");
                    $("#savings").append(data[0].Savings);
                } else {
                    $("#savings").html("");
                    $("#savings").append("NIL");
                }
                if (data[0].Hospitalisation) {
                    $("#hospitalisation").html("");
                    $("#hospitalisation").append(data[0].Hospitalisation);
                } else {
                    $("#hospitalisation").html("");
                    $("#hospitalisation").append("NIL");
                }
                if (data[0].Retirement) {
                    $("#retirement").html("");
                    $("#retirement").append(data[0].Retirement);
                } else {
                    $("#retirement").html("");
                    $("#retirement").append("NIL");
                }
                if (data[0].Others) {
                    $("#others").html("");
                    $("#others").append(data[0].Others);
                } else {
                    $("#others").html("");
                    $("#others").append("NIL");
                }
            }
        });
    }
});

$(document).ready(function () {
    $.ajax({
        url: '/OverviewServlet?type=managerRetrieveCaseBreakdownYTD',
        dataType: 'json',
        success: function (data) {
            if (data[0].Life) {
                $("#life").append(data[0].Life);
            } else {
                $("#life").append("NIL");
            }
            if (data[0].Investment) {
                $("#investment").append(data[0].Investment);
            } else {
                $("#investment").append("NIL");
            }
            if (data[0].Savings) {
                $("#savings").append(data[0].Savings);
            } else {
                $("#savings").append("NIL");
            }
            if (data[0].Hospitalisation) {
                $("#hospitalisation").append(data[0].Hospitalisation);
            } else {
                $("#hospitalisation").append("NIL");
            }
            if (data[0].Retirement) {
                $("#retirement").append(data[0].Retirement);
            } else {
                $("#retirement").append("NIL");
            }
            if (data[0].Others) {
                $("#others").append(data[0].Others);
            } else {
                $("#others").append("NIL");
            }
        }
    });
    display();
});

function display() {
    //both single month and YTD methods for servlet working
    $.get("/OverviewServlet?type=managerTeamOverviewYTD", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var index = (strings.length - 1) / 2;
        var labels = [];
        var dataPoints = [];
        var totalYTDsales = strings[strings.length - 1];
        var htmlcode = "<th>Total Year-to-Date Sales:  <\/th><td>" + totalYTDsales + "<\/td>";
        $("#trans_table3").html(htmlcode);
        for (var i = 0; i < index; i++) {
            labels[i] = strings[i];
        }
        for (var j = index; j < strings.length - 1; j++) {
            dataPoints[j - index] = strings[j];
        }
        ctx2 = document.getElementById('smallMyChart2').getContext('2d');
        myChart2 = new Chart(ctx2, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                        label: 'Closed Sales',
                        backgroundColor: [
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue",
                            "crimson",
                            "gold",
                            "yellowgreen",
                            "deepskyblue"

                        ],
                        data: dataPoints
                    },
                ]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontSize: 18
                            },
                            stacked: true,
                            scaleLabel: {
                                fontSize: 25,
                                display: true,
                                labelString: 'FYC per Individual'
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                fontSize: 18
                            },
                            stacked: true,
                            scaleLabel: {
                                fontSize: 20,
                                display: true,
                                labelString: 'Financial Agent'
                            }
                        }
                    ]
                }
            }
        });
    });
}



