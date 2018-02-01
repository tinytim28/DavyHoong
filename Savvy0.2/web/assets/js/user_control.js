/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
//start of update user
    $("#showUpdateUserModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showUpdateUserModal a.btn").off("click");
    });

    $("#showUpdateUserModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showUpdateUserModal").remove();
    });


    $("table").on('click', '#EditUser', function () {
        showUpdateUserModal();
        var edit = $(this).attr("name");
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        //alert(tds.length);
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var username = $("#username" + edit).text();
                    $("#username_update").val(username);
                    break;
                case 1:
                    var firstname = $("#firstname" + edit).text();
                    $("#firstName_update").val(firstname);
                    break;
                case 2:
                    var lastname = $("#lastname" + edit).text();
                    $("#lastName_update").val(lastname);
                    break;
                case 3:
                    var usertype = $("#usertype" + edit).text();
                    $("#usertype_update").val(usertype);
                    break;
            }
        }
    });

    $("#UpdateUser").click(function () {
        var username = document.getElementById("username_update").value;
        var firstname = document.getElementById("firstName_update").value;
        var lastname = document.getElementById("lastName_update").value;
        var usertype = $('#usertype_update option:selected').val();
        var password = document.getElementById("password_update").value;
        var cfmPassword = document.getElementById("cfmpassword_update").value;
        if (usertype === " ") {
            showErrorModal("User Type not selected!");
        }

        if (password !== cfmPassword) {
            showErrorModal("Password don't match!");
        }

        // disable search button and clear table
        $("#showUpdateUserModal").modal('hide');

        var data = {
            username: username,
            firstName: firstname,
            lastName: lastname,
            usertype: usertype,
            password: password,
            type: "updateUser"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.2/UserServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully updated user!");


            },
            error: function (xhr, status, error) {
                alert(error);
            }
        });



    });
    //end of update user


// start of add user
    $("#AddNewUser").click(function () {
        $("#AddNewUserModal").modal("show");
    });

    $('#usernameNew').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#passwordNew').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#confirmPassword').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#firstName').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });

    $('#lastName').on('input', function () {
        document.getElementById("createButton").disabled = false;
    });


    $('#createButton').on('click', function () {
        var usernameNew = document.getElementById("usernameNew").value;
        var passwordNew = document.getElementById("passwordNew").value;
        var confirmPassword = document.getElementById("confirmPassword").value;
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        //var usertypeSelection = document.getElementById("usertype");
        //var usertype = usertypeSelection.options[usertypeSelection.selectedIndex].value;
        var usertype = $('#usertype').val();

        var err = "";

        if (passwordNew !== confirmPassword) {
            err = "Please enter the same passowrd!";
        } else if (usernameNew.trim() === "" || passwordNew.trim() === "" || firstName.trim() === "" || lastName.trim() === "" || usertype.trim() === "") {
            err = "Please input all the fields!";
        }


        if (err === "") {
            if (document.getElementById("ErrorMessage") !== null) {
                var parent = document.getElementById("newUser");
                var child = document.getElementById("ErrorMessage");
                parent.removeChild(child);
            }
            var data = {
                username: usernameNew,
                password: passwordNew,
                firstName: firstName,
                lastName: lastName,
                usertype: usertype,
                type: "create"
            }

            $.ajax({
                url: '/Savvy0.2/UserServlet',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.success) {
                        document.getElementById("newUser").reset();
                        $("#trans_table").html("");
                        refresh();
                        showSuccessModal("New user has been created successfully.");
                        $("#AddNewUserModal").modal("hide");
                    } else {
                        showErrorModal("Creation Failed.");
                    }
                },
                error: function (xhr, status, error) {
                    alert(data);
                }
            });
        } else {
            showErrorModal(err);
        }
    })
    //end of add user

    //start of change password
    $("#confirmPassword").blur(function () {
        var passwordNew = document.getElementById("passwordNew").value;
        var confirmPassword = document.getElementById("confirmPassword").value;

        if (passwordNew !== confirmPassword) {
            if (document.getElementById("PasswordErr") === null) {
                var div = document.getElementById("confirm");
                var div_outer = document.createElement('div');
                div_outer.id = "PasswordErr";
                div_outer.className = "form-group";

                var div_left = document.createElement('div');
                div_left.className = "col-sm-3";

                var div_right = document.createElement('div');
                div_right.className = "col-sm-9";
                div_right.id = "err";
                div_right.innerHTML = "&nbsp;&nbsp;Please enter the same passowrd!";
                div_right.style.color = "red";
                div_right.style.size = "2";

                div_outer.appendChild(div_left);
                div_outer.appendChild(div_right);

                div.appendChild(div_outer);
            }
        } else {
            var child = document.getElementById("PasswordErr");
            if (child !== null) {
                var parent = document.getElementById("confirm");
                parent.removeChild(child);
            }
        }
    });
    //end of change password
    refresh(); // by default

    //start of deactivate user
    $("table").on('click', '#DeactivateUser', function () {
        var del = $(this).attr("name");
        $("#myModal").modal({// wire up the actual modal functionality and show the dialog
            "backdrop": "static",
            "keyboard": true,
            "show": true // ensure the modal is shown immediately
        });
        $("#myModal #cfmDelete").on("click", function (e) {
            $("#myModal").modal('hide'); // dismiss the dialog

            var username = $("#username" + del).text();

            // set request parameters
            var parameters = {
                username: username
            };

            parameters = JSON.stringify(parameters);

            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.2/UserServlet?type=inactiveUser",
                contentType: "application/json",
                dataType: "json",
                data: parameters
            });


            $("#trans_table").html("");
            showSuccessModal("Successfully deactivated user!");

            refresh();
        });

    });
    //end of deactivate user

    //start of view user sale
    $("table").on('click', '#ViewUserSale', function () {
        var view = $(this).attr("name");
        var username = $("#username" + view).text();
        var data = {
            username: username,
            type: "adminRetrieveSales"
        }
        $.ajax({
            type: "POST",
            url: "/Savvy0.2/SalesServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                var strings = data.split(",");
                var htmlcode = "";
                if (data) {
                    htmlcode += "<tr>";
                    htmlcode += "<th hidden>Username<\/th>";
                    htmlcode += "<th>Prospect Name<\/th>";
                    htmlcode += "<th>Date Closed<\/th>";
                    htmlcode += "<th>Case Type<\/th>";
                    htmlcode += "<th>Expected FYC<\/th>";
                    htmlcode += "<th>Remarks<\/th>";
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
                        htmlcode += "<\/tr>";
                        count++;
                    }

                    htmlcode += "<\/select>";
                    $("#view_sales_table").html(htmlcode);

                } else {

                }

                $("#view_sales_table").html(htmlcode);
            },
            error: function (xhr, status, error) {
                alert(error);
            }

        });
        viewUserSaleModal();
    });
    //end of view user sale

});

