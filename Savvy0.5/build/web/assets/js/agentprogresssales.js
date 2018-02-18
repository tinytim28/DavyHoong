var table;
$.ajax({
    url: '/Savvy0.5/SalesServlet?type=retrieveProgressByAgent',
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
                    data: 'dateClose'
                },
                {
                    "targets": 2,
                    data: 'caseType'
                },
                {
                    "targets": 3,
                    data: 'expectedFYC'
                },
                {
                    "targets": 4,
                    data: 'remarks'
                },
                {
                    "targets": 5,
                    data: 'ID',
                    render: function (data, type, row) {
                        return "<button id='CloseSale' type='button' class='btn btn-xs btn-success' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span>Close Sale<\/button><button id='EditSale' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span><\/button><button id='DeleteSale' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span><\/button>";
                    }
                }

            ]
        });

    }
});

$.ajax({
    url: '/Savvy0.5/ProspectServlet?type=retrieveProspectsByAgent',
    dataType: 'json',
    success: function (data) {
        $("#pName_forsale").html("");
        var i;
        for (i in data) {
            $("#pName_forsale").append("<option value='" + data[i].pName + "'>" + data[i].pName + "</option>");
        }
    }
});

var dateCloseTemp = "";
$(document).ready(function () {
    $('#successAlert').on('closed.bs.alert', function () {
        table.destroy();
        fetch();
    });
//start of edit/update sale
    $("#showUpdateSaleModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showUpdateSaleModal a.btn").off("click");
    });

    $("#showUpdateSaleModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showUpdateSaleModal").remove();
    });


    $("table").on('click', '#EditSale', function () {
        showUpdateSaleModal();
        var edit = $(this).attr("name");
        var sale = JSON.parse(edit);
        var pName = sale.pName;
        var caseType = sale.caseType;
        var expectedFYC = sale.expectedFYC;
        var remarks = sale.remarks;

        $("#pName_update").val(pName);
        $("#caseType_update").val(caseType);
        $("#expectedFYC_update").val(expectedFYC);
        $("#remarks_update").val(remarks);

    });

    $("#UpdateSale").click(function () {
        var pName = document.getElementById("pName_update").value;
        var caseType = document.getElementById("caseType_update").value;
        var expectedFYC = document.getElementById("expectedFYC_update").value;
        var remarks = document.getElementById("remarks_update").value;

        // disable search button and clear table
        $("#showUpdateSaleModal").modal('hide');

        var data = {
            pName: pName,
            caseType: caseType,
            expectedFYC: expectedFYC,
            remarks: remarks,
            type: "updateSales"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                showSuccessAlert("Successfully updated sale!");


            },
            error: function (xhr, status, error) {
                alert(pName);
            }
        });



    });

    //end of edit/update sale


    //start of add sales

    $("#AddSale").click(function () {
        $("#AddNewSale").modal("show");
    });

    $('#ExpectedFYC').on('input', function () {
        document.getElementById("createSalesButton").disabled = false;
    });

    $('#salesremarks').on('input', function () {
        document.getElementById("createSalesButton").disabled = false;
    });

    $("#createSalesButton").click(function () {
        var pName = document.getElementById("pName_forsale").value;
        var caseType = document.getElementById("caseType").value;
        var expectedFYC = document.getElementById("expectedFYC").value;
        var salesremarks = document.getElementById("salesremarks").value;

        // disable search button and clear table



        var data = {
            pName: pName,
            caseType: caseType,
            expectedFYC: expectedFYC,
            salesremarks: salesremarks,
            type: "create"
        };
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    showSuccessAlert("Successfully added sale!");
                    $("#AddNewSale").modal("hide");
                    table.destroy();
                    fetch();
                    $('#newSale')[0].reset();
                } else {
                    showErrorAlert("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });



    });

    //end of add sales

    //start of delete sale
    $("table").on('click', '#DeleteSale', function () {
        var del = $(this).attr("name");
        var sale = JSON.parse(del);
        var username = sale.username;
        var pName = sale.pName;
        var salesID = sale.SalesID;
        $("#myModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#myModal #cfmDelete").on("click", function (e) {
            $("#myModal").modal('hide'); // dismiss the dialog

            var parameters = {
                username: username,
                pName: pName,
                salesID: salesID
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/SalesServlet?type=deleteSale",
                contentType: "application/json",
                dataType: "json",
                data: parameters,
                success: function () {
                    showSuccessAlert("Successfully deleted sale!");
                    table.destroy();
                    fetch();
                },
                error: function () {
                    showErrorAlert("Error!");
                }
            });



        });

    });


    //start of closing sale
    $("#showCloseSale").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showCloseSale a.btn").off("click");
    });

    $("#showCloseSale").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showCloseSale").remove();
    });


    $("table").on('click', '#CloseSale', function () {
        showCloseSale();
        var edit = $(this).attr("name");
        var closingSale = JSON.parse(edit);
        var pName = closingSale.pName;
        var caseType = closingSale.caseType;
        var expectedFYC = closingSale.expectedFYC;
        var dateClose = closingSale.dateClose;
        var salesID = closingSale.SalesID;
        //alert(tds.length);

        $("#pName_close").val(pName);
        $("#salesID_close").val(salesID);
        $("#caseType_close").val(caseType);
        $("#expectedFYC_close").val(expectedFYC);
        $("#dateClose").val(dateClose);



    });

    $('#dateClose').on('input', function () {
        document.getElementById("ClosingSale").disabled = false;
    });

    $("#ClosingSale").click(function () {
        var salesID = document.getElementById("salesID_close").value;
        var dateClose = document.getElementById("dateClose").value;


        // disable search button and clear table
        $("#showCloseSale").modal('hide');

        var data = {
            salesID: salesID,
            dateClose: dateClose,
            type: "closeSale"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                showSuccessAlert("Successfully closed sale!");
                table.destroy();
                fetch();

            },
            error: function (xhr, status, error) {
                alert(dateClose);
            }
        });



    });

    //end of closing sale


});

function fetch() {
    $.ajax({
        url: '/Savvy0.5/SalesServlet?type=retrieveProgressByAgent',
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
                        data: 'dateClose'
                    },
                    {
                        "targets": 2,
                        data: 'caseType'
                    },
                    {
                        "targets": 3,
                        data: 'expectedFYC'
                    },
                    {
                        "targets": 4,
                        data: 'remarks'
                    },
                    {
                        "targets": 5,
                        data: 'SalesID',
                        render: function (data, type, row) {
                            return "<button id='CloseSale' type='button' class='btn btn-xs btn-success' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span>Close Sale<\/button><button id='EditSale' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span><\/button><button id='DeleteSale' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span><\/button>";
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

function showUpdateSaleModal() {
    $('#showUpdateSaleModal').modal('show');
}

function showCloseSale() {
    $('#showCloseSale').modal('show');
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
}
);


