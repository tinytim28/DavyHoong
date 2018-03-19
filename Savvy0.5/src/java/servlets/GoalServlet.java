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
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
import java.time.*;
import org.json.JSONArray;

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
                if (gDAO.checkRejected(username)) {
                    gDAO.deleteGoal(username);
                }

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

                    String json = gDAO.retrieveTeamGoals(managerName);

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }

            } else if (type.equals("goalApproval")) {

                String username = request.getParameter("userid");
                String approval = request.getParameter("approved");
                GoalsDAO gDAO = new GoalsDAO();
                gDAO.approval(username, approval);
                String toDisplay = "Rejected";
                if (approval.equals("approved")) {
                    toDisplay = "Approved";
                }
                response.getWriter().write(toDisplay);
                toReturn.put("success", "success");
                response.getWriter().write("updated user");

            } else if (type.equals("viewOwnGoals")) {
                try {
                    GoalsDAO gDAO = new GoalsDAO();
                    User current = (User) session.getAttribute("loginUser");
                    String json = gDAO.retrieveGoalByAgent(current.getUserid());

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }
            } else if (type.equals("viewIndividualGoals")) {
                try {
                    int userid = Integer.parseInt(request.getParameter("userid"));
                    GoalsDAO gDAO = new GoalsDAO();
                    String json = gDAO.retrieveGoalByAgent(userid);

                    response.getWriter().write(json);

                } finally {
                    //  out.close();
                }
            } else if (type.equals("showCurrentQuarterlySales")) {
                JsonArray jsonArray = new JsonArray();
                User loginUser = (User) session.getAttribute("loginUser");
                String username = loginUser.getUsername();

                String firstQuarter = "0.0";
                String secondQuarter = "0.0";
                String thirdQuarter = "0.0";
                String fourthQuarter = "0.0";

                GoalsDAO gDAO = new GoalsDAO();
                LocalDate now = LocalDate.now();
                int currentMonth = now.getMonth().getValue();

                if (currentMonth < 4) {
                    JsonObject jsonObject1 = new JsonObject();
                    firstQuarter = "" + gDAO.getUserPastQuarterSales(username, "1", "4");
                    jsonObject1.addProperty("first", firstQuarter);
                    jsonArray.add(jsonObject1);
                } else if (currentMonth >= 4 && currentMonth < 7) {
                    JsonObject jsonObject1 = new JsonObject();
                    JsonObject jsonObject2 = new JsonObject();
                    firstQuarter = "" + gDAO.getUserPastQuarterSales(username, "1", "4");
                    secondQuarter = "" + gDAO.getUserPastQuarterSales(username, "4", "7");
                    jsonObject1.addProperty("first", firstQuarter);
                    jsonArray.add(jsonObject1);
                    jsonObject2.addProperty("second", secondQuarter);
                    jsonArray.add(jsonObject2);

                } else if (currentMonth >= 7 && currentMonth < 10) {
                    JsonObject jsonObject1 = new JsonObject();
                    JsonObject jsonObject2 = new JsonObject();
                    JsonObject jsonObject3 = new JsonObject();
                    firstQuarter = "" + gDAO.getUserPastQuarterSales(username, "1", "4");
                    secondQuarter = "" + gDAO.getUserPastQuarterSales(username, "4", "7");
                    thirdQuarter = "" + gDAO.getUserPastQuarterSales(username, "7", "10");
                    jsonObject1.addProperty("first", firstQuarter);
                    jsonArray.add(jsonObject1);
                    jsonObject2.addProperty("second", secondQuarter);
                    jsonArray.add(jsonObject2);
                    jsonObject3.addProperty("third", thirdQuarter);
                    jsonArray.add(jsonObject3);

                } else {
                    JsonObject jsonObject1 = new JsonObject();
                    JsonObject jsonObject2 = new JsonObject();
                    JsonObject jsonObject3 = new JsonObject();
                    JsonObject jsonObject4 = new JsonObject();
                    firstQuarter = "" + gDAO.getUserPastQuarterSales(username, "1", "4");
                    secondQuarter = "" + gDAO.getUserPastQuarterSales(username, "4", "7");
                    thirdQuarter = "" + gDAO.getUserPastQuarterSales(username, "7", "10");
                    fourthQuarter = "" + gDAO.getUserPastQuarterSales(username, "10", "1");
                    jsonObject1.addProperty("first", firstQuarter);
                    jsonArray.add(jsonObject1);
                    jsonObject2.addProperty("second", secondQuarter);
                    jsonArray.add(jsonObject2);
                    jsonObject3.addProperty("third", thirdQuarter);
                    jsonArray.add(jsonObject3);
                    jsonObject4.addProperty("fourth", fourthQuarter);
                    jsonArray.add(jsonObject4);

                }

                response.getWriter().write(jsonArray.toString());

            } else if (type.equals("showCurrentQuarterlySalesManager")) {
                UserDAO uDAO = new UserDAO();
                User loginUser = (User) session.getAttribute("loginUser");
                String teamRetrieve = "" + loginUser.getFirstName() + " " + loginUser.getLastName().toUpperCase();
                String userInfoString = uDAO.retrieveUserInfo(teamRetrieve);
                JsonParser parser = new JsonParser();
                JsonElement tradeElement = parser.parse(userInfoString);
                JsonArray userInfo = tradeElement.getAsJsonArray();
                JsonArray jsonArray = new JsonArray();
                for (int i = 0; i < userInfo.size(); i++) {
                    JsonElement jsonUserElement = userInfo.get(i);
                    JsonObject jsonUser = jsonUserElement.getAsJsonObject();
                    String jsonUsername = jsonUser.get("username").getAsString();
                    int jsonUserid = jsonUser.get("userid").getAsInt();
                    JsonObject jsonObject = new JsonObject();
                    jsonObject.addProperty("userid", jsonUserid);
                    String firstQuarter = "0.0";
                    String secondQuarter = "0.0";
                    String thirdQuarter = "0.0";
                    String fourthQuarter = "0.0";

                    GoalsDAO gDAO = new GoalsDAO();
                    LocalDate now = LocalDate.now();
                    int currentMonth = now.getMonth().getValue();

                    if (currentMonth < 4) {
                        firstQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "1", "4");
                        jsonObject.addProperty("first", firstQuarter);

                    } else if (currentMonth >= 4 && currentMonth < 7) {
                        firstQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "1", "4");
                        secondQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "4", "7");
                        jsonObject.addProperty("first", firstQuarter);
                        jsonObject.addProperty("second", secondQuarter);

                    } else if (currentMonth >= 7 && currentMonth < 10) {
                        firstQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "1", "4");
                        secondQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "4", "7");
                        thirdQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "7", "10");
                        jsonObject.addProperty("first", firstQuarter);
                        jsonObject.addProperty("second", secondQuarter);
                        jsonObject.addProperty("third", thirdQuarter);

                    } else {
                        firstQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "1", "4");
                        secondQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "4", "7");
                        thirdQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "7", "10");
                        fourthQuarter = "" + gDAO.getUserPastQuarterSales(jsonUsername, "10", "1");
                        jsonObject.addProperty("first", firstQuarter);
                        jsonObject.addProperty("second", secondQuarter);
                        jsonObject.addProperty("third", thirdQuarter);
                        jsonObject.addProperty("fourth", fourthQuarter);

                    }
                    jsonArray.add(jsonObject);
                }
                response.getWriter().write(jsonArray.toString());
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
