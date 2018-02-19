
$(document).ready(function () {

    $('#loginForm').submit(function (e) {
        e.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        if (username.trim() === "" || password.trim() === "") {
            showErrorModal("Please fill in both username and password to login.");
        } else {
            var data = {
                username: username,
                password: password,
                type: "login"
            };
            // send json to servlet
            $.ajax({
                url: '/Savvy0.5/UserServlet',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.success) {
                        window.location.replace("home.jsp");
                    } else {
                        showErrorModal("Username and password does not match.");
                        return;
                    }
                },
                error: function (xhr, status, error) {
                    alert(error);
                    console.log(e);
                }
            });
        }
    });

    $('#errorModal').keydown(function (e) {
        var key = e.which;
        if (key == 13) {
            $('#errorModal').modal('hide');
        }
    });

});

function showErrorModal(errorMessage) {
    document.getElementById("errorMsg").innerHTML = errorMessage;
    $('#errorModal').modal('show');
}



