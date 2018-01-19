/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//start of jquery
$(document).ready(function () {
    //start of reject goal
    $("table").on('click', '#RejectGoal', function () {
        var del = $(this).attr("name");
        $("#rejectModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#rejectModal #cfmReject").on("click", function (e) {
            $("#rejectModal").modal('hide'); // dismiss the dialog

            var username = $("#username" + del).text();

            // set request parameters
            var parameters = {
                username: username
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.3/GoalServlet?type=rejectGoal",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully rejected goal!");
            refresh();

        });
        refresh();
    });
    //end of reject goal
    //start of reject goal
    $("table").on('click', '#ApproveGoal', function () {
        var del = $(this).attr("name");
        $("#approveModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#approveModal #cfmApprove").on("click", function (e) {
            $("#approveModal").modal('hide'); // dismiss the dialog

            var username = $("#username" + del).text();

            // set request parameters
            var parameters = {
                username: username
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.3/GoalServlet?type=ApproveGoal",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully approved goal!");
            refresh();

        });
        refresh();
    });
    //end of reject goal
    refresh();
});
//end of jquery


function showSuccessModal(successMessage) {
    document.getElementById("successMsg").innerHTML = successMessage;
    $('#successModal').modal('show');

    setTimeout(function () {
        $("#user_create").click(); //Delay the refresh to show the success message before refreshing
    }, 2500);

}

function showErrorModal(errorMessage) {
    document.getElementById("errorMsg").innerHTML = errorMessage;
    $('#errorModal').modal('show');
}

function refresh() {
    $.get("/Savvy0.3/GoalServlet?type=viewTeamGoals", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th>Username<\/th>";
            htmlcode += "<th>Q1<\/th>";
            htmlcode += "<th>Q2<\/th>";
            htmlcode += "<th>Q3<\/th>";
            htmlcode += "<th>Q4<\/th>";
            htmlcode += "<th>Total<\/th>";
            htmlcode += "<th>Approval<\/th>";
            htmlcode += "<th>Changes Left<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;
            for (var i = 0; i < strings.length; i += 8) {
                htmlcode += "<tr class='record' id='" + count + "'>";
                htmlcode += "<td class='username' id='username" + count + "'>" + strings[i] + "<\/td>";
                htmlcode += "<td class='Q1' id='Q1" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode += "<td class='Q2' id='Q2" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode += "<td class='Q3' id='Q3" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode += "<td class='Q4' id='Q4" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode += "<td class='total' id='total" + count + "'>" + strings[i + 5] + "<\/td>";
                htmlcode += "<td class='approval' id='aprroval" + count + "'>" + strings[i + 6] + "<\/td>";
                htmlcode += "<td class='changeleft' id='changeleft" + count + "'>" + strings[i + 7] + "<\/td>";
                htmlcode += "<td><button id='ApproveGoal' type='button' class='btn btn-xs btn-success' name='" + count + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> Approve<\/button> <button id='RejectGoal' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'><\/span> Reject<\/button><\/td>";
                htmlcode += "<\/tr>";
                count++;
            }
            htmlcode += "<\/select>";
            $("#trans_table").html(htmlcode);
        }
    });
}

function showUpdateProspectModal() {
    $('#showUpdateProspectModal').modal('show');
}

function showAddSaleModal() {
    $('#showAddSaleModal').modal('show');
}

