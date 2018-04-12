

function getCurrent() {
    var currentQ1;
    var currentQ2;
    var currentQ3;
    var currentQ4;
    var currentyear;
    var goalQ1;
    var goalQ2;
    var goalQ3;
    var goalQ4;


    $.ajax({
        url: '/Savvy0.5/GoalServlet?type=viewOwnGoals',
        dataType: 'json',
        success: function (data) {
            if (data.length) {

                $("#targetSales").show();
                if (data[0].first) {
                    $("#Q1view").html("<span>$</span>");
                    $("#Q1view").append(parseInt(data[0].first));
                    goalQ1 = parseInt(data[0].first);

                } else {
                    $("#Q1view").html("<span>$</span>");
                    $("#Q1view").append("NIL");
                    goalQ1 = 0;
                }
                if (data[0].second) {
                    $("#Q2view").html("<span>$</span>");
                    $("#Q2view").append(parseInt(data[0].second));
                    goalQ2 = parseInt(data[0].first);
                } else {
                    $("#Q2view").html("<span>$</span>");
                    $("#Q2view").append("NIL");
                    goalQ2 = 0;
                }
                if (data[0].third) {
                    $("#Q3view").html("<span>$</span>");
                    $("#Q3view").append(parseInt(data[0].third));
                    goalQ3 = parseInt(data[0].first);
                } else {
                    $("#Q3view").html("<span>$</span>");
                    $("#Q3view").append("NIL");
                    goalQ3 = 0;
                }
                if (data[0].fourth) {
                    $("#Q4view").html("<span>$</span>");
                    $("#Q4view").append(parseInt(data[0].fourth));
                    goalQ4 = parseInt(data[0].first);
                } else {
                    $("#Q4view").html("<span>$</span>");
                    $("#Q4view").append("NIL");
                    goalQ4 = 0;
                }
                $("#Q1new").val(data[0].first);
                $("#Q2new").val(data[0].second);
                $("#Q3new").val(data[0].third);
                $("#Q4new").val(data[0].fourth);


                $("#yearlyview").html("<span>$</span>");
                $("#yearlyview").append(data[0].yearly);
                $("#approvedview").html("");
                $("#approvedview").append(data[0].approved);
                if (data[0].approved === "Pending Approval" || data[0].approved === "Approved") {
                    document.getElementById("Q1new").disabled = true;
                    document.getElementById("Q2new").disabled = true;
                    document.getElementById("Q3new").disabled = true;
                    document.getElementById("Q4new").disabled = true;
                    document.getElementById("CreateGoal").disabled = true;
                    $('#CreateGoal').removeClass('btn-primary');
                    $('#formBox').hide();
                }
                $.ajax({
                    url: '/Savvy0.5/GoalServlet?type=showCurrentQuarterlySales',
                    dataType: 'json',
                    success: function (data) {
                        if (data[0].first) {
                            $("#Q1current").html("<span>$</span>");
                            $("#Q1current").append(parseInt(data[0].first));
                            currentQ1 = parseInt(data[0].first);
                            if (goalQ1 >= currentQ1) {
                                $("#currentQ1").attr('class', "tile-box bg-red content-box");
                            } else {
                                $("#currentQ1").attr('class', "tile-box bg-green content-box");
                            }
                        } else {
                            $("#Q1current").html("<span>$</span>");
                            $("#Q1current").append("NIL");
                            currentQ1 = 0;
                        }
                        if (data[0].second) {
                            $("#Q2current").html("<span>$</span>");
                            $("#Q2current").append(parseInt(data[0].second));
                            currentQ2 = parseInt(data[0].second);
                            if (goalQ1 >= currentQ1) {
                                $("#currentQ2").attr('class', "tile-box bg-red content-box");
                            } else {
                                $("#currentQ2").attr('class', "tile-box bg-green content-box");
                            }
                        } else {
                            $("#Q2current").html("<span>$</span>");
                            $("#Q2current").append("NIL");
                            currentQ2 = 0;
                        }
                        if (data[0].third) {
                            $("#Q3current").html("<span>$</span>");
                            $("#Q3current").append(parseInt(data[0].third));
                            currentQ3 = parseInt(data[0].third);
                            if (goalQ1 >= currentQ1) {
                                $("#currentQ3").attr('class', "tile-box bg-red content-box");
                            } else {
                                $("#currentQ3").attr('class', "tile-box bg-green content-box");
                            }
                        } else {
                            $("#Q3current").html("<span>$</span>");
                            $("#Q3current").append("NIL");
                            currentQ3 = 0;
                        }
                        if (data[0].fourth) {
                            $("#Q4current").html("<span>$</span>");
                            $("#Q4current").append(parseInt(data[0].fourth));
                            currentQ4 = parseInt(data[0].fourth);
                            if (goalQ1 >= currentQ1) {
                                $("#currentQ4").attr('class', "tile-box bg-red content-box");
                            } else {
                                $("#currentQ4").attr('class', "tile-box bg-green content-box");
                            }

                        } else {
                            $("#Q4current").html("<span>$</span>");
                            $("#Q4current").append("NIL");
                            currentQ4 = 0;
                        }
                        currentyear = currentQ1 + currentQ2 + currentQ3 + currentQ4;
                        $("#yearcurrent").html("<span>$</span>");
                        $("#yearcurrent").append(currentyear);
                        var q1piedata = String(currentQ1 / goalQ1 * 100);
                        var q2piedata = String(currentQ2 / goalQ2 * 100);
                        var q3piedata = String(currentQ3 / goalQ3 * 100);
                        var q4piedata = String(currentQ4 / goalQ4 * 100);
                        $("#q1pie").attr('data-percent', q1piedata);
                        $("#q2pie").attr('data-percent', q2piedata);
                        $("#q3pie").attr('data-percent', q3piedata);
                        $("#q4pie").attr('data-percent', q4piedata);
                    }
                });


            }
        }


    });
}









