/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import classes.User;
import classes.Prospects;
import DAO.ProspectsDAO;
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
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author Timothy
 */
@WebServlet(name = "ProspectServlet", urlPatterns = {"/ProspectServlet"})
public class ProspectServlet extends HttpServlet {

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
            if (type.equals("create")) {
                // creation of sales object for individual agents
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();
                String pName = request.getParameter("pName");
                String pContact = request.getParameter("pContact");
                String firstContactString = request.getParameter("firstContact");
                java.util.Date date = null;
                SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                try {

                    date = sdf1.parse(firstContactString);

                } catch (ParseException e) {

                }
                java.sql.Date firstContact = new java.sql.Date(date.getTime());
                String remarks = request.getParameter("remarks");

                //System.out.println("crating user with " + username);
                ProspectsDAO p = new ProspectsDAO();
                p.createProspect(pName, username, pContact, firstContact, remarks);
                toReturn.put("success", "success");
                write(response, toReturn);

            } else if (type.equals("retrieveProspectsByAgent")) {
                // This is to retrieve an individual user's sales,
                // retrieve done by admin to view that employees current sales that he is working on
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();

                try {
                    /* TODO output your page here. You may use following sample code. */
                    ProspectsDAO pDAO = new ProspectsDAO();
                    String list = pDAO.retrieveIndividualSales(username);
                    String output = "";


                    String json = "";
                    //   System.out.println("json" + json);
                    if (output.length() > 0 && output.charAt(output.length() - 1) == ',') {
                        json = output.substring(0, output.length() - 1);
                    }

                    response.getWriter().write(list);
                } finally {
                    //  out.close();
                }
            } else if (type.equals("deleteProspect")) {
                // not too sure whether i did this correctly
                // this part abit gay
                JSONObject transJsonObj = new JSONObject();
                try {
                    transJsonObj = new JSONObject(request.getReader().readLine());

                } catch (Exception e) {
                    e.printStackTrace();
                }

                String pName = "";
                String username = "";

                try {
                    pName = transJsonObj.getString("pName");
                    username = transJsonObj.getString("username");

                    ProspectsDAO pDAO = new ProspectsDAO();
                    pDAO.deleteProspect(pName, username);

                    response.getWriter().write("updated Prospects");
                } catch (JSONException ex) {
                    //Logger.getLogger(admincontrol.class.getName()).log(Level.SEVERE, null, ex);
                }

                //System.out.println(transJsonObj);      
            } else if (type.equals("updateProspect")) {

                String pName = "";
                String pContact = "";
                java.util.Date date = null;
                String remarks = "";
                HttpSession session = request.getSession();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();
                try {
                    //changed this part as well, same as above, chage the variable names accordingly and remove those thats not needed
                    pName = request.getParameter("pName");
                    pContact = request.getParameter("pContact");
                    remarks = request.getParameter("remarks");
                    String firstContactString = request.getParameter("firstContact");
                    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                    try {

                        date = sdf1.parse(firstContactString);

                    } catch (ParseException e) {

                    }
                    java.sql.Date firstContact = new java.sql.Date(date.getTime());

                    ProspectsDAO pDAO = new ProspectsDAO();
                    pDAO.updateProspect(pName, username, pContact, firstContact, remarks);

                    response.getWriter().write("updated Prospect");
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

    private void write(HttpServletResponse response, Map<String, Object> map) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new Gson().toJson(map));
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
