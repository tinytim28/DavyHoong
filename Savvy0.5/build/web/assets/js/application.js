var usertype = "";
$.ajax({
    url: "/Savvy0.5/UserServlet?type=checkUserType",
    success: function (data) {
        usertype = data;
        htmlcode = "";
        htmlcode1 = "";
        htmlcode2 = "";
        htmlcode3 = "";
        htmlcode4 = "";
        htmlcode5 = "";
        htmlcode6 = "";
        var button = "";
        if (usertype === "Admin") {
            htmlcode1 += "<a href='#' title='Users'><i class='glyph-icon icon-group'><\/i><span>Managers<\/span><\/a><div class='sidebar-submenu'><ul><li> <a name = 'adminusercontrol' class = 'loadPage'> User Control <\/a><\/li><\/ul><\/div>";
            button += "<button type='button' class='btn btn-primary btn-xs navbar-btn' id='logout'>Logout<\/button>";
            $("#pageContent").load("adminusercontrol.html");
        } else if (usertype === "Manager") {
            htmlcode1 += "<a href='#' title='Financial Agents'><i class='glyph-icon icon-group'><\/i>Financial Agents<\/a><div class='sidebar-submenu'><ul><li> <a id = 'managerusercontrol' class = 'loadPage'> Agent Control <\/a><\/li><\/ul><\/div>";
            htmlcode2 += "<a href='#' title='Sales'><i class='glyph-icon icon-money'><\/i>Sales<\/a><div class='sidebar-submenu'><ul><li> <a id = 'managerviewsales' class = 'loadPage'> View Sales <\/a><\/li><\/ul><\/div>";
            htmlcode3 += "<a href='#' title='Goals'><i class='glyph-icon icon-fire'><\/i>Goals<\/a><div class='sidebar-submenu'><ul><li> <a id = 'managergoals' class = 'loadPage'> Goals <\/a><\/li><\/ul><\/div>";
            htmlcode4 += "<a href='#' title='Performance'><i class='glyph-icon icon-key'><\/i>Performance<\/a><div class='sidebar-submenu'><ul><li> <a id = 'managerperformance' class = 'loadPage'> Performance  <\/a><\/li><li> <a id='managerforecast' class = 'loadPage'> Forecast<\/a><\/li><\/ul><\/div>";
            htmlcode5 += "<a href='#' title='Tools'><i class='glyph-icon icon-wrench'><\/i>Tools<\/a><div class='sidebar-submenu'><ul><li> <a id = 'managertools' class = 'loadPage'> Retirement Overview <\/a><\/li><\/ul><\/div>";
            button += "<button type='button' class='btn btn-primary btn-xs navbar-btn' id='logout'>Logout<\/button>";
            $("#pageContent").load("managerusercontrol.html");
        } else if (usertype === "Financial Adviser") {
            htmlcode1 += "<a href='#' title='Clients'><i class='glyph-icon icon-group'><\/i>Clients<\/a><div class='sidebar-submenu'><ul><li> <a id = 'agentprospects' class = 'loadPage'> Prospects  <\/a><\/li><\/ul><\/div>";
            htmlcode2 += "<a href='#' title='Sales'><i class='glyph-icon icon-money'><\/i>Sales<\/a><div class='sidebar-submenu'><ul><li> <a id = 'agentprogresssales' class = 'loadPage'> Sales in Progress <\/a><\/li><li> <a id='agentclosedsales' class = 'loadPage'> Closed Sales<\/a><\/li><\/ul><\/div>";
            htmlcode3 += "<a href='#' title='Goals'><i class='glyph-icon icon-fire'><\/i>Goals<\/a><div class='sidebar-submenu'><ul><li> <a id = 'agentgoals' class = 'loadPage'> Goals <\/a><\/li><\/ul><\/div>";
            htmlcode4 += "<a href='#' title='Tools'><i class='glyph-icon icon-wrench'><\/i>Tools<\/a><div class='sidebar-submenu'><ul><li> <a id = 'agenttools' class = 'loadPage'> Retirement <\/a><\/li><\/ul><\/div>";

            $("#pageContent").load("agentprospects.html");
            button += "<button type='button' class='btn btn-primary btn-xs navbar-btn' id='logout'>Logout<\/button>";

        } else {
            location.replace("index.html");
        }
        $("#loginbutton").html(button);
        $("#sidebarlink1").html(htmlcode1);
        $("#sidebarlink2").html(htmlcode2);
        $("#sidebarlink3").html(htmlcode3);
        $("#sidebarlink4").html(htmlcode4);
        $("#sidebarlink5").html(htmlcode5);
        
    }

});
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
    $("body").on("click", "#logout", function () {
        location.assign('logout.jsp');
    });

    function showErrorModal(errorMessage) {
        document.getElementById("errorMsg").innerHTML = errorMessage;
        $('#errorModal').modal('show');
    }

});