$(document).ready(function () {
    getCurrent();
    $("table").on('click', '#EditGoal', function () {
        showUpdateGoalModal();
        var edit = $(this).attr("name");
        alert(edit);
        var goal = JSON.parse(edit);
        var Q1update = goal.first;
        var Q2update = goal.second;
        var Q3update = goal.third;
        var Q4update = goal.fourth;

        $("#Q1update").val(Q1update);
        $("#Q2update").val(Q2update);
        $("#Q3update").val(Q3update);
        $("#Q4update").val(Q4update);

    });

    $('#AddNewGoal').on('click', function () {
        $("#showCreateGoalModal").modal("show");
    });

    $('#CreateGoal').on('click', function () {
        var Q1new = document.getElementById("Q1new").value;
        var Q2new = document.getElementById("Q2new").value;
        var Q3new = document.getElementById("Q3new").value;
        var Q4new = document.getElementById("Q4new").value;


        if (document.getElementById("ErrorMessage") !== null) {
            var child = document.getElementById("ErrorMessage");
            parent.removeChild(child);
        }
        var data = {
            first: Q1new,
            second: Q2new,
            third: Q3new,
            fourth: Q4new,
            type: "setGoal"
        }

        $.ajax({
            url: '/Savvy0.5/GoalServlet',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    $("#trans_table").html("");

                    showSuccessAlert("Goal Set!");
                    getCurrent();
                } else {
                    showErrorAlert("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(data);
            }
        });

    })

    $("#updateGoal").click(function () {

        var Q1update = document.getElementById("Q1update").value;
        var Q2update = document.getElementById("Q2update").value;
        var Q3update = document.getElementById("Q3update").value;
        var Q4update = document.getElementById("Q4update").value;
        var changeLeft = '1';
        // disable search button and clear table
        $("#showUpdateGoalModal").modal('hide');
        var data = {
            first: Q1update,
            second: Q2update,
            third: Q3update,
            fourth: Q4update,
            changeLeft: changeLeft,
            type: "changeGoals"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/GoalServlet",
            datatype: 'json',
            data: data,
            success: function (data) {

                showSuccessAlert("Successfully updated goal!");


            },
            error: function (xhr, status, error) {
            }
        });



    });

    //end of edit/update goal


});
//end of jquery


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
        

function showUpdateGoalModal() {
    $('#showUpdateGoalModal').modal('show');
}

function showCreateGoalModal() {
    $('#showCreateGoalModal').modal('show');
}

function hideCreateGoalModal() {
    $('#showCreateGoalModal').modal('hide');
}

function getQuarter(d) {
    d = d || new Date();
    var m = Math.floor(d.getMonth() / 3) + 2;
    return m > 4 ? m - 4 : m;
}


