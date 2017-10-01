<%-- 
    Document   : testing
    Created on : Oct 1, 2017, 6:49:12 PM
    Author     : Timothy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <form method="Post" action="testing">
            <input type="submit" value="Test method">
        </form>
        <%
            if ( request.getAttribute("test") != null ) {
                String test =  (String) request.getAttribute("test");
                
                
                out.println(test);
            } else {
                out.println("nothing");
            }
        %>
    </body>
</html>
