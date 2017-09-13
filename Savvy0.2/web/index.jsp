<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>Welcome to Savvy</title>

        <!-- CSS -->
        <link rel="shortcut icon" href="assets/img/savvy icon.ico" type="image/x-icon">
        <link rel="icon" href="assets/img/savvy icon.ico" type="image/x-icon">
        <link rel="stylesheet" href="assets/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/css/font-awesome.css">
        <link rel="stylesheet" href="assets/css/style.css">

    </head>

    <body>

        <!-- Login Header -->
        <div class="page-title" style="padding: 20px">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <img style="width:150px; margin-left:30px" src="assets/img/savvylogo.png">
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-us container">
            <div class="row">
                <h2 class="form-signin-heading">Welcome to Savvy</h2>
            </div> 
            <div class="row" style="position:relative; top:50px; left:420px">
                <div class="col-sm-6">
                    <a><img src="assets/img/Login.png" onclick="javascript:login_image()" width="389" height="328" /></a>
                </div>
            </div>
        </div><!-- /container -->

        <!--Login-->
        <div class="modal fade" id="showAddUserModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 id="myModalLabel">Login</h4>
                    </div>
                    <div class="modal-body">                  
                        <form id="loginForm" class="form-horizontal well" style="padding-bottom: 0px;">
                            <input id="type" type="hidden" class="form-control" name="type" value="login"/>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Username</label>
                                <div class="col-sm-7">
                                    <input id="username" type="text" class="form-control" name="username"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Password</label>
                                <div class="col-sm-7">
                                    <input id="password" type="password" class="form-control" name="password"/>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"> </label>
                                <div class="col-sm-7">
                                    <button id="login_button" type="button" class="btn btn-primary" style="display: initial">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <script src="../../assets/js/ie10-viewport-bug-workaround.js"></script>
        <script type="text/javascript" src="assets/js/jquery-1.11.1.min.js"></script>
        <script src="assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="assets/js/jquery-ui.min.js"></script>

        <script>
                        $(document).ready(function() {
                            $("#showAddUserModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
                                $("#showAddUserModal a.btn").off("click");
                            });

                            $("#showAddUserModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
                                $("#showAddUserModal").remove();
                            });

                            $("#login_button").click(function(event) {
                                var username = document.getElementById("username").value;
                                var password = document.getElementById("password").value;

                                if (username.trim() === "" || password.trim() === "") {
                                    showErrorModal("Please fill in both username and password to login.");
                                } else {
                                    // send json to servlet
                                    $.ajax({
                                        url: 'UserServlet',
                                        type: 'POST',
                                        dataType: 'json',
                                        data: $('#loginForm').serialize(),
                                        success: function(data) {
                                            if (data.success) {
                                                $("#showAddUserModal").modal('hide');
                                                window.location.replace("home.jsp");
                                            } else {
                                                showErrorModal("Username and password does not match.");
                                                return;
                                            }
                                        },
                                        error: function(xhr, status, error) {
                                            alert(xhr.error);
                                        }
                                    });
                                }
                            });
                        });

                        function login_image() {
                            $('#showAddUserModal').modal('show');
                        }

                        function showErrorModal(errorMessage) {
                            document.getElementById("errorMsg").innerHTML = errorMessage;
                            $('#errorModal').modal('show');
                        }
        </script>

    </body>
</html>
