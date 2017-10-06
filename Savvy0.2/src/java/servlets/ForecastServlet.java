/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import DAO.ProspectsDAO;
import DAO.SalesObjectDAO;
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

/**
 *
 * @author tim
 */
@WebServlet(name = "ForecastServlet", urlPatterns = {"/ForecastServlet"})
public class ForecastServlet extends HttpServlet {

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
        Map<String, Object> toReturn = new HashMap<String, Object>();
        String type = request.getParameter("type");

        if (type != null) {
            if (type.equals("forecastAgent")) {
                // creation of sales object for individual agents
                String username = request.getParameter("username");
                
                LocalDate now = LocalDate.now();
                Month currentMonth = now.getMonth();
                String xAxis = "";
                
                for ( int i = 1; i <= 12; i++ ) {
                    String s = currentMonth.plus(i).toString();
                    xAxis += s + ",";
                }
            
                
                try {
                    
                    ProspectsDAO pDAO = new ProspectsDAO();
                    SalesObjectDAO sDAO = new SalesObjectDAO();
                    double ThreeMonthsSales = sDAO.getUserPastThreeMonthsSalesTotal(username);
                    int ThreeMonthsDeals = sDAO.getUserPastThreeMonthsTotalDeals(username);
                    int ThreeMonthsProspects = pDAO.getUserPastThreeMonthsTotalProspects(username);
                    
                    double avgMonthlyProspects = (double) (ThreeMonthsProspects) / 3;
                    double avgDealSize = ThreeMonthsSales / ThreeMonthsDeals;
                    double closingRatio = (double) ThreeMonthsDeals / (double) ThreeMonthsProspects;
                    
                    
                    
                    
                    
                } catch(Exception e) {
                    e.printStackTrace();
                } finally {
                    
                }
                

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

}
