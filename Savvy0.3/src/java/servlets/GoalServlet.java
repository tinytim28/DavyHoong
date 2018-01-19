/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import classes.User;
import classes.Goal;
import DAO.GoalsDAO;
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
@WebServlet(name = "GoalServlet", urlPatterns = {"/GoalServlet"})
public class GoalServlet extends HttpServlet {

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

        HttpSession session = request.getSession();

        if (type != null) {
            if (type.equals("setGoal")) {

                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();

                GoalsDAO gDAO = new GoalsDAO();

                double first = Double.parseDouble(request.getParameter("first"));
                double second = Double.parseDouble(request.getParameter("second"));
                double third = Double.parseDouble(request.getParameter("third"));
                double fourth = Double.parseDouble(request.getParameter("fourth"));

                gDAO.createGoal(username, first, second, third, fourth);
                toReturn.put("success", "success");
                write(response, toReturn);

            } else if (type.equals("viewTeamGoals")) {      // Only manager can approve goals, this is not used by any other type of user

                try {
                    /* TODO output your page here. You may use following sample code. */
                    GoalsDAO gDAO = new GoalsDAO();
                    User current = (User) session.getAttribute("loginUser");

                    String managerName = "" + current.getFirstName() + " " + current.getLastName().toUpperCase();

                    ArrayList<String> list = gDAO.retrieveTeamGoals(managerName);
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

            } else if (type.equals("changeGoals")) {

                GoalsDAO gDAO = new GoalsDAO();
                String changeLeft = request.getParameter("changeLeft");
                String username = request.getParameter("username");
                double first = Double.parseDouble(request.getParameter("first"));
                double second = Double.parseDouble(request.getParameter("second"));
                double third = Double.parseDouble(request.getParameter("third"));
                double fourth = Double.parseDouble(request.getParameter("fourth"));

                if (changeLeft.equals("0")) {
                    response.getWriter().write("No Changes Left");
                    toReturn.put("success", "success");
                } else {
                    gDAO.changeGoal(first, second, third, fourth, username);
                }

            } else if (type.equals("goalApproval")) {

                User manager = (User) session.getAttribute("loginUser");
                String managerName = "" + manager.getFirstName() + manager.getLastName().toUpperCase();
                String approval = request.getParameter("approved");
                String username = request.getParameter("username");

                GoalsDAO gDAO = new GoalsDAO();

                gDAO.approval(username, approval);

                String toDisplay = "Rejected";
                if (approval.equals("approved")) {
                    toDisplay = "Approved";
                }
                response.getWriter().write(toDisplay);
                toReturn.put("success", "success");

            } else if (type.equals("viewOwnGoals")) {
                try {
                    GoalsDAO gDAO = new GoalsDAO();
                    User current = (User) session.getAttribute("loginUser");
                    Goal goal = gDAO.retrieveGoalByAgent(current.getUsername());
                    if (goal != null) {
                        String output = "";
                        output += goal.getUsername() + ",";
                        output += goal.getFirst() + ",";
                        output += goal.getSecond() + ",";
                        output += goal.getThird() + ",";
                        output += goal.getFourth() + ",";
                        output += goal.getYearly() + ",";
                        output += goal.getApproved() + ",";
                        output += goal.getChangeLeft() + ",";

                        String json = "";
                        if (output.length() > 0 && output.charAt(output.length() - 1) == ',') {
                            json = output.substring(0, output.length() - 1);
                        }

                        response.getWriter().write(json);
                    }

                } finally {
                    //  out.close();
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
}
