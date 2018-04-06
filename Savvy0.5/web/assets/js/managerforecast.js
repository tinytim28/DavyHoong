/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var myChart;
var thisYear = new Date().getFullYear();
var nextYear = thisYear + 1;
$(document).ready(function () {
    $.ajax({
        url: '/Savvy0.5/UserServlet?type=retrieveUser',
        dataType: 'json',
        success: function (data) {
            $("#usernamelist").html("");
            var i;
            for (i in data) {
                $("#usernamelist").append("<option value='" + data[i].username + "'>" + data[i].username + "</option>");
            }
            var username = document.getElementById("usernamelist").value;
            var data = {
                username: username,
                type: "forecastAgentTwelveMonths"
            };
            var time = document.getElementById("timelist").value;
            $.ajax({
                url: "/Savvy0.5/ForecastServlet",
                datatype: 'json',
                data: data,
                success: function (responseJson) {
                    var strings = responseJson.split(",");
                    var q1 = (parseInt(strings[12]) + parseInt(strings[13]) + parseInt(strings[14])).toFixed(2);
                    var q2 = (parseInt(strings[15]) + parseInt(strings[16]) + parseInt(strings[17])).toFixed(2);
                    var q3 = (parseInt(strings[18]) + parseInt(strings[19]) + parseInt(strings[20])).toFixed(2);
                    var q4 = (parseInt(strings[21]) + parseInt(strings[22]) + parseInt(strings[23])).toFixed(2);
                    var q1string = "Quarter from " + strings[0] + " to " + strings[2];
                    var q2string = "Quarter from " + strings[3] + " to " + strings[5];
                    var q3string = "Quarter from " + strings[6] + " to " + strings[8];
                    var q4string = "Quarter from " + strings[9] + " to " + strings[11];
                    if (time == "yearly") {
                        ctx = document.getElementById('myChart').getContext('2d');
                        myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                                datasets: [{
                                        label: 'Forecasted Sales',
                                        data: [parseInt(strings[12]).toFixed(2), parseInt(strings[13]).toFixed(2), parseInt(strings[14]).toFixed(2), parseInt(strings[15]).toFixed(2), parseInt(strings[16]).toFixed(2), parseInt(strings[17]).toFixed(2), parseInt(strings[18]).toFixed(2), parseInt(strings[19]).toFixed(2), parseInt(strings[20]).toFixed(2), parseInt(strings[21]).toFixed(2), parseInt(strings[22]).toFixed(2), parseInt(strings[23]).toFixed(2)],
                                        backgroundColor: "rgb(0, 38, 255,0.5)"
                                    }

                                ]
                            },
                            options: {
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                max: 0,
                                                min: 30000,
                                                beginAtZero: true,
                                                callback: function (value, index, values) {
                                                    if (parseInt(value) >= 1000) {
                                                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                    } else {
                                                        return '$' + value;
                                                    }
                                                }
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
                                                labelString: 'For Year ' + thisYear + "-" + nextYear
                                            }
                                        }]
                                }
                            }

                        });
                    } else if (time == "quarterly") {
                        ctx = document.getElementById('myChart').getContext('2d');
                        myChart = new Chart(ctx, {
                            type: 'line',
                            data: {
                                labels: [q1string, q2string, q3string, q4string],
                                datasets: [{
                                        label: 'Forecasted Sales',
                                        data: [q1, q2, q3, q4],
                                        backgroundColor: "rgb(0, 38, 255,0.5)"
                                    }

                                ]
                            },
                            options: {
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                max: 0,
                                                min: 30000,
                                                beginAtZero: true,
                                                callback: function (value, index, values) {
                                                    if (parseInt(value) >= 1000) {
                                                        return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                    } else {
                                                        return '$' + value;
                                                    }
                                                }
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
                                                labelString: 'For Year ' + thisYear + "-" + nextYear
                                            }
                                        }]
                                }
                            },
                            showTooltips: false,
                            onAnimationComplete: function () {

                                var ctx = this.chart.ctx;
                                ctx.font = this.scale.font;
                                ctx.fillStyle = this.scale.textColor
                                ctx.textAlign = "center";
                                ctx.textBaseline = "bottom";

                                this.datasets.forEach(function (dataset) {
                                    dataset.points.forEach(function (points) {
                                        ctx.fillText(points.value, points.x, points.y - 10);
                                    });
                                })
                            }
                        });
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                }

            });
        }
    });

    $("#usernamelist").change(function () {
        myChart.destroy();
        var info = $(this.value);
        var username = info.selector;
        var data = {
            username: username,
            type: "forecastAgentTwelveMonths"
        };
        var time = document.getElementById("timelist").value;
        $.ajax({
            url: "/Savvy0.5/ForecastServlet",
            datatype: 'json',
            data: data,
            success: function (responseJson) {
                var strings = responseJson.split(",");
                var q1 = (parseInt(strings[12]) + parseInt(strings[13]) + parseInt(strings[14])).toFixed(2);
                var q2 = (parseInt(strings[15]) + parseInt(strings[16]) + parseInt(strings[17])).toFixed(2);
                var q3 = (parseInt(strings[18]) + parseInt(strings[19]) + parseInt(strings[20])).toFixed(2);
                var q4 = (parseInt(strings[21]) + parseInt(strings[22]) + parseInt(strings[23])).toFixed(2);
                var q1string = "Quarter from " + strings[0] + " to " + strings[2];
                var q2string = "Quarter from " + strings[3] + " to " + strings[5];
                var q3string = "Quarter from " + strings[6] + " to " + strings[8];
                var q4string = "Quarter from " + strings[9] + " to " + strings[11];
                if (time == "yearly") {
                    ctx = document.getElementById('myChart').getContext('2d');
                    myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                            datasets: [{
                                    label: 'Forecasted Sales',
                                    data: [parseInt(strings[12]).toFixed(2), parseInt(strings[13]).toFixed(2), parseInt(strings[14]).toFixed(2), parseInt(strings[15]).toFixed(2), parseInt(strings[16]).toFixed(2), parseInt(strings[17]).toFixed(2), parseInt(strings[18]).toFixed(2), parseInt(strings[19]).toFixed(2), parseInt(strings[20]).toFixed(2), parseInt(strings[21]).toFixed(2), parseInt(strings[22]).toFixed(2), parseInt(strings[23]).toFixed(2)],
                                    backgroundColor: "rgb(0, 38, 255,0.5)"
                                }

                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            max: 0,
                                            min: 30000,
                                            beginAtZero: true,
                                            callback: function (value, index, values) {
                                                if (parseInt(value) >= 1000) {
                                                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                } else {
                                                    return '$' + value;
                                                }
                                            }
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
                                            labelString: 'For Year ' + thisYear + "-" + nextYear
                                        }
                                    }]
                            }
                        },
                        showTooltips: false,
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.font = this.scale.font;
                            ctx.fillStyle = this.scale.textColor
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.datasets.forEach(function (dataset) {
                                dataset.points.forEach(function (points) {
                                    ctx.fillText(points.value, points.x, points.y - 10);
                                });
                            })
                        }
                    });
                } else if (time == "quarterly") {
                    ctx = document.getElementById('myChart').getContext('2d');
                    myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: [q1string, q2string, q3string, q4string],
                            datasets: [{
                                    label: 'Forecasted Sales',
                                    data: [q1, q2, q3, q4],
                                    backgroundColor: "rgb(0, 38, 255,0.5)"
                                }

                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            max: 0,
                                            min: 30000,
                                            beginAtZero: true,
                                            callback: function (value, index, values) {
                                                if (parseInt(value) >= 1000) {
                                                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                } else {
                                                    return '$' + value;
                                                }
                                            }
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
                                            labelString: 'For Year ' + thisYear + "-" + nextYear
                                        }
                                    }]
                            }
                        },
                        showTooltips: false,
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.font = this.scale.font;
                            ctx.fillStyle = this.scale.textColor
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.datasets.forEach(function (dataset) {
                                dataset.points.forEach(function (points) {
                                    ctx.fillText(points.value, points.x, points.y - 10);
                                });
                            })
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }

        });

    });
    $("#timelist").change(function () {
        myChart.destroy();
        var username = document.getElementById("usernamelist").value;
        var info = $(this.value);
        var time = info.selector;
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
                var q1 = (parseInt(strings[12]) + parseInt(strings[13]) + parseInt(strings[14])).toFixed(2);
                var q2 = (parseInt(strings[15]) + parseInt(strings[16]) + parseInt(strings[17])).toFixed(2);
                var q3 = (parseInt(strings[18]) + parseInt(strings[19]) + parseInt(strings[20])).toFixed(2);
                var q4 = (parseInt(strings[21]) + parseInt(strings[22]) + parseInt(strings[23])).toFixed(2);
                var q1string = "Quarter from " + strings[0] + " to " + strings[2];
                var q2string = "Quarter from " + strings[3] + " to " + strings[5];
                var q3string = "Quarter from " + strings[6] + " to " + strings[8];
                var q4string = "Quarter from " + strings[9] + " to " + strings[11];
                if (time == "yearly") {
                    ctx = document.getElementById('myChart').getContext('2d');
                    myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                            datasets: [{
                                    label: 'Forecasted Sales',
                                    data: [parseInt(strings[12]).toFixed(2), parseInt(strings[13]).toFixed(2), parseInt(strings[14]).toFixed(2), parseInt(strings[15]).toFixed(2), parseInt(strings[16]).toFixed(2), parseInt(strings[17]).toFixed(2), parseInt(strings[18]).toFixed(2), parseInt(strings[19]).toFixed(2), parseInt(strings[20]).toFixed(2), parseInt(strings[21]).toFixed(2), parseInt(strings[22]).toFixed(2), parseInt(strings[23]).toFixed(2)],
                                    backgroundColor: "rgb(0, 38, 255,0.5)"
                                }

                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            max: 0,
                                            min: 30000,
                                            beginAtZero: true,
                                            callback: function (value, index, values) {
                                                if (parseInt(value) >= 1000) {
                                                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                } else {
                                                    return '$' + value;
                                                }
                                            }
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
                                            labelString: 'For Year ' + thisYear + "-" + nextYear
                                        }
                                    }]
                            }
                        },
                        showTooltips: false,
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.font = this.scale.font;
                            ctx.fillStyle = this.scale.textColor
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.datasets.forEach(function (dataset) {
                                dataset.points.forEach(function (points) {
                                    ctx.fillText(points.value, points.x, points.y - 10);
                                });
                            })
                        }
                    });
                } else if (time == "quarterly") {
                    ctx = document.getElementById('myChart').getContext('2d');
                    myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: [q1string, q2string, q3string, q4string],
                            datasets: [{
                                    label: 'Forecasted Sales',
                                    data: [q1, q2, q3, q4],
                                    backgroundColor: "rgb(0, 38, 255,0.5)"
                                }

                            ]
                        },
                        options: {
                            scales: {
                                yAxes: [
                                    {
                                        ticks: {
                                            max: 0,
                                            min: 30000,
                                            beginAtZero: true,
                                            callback: function (value, index, values) {
                                                if (parseInt(value) >= 1000) {
                                                    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                                } else {
                                                    return '$' + value;
                                                }
                                            }
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
                                            labelString: 'For Year ' + thisYear + "-" + nextYear
                                        }
                                    }]
                            }
                        },
                        showTooltips: false,
                        onAnimationComplete: function () {

                            var ctx = this.chart.ctx;
                            ctx.font = this.scale.font;
                            ctx.fillStyle = this.scale.textColor
                            ctx.textAlign = "center";
                            ctx.textBaseline = "bottom";

                            this.datasets.forEach(function (dataset) {
                                dataset.points.forEach(function (points) {
                                    ctx.fillText(points.value, points.x, points.y - 10);
                                });
                            })
                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }

        });

    });

});










