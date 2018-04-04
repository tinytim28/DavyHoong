/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import DAO.ProspectsDAO;
import DAO.SalesObjectDAO;
import DAO.UserDAO;
import classes.User;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.*;
import java.util.ArrayList;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Timothy
 */
@WebServlet(name = "OverviewServlet", urlPatterns = {"/OverviewServlet"})
public class OverviewServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        Map<String, Object> toReturn = new HashMap<String, Object>();
        String type = request.getParameter("type");

        if (type != null) {
            switch (type) {
                case "managerTeamOverviewOneMonth":
                    {
                        String month = "";
                        if (request.getParameter("month") == null) {
                            LocalDate now = LocalDate.now();
                            Month currentMonth = now.getMonth();
                            month = "" + currentMonth.getValue();
                        } else {
                            month = request.getParameter("month");
                        }       HttpSession session = request.getSession();
                        UserDAO uDAO = new UserDAO();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        User loginUser = (User) session.getAttribute("loginUser");
                        String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                        String toShow = sDAO.retrieveTeamSalesMonth(managerName, month);
                        toReturn.put("success", "success");
                        response.getWriter().write(toShow);
                        break;
                    }
                case "managerTeamOverviewYTD":
                    {
                        HttpSession session = request.getSession();
                        UserDAO uDAO = new UserDAO();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        User loginUser = (User) session.getAttribute("loginUser");
                        String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                        String toShow = sDAO.retrieveTeamSalesYTD(managerName);
                        toReturn.put("success", "success");
                        response.getWriter().write(toShow);
                        break;
                    }
                case "managerRetrieveCaseBreakdownYTD":
                    {
                        HttpSession session = request.getSession();
                        UserDAO uDAO = new UserDAO();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        User loginUser = (User) session.getAttribute("loginUser");
                        String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                        LocalDate now = LocalDate.now();
                        String year = "" + now.getYear();
                        String yearStart = year + "-01-01";
                        int endYear = Integer.parseInt(year) + 1;
                        String toPutForEnd = "" + endYear;
                        String yearEnd = toPutForEnd + "-" + "01-01";
                        String toShow = sDAO.getCaseBreakdownYTD(managerName, yearStart, yearEnd);
                        response.getWriter().write(toShow);
                        break;
                    }
                case "managerRetrieveCaseBreakdownMonth":
                    {
                        String month = "";
                        LocalDate now = LocalDate.now();
                        if (request.getParameter("month") == null) {
                            Month currentMonth = now.getMonth();
                            month = "" + currentMonth.getValue();
                        } else {
                            month = request.getParameter("month");
                        }       String yearStart = now.toString().substring(0, 4);
                        String yearEnd = now.toString().substring(0, 4);
                        String startMonth = "";
                        String endMonth = "";
                        if (month.length() < 2) {
                            startMonth = "0" + month;
                        } else {
                            startMonth = "" + month;
                        }       if (month.equals("12")) {
                            int tempYear = Integer.parseInt(yearEnd) + 1;
                            yearEnd = "" + tempYear;
                            endMonth = "01";
                        } else if (Integer.parseInt(month) < 10) {
                            int temp = Integer.parseInt(month) + 1;
                            endMonth = "0" + temp;
                        } else {
                            int temp = Integer.parseInt(month) + 1;
                            endMonth = "" + temp;
                        }       String dateStart = "" + yearStart + "-" + startMonth + "-01";
                        String dateEnd = "" + yearEnd + "-" + endMonth + "-01";
                        HttpSession session = request.getSession();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        User loginUser = (User) session.getAttribute("loginUser");
                        String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                        String toShow = sDAO.getCaseBreakdownYTD(managerName, dateStart, dateEnd);
                        toReturn.put("success", "success");
                        response.getWriter().write(toShow);
                        break;
                    }
                case "managerTeamOverviewCaseType":
                    {
                        HttpSession session = request.getSession();
                        UserDAO uDAO = new UserDAO();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        User loginUser = (User) session.getAttribute("loginUser");
                        String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                        String casetype = request.getParameter("casetype");
                        String toShow = sDAO.retrieveTeamSalesCaseType(managerName, casetype);
                        toReturn.put("success", "success");
                        response.getWriter().write(toShow);
                        break;
                    }
                    case "managerIndividualViewPerformance":
                    {
                        HttpSession session = request.getSession();
                        SalesObjectDAO sDAO = new SalesObjectDAO();
                        String username = request.getParameter("username");
                        JsonArray toShow = sDAO.getIndividualTotalSalesYTD(username);
                        toReturn.put("success", "success");
                        response.getWriter().write(toShow.toString());
                        break;
                    }
                    
                default:
                    break;
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private void write(HttpServletResponse response, Map<String, Object> map) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new Gson().toJson(map));
    }

}
