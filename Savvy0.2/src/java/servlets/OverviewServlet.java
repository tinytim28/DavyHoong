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
        
        if (type != null ) {
            if (type.equals("managerTeamOverviewCurrentMonth")) {
                
                HttpSession session = request.getSession();
                UserDAO uDAO = new UserDAO();
                SalesObjectDAO sDAO = new SalesObjectDAO();
                User loginUser = (User) session.getAttribute("loginUser");
                String managerName = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                
                ArrayList<String> teamUsernames = uDAO.retrieveTeamUsernames(managerName);
                HashMap<String,Double> currentComissions = new HashMap<>();
                
                for ( int i = 0; i < teamUsernames.size()-1; i++ ) {
                    String pointerUsername = teamUsernames.get(i);
                    double pointerSales = sDAO.getIndividualTotalSalesOneMonth(pointerUsername);
                    currentComissions.put(pointerUsername,pointerSales);
                }
                
            } else if (type.equals("managerSingleOverviewCurrentMonth")) {
                
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
