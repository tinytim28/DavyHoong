<%@page import="classes.User"%>
<div class="panel-group" id="accordion" role="tablist">
    <%
        String usertype = "";
        try {
            User loginUser = (User) session.getAttribute("loginUser");
            usertype = loginUser.checkAdmin();

            if (usertype.equals("Admin")) {
    %>
    <div class="panel panel-primary" style="margin-bottom:5px">
        <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Admin Side Panel
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
                <ul class="nav">
                    <li><a id="admin_control.jsp" class="loadPage">Admin Control</a></li>                      
                </ul>  
            </div>
        </div>
    </div>

    <%
    } else if (usertype.equals("Manager")) {
    %>
    <div class="panel panel-primary" style="margin-bottom:5px">
        <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Task Management
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
                <ul class="nav">
                    <li><a id="user_control" class="loadPage">User Control</a></li>              
                    <li><a id="forecast" class="loadPage">Forecast</a></li>  
                    <li><a id="performance" class="loadPage">Performance</a></li>    
                </ul>  
            </div>
        </div>
    </div>
    <%
    } else {
    %>
    <div class="panel panel-primary" style="margin-bottom:5px">
        <div class="panel-heading" role="tab" id="headingOne">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Task Management
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">
                <ul class="nav">
                    <li><a id="addprospects" class="loadPage">Prospects</a></li>
                    <li><a id="view_sales_in_progress" class="loadPage">Sales</a></li>
                    <li><a id="graph" class="loadPage">Graph</a></li>
                </ul>  
            </div>
        </div>
    </div>
    <%
            }
        } catch (NullPointerException e) {
        }

        out.println("<input type='hidden' id='userType' value='" + usertype + "' />");

    %>


</div>
<script>

    $(document).ready(function () {
        // collapse/expand menu properly
        $(".panel-heading").find("a").click(function () {
            $(".panel-collapse").removeClass("in");
        });

        $("body").on("click", ".loadPage", function () {
            var pageTitle = this.id.trim();

            var pageToLoad = null;
            if (pageTitle == "admin_control") {
                pageToLoad = pageTitle + ".jsp";
            } else {
                pageToLoad = pageTitle + ".html";
            }
            $("#pageContent").load(pageToLoad);

        });


        function showErrorModal(errorMessage) {
            document.getElementById("errorMsg").innerHTML = errorMessage;
            $('#errorModal').modal('show');
        }


        $("body").on("click", "#loginButton", function () {
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
                    success: function (data) {
                        if (data.success) {
                            location.assign("home.jsp");
                        } else {
                            showErrorModal("Username and password does not match.");
                            return;
                        }
                    },
                    error: function (xhr, status, error) {
                        alert(xhr.error);
                    }
                });
            }
        });


    });
</script>