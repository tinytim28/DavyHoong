/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {

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
            url: '/Savvy0.2/ProspectServlet',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    $("#trans_table").html("");
                    refresh();
                    showSuccessModal("New prospect has been created successfully.");
                } else {
                    showErrorModal("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(xhr.error);
            }
        });

    });


    refresh(); // by default

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
                url: "/Savvy0.2/ProspectServlet?type=deleteProspect",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully delete prospect!");
            refresh();

        });

    });

});

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
    $.get("/Savvy0.2/ProspectServlet?type=retrieveProspectsByAgent", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th>Prospects Name<\/th>";
            htmlcode += "<th>User Name<\/th>";
            htmlcode += "<th>Prospect's Contact<\/th>";
            htmlcode += "<th>First Contacted<\/th>";
            htmlcode += "<th>Remarks<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;

            for (var i = 0; i < strings.length; i += 5) {
                htmlcode += "<tr class='record' id='" + count + "'>";
                htmlcode += "<td class='pName' id='pName" + count + "'>" + strings[i] + "<\/td>";
                htmlcode += "<td class='username' id='username" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode += "<td class='pContact' id='pContact" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode += "<td class='firstContact' id='firstContact" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode += "<td class='remarks' id='remarks" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode += "<td><button id='EditProspect' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeleteProspect' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";
                htmlcode += "<\/tr>";
                count++;
            }

            htmlcode += "<\/select>";
            $("#trans_table").html(htmlcode);
        }
    });
}

function showUpdateUserModal() {
    $('#showUpdateUserModal').modal('show');
}

