/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import classes.Retirement;
import DAO.RetirementDAO;
import DAO.SalesObjectDAO;
import classes.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.JsonParseException;
import com.google.gson.JsonElement;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;
import java.util.ArrayList;

/**
 *
 * @author tim
 */
@WebServlet(name = "ProspectAnalysis", urlPatterns = {"/ProspectAnalysis"})
public class ProspectAnalysis extends HttpServlet {

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
            if (type.equals("performRetirementAnalysis")) {

                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                RetirementDAO rDAO = new RetirementDAO();
                JSONObject jsonObj = new JSONObject();
                try {
                    jsonObj = new JSONObject(request.getReader().readLine());

                } catch (Exception e) {
                    e.printStackTrace();
                }

                int userid = loginUser.getUserid();
                String pName = "";
                int age = 0;
                int rAge = 0;
                int eAge = 0;
                double dAnnualIncome = 0.0;
                double otherContribuition = 0.0;
                double currentSavings = 0.0;
                double rateSavings = 0.0;
                double rateInflation = 0.0;

                try {
                    pName = jsonObj.getString("pName");
                    age = jsonObj.getInt("age");
                    rAge = jsonObj.getInt("rAge");
                    eAge = jsonObj.getInt("eAge");
                    dAnnualIncome = jsonObj.getDouble("dAnnualIncome");
                    otherContribuition = jsonObj.getDouble("otherContribuition");
                    currentSavings = jsonObj.getDouble("currentSavings");
                    rateSavings = jsonObj.getDouble("rateSavings");
                    rateInflation = jsonObj.getDouble("rateInflation");

                } catch (JSONException ex) {
                    ex.printStackTrace();
                }

                Retirement r1 = new Retirement(userid, pName, age, rAge, eAge, dAnnualIncome, otherContribuition, currentSavings, rateSavings, rateInflation);
                rDAO.addRetirementAnalysis(r1);

                //This part is for the analysis to be done, need to get "amountOfSavings", "PresentValueNeededFunds", "calculateFirstYearSavingContribuition", "RealDollarContribuition"
                double amountOfSavings = calculateAmountOfSavings(r1);
                double presentValueNeededFunds = calculatePresentValueNeededFunds(r1, amountOfSavings);
                double firstYearSavingContribuitions = calculateFirstYearSavingContribuitions(r1, presentValueNeededFunds, amountOfSavings);
                double realDollarContribuition = calculateRealDollarContribuition(r1, firstYearSavingContribuitions);
                
                // PLEASE READ CLIFTON NGEOW.
                //jsonArray to store jsonObjects with "Age", "Annual Savings", "Cumulative Savings", "Monthly Saving Goal"
                // FOR THE GRAPH, YOU NEED TO PLOT CUMULATIVE SAVINGS on Y-AXIS, and AGE on X-AXIS
                // Look at the DAO if you wanna know how the method works. its quite rabak btw.. hahaha
                
                String output = rDAO.generateGraphAndTable(age, rAge, amountOfSavings, presentValueNeededFunds, firstYearSavingContribuitions, realDollarContribuition, rateSavings, rateInflation, dAnnualIncome, otherContribuition, currentSavings);
                
                try {
                    response.getWriter().write(output);
                } finally {
                    //out.close();
                }
                      

            } else if (type.equals("retrieveRetirementAnalysis")) {
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                int userid= loginUser.getUserid();
                String pName = request.getParameter("pName");

                RetirementDAO rDAO = new RetirementDAO();
                String output = rDAO.retrieveRetirementAnalysisInputs(userid, pName);
                
                try {
                    response.getWriter().write(output);
                } finally {
                    //out.close();
                }

            } else if (type.equals("performIncomeBreakdown")) {
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();

            } else if (type.equals("retrieveIncomeBreakdown")) {
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();

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

    public static double calculateAmountOfSavings(Retirement r1) {
        double output = 0.0;
        if (r1.getRateInflation() != r1.getRateSavings()) {
            output = (((r1.getdAnnualIncome() - r1.getOtherContribuition()) * java.lang.Math.pow((1.0 + r1.getRateInflation()), (double) (r1.getrAge() - r1.getAge() + 1))) / (r1.getRateSavings() - r1.getRateInflation())) * (1.0 - java.lang.Math.pow(((1.0 + r1.getRateInflation()) / (1.0 + r1.getRateSavings())), ((double) (r1.geteAge() - r1.getrAge()))));
        } else {
            output = (r1.getdAnnualIncome() - r1.getOtherContribuition()) * java.lang.Math.pow((1.0 + r1.getRateInflation()), (double) (r1.getrAge() - r1.getAge())) * (double) (r1.geteAge() - r1.getrAge());
        }
        return output;

    }

    public static double calculatePresentValueNeededFunds(Retirement r1, double amountOfSavings) {
        double output = (1 / java.lang.Math.pow((1 + r1.getRateSavings()), (double) (r1.getrAge() - r1.getAge()))) * amountOfSavings - r1.getCurrentSavings();
        return output;
    }

    public static double calculateFirstYearSavingContribuitions(Retirement r1, double presentValueNeededFunds, double amountOfSavings) {
        double output = 0;
        if (r1.getRateInflation() != r1.getRateSavings()) {
            output = (presentValueNeededFunds * ((1.0 + r1.getRateSavings()) / (1.0 + r1.getRateInflation()) - 1.0)) / (1.0 - (1.0 / (java.lang.Math.pow((1.0 + ((1.0 + r1.getRateSavings()) / (1.0 + r1.getRateInflation()) - 1.0)), (double) (r1.getrAge() - r1.getAge()))))) * (1.0 + r1.getRateInflation());
        } else {
            output = (amountOfSavings - (r1.getCurrentSavings() * java.lang.Math.pow((1 + r1.getRateInflation()), (double) (r1.getrAge() - r1.getAge())))) / ((r1.getrAge() - r1.getAge()) * java.lang.Math.pow((1.0 + r1.getRateInflation()), (double) (r1.getrAge() - r1.getAge())));
        }
        return output;
    }

    public static double calculateRealDollarContribuition(Retirement r1, double firstYearSavingContribuitions) {
        double output = firstYearSavingContribuitions / (r1.getRateInflation() + 1.0);
        return output;
    }
}
