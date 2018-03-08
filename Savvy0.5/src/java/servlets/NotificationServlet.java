/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import DAO.NotificationDAO;
import classes.Notification;
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
import java.util.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import org.json.JSONObject;
import java.sql.Time;

/**
 *
 * @author tim
 */
@WebServlet(name = "NotificationServlet", urlPatterns = {"/NotificationServlet"})
public class NotificationServlet extends HttpServlet {

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
        
        if(type != null) {
            if(type.equals("createNotification")) {
                JSONObject transJsonObj = new JSONObject();
                NotificationDAO nDAO = new NotificationDAO();
                try {
                    
                    transJsonObj = new JSONObject(request.getReader().readLine());
                    int managerID = transJsonObj.getInt("managerID");
                    String notificationType = transJsonObj.getString("notificationType");
                    
                    String dateString = transJsonObj.getString("date");
                    java.util.Date dateInput = null;
                    SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
                    try {

                        dateInput = sdf1.parse(dateString);

                    } catch (ParseException e) {

                    }
                    java.sql.Date date = new java.sql.Date(dateInput.getTime());
                    
                    int hourStart = 0;
                    int minStart = 0;
                    int hourEnd = 0;
                    int minEnd = 0;
                    Time start = null;
                    Time end = null;
                    if (notificationType.toLowerCase().equals("roadshow") || notificationType.toLowerCase().equals("calling session") || notificationType.equals("meeting")) {
                        hourStart = transJsonObj.getInt("hourStart");
                        minStart = transJsonObj.getInt("minStart");
                        hourEnd = transJsonObj.getInt("hourEnd");
                        minEnd = transJsonObj.getInt("minEnd");
                        start = new Time(hourStart, minStart, 0);
                        end = new Time(hourEnd, minEnd, 0);
                    }
                    
                    int audience = transJsonObj.getInt("audience");
                    String message = transJsonObj.getString("message");
                    
                    nDAO.createNotification(managerID, notificationType, date, start, end, audience, message);
                    
                    response.getWriter().write("Success, new notification created");
                } catch (Exception e) {
                    e.printStackTrace();
                }
                response.getWriter().write("Success, new team created with  as the manager");
            } else if (type.equals("deleteNotification")) {
                JSONObject transJsonObj = new JSONObject();
                NotificationDAO nDAO = new NotificationDAO();
                
                try {
                    transJsonObj = new JSONObject(request.getReader().readLine());
                    int notificationID = transJsonObj.getInt("notificationID");
                    nDAO.deleteNotification(notificationID);
                    
                    response.getWriter().write("Success, notification successfully deleted");
                } catch (Exception e) {
                    e.printStackTrace();
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
