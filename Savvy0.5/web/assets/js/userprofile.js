$.ajax({
    type: "POST",
    url: "/Savvy0.5/UserServlet?type=retrieve",
    contentType: "application/json",
    dataType: "json",
    success: function (data) {
        console.log(data);
        $("#username_update").val(data.username);
        $("#firstName_update").val(data.firstName);
        $("#lastName_update").val(data.lastName);
        $("#usertype_update").val(data.usertype);
    }
});
$("#UpdateUser").click(function () {
    var username = document.getElementById("username_update").value;
    var firstname = document.getElementById("firstName_update").value;
    var lastname = document.getElementById("lastName_update").value;
    var usertype = document.getElementById("usertype_update").value;
    var password = document.getElementById("password_update").value;
    var cfmPassword = document.getElementById("cfmpassword_update").value;

    if (password !== cfmPassword) {
        showErrorAlert("Password don't match!");
    } else {


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

                showSuccessAlert("Successfully updated user!");


            },
            error: function (xhr, status, error) {
                showErrorAlert("error");
            }
        });

    }

});

function showSuccessAlert(successMessage) {
    $('<div class="alert alert-success" id="successAlertWindow"><button type="button" class="close" data-hide="alert">&times;</button>' + successMessage + '</div>').hide().appendTo('#successAlert').fadeIn(1000);
    $("#successAlertWindow").slideUp(10000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $("#successAlertWindow").remove();
        });
    });
    setTimeout(function () {   //calls click event after a certain time
        $("#successAlertWindow").remove();
    }, 10000);
    

}

function showErrorAlert(errorMessage) {
    $('<div class="alert alert-danger" id="errorAlertWindow"><button type="button" class="close" data-hide="alert">&times;</button>' + errorMessage + '</div>').hide().appendTo('#errorAlert').fadeIn(1000);
    $("#errorAlertWindow").slideUp(10000);
    $(function () {
        $("[data-hide]").on("click", function () {
            $("#errorAlertWindow").remove();
        });
    });
    setTimeout(function () {   //calls click event after a certain time
        $("#errorAlertWindow").remove();
    }, 10000);
}
   