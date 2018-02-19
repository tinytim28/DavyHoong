var table;

function fetch() {
    $.ajax({
        url: '/Savvy0.5/UserServlet?type=retrieveUser',
        dataType: 'json',
        success: function (data) {

            table = $('#trans_table').DataTable({
                data: data,
                "columnDefs": [
                    {
                        "targets": 0,
                        data: 'firstname'
                    },
                    {
                        "targets": 1,
                        data: 'lastname'
                    },
                    {
                        "targets": 2,
                        data: 'username'
                    },
                    {
                        "targets": 3,
                        data: 'Active'
                    },
                    {
                        "targets": 4,
                        data: 'ID',
                        render: function (data, type, row) {
                            return "<button id='EditUser' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button>  <button id='DeactivateUser' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Deactivate<\/button><\/td>";
                        }
                    }

                ]
            });

        }
    });
}
$(document).ready(function () {
//start of update user
    fetch();
    $("#showUpdateUserModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showUpdateUserModal a.btn").off("click");
    });

    $("#showUpdateUserModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showUpdateUserModal").remove();
    });


    $("table").on('click', '#EditUser', function () {
        showUpdateUserModal();
        var edit = $(this).attr("name");
        var user = JSON.parse(edit);
        var username = user.username;
        var firstname = user.firstname;
        var lastname = user.lastname;
        $("#username_update").val(username);
        $("#firstName_update").val(firstname);
        $("#lastName_update").val(lastname);
    });

    $("#UpdateUser").click(function () {
        var username = document.getElementById("username_update").value;
        var firstname = document.getElementById("firstName_update").value;
        var lastname = document.getElementById("lastName_update").value;
        var password = document.getElementById("password_update").value;
        var cfmPassword = document.getElementById("cfmpassword_update").value;


        if (password !== cfmPassword) {
            $("#showUpdateUserModal").modal('hide');
            showErrorModal("Password don't match!");
        } else {

            // disable search button and clear table
            $("#showUpdateUserModal").modal('hide');

            var data = {
                username: username,
                firstName: firstname,
                lastName: lastname,
                password: password,
                type: "updateUser"
            };
            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/UserServlet",
                datatype: 'json',
                data: data,
                success: function (data) {

                    showSuccessModal("Successfully updated user!");
                    table.destroy();
                    fetch();

                },
                error: function (xhr, status, error) {
                    alert(error);
                }
            });
        }


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

        var err = "";

        if (passwordNew !== confirmPassword) {
            err = "Please enter the same passowrd!";
        } else if (usernameNew.trim() === "" || passwordNew.trim() === "" || firstName.trim() === "" || lastName.trim() === "") {
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
                type: "create"
            };

            $.ajax({
                url: '/Savvy0.5/UserServlet',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.success) {
                        document.getElementById("newUser").reset();
                        showSuccessModal("New user has been created successfully.");
                        $("#AddNewUserModal").modal("hide");
                        table.destroy();
                        fetch();
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
    // by default

    //start of deactivate user

    //end of deactivate user
});

$("table").on('click', '#DeactivateUser', function () {
    var del = $(this).attr("name");
    var user = JSON.parse(del);
    var username = user.username;
    $("#myModal").modal({// wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": true // ensure the modal is shown immediately
    });
    $("#myModal #cfmDelete").on("click", function (e) {
        $("#myModal").modal('hide'); // dismiss the dialog


        // set request parameters
        var parameters = {
            username: username
        };

        parameters = JSON.stringify(parameters);

        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.5/UserServlet?type=inactiveUser",
            contentType: "application/json",
            dataType: "json",
            data: parameters
        });


        table.destroy();
        fetch();
        showSuccessModal("Successfully deactivated user!");


    });

});

function showSuccessModal(successMessage) {
    document.getElementById("successMsg").innerHTML = successMessage;
    $('#successModal').modal('show');


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



function showUpdateUserModal() {
    $('#showUpdateUserModal').modal('show');
}
function viewUserSaleModal() {
    $('#viewUserSaleModal').modal('show');
}



