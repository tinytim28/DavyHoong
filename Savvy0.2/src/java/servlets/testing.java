/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import classes.User;
import classes.SalesObject;
import DAO.SalesObjectDAO;
import DAO.UserDAO;
import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.time.*;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Timothy
 */
@WebServlet(name = "testing", urlPatterns = {"/testing"})
public class testing extends HttpServlet {

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
        
        LocalDate now = LocalDate.now();
        System.out.println("checker: " + now.toString().substring(0,4));
        int monthInt = now.getMonth().getValue();
        SalesObjectDAO sDAO = new SalesObjectDAO();
        System.out.println("hi");
        double testFigure = sDAO.getUserPastThreeMonthsSalesTotal("rachel");
        int totalDeals = sDAO.getUserPastThreeMonthsTotalDeals("rachel");
        System.out.println("totalDeals: " + totalDeals);
        System.out.println("testFigure: " + testFigure);
        System.out.println("success");
        String pass = "" + testFigure;
        RequestDispatcher view = request.getRequestDispatcher("test.jsp");
        request.setAttribute("test", pass);
        view.forward(request, response);
        
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

}
