<%
    session.removeAttribute("loginUser");
    response.sendRedirect("index.html");
    %>    