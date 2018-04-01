$(document).ready(function () {
    var ctx2;
    var myChart2;
    var month;

    //Monthlist populate
    var date = new Date().getMonth();
    var monthNames = ["Year-To-Date", "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    $("#monthlist").html("");
    for (var i = 0; i < date + 2; i++) {
        $("#monthlist").append("<option value='" + i + "'>" + monthNames[i] + "</option>");
    }

    //Userlist populate
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

    //First call for YTD chart
    $.ajax({
        type: "POST",
        url: "/Savvy0.5/OverviewServlet",
        datatype: 'json',
        data: {
            type: "managerTeamOverviewYTD"
        },
        success: function (responseJson) {
            var data = JSON.parse(responseJson);
            var i;
            var labels = [];
            var dataPoints = [];
            for (i in data) {
                labels[i] = data[i].username;
                dataPoints[i] = data[i].totalSales;
            }
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/OverviewServlet",
                datatype: 'json',
                data: {
                    type: "managerTeamOverviewAverageTotal"
                },
                success: function (responseJson) {
                    console.log(responseJson);
                }
            })
            ctx2 = document.getElementById('smallMyChart2').getContext('2d');
            myChart2 = new Chart(ctx2, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                            label: 'Closed Sales',
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
                                    fontSize: 20,
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
                                    labelString: 'Agent'
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
    //First call for YTD case breakdown
    $.ajax({
        url: '/Savvy0.5/OverviewServlet?type=managerRetrieveCaseBreakdownYTD',
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

    //Month list dropdown list change
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
                url: "/Savvy0.5/OverviewServlet",
                datatype: 'json',
                data: data,
                success: function (responseJson) {
                    var data = JSON.parse(responseJson);
                    var i;
                    var labels = [];
                    var dataPoints = [];
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                    }

                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: [

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
                url: '/Savvy0.5/OverviewServlet?type=managerRetrieveCaseBreakdownYTD',
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
                url: "/Savvy0.5/OverviewServlet",
                datatype: 'json',
                data: data,
                success: function (responseJson) {
                    var data = JSON.parse(responseJson);
                    var i;
                    var labels = [];
                    var dataPoints = [];
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                    }
                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: [

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
                url: '/Savvy0.5/OverviewServlet?month=' + month + '&type=managerRetrieveCaseBreakdownMonth',
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

    $("#caselist").change(function () {
        var info = $(this.value);
        myChart2.destroy();
        var casetype = info.selector;
        if (casetype === "All") {
            var data = {
                type: "managerTeamOverviewYTD"
            };
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/OverviewServlet",
                datatype: 'json',
                data: data,
                success: function (responseJson) {
                    var data = JSON.parse(responseJson);
                    var i;
                    var labels = [];
                    var dataPoints = [];
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                    }

                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: [

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
                url: '/Savvy0.5/OverviewServlet?type=managerRetrieveCaseBreakdownYTD',
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
                casetype: casetype,
                type: "managerTeamOverviewCaseType"
            };
            $.ajax({
                url: "/Savvy0.5/OverviewServlet",
                datatype: 'json',
                data: data,
                success: function (responseJson) {
                    var data = JSON.parse(responseJson);
                    var i;
                    var labels = [];
                    var dataPoints = [];
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                    }
                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: [

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
                    $("#life").html("");
                    $("#life").append("N.A.");
                    $("#investment").html("");
                    $("#investment").append("N.A.");
                    $("#savings").html("");
                    $("#savings").append("N.A.");
                    $("#hospitalisation").html("");
                    $("#hospitalisation").append("N.A.");
                    $("#retirement").html("");
                    $("#retirement").append("N.A.");
                    $("#others").html("");
                    $("#others").append("N.A.");
                },
                error: function (xhr, status, error) {
                    alert();
                }

            });

        }
    });

});




