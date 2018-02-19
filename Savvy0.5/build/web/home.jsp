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

        <link href="assets/elements/tile-box.css" rel="stylesheet" type="text/css"/>
        <link href="assets/elements/content-box.css" rel="stylesheet" type="text/css"/>
        <link href="assets/widgets/charts/piegage/piegage.css" rel="stylesheet" type="text/css"/>
        <!-- Bootstrap core CSS -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <link href="assets/css/datepicker.css" rel="stylesheet">
        <link href="assets/css/jquery-ui.css" rel="stylesheet">


        <!-- HELPERS -->

        <link rel="stylesheet" type="text/css" href="assets/helpers/animate.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/backgrounds.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/boilerplate.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/border-radius.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/grid.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/page-transitions.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/spacing.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/typography.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/utils.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/colors.css">



        <!-- Admin theme -->

        <link rel="stylesheet" type="text/css" href="assets/themes/admin/layout.css">
        <link rel="stylesheet" type="text/css" href="assets/themes/admin/color-schemes/default.css">

        <!-- Components theme -->

        <link rel="stylesheet" type="text/css" href="assets/themes/components/default.css">
        <link rel="stylesheet" type="text/css" href="assets/themes/components/border-radius.css">

        <!-- Admin responsive -->

        <link rel="stylesheet" type="text/css" href="assets/helpers/responsive-elements.css">
        <link rel="stylesheet" type="text/css" href="assets/helpers/admin-responsive.css">


    </head>
    <body>
        <div id="sb-site">
            <div id="page-wrapper">
                <div id="page-header" class="bg-gradient-9">
                    <div id="mobile-navigation">
                        <button id="nav-toggle" class="collapsed" data-toggle="collapse" data-target="#page-sidebar"><span></span></button>
                        <a href="home.jsp" class="logo-content-small" title="Savvy0.5"></a>
                    </div>
                    <div id="header-logo" class="logo-bg">
                        <a href="home.jsp" class="logo-content-big" title="Proto">
                            Savvy <i>0.5</i>
                            <span>The perfect solution for financial team management</span>
                        </a>
                        <a href="home.jsp" class="logo-content-small" title="Proto">
                            Savvy <i>0.5</i>
                            <span>The perfect solution for financial team management</span>
                        </a>
                        <a id="close-sidebar" href="#" title="Close sidebar">
                            <i class="glyph-icon icon-angle-left"></i>
                        </a>
                    </div>
                    <div id="header-nav-left">
                    </div>
                    <div id="header-nav-right">
                        <a class="header-btn" id="logout-btn" href="logout.jsp" title="Logout">
                            <i class="glyph-icon icon-lock"></i>
                        </a>

                    </div>
                </div>

                <div id="page-sidebar">
                    <div class="scroll-sidebar">
                        <ul id="sidebar-menu">
                            <li class="header">
                                <span>Components</span>
                            </li>
                            <li id="sidebarlink1">
                            </li>
                            <li id="sidebarlink2">
                            </li>
                            <li id="sidebarlink3">                          
                            </li>
                            <li id="sidebarlink4">
                            </li>
                        </ul>    
                    </div>


                </div>


                <div id="page-content-wrapper">
                    <div id="page-content">

                        <div class="container">
                            <div class="col-lg-12">
                                <div id="pageContent">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Login-->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    <button id="loginButton" type="button" class="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- error modal
            ======================================== -->
        <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h2>Error</h2>
                    </div>
                    <div class="modal-body">
                        <p id = "errorMsg">
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button id="CloseError" type="button" class="btn btn-danger"  data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/jquery.js"></script>
        <script src="assets/js/application.js"></script>
        <script src="assets/js/jquery-ui.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/themes/admin/layout.js" type="text/javascript"></script>
        <script src="assets/widgets/superclick/superclick.js" type="text/javascript"></script>

    </div></body>


</html>