function showSuccessModal(successMessage) {
    document.getElementById("successMsg").innerHTML = successMessage;
    $('#successModal').modal('show');

    setTimeout(function () {
        $("#user_create").click(); //Delay the refresh to show the success message before refreshing
    }, 2500);

}

function leaveChange() {
    if (document.getElementById("usertype").value != "") {
        document.getElementById("createButton").disabled = false;
    }
}

function showErrorModal(errorMessage) {
    document.getElementById("errorMsg").innerHTML = errorMessage;
    $('#errorModal').modal('show');
}

function refresh() {
    $.get("/Savvy0.2/UserServlet?type=retrieveUser", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th>First Name<\/th>";
            htmlcode += "<th>Last Name<\/th>";
            htmlcode += "<th>Username<\/th>";
            htmlcode += "<th hidden>User Type<\/th>";
            htmlcode += "<th hidden>Manager<\/th>";
            htmlcode += "<th>Active<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;
            for (var i = 0; i < strings.length; i += 6) {
                htmlcode += "<tr class='record' id='" + count + "'>";
                htmlcode += "<td class='firstname' id='firstname" + count + "'>" + strings[i] + "<\/td>";
                htmlcode += "<td class='lastname' id='lastname" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode += "<td class='username' id='username" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode += "<td hidden id='usertype" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode += "<td hidden id='manager" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode += "<td id='active" + count + "'>" + strings[i + 5] + "<\/td>";
                htmlcode += "<td><button id='ViewUserSale' type='button' class='btn btn-xs btn-success' name='" + count + "'><span class='glyphicon glyphicon-ok' aria-hidden='true'><\/span> View Sales<\/button> <button id='EditUser' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button> <button id='DeactivateUser' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-lock' aria-hidden='true'><\/span> Deactivate<\/button><\/td>";

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
function viewUserSaleModal() {
    $('#viewUserSaleModal').modal('show');
}

function search() {
    var counter = 0;
    var questionNameSearch = $('#usernameSearch').val().trim().toLowerCase();
    $.each($(".record"), function (i) {
        var question_name = $(this).children(".username").text().toLowerCase();
        var first_name = $(this).children(".firstname").text().toLowerCase();
        var last_name = $(this).children(".lastname").text().toLowerCase();
        if (question_name.indexOf(questionNameSearch) != -1 || first_name.indexOf(questionNameSearch) != -1 || last_name.indexOf(questionNameSearch) != -1) {
            $(this).show();
            counter++;
        } else {
            $(this).hide();
        }
    });
    //$("#recordsLength").text(counter);
}

