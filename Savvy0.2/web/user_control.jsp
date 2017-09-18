<%@page import="classes.User"%><%
    User loginUser = (User) session.getAttribute("loginUser");
    String usertype = loginUser.checkAdmin();

%>
<!DOCTYPE html>
<html>
    <head>
        <title></title>
    </head>
    <body>
        <h1 class="page-header" style="color:black">User Control</h1>
        <%   if (usertype.equals("Manager")) {
          // a.   Admin only add managers and financial advisers     
                // b.   Manager add financial advisers and see their stuff
                // c.   Financial advisers add prospects and goals
        %> <button class="btn btn-primary" id="AddNewUser" style="display: initial" type="button"><span aria-hidden="true" class="glyphicon glyphicon-user"></span> &nbsp;Add New User</button> <%
            }
        %><br>
        <br>
        <div class="row">
            <div class="col-md-12">
                <form id="formtwo" class="form-horizontal well" style="padding-bottom: 0px;">
                    <div class="form-group">
                        <label class="col-sm-2 control-label" for="username">User Search</label>
                        <div class="col-sm-7">
                            <input id="usernameSearch" onKeyUp="search()" type="text" class="form-control" name="action" data-provide="typeahead"/>
                        </div>
                        <div class="col-sm-3">
                            <!--
                          <button id="searchUsername" type="button" onclick="search()" class="btn btn-primary">Search</button>
                            -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <br />
        <table class="table table-striped col-md-12 well" id="trans_table_main">
            <tbody id="trans_table"></tbody>
        </table>
        <!--Add User-->
        <div aria-hidden="true" class="modal fade" id="AddNewUserModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button aria-hidden="true" class="close" data-dismiss="modal" type="button">X</button>
                        <h4 id="myModalLabel">Create New User</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal well" id="newUser" name="newUser" style="padding-bottom: 0px;">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Username&nbsp;<font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="usernameNew" name="usernameNew" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Password&nbsp;<font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="passwordNew" name="passwordNew" type="password">
                                </div>
                            </div>
                            <div class="form-group" id="confirm">
                                <label class="col-sm-3 control-label">Confirm&nbsp;Password&nbsp;<font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="confirmPassword" name="confirmPassword" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">First Name <font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="firstName" name="firstName" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">Last Name <font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="lastName" name="lastName" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-3 control-label">User Type<font color="red">*</font></label>
                                <div class="col-sm-7">
                                    <select class="form-control" id="usertype" name="userType" onchange="leaveChange()">
                                        <option value="Financial Adviser">
                                            Financial Adviser
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-9 control-label"></label>
                                <div class="col-sm-3">
                                    <button class="btn btn-primary" disabled id="createButton" type="button">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <hr style="margin-top: 0px; margin-bottom: 20px;">
            </div>
        </div>
        <!-- success modal
          ======================================== -->
        <div aria-hidden="true" class="modal fade" id="successModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success">
                        <h2>Success</h2>
                    </div>
                    <div class="modal-body">
                        <p id="successMsg"></p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="CloseError" type="button">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- error modal
          ======================================== -->
        <div aria-hidden="true" class="modal fade" id="errorModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger">
                        <h2>Error</h2>
                    </div>
                    <div class="modal-body">
                        <p id="errorMsg"></p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-dismiss="modal" id="CloseError" type="button">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div aria-hidden="true" class="modal fade" id="myModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!-- dialog body -->
                    <div class="modal-body">
                        <button class="close" data-dismiss="modal" type="button">&times;</button>
                        <h4 class="modal-title" id="myModalLabel">Confirm Delete</h4>
                    </div>
                    <div class="modal-body">
                        <p>You are about to delete a user, this procedure is irreversible.</p>
                        <p>Do you want to proceed?</p>
                    </div>
                    <!-- dialog buttons -->
                    <div class="modal-footer">
                        <button class="btn btn-default" data-dismiss="modal" type="button">Cancel</button> <button class="btn btn-danger" id="cfmDelete" type="button"><span aria-hidden="true" class="glyphicon glyphicon-remove"></span> Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <!--update User-->
        <div aria-hidden="true" class="modal fade" id="showUpdateUserModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button aria-hidden="true" class="close" data-dismiss="modal" type="button">X</button>
                        <h4 id="myModalLabel">Update User</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal well" id="registerUserForm" name="registerUserForm" style="padding-bottom: 0px;">
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Username</label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="username_update" name="bic" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">First Name</label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="firstName_update" name="bic" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Last Name</label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="lastName_update" name="bic" type="text">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">User Type</label>
                                <div class="col-sm-7">
                                    <select class="form-control" id="usertype_update">
                                        <option value="Financial Adviser">
                                            Financial Adviser
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Password (Optional)</label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="password_update" name="bic" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label">Confirm Password (Optional)</label>
                                <div class="col-sm-7">
                                    <input class="form-control" id="cfmpassword_update" name="bic" type="password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-4 control-label"></label>
                                <div class="col-sm-7">
                                    <button class="btn btn-primary" id="UpdateUser" style="display: initial" type="button">Update User</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- view user sales modal
      ======================================== -->
        <div aria-hidden="true" class="modal fade" id="viewUserSaleModal" role="dialog" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">User's Sales</h4>
                    </div>
                    <div class="modal-body">
                        <table class="table table-striped col-md-12 well" id="trans_table_view">
                            <tbody id="view_sales_table"></tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" data-dismiss="modal" id="CloseError" type="button">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- javascript libraries
          ======================================== -->
        <script src="assets/js/jquery.min.js"></script> 
        <script src="assets/js/jquery-ui.min.js"></script> 
        <script src="assets/js/jquery-1.11.1.min.js" type="text/javascript"></script> 
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/user_control.js"></script>
    </body>
</html>