var temp;
function getCurrent() {
    var saleslist;
    var userlist;
    $.ajax({
        url: '/Savvy0.5/GoalServlet?type=viewTeamGoals',
        dataType: 'json',
        success: function (data) {
            userlist = data;
            $("#usernamelist").html("<option value=''>" + "Choose One" + "</option>");
            var i;
            for (i in data) {
                if (data[i].approved == "Approved") {
                    $("#usernamelist").append("<option value='" + data[i].userid + "'>" + data[i].username + ".  Goal Status: Approved" + "</option>");
                } else if (data[i].approved == "Pending Approval") {
                    $("#usernamelist").append("<option value='" + data[i].userid + "'>" + data[i].username + ".  Goal Status: Pending Approval" + "</option>");
                } else if (data[i].approved == "Rejected") {
                    $("#usernamelist").append("<option value='" + data[i].userid + "'>" + data[i].username + ".  Goal Status: Rejected" + "</option>");
                } else {
                    $("#usernamelist").append("<option value='" + data[i].userid + "'>" + data[i].username + ".  Goal Status: Not Set" + "</option>");
                }


            }

        }
    });


    $.ajax({
        url: '/Savvy0.5/GoalServlet?type=showCurrentQuarterlySalesManager',
        dataType: 'json',
        success: function (data) {
            saleslist = data;
        }
    });
    $("#usernamelist").change(function () {
        var currentQ1;
        var currentQ2;
        var currentQ3;
        var currentQ4;
        var currentyear;
        var goalQ1;
        var goalQ2;
        var goalQ3;
        var goalQ4;
        var goalyear;
        var approved;
        var info = $(this.value);
        var userid = info.selector;
        var i;
        for (i in userlist) {
            if (userid == userlist[i].userid) {
                goalQ1 = userlist[i].first;
                goalQ2 = userlist[i].second;
                goalQ3 = userlist[i].third;
                goalQ4 = userlist[i].fourth;
                goalyear = userlist[i].yearly;
                approved = userlist[i].approved;
            }
        }

        for (i in saleslist) {
            if (userid == saleslist[i].userid) {
                currentQ1 = saleslist[i].first;
                currentQ2 = saleslist[i].second;
                currentQ3 = saleslist[i].third;
                currentQ4 = saleslist[i].fourth;
            }
        }

        $("#targetSales").show();
        if (goalQ1) {
            $("#Q1view").html("<span>$</span>");
            $("#Q1view").append(parseInt(goalQ1));
        } else {
            $("#Q1view").html("<span>$</span>");
            $("#Q1view").append("NIL");
            goalQ1 = 0;
        }
        if (goalQ2) {
            $("#Q2view").html("<span>$</span>");
            $("#Q2view").append(parseInt(goalQ2));

        } else {
            $("#Q2view").html("<span>$</span>");
            $("#Q2view").append("NIL");
            goalQ2 = 0;
        }
        if (goalQ3) {
            $("#Q3view").html("<span>$</span>");
            $("#Q3view").append(parseInt(goalQ3));

        } else {
            $("#Q3view").html("<span>$</span>");
            $("#Q3view").append("NIL");
            goalQ3 = 0;
        }
        if (goalQ4) {
            $("#Q4view").html("<span>$</span>");
            $("#Q4view").append(parseInt(goalQ4));

        } else {
            $("#Q4view").html("<span>$</span>");
            $("#Q4view").append("NIL");
            goalQ4 = 0;
        }

        $("#yearlyview").html("<span>$</span>");
        $("#yearlyview").append(goalyear);
        if (approved == "Pending Approval") {
            $("#formBox").show();
            $("#ApproveGoal").removeAttr('disabled');
            $("#rejectGoal").removeAttr('disabled');
        } else {
            $("#formBox").hide();
            $("#ApproveGoal").attr('disabled', 'disabled');
            $("#rejectGoal").attr('disabled', 'disabled');
        }
        $("#approvedview").html("");
        $("#approvedview").append(approved);

        if (currentQ1) {
            $("#Q1current").html("<span>$</span>");
            currentQ1 = parseInt(currentQ1);
            $("#Q1current").append(currentQ1);
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
        if (currentQ2) {
            $("#Q2current").html("<span>$</span>");
            currentQ2 = parseInt(currentQ2);
            $("#Q2current").append(currentQ2);
            if (goalQ2 >= currentQ2) {
                $("#currentQ2").attr('class', "tile-box bg-red content-box");
            } else {
                $("#currentQ2").attr('class', "tile-box bg-green content-box");
            }
        } else {
            $("#Q2current").html("<span>$</span>");
            $("#Q2current").append("NIL");
            currentQ2 = 0;
        }
        if (currentQ3) {
            $("#Q3current").html("<span>$</span>");
            currentQ3 = parseInt(currentQ3);
            $("#Q3current").append(currentQ3);
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
        if (currentQ4) {
            $("#Q4current").html("<span>$</span>");
            currentQ4 = parseInt(currentQ4);
            $("#Q4current").append(currentQ4);

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
    });
    $("#usernamelist").val(temp);
    $("#usernamelist").change();
}
$(document).ready(function () {
    getCurrent();

    //start of reject goal
    $("#rejectGoal").click(function () {
        var userid = $("#usernamelist").val();
        $("#rejectModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#rejectModal #cfmReject").on("click", function (e) {
            $("#rejectModal").modal('hide'); // dismiss the dialog

            // set request parameters
            var parameters = {
                userid: userid,
                approved: "Rejected"

            };


            // send json to servlet
            $.ajax({
                url: "/Savvy0.5/GoalServlet?type=goalApproval",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });
            showSuccessAlert("Rejected goal!");
            getCurrent();
            temp = userid;

        });
    });
    //end of reject goal
    //start of approve goal
    $("#ApproveGoal").click(function () {
        var userid = $("#usernamelist").val();
        $("#approveModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#approveModal #cfmApprove").on("click", function (e) {
            $("#approveModal").modal('hide'); // dismiss the dialog

            // set request parameters
            var parameters = {
                userid: userid,
                approved: "Approved"
            };

            // send json to servlet
            $.ajax({
                url: "/Savvy0.5/GoalServlet?type=goalApproval",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            showSuccessAlert("Successfully approved goal!");
            getCurrent();
            temp = userid;
        });
    });
    //end of approve goal
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
        




