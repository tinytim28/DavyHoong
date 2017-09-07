/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import classes.User;
import classes.SalesObject;
import DAO.SalesObjectDAO;
import DAO.UserDAO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 *
 * @author Timothy
 */
@WebServlet(name = "SalesServlet", urlPatterns = {"/SalesServlet"})
public class SalesServlet extends HttpServlet {

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
        
        if(type != null)    {
            if (type.equals("create")) {
                // creation of sales object for individual agents
                HttpSession session = request.getSession();        
                User loginUser = (User)session.getAttribute("loginUser");
                String agentName = loginUser.getFirstName() + " " + loginUser.getLastName();
                String year = request.getParameter("year");
                String month = request.getParameter("month");
                String day = request.getParameter("day");
                String dateCombined = "" + year + month + day;
                
                Date dateClose = null;
                try {
                    dateClose = validateDateTime(dateCombined, "yyyyMMdd");
                } catch (ParseException e) {
                    
                } catch (NumberFormatException e) {
                    
                }
                String customerName = request.getParameter("customerName");
                String caseType = request.getParameter("caseType");
                double expectedFYC = Double.parseDouble(request.getParameter("expectedFYC"));
                String remarks = request.getParameter("remarks");
                java.sql.Date dateInput = new java.sql.Date(dateClose.getDate());

                //System.out.println("crating user with " + username);

                SalesObjectDAO s = new SalesObjectDAO();
                s.createSale(agentName, dateInput, customerName, caseType, expectedFYC, remarks);
                toReturn.put("success", "success");
                write(response, toReturn);
                
            } else if (type.equals("adminRetrieveSales")) {
                // This is to retrieve an individual user's sales,
                // retrieve done by admin to view that employees current sales that he is working on
                String agentName = request.getParameter("agentName");
                
                try {
                    /* TODO output your page here. You may use following sample code. */
                    SalesObjectDAO salesDAO = new SalesObjectDAO();
                    ArrayList<String> list = salesDAO.retrieveIndividualSales(agentName);
                    String output = "";
                    for (String s : list) {
                        output += s + ",";
                    }

                    String json = "";
                    //   System.out.println("json" + json);
                    if (output.length() > 0 && output.charAt(output.length() - 1) == ',') {
                        json = output.substring(0, output.length() - 1);
                    }

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }
            } else if (type.equals("retrieveAllByAgent")) {
                // This is to retrieve an individual user's sales,
                // retrieve done by admin to view that employees current sales that he is working on
                HttpSession session = request.getSession();        
                User loginUser = (User)session.getAttribute("loginUser");
                String agentName = loginUser.getFirstName() + " " + loginUser.getLastName();
                
                try {
                    /* TODO output your page here. You may use following sample code. */
                    SalesObjectDAO salesDAO = new SalesObjectDAO();
                    ArrayList<String> list = salesDAO.retrieveIndividualSales(agentName);
                    String output = "";
                    for (String s : list) {
                        output += s + ",";
                    }

                    String json = "";
                    //   System.out.println("json" + json);
                    if (output.length() > 0 && output.charAt(output.length() - 1) == ',') {
                        json = output.substring(0, output.length() - 1);
                    }

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }
            } else if (type.equals("deleteSale")) {
                // not too sure whether i did this correctly
                // this part abit gay
                JSONObject transJsonObj = new JSONObject();
                try {
                    transJsonObj = new JSONObject(request.getReader().readLine());

                } catch (Exception e) {
                    e.printStackTrace();
                }

                String customerName = "";
                String caseType = "";

                try {
                    customerName = transJsonObj.getString("customerName");
                    caseType = transJsonObj.getString("caseType");

                    SalesObjectDAO sDAO = new SalesObjectDAO();
                    sDAO.deleteSale(customerName, caseType);

                    response.getWriter().write("updated Sales");
                } catch (JSONException ex) {
                    //Logger.getLogger(admincontrol.class.getName()).log(Level.SEVERE, null, ex);
                }

                //System.out.println(transJsonObj);      
            } else if (type.equals("updateSales")) {

                String agentName = "";
                String customerName = "";
                double expectedFYC = 0.0;
                String caseType = "";
                Date convert = null;
                String remarks = "";
   

                try {                        
                    //changed this part as well, same as above, chage the variable names accordingly and remove those thats not needed
                    agentName = request.getParameter("agentName");
                    customerName = request.getParameter("customerNam");
                    expectedFYC = Double.parseDouble(request.getParameter("pContact"));
                    remarks = request.getParameter("remarks");
                    
                    String year = request.getParameter("year");
                    String month = request.getParameter("month");
                    String day = request.getParameter("day");
                    String combined = "" + year + month + day;
                    
                    convert = validateDateTime(combined, "yyyyMMdd");
                    java.sql.Date dateClose = new java.sql.Date(convert.getDate());
                    
                    

                    SalesObjectDAO sDAO = new SalesObjectDAO();
                    sDAO.updateSale(agentName, dateClose, customerName, caseType, expectedFYC, remarks);
                    
                    response.getWriter().write("updated Sale Line Item");
                    toReturn.put("success", "success");
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } 
        }
        
    }
    
    public static Date validateDateTime(String dateTime, String format) throws ParseException {
        DateFormat df = new SimpleDateFormat(format);
        df.setLenient(false);
        return df.parse(dateTime);
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
