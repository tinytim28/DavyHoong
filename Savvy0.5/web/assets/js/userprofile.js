$.ajax({
    type: "POST",
    url: "/Savvy0.5/UserServlet?type=retrieve",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
        console.log(data);
        $("#username_update").val(data.firstName);
        $("#firstName_update").val(data.lastName);
        $("#lastName_update").val(data.username);
        $("#usertype_update").val(data.usertype);
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
        url: "/Savvy0.5/UserServlet",
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