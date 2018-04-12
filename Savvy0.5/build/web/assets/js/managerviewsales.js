var table;
$.ajax({
    url: '/Savvy0.5/SalesServlet?type=adminRetrieveSales',
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
                    data: 'pName'
                },
                {
                    "targets": 2,
                    data: 'dateClose'
                },
                {
                    "targets": 3,
                    data: 'caseType'
                },
                {
                    "targets": 4,
                    data: 'expectedFYC',
                    render: $.fn.dataTable.render.number(',', '.', 2, '$' )
                },
                {
                    "targets": 5,
                    data: 'remarks'
                }


            ]

        });
    }
});
$.ajax({
    url: '/Savvy0.5/UserServlet?type=retrieveUser',
    dataType: 'json',
    success: function (data) {
        $("#usernamelist").html("");
        var i;
        for (i in data) {
            $("#usernamelist").append("<option value='" + data[i].username + "'>" + data[i].username + "</option>");
        }

    }
});
$("#usernamelist").change(function () {
    table.search(this.value).draw();
});
$(document).ready(function () {
    $('#successAlert').on('closed.bs.alert', function () {
        table.destroy();
        fetch();
    });
    //start of edit/update prospect
    $("#showUpdateProspectModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showUpdateProspectModal a.btn").off("click");
    });

    $("#showUpdateProspectModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showUpdateProspectModal").remove();
    });


    $("table").on('click', '#EditProspect', function () {
        showUpdateProspectModal();
        var edit = $(this).attr("name");
        var prospect = JSON.parse(edit);
        var pName = prospect.pName;
        var pContact = prospect.pContact;
        var firstContact = prospect.firstContact;
        var remarks = prospect.remarks;

        $("#pName_update").val(pName);
        $("#pContact_update").val(pContact);
        $("#firstContact_update").val(firstContact);
        $("#remarks_update").val(remarks);
    });


    $("#UpdateProspect").click(function () {
        var pName = document.getElementById("pName_update").value;
        var pContact = document.getElementById("pContact_update").value;
        var firstContact = document.getElementById("firstContact_update").value;
        var remarks = document.getElementById("remarks_update").value;

        // disable search button and clear table
        $("#showUpdateProspectModal").modal('hide');

        var data = {
            pName: pName,
            pContact: pContact,
            firstContact: firstContact,
            remarks: remarks,
            type: "updateProspect"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/ProspectServlet",
            datatype: 'json',
            data: data,
            success: function (data) {

                showSuccessAlert("Successfully updated prospect!");
                table.destroy();
                fetch();

            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });



    });

    //end of edit/update prospect







    //start of add prospect
    $("#AddProspect").click(function () {
        $("#AddNewProspect").modal("show");
    });

    $('#pName').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#pContact').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#firstContact').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#remarks').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });


    $('#createButton').on('click', function () {
        var pName = document.getElementById("pName").value;
        var pContact = document.getElementById("pContact").value;
        var firstContact = document.getElementById("firstContact").value;
        var remarks = document.getElementById("remarks").value;


        var data = {
            pName: pName,
            pContact: pContact,
            firstContact: firstContact,
            remarks: remarks,
            type: "create"
        };

        $.ajax({
            url: '/Savvy0.5/ProspectServlet',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    showSuccessAlert("New prospect has been created successfully.");
                    $("#AddNewProspect").modal("hide");
                    table.destroy();
                    fetch();

                } else {
                    showErrorAlert("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.error);
            }
        });

    });
    //end of add prospect

    //start of delete prospect
    $("table").on('click', '#DeleteProspect', function () {
        var del = $(this).attr("name");
        alert(del);
        var prospect = JSON.parse(del);
        var pName = prospect.pName;
        var username = prospect.username;
        $("#myModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#myModal #cfmDelete").on("click", function (e) {
            $("#myModal").modal('hide'); // dismiss the dialog

            // set request parameters
            var parameters = {
                pName: pName,
                username: username
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/ProspectServlet?type=deleteProspect",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });

            showSuccessAlert("Successfully delete prospect!");
            table.destroy();
            fetch();

        });

    });
    //end of delete prospect

});
//end of jquery
function fetch() {
    $.ajax({
        url: '/Savvy0.5/ProspectServlet?type=retrieveProspectsByAgent',
        dataType: 'json',
        success: function (data) {

            table = $('#trans_table').DataTable({
                data: data,
                "columnDefs": [
                    {
                        "targets": 0,
                        data: 'pName'
                    },
                    {
                        "targets": 1,
                        data: 'pContact'
                    },
                    {
                        "targets": 2,
                        data: 'firstContact'
                    },
                    {
                        "targets": 3,
                        data: 'remarks'
                    },
                    {
                        "targets": 4,
                        data: 'ID',
                        render: function (data, type, row) {
                            return "<button id='EditProspect' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeleteProspect' type='button' class='btn btn-xs btn-danger' name=' " + JSON.stringify(row) + " '><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";
                        }
                    }

                ]
            });

        }
    });
}

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
        

function showUpdateProspectModal() {
    $('#showUpdateProspectModal').modal('show');
}


$(function () {
    var bindDatePicker = function () {
        $(".date")
                .datetimepicker({
                    format: "YYYY-MM-DD",
                    icons: {
                        time: "fa fa-clock-o",
                        date: "fa fa-calendar",
                        up: "fa fa-arrow-up",
                        down: "fa fa-arrow-down"
                    }
                })
                .find("input:first")
                .on("blur", function () {
                    // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
                    // update the format if it's yyyy-mm-dd
                    var date = parseDate($(this).val());

                    if (!isValidDate(date)) {
                        //create date based on momentjs (we have that)
                        date = moment().format("YYYY-MM-DD");
                    }

                    $(this).val(date);
                });
    };

    var isValidDate = function (value, format) {
        format = format || false;
        // lets parse the date to the best of our knowledge
        if (format) {
            value = parseDate(value);
        }

        var timestamp = Date.parse(value);

        return isNaN(timestamp) == false;
    };

    var parseDate = function (value) {
        var m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
        if (m)
            value =
                    m[5] + "-" + ("00" + m[3]).slice(-2) + "-" + ("00" + m[1]).slice(-2);

        return value;
    };

    bindDatePicker();
});

