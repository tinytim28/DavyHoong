package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import java.util.*;
import classes.*;

public final class home_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List<String> _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public java.util.List<String> getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html lang=\"en\">\r\n");
      out.write("    <head>\r\n");
      out.write("        <meta charset=\"utf-8\">\r\n");
      out.write("        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n");
      out.write("        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n");
      out.write("        <meta name=\"description\" content=\"\">\r\n");
      out.write("        <meta name=\"author\" content=\"\">\r\n");
      out.write("        <title>Savvy Administrator</title>\r\n");
      out.write("        <link rel=\"shortcut icon\" href=\"assets/img/savvy icon.ico\" type=\"image/x-icon\">\r\n");
      out.write("        <link rel=\"icon\" href=\"assets/img/savvy icon.ico\" type=\"image/x-icon\">\r\n");
      out.write("\r\n");
      out.write("        <!-- Bootstrap core CSS -->\r\n");
      out.write("        <link href=\"assets/css/bootstrap.min.css\" rel=\"stylesheet\">\r\n");
      out.write("        <link href=\"assets/css/datepicker.css\" rel=\"stylesheet\">\r\n");
      out.write("        <!-- Custom styles for this template -->\r\n");
      out.write("        <link href=\"assets/css/dashboard.css\" rel=\"stylesheet\">\r\n");
      out.write("        <link href=\"assets/css/style.css\" rel=\"stylesheet\">\r\n");
      out.write("        <link href=\"assets/css/jquery-ui.css\" rel=\"stylesheet\">\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("    </head>\r\n");
      out.write("    <body>\r\n");
      out.write("        <div id=\"header\">\r\n");
      out.write("            <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r\n");
      out.write("                <div class=\"container-fluid\" style=\"padding-left: 0px\">\r\n");
      out.write("                    <div class=\"navbar-header\">\r\n");
      out.write("                        <a  href=\"home.jsp\" style=\"color: black; text-decoration: none; font-size: 18px\"><img alt=\"Brand\" src=\"assets/img/savvy small.png\"></a>\r\n");
      out.write("                    </div>\r\n");
      out.write("                    <div id=\"navbar\" class=\"navbar-collapse collapse\">\r\n");
      out.write("                        <ul class=\"nav navbar-nav navbar-right\">                \r\n");
      out.write("                            <li><p class=\"navbar-text\">\r\n");
      out.write("                                    Welcome\r\n");
      out.write("                                </p>\r\n");
      out.write("                            </li>\r\n");
      out.write("                            <li id=\"loginbutton\">\r\n");
      out.write("                            </li>\r\n");
      out.write("                        </ul>\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("            </nav>\r\n");
      out.write("\r\n");
      out.write("            <!--Login-->\r\n");
      out.write("            <div class=\"modal fade\" id=\"loginModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n");
      out.write("                <div class=\"modal-dialog\">\r\n");
      out.write("                    <div class=\"modal-content\">\r\n");
      out.write("\r\n");
      out.write("                        <div class=\"modal-header\">\r\n");
      out.write("                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">×</button>\r\n");
      out.write("                            <h4 id=\"myModalLabel\">Login</h4>\r\n");
      out.write("                        </div>\r\n");
      out.write("                        <div class=\"modal-body\">\r\n");
      out.write("                            <form id=\"loginForm\" class=\"form-horizontal well\" style=\"padding-bottom: 0px;\">\r\n");
      out.write("                                <input id=\"type\" type=\"hidden\" class=\"form-control\" name=\"type\" value=\"login\"/>\r\n");
      out.write("                                <div class=\"form-group\">\r\n");
      out.write("                                    <label class=\"col-sm-4 control-label\">Username</label>\r\n");
      out.write("                                    <div class=\"col-sm-7\">\r\n");
      out.write("                                        <input id=\"username\" type=\"text\" class=\"form-control\" name=\"username\"/>\r\n");
      out.write("                                    </div>\r\n");
      out.write("                                </div>\r\n");
      out.write("                                <div class=\"form-group\">\r\n");
      out.write("                                    <label class=\"col-sm-4 control-label\">Password</label>\r\n");
      out.write("                                    <div class=\"col-sm-7\">\r\n");
      out.write("                                        <input id=\"password\" type=\"password\" class=\"form-control\" name=\"password\"/>\r\n");
      out.write("                                    </div>\r\n");
      out.write("                                </div>\r\n");
      out.write("                                <div class=\"form-group\">\r\n");
      out.write("                                    <label class=\"col-sm-4 control-label\"> </label>\r\n");
      out.write("                                    <div class=\"col-sm-7\">\r\n");
      out.write("                                        <button id=\"loginButton\" type=\"button\" class=\"btn btn-primary\">\r\n");
      out.write("                                            Login\r\n");
      out.write("                                        </button>\r\n");
      out.write("                                    </div>\r\n");
      out.write("                                </div>\r\n");
      out.write("                            </form>\r\n");
      out.write("                        </div>\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("            </div>\r\n");
      out.write("\r\n");
      out.write("            <!-- error modal\r\n");
      out.write("                ======================================== -->\r\n");
      out.write("            <div class=\"modal fade\" id=\"errorModal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n");
      out.write("                <div class=\"modal-dialog\">\r\n");
      out.write("                    <div class=\"modal-content\">\r\n");
      out.write("                        <div class=\"modal-header bg-danger\">\r\n");
      out.write("                            <h2>Error</h2>\r\n");
      out.write("                        </div>\r\n");
      out.write("                        <div class=\"modal-body\">\r\n");
      out.write("                            <p id = \"errorMsg\">\r\n");
      out.write("                            </p>\r\n");
      out.write("                        </div>\r\n");
      out.write("                        <div class=\"modal-footer\">\r\n");
      out.write("                            <button id=\"CloseError\" type=\"button\" class=\"btn btn-danger\"  data-dismiss=\"modal\">Close</button>\r\n");
      out.write("                        </div>\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("            </div></div>\r\n");
      out.write("        <div class=\"container-fluid\">\r\n");
      out.write("            <div class=\"row\">\r\n");
      out.write("                <div class=\"col-sm-3 col-md-2 sidebar\" id=\"sidebar\">\r\n");
      out.write("                    <div class=\"panel-group\" id=\"accordion\" role=\"tablist\">\r\n");
      out.write("\r\n");
      out.write("                        <div class=\"panel panel-primary\" style=\"margin-bottom:5px\" id=\"adminsidebar\">\r\n");
      out.write("                            <div class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\r\n");
      out.write("                                <h4 class=\"panel-title\">\r\n");
      out.write("                                    <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"true\" aria-controls=\"collapseOne\">\r\n");
      out.write("                                        Admin Side Panel\r\n");
      out.write("                                    </a>\r\n");
      out.write("                                </h4>\r\n");
      out.write("                            </div>\r\n");
      out.write("                            <div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\r\n");
      out.write("                                <div class=\"panel-body\">\r\n");
      out.write("                                    <ul class=\"nav\" id = \"sidebarlinks\">\r\n");
      out.write("                                    </ul>  \r\n");
      out.write("                                </div>\r\n");
      out.write("                            </div>\r\n");
      out.write("                        </div>\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("                <div class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\">\r\n");
      out.write("                    <div id=\"pageContent\">\r\n");
      out.write("                    </div>\r\n");
      out.write("                </div>\r\n");
      out.write("            </div>\r\n");
      out.write("        </div>\r\n");
      out.write("        <script src=\"assets/js/jquery.js\"></script>\r\n");
      out.write("        <script src=\"assets/js/application.js\"></script>\r\n");
      out.write("        <script src=\"assets/js/jquery-ui.min.js\"></script>\r\n");
      out.write("        <script src=\"assets/js/bootstrap.min.js\"></script>\r\n");
      out.write("    </body>\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("</html>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
