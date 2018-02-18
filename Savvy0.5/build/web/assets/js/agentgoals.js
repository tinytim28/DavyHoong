$("#YearlyBox").height($("#q1box").height());
$("#approvedBox").height($("#q1box").height());
$("#actionbox").height($("#q1box").height());


$.ajax({
    url: '/Savvy0.5/GoalServlet?type=viewOwnGoals',
    dataType: 'json',
    success: function (data) {
        $("#Q1new").val(data[0].first);
        $("#Q2new").val(data[0].second);
        $("#Q3new").val(data[0].third);
        $("#Q4new").val(data[0].fourth);
        $("#yearlyview").val(data[0].yearly);
        $("#approvedview").val(data[0].approved);
        if (data[0].approved === "Pending Approval") {
            document.getElementById("Q1new").disabled = true;
            document.getElementById("Q2new").disabled = true;
            document.getElementById("Q3new").disabled = true;
            document.getElementById("Q4new").disabled = true;
            document.getElementById("CreateGoal").disabled = true;
            $('#CreateGoal').removeClass('btn-primary');
        }
    }
});
$.ajax({
    url: '/Savvy0.5/GoalServlet?type=showCurrentQuarterlySales',
    dataType: 'json',
    success: function (data) {
        if (data[0].first) {
            $("#Q1current").append(data[0].first);
        } else {
            $("#Q1current").append("NIL");
        }
        if (data[0].second) {
            $("#Q2current").append(data[0].second);
        } else {
            $("#Q2current").append("NIL");
        }
        if (data[0].third) {
            $("#Q3current").append(data[0].third);
        } else {
            $("#Q3current").append("NIL");
        }
        if (data[0].fourth) {
            $("#Q4current").append(data[0].fourth);
        } else {
            $("#Q4current").append("NIL");
        }




    }
});



$(document).ready(function () {
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
                    fetch();
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
    $("#successAlert").animate({
        height: '+=72px'
    }, 300);
    $('<div class="alert alert-success" id="successAlertWindow" hidden="hidden"><button type="button" class="close" data-hide="alert">&times;</button>' + successMessage + '</div>').hide().appendTo('#successAlert').fadeIn(1000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $(this).closest("." + $(this).attr("data-hide")).hide();
            $("#successAlert").height(0);
        });
    });

}

function showErrorAlert(errorMessage) {
    $("#successAlert").animate({
        height: '+=72px'
    }, 300);
    $('<div class="alert alert-error" id="errorAlertWindow" hidden="hidden"><button type="button" class="close" data-hide="alert">&times;</button>' + errorMessage + '</div>').hide().appendTo('#errorAlert').fadeIn(1000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $(this).closest("." + $(this).attr("data-hide")).hide();
            $("#errorAlert").height(0);
        });
    });
}

function fetch() {
    $.ajax({
        url: '/Savvy0.5/GoalServlet?type=viewOwnGoals',
        dataType: 'json',
        success: function (data) {
            $("#Q1new").val(data[0].first);
            $("#Q2new").val(data[0].second);
            $("#Q3new").val(data[0].third);
            $("#Q4new").val(data[0].fourth);
            $("#yearlyview").val(data[0].yearly);
            $("#approvedview").val(data[0].approved);
            if (data[0].approved === "Pending Approval") {
                document.getElementById("Q1new").disabled = true;
                document.getElementById("Q2new").disabled = true;
                document.getElementById("Q3new").disabled = true;
                document.getElementById("Q4new").disabled = true;
                document.getElementById("actionbox").disabled = true;
            }
        }
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


