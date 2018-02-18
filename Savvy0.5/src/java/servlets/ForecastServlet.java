/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import DAO.ProspectsDAO;
import DAO.SalesObjectDAO;
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
            if (type.equals("forecastAgentTwelveMonths")) {
                // creation of sales object for individual agents
                String username = request.getParameter("username");

                LocalDate now = LocalDate.now();
                Month currentMonth = now.getMonth();
                String XYaxis = "";

                ArrayList<Integer> months = new ArrayList<Integer>();
                double totalProjectedComissions = 0.0;

                for (int i = 1; i <= 12; i++) {
                    Month tempMonth = currentMonth.plus(i);
                    int monthValue = tempMonth.getValue();
                    String s = tempMonth.toString();
                    s = Character.toUpperCase(s.charAt(0)) + s.substring(1, s.length()).toLowerCase();
                    months.add(monthValue);
                    XYaxis += s + ",";
                }

                try {

                    ProspectsDAO pDAO = new ProspectsDAO();
                    SalesObjectDAO sDAO = new SalesObjectDAO();
                    double ThreeMonthsSales = sDAO.getUserPastThreeMonthsSalesTotal(username);
                    int ThreeMonthsDeals = sDAO.getUserPastThreeMonthsTotalDeals(username);
                    int ThreeMonthsProspects = pDAO.getUserPastThreeMonthsTotalProspects(username);
                    if (ThreeMonthsProspects < 3){
                        ThreeMonthsProspects = 3;
                    }
                    double avgMonthlyProspects = (double) (ThreeMonthsProspects) / 3;
                    double avgDealSize = ThreeMonthsSales / ThreeMonthsDeals;
                    double closingRatio = (double) ThreeMonthsDeals / (double) ThreeMonthsProspects;

                    double forecastedDealsClosedMonthly = closingRatio * avgMonthlyProspects;

                    if (forecastedDealsClosedMonthly < 1) {
                        forecastedDealsClosedMonthly = 1.0;
                    }

                    double forecastedMonthlySales = forecastedDealsClosedMonthly * avgDealSize;
                    double toAdd = 0.0;

                    if (ThreeMonthsSales < 10000.0) {

                        for (int a = 0; a <= 11; a++) {

                            int pointer = months.get(a);

                            double multiplier;
                            switch (pointer) {
                                case 1:
                                    multiplier = 0.95;
                                    break;
                                case 2:
                                    multiplier = 0.92;
                                    break;
                                case 3:
                                    multiplier = 1.0;
                                    break;
                                case 4:
                                    multiplier = 0.98;
                                    break;
                                case 5:
                                    multiplier = 1.01;
                                    break;
                                case 6:
                                    multiplier = 1.05;
                                    break;
                                case 7:
                                    multiplier = 0.90;
                                    break;
                                case 8:
                                    multiplier = 0.93;
                                    break;
                                case 9:
                                    multiplier = 0.97;
                                    break;
                                case 10:
                                    multiplier = 1.06;
                                    break;
                                case 11:
                                    multiplier = 1.10;
                                    break;
                                case 12:
                                    multiplier = 1.12;
                                    break;
                                default:
                                    multiplier = 0.0;
                                    break;
                            }

                            totalProjectedComissions = totalProjectedComissions + toAdd;
                            toAdd = forecastedMonthlySales * multiplier;
                            XYaxis += "" + toAdd + ",";

                        }
                    } else if (ThreeMonthsSales >= 10000.0 && ThreeMonthsSales < 15000.0 ) {
                        
                        for (int a = 0; a <= 11; a++) {

                            int pointer = months.get(a);

                            double multiplier;
                            switch (pointer) {
                                case 1:
                                    multiplier = 1.00;
                                    break;
                                case 2:
                                    multiplier = 0.97;
                                    break;
                                case 3:
                                    multiplier = 1.02;
                                    break;
                                case 4:
                                    multiplier = 0.93;
                                    break;
                                case 5:
                                    multiplier = 0.93;
                                    break;
                                case 6:
                                    multiplier = 1.04;
                                    break;
                                case 7:
                                    multiplier = 0.85;
                                    break;
                                case 8:
                                    multiplier = 0.95;
                                    break;
                                case 9:
                                    multiplier = 1.03;
                                    break;
                                case 10:
                                    multiplier = 1.08;
                                    break;
                                case 11:
                                    multiplier = 1.14;
                                    break;
                                case 12:
                                    multiplier = 1.18;
                                    break;
                                default:
                                    multiplier = 0.0;
                                    break;
                            }

                            totalProjectedComissions = totalProjectedComissions + toAdd;
                            toAdd = forecastedMonthlySales * multiplier;
                            XYaxis += "" + toAdd + ",";

                        }
                    } else {
                        
                        for (int a = 0; a <= 11; a++) {

                            int pointer = months.get(a);

                            double multiplier;
                            switch (pointer) {
                                case 1:
                                    multiplier = 0.99;
                                    break;
                                case 2:
                                    multiplier = 0.92;
                                    break;
                                case 3:
                                    multiplier = 1.05;
                                    break;
                                case 4:
                                    multiplier = 1.0;
                                    break;
                                case 5:
                                    multiplier = 0.9;
                                    break;
                                case 6:
                                    multiplier = 1.02;
                                    break;
                                case 7:
                                    multiplier = 0.85;
                                    break;
                                case 8:
                                    multiplier = 0.95;
                                    break;
                                case 9:
                                    multiplier = 1.15;
                                    break;
                                case 10:
                                    multiplier = 1.1;
                                    break;
                                case 11:
                                    multiplier = 1.25;
                                    break;
                                case 12:
                                    multiplier = 1.35;
                                    break;
                                default:
                                    multiplier = 0.0;
                                    break;
                            }

                            totalProjectedComissions = totalProjectedComissions + toAdd;
                            toAdd = forecastedMonthlySales * multiplier;
                            XYaxis += "" + toAdd + ",";

                        }
                    }

                    String json = "";
                    //   System.out.println("json" + json);
                    if (XYaxis.length() > 0 && XYaxis.charAt(XYaxis.length() - 1) == ',') {
                        json = XYaxis.substring(0, XYaxis.length() - 1);
                    }

                    json = json + "," + totalProjectedComissions;

                    response.getWriter().write(json);

                } catch (Exception e) {
                    e.printStackTrace();
                } finally {

                }

            } else if (type.equals("forecastAgentToEndYear")) {
                // creation of sales object for individual agents
                String username = request.getParameter("username");

                LocalDate now = LocalDate.now();
                Month currentMonth = now.getMonth();
                int startMonth = currentMonth.getValue();
                String XYaxis = "";

                ArrayList<Integer> months = new ArrayList<Integer>();
                double totalProjectedComissions = 0.0;

                for (int i = startMonth + 1; i <= 12; i++) {
                    Month tempMonth = Month.of(i);
                    String s = tempMonth.toString();
                    s = Character.toUpperCase(s.charAt(0)) + s.substring(1, s.length()).toLowerCase();
                    XYaxis += s + ",";
                }

                System.out.println(XYaxis);

                try {

                    ProspectsDAO pDAO = new ProspectsDAO();
                    SalesObjectDAO sDAO = new SalesObjectDAO();
                    double ThreeMonthsSales = sDAO.getUserPastThreeMonthsSalesTotal(username);
                    int ThreeMonthsDeals = sDAO.getUserPastThreeMonthsTotalDeals(username);
                    int ThreeMonthsProspects = pDAO.getUserPastThreeMonthsTotalProspects(username);

                    double avgMonthlyProspects = (double) (ThreeMonthsProspects) / 3;
                    double avgDealSize = ThreeMonthsSales / ThreeMonthsDeals;
                    double closingRatio = (double) ThreeMonthsDeals / (double) ThreeMonthsProspects;

                    double forecastedDealsClosedMonthly = closingRatio * avgMonthlyProspects;

                    if (forecastedDealsClosedMonthly < 1) {
                        forecastedDealsClosedMonthly = 1.0;
                    }

                    double forecastedMonthlySales = forecastedDealsClosedMonthly * avgDealSize;
                    double toAdd = 0.0;

                    for (int a = 0; a <= 11; a++) {

                        int pointer = months.get(a);

                        double multiplier;
                        switch (pointer) {
                            case 1:
                                multiplier = 1.05;
                                break;
                            case 2:
                                multiplier = 0.92;
                                break;
                            case 3:
                                multiplier = 1.10;
                                break;
                            case 4:
                                multiplier = 1.0;
                                break;
                            case 5:
                                multiplier = 0.9;
                                break;
                            case 6:
                                multiplier = 1.02;
                                break;
                            case 7:
                                multiplier = 0.85;
                                break;
                            case 8:
                                multiplier = 0.95;
                                break;
                            case 9:
                                multiplier = 1.15;
                                break;
                            case 10:
                                multiplier = 1.1;
                                break;
                            case 11:
                                multiplier = 1.25;
                                break;
                            case 12:
                                multiplier = 1.45;
                                break;
                            default:
                                multiplier = 0.0;
                                break;
                        }

                        totalProjectedComissions = totalProjectedComissions + toAdd;
                        toAdd = forecastedMonthlySales * multiplier;
                        XYaxis += "" + toAdd + ",";

                    }

                    String json = "";
                    //   System.out.println("json" + json);
                    if (XYaxis.length() > 0 && XYaxis.charAt(XYaxis.length() - 1) == ',') {
                        json = XYaxis.substring(0, XYaxis.length() - 1);
                    }

                    json = json + "," + totalProjectedComissions;

                    response.getWriter().write(json);

                } catch (Exception e) {
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

    private void write(HttpServletResponse response, Map<String, Object> map) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new Gson().toJson(map));
    }
}
