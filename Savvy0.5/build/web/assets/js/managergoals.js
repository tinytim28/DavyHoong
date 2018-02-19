var table;
$(document).ready(function () {
    $.ajax({
        url: '/GoalServlet?type=viewTeamGoals',
        dataType: 'json',
        success: function (data) {

            table = $('#trans_table').DataTable({
                data: data,
                "columnDefs": [
                    {
                        "targets": 0,
                        data: 'username'
                    },
                    {
                        "targets": 1,
                        data: 'first'
                    },
                    {
                        "targets": 2,
                        data: 'second'
                    },
                    {
                        "targets": 3,
                        data: 'third'
                    },
                    {
                        "targets": 4,
                        data: 'fourth'
                    },
                    {
                        "targets": 5,
                        data: 'yearly'
                    },
                    {
                        "targets": 6,
                        data: 'approved'
                    },
                    {
                        "targets": 7,
                        data: 'ID',
                        render: function (data, type, row) {
                            return"<button id='ApproveGoal' type='button' class='btn btn-xs btn-success' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> Approve<\/button> <button id='RejectGoal' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'><\/span> Reject<\/button>";
                        }
                    }

                ]
            });

        }
    });
    //start of reject goal
    $("table").on('click', '#RejectGoal', function () {
        var del = $(this).attr("name");
        var goal = JSON.parse(del);
        var username = goal.username;
        $("#rejectModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#rejectModal #cfmReject").on("click", function (e) {
            $("#rejectModal").modal('hide'); // dismiss the dialog

            // set request parameters
            var parameters = {
                username: username,
                approved: "Rejected"

            };


            // send json to servlet
            $.ajax({
                url: "/GoalServlet?type=goalApproval",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });
            showSuccessAlert("Rejected goal!");
            table.destroy();
            fetch();

        });
    });
    //end of reject goal
    //start of approve goal
    $("table").on('click', '#ApproveGoal', function () {
        var del = $(this).attr("name");
        var goal = JSON.parse(del);
        var username = goal.username;
        $("#approveModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#approveModal #cfmApprove").on("click", function (e) {
            $("#approveModal").modal('hide'); // dismiss the dialog

            // set request parameters
            var parameters = {
                username: username,
                approved: "Approved"
            };

            // send json to servlet
            $.ajax({
                url: "/GoalServlet?type=goalApproval",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            showSuccessAlert("Successfully approved goal!");
            table.destroy();
            fetch();

        });
    });
    //end of approve goal
});
//end of jquery

function fetch() {
    $.ajax({
        url: '/GoalServlet?type=viewTeamGoals',
        dataType: 'json',
        success: function (data) {

            table = $('#trans_table').DataTable({
                data: data,
                "columnDefs": [
                    {
                        "targets": 0,
                        data: 'username'
                    },
                    {
                        "targets": 1,
                        data: 'first'
                    },
                    {
                        "targets": 2,
                        data: 'second'
                    },
                    {
                        "targets": 3,
                        data: 'third'
                    },
                    {
                        "targets": 4,
                        data: 'fourth'
                    },
                    {
                        "targets": 5,
                        data: 'yearly'
                    },
                    {
                        "targets": 6,
                        data: 'approved'
                    },
                    {
                        "targets": 7,
                        data: 'ID',
                        render: function (data, type, row) {
                            return"<button id='ApproveGoal' type='button' class='btn btn-xs btn-success' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> Approve<\/button> <button id='RejectGoal' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-remove' aria-hidden='true'><\/span> Reject<\/button>";
                        }
                    }

                ]
            });

        }
    });

}

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



