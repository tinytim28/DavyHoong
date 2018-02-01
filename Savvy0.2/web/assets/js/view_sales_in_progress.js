/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dateCloseTemp = "";
$(document).ready(function () {
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
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        //alert(tds.length);
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var pName_update = $("#pName" + edit).text();
                    $("#pName_update").val(pName_update);
                    break;
                case 1:
                    var caseType_update = $("#caseType" + edit).text();
                    $("#caseType_update").val(caseType_update);
                    break;
                case 2:
                    var expectedFYC_update = $("#expectedFYC" + edit).text();
                    $("#expectedFYC_update").val(expectedFYC_update);
                    break;
                case 3:
                    var remarks_update = $("#remarks" + edit).text();
                    $("#remarks_update").val(remarks_update);
                    break;
            }
        }
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
            url: "/Savvy0.2/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully updated sale!");


            },
            error: function (xhr, status, error) {
                alert(pName);
            }
        });



    });

    //end of edit/update sale



    refresh(); // by default


    //start of delete sale
    $("table").on('click', '#DeleteSale', function () {
        var del = $(this).attr("name");
        $("#myModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#myModal #cfmDelete").on("click", function (e) {
            $("#myModal").modal('hide'); // dismiss the dialog

            var pName = $("#pName" + del).text();
            var caseType = $("#caseType" + del).text();
            // set request parameters
            var parameters = {
                pName: pName,
                caseType: caseType
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.2/SalesServlet?type=deleteSale",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully deleted sale!");
            refresh();
        });
        
    });
    //start of closing sale
    $("#showCloseSaleModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showCloseSaleModal a.btn").off("click");
    });

    $("#showCloseSaleModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showCloseSaleModal").remove();
    });


    $("table").on('click', '#CloseSale', function () {
        showCloseSaleModal();
        var edit = $(this).attr("name");
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        //alert(tds.length);
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var pName_close = $("#pName" + edit).text();
                    $("#pName_close").val(pName_close);
                    break;
                case 1:
                    var caseType_close = $("#caseType" + edit).text();
                    $("#caseType_close").val(caseType_close);
                    break;
                case 2:
                    var dateClose = $("#dateClose" + edit).text();
                    dateCloseTemp = $("#dateClose").val();
                    $("#dateClose").val(dateClose);
                    break;
            }
        }
    });

    $('#dateClose').on('input', function () {
        document.getElementById("ClosingSale").disabled = false;
    });

    $("#ClosingSale").click(function () {
        var pName = document.getElementById("pName_close").value;
        var caseType = document.getElementById("caseType_close").value;
        var dateClose = document.getElementById("dateClose").value;


        // disable search button and clear table
        $("#showCloseSaleModal").modal('hide');

        var data = {
            pName: pName,
            caseType: caseType,
            dateClose: dateClose,
            type: "closeSale"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.2/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                if (dateCloseTemp === "") {
                    showSuccessModal("Successfully closed sale!");
                } else {
                    showErrorModal("Already Closed!");
                }

            },
            error: function (xhr, status, error) {
                alert(dateClose);
            }
        });



    });

    //end of closing sale


});


function refresh() {
    $.get("/Savvy0.2/SalesServlet?type=retrieveAllByAgent", {
        "_": $.now()
    }, function (responseJson) {
        //alert(responseJson);
        var strings = responseJson.split(",");
        var htmlcode = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th hidden>Username<\/th>";
            htmlcode += "<th>Prospect Name<\/th>";
            htmlcode += "<th>Date Closed<\/th>";
            htmlcode += "<th>Case Type<\/th>";
            htmlcode += "<th>Expected FYC<\/th>";
            htmlcode += "<th>Remarks<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;
            for (var i = 0; i < strings.length; i += 6) {
                htmlcode += "<tr class='record' id='" + count + "'>";
                htmlcode += "<td hidden class='username' id='username" + count + "'>" + strings[i] + "<\/td>";
                htmlcode += "<td class='pName' id='pName" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode += "<td class='dateClose' id='dateClose" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode += "<td class='caseType' id='caseType" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode += "<td class='expectedFYC' id='expectedFYC" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode += "<td class='remarks' id='remarks" + count + "'>" + strings[i + 5] + "<\/td>";
                if (strings[i + 2] === "Work in Progress!") {
                    htmlcode += "<td><button id='CloseSale' type='button' class='btn btn-xs btn-success' name='" + count + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> Close<\/button><button id='EditSale' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeleteSale' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";
                } else {
                    htmlcode += "<td><button id='CloseSale' disabled type='button' class='btn btn-xs btn-success' name='" + count + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> Close<\/button><button id='EditSale' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeleteSale' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";
                }
                htmlcode += "<\/tr>";
                count++;
            }
            htmlcode += "<\/select>";
            $("#trans_table").html(htmlcode);
        }
    });
}

function showUpdateSaleModal() {
    $('#showUpdateSaleModal').modal('show');
}

function showCloseSaleModal() {
    $('#showCloseSaleModal').modal('show');
}


