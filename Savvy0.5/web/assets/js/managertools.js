var myChart2;
var table;
$.ajax({
    url: '/Savvy0.5/GoalServlet?type=viewTeamGoals',
    dataType: 'json',
    success: function (data) {
        userlist = data;
        $("#usernamelist").html("<option value='null'>" + "Choose One" + "</option>");
        var i;
        for (i in data) {
            $("#usernamelist").append("<option value='" + data[i].userid + "'>" + data[i].username + "</option>");
        }

    }
});

$(document).ready(function () {
    ctx2 = document.getElementById('smallMyChart2').getContext('2d');
    myChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                    label: 'Forecasted Savings',
                    data: [],
                    backgroundColor: "rgb(26, 160, 244)"
                }]
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Cumulative Savings',
                            fontColor: "#546372"
                        }
                    }
                ],
                xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Age'
                        }
                    }]
            }
        }
    });
    $("#usernamelist").change(function () {
        $("option[value='null']").remove();
        if (myChart2) {
            myChart2.destroy();
        }
        table.destroy();
        var aid = document.getElementById("usernamelist").value;
        var parameters = {
            aid: aid
        };

        $.ajax({
            url: '/Savvy0.5/ProspectAnalysis?type=retrieveRetirementAnalysisByAgent',
            dataType: 'json',
            data: parameters,
            success: function (data) {
                if (data) {
                    table = $('#trans_table').DataTable({
                        data: data,
                        "columnDefs": [
                            {
                                "targets": 0,
                                data: 'pName'
                            },
                            {
                                "targets": 1,
                                data: 'age'
                            },
                            {
                                "targets": 2,
                                data: 'rAge'
                            },
                            {
                                "targets": 3,
                                data: 'eAge'
                            },
                            {
                                "targets": 4,
                                data: 'dAnnualIncome',
                                render: $.fn.dataTable.render.number(',', '.', 2, '$')
                            },
                            {
                                "targets": 5,
                                data: 'otherContribuition',
                                render: $.fn.dataTable.render.number(',', '.', 2, '$')
                            },
                            {
                                "targets": 6,
                                data: 'currentSavings',
                                render: $.fn.dataTable.render.number(',', '.', 2, '$')
                            },
                            {
                                "targets": 7,
                                data: 'rateSavings'
                            },
                            {
                                "targets": 8,
                                data: 'rateInflation'
                            },
                            {
                                "targets": 9,
                                data: 'aid',
                                render: function (data, type, row) {
                                    return "<button id='ViewChart' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-eye-open' aria-hidden='true'><\/span>View Chart<\/button>";
                                }
                            }

                        ]
                    });

                }
            }
        });

    });

    $("table").on('click', '#ViewChart', function () {
        myChart2.destroy();
        var chartMaker = $(this).attr("name");
        var chartVar = JSON.parse(chartMaker);
        var pName = chartVar.pName;
        var age = chartVar.age;
        var rAge = chartVar.rAge;
        var eAge = chartVar.eAge;
        var dAnnualIncome = parseFloat(chartVar.dAnnualIncome);
        var otherContribuition = parseFloat(chartVar.otherContribuition);
        var currentSavings = parseFloat(chartVar.currentSavings);
        var rateSavings = parseFloat(chartVar.rateSavings) / 100;
        var rateInflation = parseFloat(chartVar.rateInflation) / 100;
        var amountOfSavings;
        var presentValueNeededFunds;
        var firstYearSavingContribuitions;
        var realDollarContribuition;
        if (rateInflation != rateSavings) {
            amountOfSavings = (((dAnnualIncome - otherContribuition) * Math.pow((1.0 + rateInflation), (rAge - age + 1))) / (rateSavings - rateInflation)) * (1.0 - Math.pow(((1.0 + rateInflation) / (1.0 + rateSavings)), ((eAge - rAge))));
        } else {
            amountOfSavings = (dAnnualIncome - otherContribuition) * Math.pow((1.0 + rateInflation), (rAge - age)) * (eAge - rAge);
        }
        presentValueNeededFunds = (1 / Math.pow((1 + rateSavings), (rAge - age))) * amountOfSavings - currentSavings;
        if (rateInflation != rateSavings) {
            firstYearSavingContribuitions = (presentValueNeededFunds * ((1 + rateSavings) / (1 + rateInflation) - 1.0)) / (1.0 - (1.0 / (Math.pow((1.0 + ((1.0 + rateSavings) / (1.0 + rateInflation) - 1.0)), (rAge - age))))) * (1.0 + rateInflation);
        } else {
            firstYearSavingContribuitions = (amountOfSavings - (currentSavings * Math.pow((1 + rateInflation), (rAge - age)))) / ((rAge - age) * Math.pow((1.0 + rateInflation), (rAge - age)));
        }
        realDollarContribuition = firstYearSavingContribuitions / (rateInflation + 1);
        var year = 1;
        var counter = 0;
        var overall = [];
        var ageList = [];
        var annualSavings = [];
        var cumulativeSavings = [];
        var monthlySavingGoal = [];
        for (var i = age; i <= 100; i++) {
            var peryear = [];
            ageList.push(i);
            peryear.push(i);
            //annual savings
            if (year < (rAge - age + 1)) {
                annualSavings.push((realDollarContribuition * Math.pow((1 + rateInflation), year)).toFixed(2));
                peryear.push((realDollarContribuition * Math.pow((1 + rateInflation), year)).toFixed(2));
            } else {
                annualSavings.push(0);
                peryear.push(0);
            }

            //Cumulative savings
            if (i == age) {
                var cs = parseFloat((parseFloat(annualSavings[0]) + currentSavings * (1 + rateSavings)));
                var c1 = cs.toFixed();
                cumulativeSavings.push(c1);
                peryear.push(c1);
            } else {
                if (year < (rAge - age + 1)) {
                    var cs = parseFloat((parseFloat(cumulativeSavings[counter - 1]) * (1 + rateSavings) + parseFloat(annualSavings[counter])));
                    var c2 = cs.toFixed();
                    cumulativeSavings.push(c2);
                    peryear.push(c2);
                } else if (cumulativeSavings[counter - 1] * (1 + rateSavings) - ((dAnnualIncome - otherContribuition) * ((1 + Math.pow((1 + rateInflation), year)))) > 0) {
                    var cs = parseFloat((parseFloat(cumulativeSavings[counter - 1]) * (1 + rateSavings) - ((dAnnualIncome - otherContribuition) * (Math.pow((1 + rateInflation), year)))));
                    var c3 = cs.toFixed();
                    cumulativeSavings.push(c3);
                    peryear.push(c3);
                } else {
                    cumulativeSavings.push(0);
                    peryear.push(0);
                }
            }

            //Monthly Saving Goal
            monthlySavingGoal.push((annualSavings[counter] / 12).toFixed(2));
            peryear.push((annualSavings[counter] / 12).toFixed(2));
            overall.push(peryear);
            year++;
            counter++;
        }
        ;
        ctx2 = document.getElementById('smallMyChart2').getContext('2d');
        myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: ageList,
                datasets: [{
                        label: 'Forecasted Savings',
                        data: cumulativeSavings,
                        backgroundColor: "rgb(26, 160, 244)"
                    }]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                min: 0
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Cumulative Savings',
                                fontColor: "#546372"
                            }
                        }
                    ],
                    xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Age'
                            }
                        }]
                }
            }
        });
    });


});