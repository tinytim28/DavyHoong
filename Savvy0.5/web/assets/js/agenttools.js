var myChart2;
var table;
$.ajax({
    url: '/Savvy0.5/ProspectServlet?type=retrieveProspectsByAgent',
    dataType: 'json',
    success: function (data) {
        $("#prospectlist").html("<option value=''>" + "Choose One" + "</option>");
        var i;
        for (i in data) {

            $("#prospectlist").append("<option value='" + data[i].pName + "'>" + data[i].pName + "</option>");
        }
    }


});
var $els = $("#age, #rAge, #eAge, #dAnnualIncome, #otherContribuition, #currentSavings, #rateSavings, #rateInflation");
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
    $("#prospectlist").change(function () {
        var pName = document.getElementById("prospectlist").value;
        var parameters = {
            pName: pName
        };
        $('#trans_table').html("");
        myChart2.destroy();
        $.ajax({
            url: '/Savvy0.5/ProspectAnalysis?type=retrieveRetirementAnalysis',
            dataType: 'json',
            data: parameters,
            success: function (data) {
                if (data) {
                    $("#age").val(data.age);
                    $("#rAge").val(data.rAge);
                    $("#eAge").val(data.eAge);
                    $("#dAnnualIncome").val(parseFloat(data.dAnnualIncome));
                    $("#otherContribuition").val(parseFloat(data.otherContribuition));
                    $("#currentSavings").val(parseFloat(data.currentSavings));
                    $("#rateSavings").val(parseFloat(data.rateSavings));
                    $("#rateInflation").val(parseFloat(data.rateInflation));
                    $("#StoreData").attr('disabled', 'disabled');
                    var pName = document.getElementById("prospectlist").value;
                    var age = document.getElementById("age").value;
                    var rAge = document.getElementById("rAge").value;
                    var eAge = document.getElementById("eAge").value;
                    var dAnnualIncome = parseFloat(document.getElementById("dAnnualIncome").value);
                    var otherContribuition = parseFloat(document.getElementById("otherContribuition").value);
                    var currentSavings = parseFloat(document.getElementById("currentSavings").value);
                    var rateSavings = parseFloat(document.getElementById("rateSavings").value) / 100;
                    var rateInflation = parseFloat(document.getElementById("rateInflation").value) / 100;
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


                    if (pName && age && rAge && eAge && dAnnualIncome && otherContribuition && currentSavings && rateSavings && rateInflation) {
                        var i;
                        var htmlcode;
                        for (i in overall) {
                            htmlcode += '<tr>';
                            htmlcode += '<td>' + parseInt(overall[i][0]) + '<\/td>';
                            htmlcode += '<td>' + parseFloat(overall[i][1]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                            htmlcode += '<td>' + parseFloat(overall[i][2]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                            htmlcode += '<td>' + parseFloat(overall[i][3]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                            htmlcode += '<\/tr>';
                        }
                        $('#trans_table').html(htmlcode);
                        $("#StoreData").removeAttr('disabled');

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
                        $("#StoreData").click(function () {
                            var parameters = {
                                pName: pName,
                                age: age,
                                rAge: rAge,
                                eAge: eAge,
                                dAnnualIncome: dAnnualIncome,
                                otherContribuition: otherContribuition,
                                currentSavings: currentSavings,
                                rateSavings: rateSavings * 100,
                                rateInflation: rateInflation * 100
                            };

                            $.ajax({
                                url: "/Savvy0.5/ProspectAnalysis?type=addRetirementDataToProspect",
                                contentType: "application/json",
                                dataType: "json",
                                data: parameters
                            });
                            showSuccessAlert("Stored Prospects Retirement Plan!");
                        });
                    }
                }
            }


        });
    });
    $els.change(function () {
        $('#trans_table').html("");
        myChart2.destroy();
        $("#StoreData").attr('disabled', 'disabled');
        var pName = document.getElementById("prospectlist").value;
        var age = document.getElementById("age").value;
        var rAge = document.getElementById("rAge").value;
        var eAge = document.getElementById("eAge").value;
        var dAnnualIncome = parseFloat(document.getElementById("dAnnualIncome").value);
        var otherContribuition = parseFloat(document.getElementById("otherContribuition").value);
        var currentSavings = parseFloat(document.getElementById("currentSavings").value);
        var rateSavings = parseFloat(document.getElementById("rateSavings").value) / 100;
        var rateInflation = parseFloat(document.getElementById("rateInflation").value) / 100;
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
        myChart2.destroy();

        ctx2 = document.getElementById('smallMyChart2').getContext('2d');
        console.log(overall);
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
        if (pName && age && rAge && eAge && dAnnualIncome && otherContribuition && currentSavings && rateSavings && rateInflation) {
            $("#StoreData").removeAttr('disabled');
            var i;
            var htmlcode;
            for (i in overall) {
                htmlcode += '<tr>';
                htmlcode += '<td>' + parseInt(overall[i][0]) + '<\/td>';
                htmlcode += '<td>' + parseFloat(overall[i][1]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                htmlcode += '<td>' + parseFloat(overall[i][2]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                htmlcode += '<td>' + parseFloat(overall[i][3]).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) + '<\/td>';
                htmlcode += '<\/tr>';
            }
            $('#trans_table').html(htmlcode);
            $("#StoreData").click(function () {
                var parameters = {
                    pName: pName,
                    age: age,
                    rAge: rAge,
                    eAge: eAge,
                    dAnnualIncome: dAnnualIncome,
                    otherContribuition: otherContribuition,
                    currentSavings: currentSavings,
                    rateSavings: rateSavings * 100,
                    rateInflation: rateInflation * 100
                };

                $.ajax({
                    url: "/Savvy0.5/ProspectAnalysis?type=addRetirementDataToProspect",
                    contentType: "application/json",
                    dataType: "json",
                    data: parameters
                });
                showSuccessAlert("Stored Prospects Retirement Plan!");
            });
        }

    });
});

function showSuccessAlert(successMessage) {
    $('<div class="alert alert-success" id="successAlertWindow" hidden="hidden"><button type="button" class="close" data-hide="alert">&times;</button>' + successMessage + '</div>').hide().appendTo('#successAlert').fadeIn(1000);
    $("#successAlertWindow").slideUp(5000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $(this).closest("." + $(this).attr("data-hide")).hide();
        });
    });


}

function showErrorAlert(errorMessage) {
    $('<div class="alert alert-error" id="errorAlertWindow" hidden="hidden"><button type="button" class="close" data-hide="alert">&times;</button>' + errorMessage + '</div>').hide().appendTo('#errorAlert').fadeIn(1000);
    $("#errorAlertWindow").slideUp(5000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $(this).closest("." + $(this).attr("data-hide")).hide();
        });
    });

}
        