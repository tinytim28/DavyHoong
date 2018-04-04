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
            var sum = 0;
            var median = data.length / 2;
            if (median % 1 != 0) {
                median -= 0.5;
            }

            for (i in data) {
                labels[i] = data[i].username;
                dataPoints[i] = data[i].totalSales;
                sum += data[i].totalSales;
            }
            var average = parseInt(sum / data.length);
            if (average) {
                $("#average").append(average);
            } else {
                $("#average").append("NIL");
            }
            if (sum) {
                $("#total").append(sum);
            } else {
                $("#total").append("NIL");
            }
            if (data.length) {
                $("#median").append(data[median].username);
            } else {
                $("#median").append("NIL");
            }
            var colours = [];
            for (i in dataPoints) {
                if (dataPoints[i] >= average) {
                    colours[i] = "green";
                } else {
                    colours[i] = "red";
                }
            }

            ctx2 = document.getElementById('smallMyChart2').getContext('2d');
            myChart2 = new Chart(ctx2, {
                type: 'horizontalBar',
                data: {
                    labels: labels,
                    datasets: [{
                            label: 'Closed Sales',
                            backgroundColor: colours,
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
                    var sum = 0;
                    var median = data.length / 2;
                    if (median % 1 != 0) {
                        median -= 0.5;
                    }
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                        sum += data[i].totalSales;
                    }
                    var average = parseInt(sum / data.length);

                    var colours = [];
                    if (average) {
                        $("#average").html("");
                        $("#average").append(average);
                    } else {
                        $("#average").html("");
                        $("#average").append("NIL");
                    }
                    if (sum) {
                        $("#total").html("");
                        $("#total").append(sum);
                    } else {
                        $("#total").html("");
                        $("#total").append("NIL");
                    }
                    if (data.length) {
                        $("#median").html("");
                        $("#median").append(data[median].username);
                    } else {
                        $("#median").html("");
                        $("#median").append("NIL");
                    }
                    for (i in dataPoints) {
                        if (dataPoints[i] >= average) {
                            colours[i] = "green";
                        } else {
                            colours[i] = "red";
                        }
                    }

                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: colours,
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
                    var sum = 0;
                    var median = data.length / 2;
                    if (median % 1 != 0) {
                        median -= 0.5;
                    }
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                        sum += data[i].totalSales;
                    }
                    var average = parseInt(sum / data.length);
                    var colours = [];
                    for (i in dataPoints) {
                        if (dataPoints[i] >= average) {
                            colours[i] = "green";
                        } else {
                            colours[i] = "red";
                        }
                    }
                    if (average) {
                        $("#average").html("");
                        $("#average").append(average);
                    } else {
                        $("#average").html("");
                        $("#average").append("NIL");
                    }
                    if (sum) {
                        $("#total").html("");
                        $("#total").append(sum);
                    } else {
                        $("#total").html("");
                        $("#total").append("NIL");
                    }
                    if (data.length) {
                        $("#median").html("");
                        $("#median").append(data[median].username);
                    } else {
                        $("#median").html("");
                        $("#median").append("NIL");
                    }
                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: colours,
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
    //dropdown by case
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
                    var sum = 0;
                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                        sum += data[i].totalSales;
                    }
                    var average = parseInt(sum / data.length);
                    var median = data.length / 2;
                    if (median % 1 != 0) {
                        median += 0.5;
                    }
                    var colours = [];
                    for (i in dataPoints) {
                        if (dataPoints[i] >= average) {
                            colours[i] = "green";
                        } else {
                            colours[i] = "red";
                        }
                    }
                    if (average) {
                        $("#average").html("");
                        $("#average").append(average);
                    } else {
                        $("#average").html("");
                        $("#average").append("NIL");
                    }
                    if (sum) {
                        $("#total").html("");
                        $("#total").append(sum);
                    } else {
                        $("#total").html("");
                        $("#total").append("NIL");
                    }
                    if (data.length) {
                        $("#median").html("");
                        $("#median").append(data[median].username);
                    } else {
                        $("#median").html("");
                        $("#median").append("NIL");
                    }

                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: colours,
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
                    var sum = 0;
                    var median = data.length / 2;
                    if (median % 1 != 0) {
                        median -= 0.5;
                    }

                    for (i in data) {
                        labels[i] = data[i].username;
                        dataPoints[i] = data[i].totalSales;
                        sum += data[i].totalSales;
                    }
                    var average = parseInt(sum / data.length);
                    var colours = [];
                    for (i in dataPoints) {
                        if (dataPoints[i] >= average) {
                            colours[i] = "green";
                        } else {
                            colours[i] = "red";
                        }
                    }
                    if (average) {
                        $("#average").html("");
                        $("#average").append(average);
                    } else {
                        $("#average").html("");
                        $("#average").append("NIL");
                    }
                    if (sum) {
                        $("#total").html("");
                        $("#total").append(sum);
                    } else {
                        $("#total").html("");
                        $("#total").append("NIL");
                    }
                    if (data.length) {
                        $("#median").html("");
                        $("#median").append(data[median].username);
                    } else {
                        $("#median").html("");
                        $("#median").append("NIL");
                    }
                    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
                    myChart2 = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: labels,
                            datasets: [{
                                    label: 'Closed Sales',
                                    backgroundColor: colours,
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

    $("#usernamelist").change(function () {
        var info = $(this.value);
        myChart2.destroy();
        var username = info.selector;
        var data = {
            username: username,
            type: "managerIndividualViewPerformance"
        };
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/OverviewServlet",
            datatype: 'json',
            data: data,
            success: function (responseJson) {
                var data = JSON.parse(responseJson);
                var sum = 0;
                var lifeCount = 0;
                var investmentCount = 0;
                var savingsCount = 0;
                var hospitalisationCount = 0;
                var retirementCount = 0;
                var othersCount = 0;
                var i;
                var labels = [];
                var dataset = [];
                var averagelist = [];
                for (i in data) {

                    dataset[i] = data[i].dateClose;
                    labels[i] = data[i].expectedFYC;

                    sum += data[i].expectedFYC;
                    lifeCount += data[i].lifeCount;
                    investmentCount += data[i].investmentCount;
                    savingsCount += data[i].savingsCount;
                    hospitalisationCount += data[i].hospitalisationCount;
                    retirementCount += data[i].retirementCount;
                    othersCount += data[i].othersCount;

                }
                
                console.log(averagelist);
                var average = sum / data.length;
                for(i in labels){
                    averagelist[i] = average;
                }
                if (average) {
                    $("#average").html("");
                    $("#average").append(average);
                } else {
                    $("#average").html("");
                    $("#average").append(0);
                }
                if (sum) {
                    $("#total").html("");
                    $("#total").append(sum);
                } else {
                    $("#total").html("");
                    $("#total").append(0);
                }
                $("#median").html("");
                $("#median").append("NIL");
                $("#life").html("");
                $("#life").append(lifeCount);
                $("#investment").html("");
                $("#investment").append(investmentCount);
                $("#savings").html("");
                $("#savings").append(savingsCount);
                $("#hospitalisation").html("");
                $("#hospitalisation").append(hospitalisationCount);
                $("#retirement").html("");
                $("#retirement").append(retirementCount);
                $("#others").html("");
                $("#others").append(othersCount);
                ctx = document.getElementById('smallMyChart2').getContext('2d');
                myChart2 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: dataset,
                        datasets: [{
                                label: 'Sales',
                                data: labels,
                                backgroundColor: "rgb(0, 255, 63, 0.5)"
                            }, {
                                label: 'Average',
                                data: averagelist,
                                backgroundColor: "rgb(0, 38, 255)"
                            }],
                    },
                    options: {
                        scales: {
                            yAxes: [
                                {

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
                                        labelString: 'Date'
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
});




