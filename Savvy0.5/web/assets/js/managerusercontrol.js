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
                            if (row.Active == "Active") {
                                return "<button id='MakeManager' type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-arrow-up' aria-hidden='true'><\/span> Make Manager<\/button>  <button id='DeactivateUser' type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Deactivate<\/button><\/td>";
                            } else {
                                return "<button id='MakeManager' disabled type='button' class='btn btn-xs btn-primary' name=' " + JSON.stringify(row) + "  '><span class='glyphicon glyphicon-arrow-up' aria-hidden='true'><\/span> Make Manager<\/button>  <button id='DeactivateUser' disabled type='button' class='btn btn-xs btn-danger' name='" + JSON.stringify(row) + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Deactivate<\/button><\/td>";
                            }
                        }
                    }

                ]
            });

        }
    });
}


$(document).ready(function () {
    $('#showMakeManagerModal').on('hidden.bs.modal', function (e) {
        $(this)
                .find("input,textarea,select")
                .val('')
                .end()
                .find("input[type=checkbox], input[type=radio]")
                .prop("checked", "")
                .end();
        document.getElementById("option1").disabled = false;
        document.getElementById("option2").disabled = false;
        document.getElementById("option3").disabled = false;
    })

    fetch();
    $("#showMakeManagerModal").on("hide", function () { // remove the event listeners when the dialog is dismissed
        $("#showMakeManagerModal a.btn").off("click");
    });

    $("#showMakeManagerModal").on("hidden", function () { // remove the actual elements from the DOM when fully hidden
        $("#showMakeManagerModal").remove();
    });


    $("table").on('click', '#MakeManager', function () {
        showMakeManagerModal();
        var makeManager = $(this).attr("name");
        var newManager = JSON.parse(makeManager);
        var userid = newManager.userid;
        var username = newManager.username;
        $("#newManager").html("");
        $("#newManager").append("<option value='" + userid + "'>" + username + "</option>");
        var option1 = "";
        var option2 = "";
        var option3 = "";
        $.ajax({
            url: '/Savvy0.5/UserServlet?type=retrieveUser',
            dataType: 'json',
            success: function (data) {
                $("#option1").html("<option value=''>" + "Please Choose One" + "</option>");
                $("#option2").html("<option value=''>" + "Please Choose One" + "</option>");
                $("#option3").html("<option value=''>" + "Please Choose One" + "</option>");
                var i;
                for (i in data) {
                    if (data[i].userid != newManager.userid && data[i].Active != "Inactive") {
                        $("#option1").append("<option value='" + data[i].userid + "'>" + data[i].username + "</option>");
                    }
                }

            }
        });
        $("#option1").change(function () {
            option1 = $(this.value);
            document.getElementById("option1").disabled = true;
            $.ajax({
                url: '/Savvy0.5/UserServlet?type=retrieveUser',
                dataType: 'json',
                success: function (data) {
                    $("#option2").html("<option value=''>" + "Please Choose One" + "</option>");
                    var i;
                    for (i in data) {
                        if (data[i].userid != option1.selector && data[i].userid != newManager.userid && data[i].Active != "Inactive") {
                            $("#option2").append("<option value='" + data[i].userid + "'>" + data[i].username + "</option>");
                        }
                    }

                }
            });
        });
        $("#option2").change(function () {
            option2 = $(this.value);
            document.getElementById("option2").disabled = true;
            $.ajax({
                url: '/Savvy0.5/UserServlet?type=retrieveUser',
                dataType: 'json',
                success: function (data) {
                    $("#option3").html("<option value=''>" + "Please Choose One" + "</option>");
                    var i;
                    for (i in data) {
                        if (data[i].userid != option1.selector && data[i].userid != option2.selector && data[i].userid != newManager.userid && data[i].Active != "Inactive") {
                            $("#option3").append("<option value='" + data[i].userid + "'>" + data[i].username + "</option>");
                        }
                    }

                }
            });
        });
        $("#option3").change(function () {
            option3 = $(this.value);
            document.getElementById("option3").disabled = true;
        });

    });

    $("#MakeManager").click(function () {
        var newManager = parseInt(document.getElementById("newManager").value);
        var option1 = parseInt(document.getElementById("option1").value);
        var option2 = parseInt(document.getElementById("option2").value);
        var option3 = parseInt(document.getElementById("option3").value);

        if (!option1 || !option2 || !option3) {
            $("#showMakeManagerModal").modal('hide');
            showErrorModal("Please input all fields before submitting!");
        } else {

            // disable search button and clear table
            $("#showMakeManagerModal").modal('hide');

            var data = {
                newManager: newManager,
                user1: option1,
                user2: option2,
                user3: option3
            };
            
            var parameters = JSON.stringify(data);
            alert(parameters);
            // send json to servlet
            $.ajax({
                type: "POST",
                url: "/Savvy0.5/UserServlet?type=makeNewManagerWithTeam",
                contentType: "application/json",
                datatype: "json",
                data: parameters,

                success: function (data) {
                    if (data.success) {
                        showSuccessModal("Successfully promoted!");
                        table.destroy();
                        fetch();
                        
                    } else {
                        showErrorModal("Creation Failed.");
                    }


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
    var userid = user.userid;
    $("#myModal").modal({// wire up the actual modal functionality and show the dialog
        "backdrop": "static",
        "keyboard": true,
        "show": true // ensure the modal is shown immediately
    });
    $("#myModal #cfmDelete").on("click", function (e) {
        $("#myModal").modal('hide'); // dismiss the dialog


        // set request parameters
        var parameters = {
            userid: userid
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



function showMakeManagerModal() {
    $('#showMakeManagerModal').modal('show');
}
function viewUserSaleModal() {
    $('#viewUserSaleModal').modal('show');
}



