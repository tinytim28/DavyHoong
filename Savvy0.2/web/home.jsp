<%@page import="java.util.*"%>
<%@page import="classes.*"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Savvy Administrator</title>
        <link rel="shortcut icon" href="assets/img/savvy icon.ico" type="image/x-icon">
        <link rel="icon" href="assets/img/savvy icon.ico" type="image/x-icon">
        <!-- Bootstrap core CSS -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/css/datepicker.css" rel="stylesheet">
        <!-- Custom styles for this template -->
        <link href="assets/css/dashboard.css" rel="stylesheet">
        <link href="assets/css/style.css" rel="stylesheet">
        <script src="assets/js/jquery.js"></script>
        <script type="text/javascript" src="assets/js/script.js"></script>      
        <script>

            $(function () {
                $("#loadingGIF").show();
                //loadReferenceData(function() {   // ensure reference data loaded before UI
                $("#loadingGIF").hide();
                $("#header").load("header.jsp");
                $("#sidebar").load("sidebar.jsp");
            <%
                try {
                    User loginUser = (User) session.getAttribute("loginUser");
                    String usertype = loginUser.checkAdmin();
                    if (usertype.equals("Admin")) {
            %>
                $("#pageContent").load("admin_control.jsp");
            <%
            } else if (usertype.equals("Manager")) {
            %>

                $("#pageContent").load("user_control.html");
            <%
            } else {

            %>
                $("#pageContent").load("addprospects.html");
            <%}

                } catch (NullPointerException e) {

                }
            %>
                    

                //});
            });
        </script>
    </head>
    <body>
        <div id="header"></div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar" id="sidebar">
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <div id="pageContent">
                    </div>
                </div>
            </div>
        </div>
        <div class="row" id="loadingGIF">
            <div class="col">
                <img src="assets/img/loading.gif" alt="" class="img-responsive center-block"/>
            </div>
        </div>
        <!-- javascript libraries ======================================== -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/jquery.js"></script>
        <link rel="stylesheet" href="assets/css/jquery-ui.css">
        <script src="assets/js/jquery-ui.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>>
    </body>
</html>