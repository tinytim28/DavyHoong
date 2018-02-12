/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//start of jquery
$(document).ready(function () {
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
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        //alert(tds.length);
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var pName = $("#pName" + edit).text();
                    $("#pName_update").val(pName);
                    break;
                case 1:
                    var pContact_update = $("#pContact" + edit).text();
                    $("#pContact_update").val(pContact_update);
                    break;
                case 2:
                    var firstContact = $("#firstContact" + edit).text();
                    $("#firstContact_update").val(firstContact);
                    break;
                case 3:
                    var remarks = $("#remarks" + edit).text();
                    $("#remarks_update").val(remarks);
                    break;
            }
        }
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
            url: "/Proto/ProspectServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully updated prospect!");


            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });



    });

    //end of edit/update prospect

    //start of add sales
    $("#showAddSaleModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showAddSaleModal a.btn").off("click");
    });

    $("#showAddSaleModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showAddSaleModal").remove();
    });


    $("table").on('click', '#AddSale', function () {
        showAddSaleModal();
        var edit = $(this).attr("name");
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var pName = $("#pName" + edit).text();
                    $("#pName_forsale").val(pName);
                    break;
            }
        }
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
        $("#showAddSaleModal").modal('hide');


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
            url: "/Proto/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully added sale!");
                $('#newSale')[0].reset();
            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });



    });

    //end of add sales

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
            url: '/Proto/ProspectServlet',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    $("#trans_table").html("");
                    refresh();
                    showSuccessModal("New prospect has been created successfully.");
                    $("#AddNewProspect").modal("hide");
                    refresh();
                } else {
                    showErrorModal("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.error);
            }
        });

    });
    //end of add prospect

    refresh(); // by default


    //start of delete prospect
    $("table").on('click', '#DeleteProspect', function () {
        var del = $(this).attr("name");
        $("#myModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#myModal #cfmDelete").on("click", function (e) {
            $("#myModal").modal('hide'); // dismiss the dialog

            var pName = $("#pName" + del).text();
            var username = $("#username" + del).text();
            // set request parameters
            var parameters = {
                pName: pName,
                username: username
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Proto/ProspectServlet?type=deleteProspect",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully delete prospect!");
            refresh();

        });
        refresh();
    });
    //end of delete prospect
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
    $.get("/Proto/ProspectServlet?type=retrieveProspectsByAgent", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th>Prospects Name<\/th>";
            htmlcode += "<th hidden>User Name<\/th>";
            htmlcode += "<th>Prospect's Contact<\/th>";
            htmlcode += "<th>First Contacted<\/th>";
            htmlcode += "<th>Remarks<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;

            for (var i = 0; i < strings.length; i += 5) {
                htmlcode += "<tr class='record' id='" + count + "'>";
                htmlcode += "<td class='pName' id='pName" + count + "'>" + strings[i] + "<\/td>";
                htmlcode += "<td hidden class='username' id='username" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode += "<td class='pContact' id='pContact" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode += "<td class='firstContact' id='firstContact" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode += "<td class='remarks' id='remarks" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode += "<td><button id='AddSale' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-plus' aria-hidden='true'><\/span> Add Sale<\/button><button id='EditProspect' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeleteProspect' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";
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

