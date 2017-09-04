/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;


import classes.User;
import DAO.UserDAO;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Timothy
 */
@WebServlet(name = "UserServlet", urlPatterns = {"/UserServlet"})
public class UserServlet extends HttpServlet {

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
                //i changed this part, so you gotta change on the UI side,
                //double check the naming convention of the variables and change accordingly
                //we dont have that many columns in our database as compared to the original project
                //therefore must change some of it abit. 
                //was thinking of adding in a firstname and last name in the user class to make it look like we got do more things though, that one can change after login is working
                String username = request.getParameter("username");
                String password = request.getParameter("password");
                String firstName = request.getParameter("firstName");
                String lastName = request.getParameter("lastName");
                String isAdmin = request.getParameter("isAdmin");
                String pwHash = UserDAO.generateHash(password);

                //System.out.println("crating user with " + username);

                UserDAO u = new UserDAO();
                u.createUser(username, pwHash, firstName, lastName, isAdmin);
                toReturn.put("success", "success");
                write(response, toReturn);
            } else if (type.equals("login")) {
                String username = request.getParameter("username");
                String password = request.getParameter("password");

                UserDAO uDAO = new UserDAO();
                Boolean login = uDAO.login(username, password);

                if (login) {
                    User user = uDAO.retrieve(username);
                    HttpSession session = request.getSession();
                    session.setAttribute("loginUser", user);

                }

                toReturn.put("success", login);
                write(response, toReturn);
            } else if (type.equals("retrieveUser")) {
                // this part i dont really understand, i just edit to make it no error first, 
                // its not gonna affect our logging in anyway
                try {
                    /* TODO output your page here. You may use following sample code. */
                    UserDAO userDAO = new UserDAO();
                    ArrayList<String> list = userDAO.retrieveUserInfo();
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
            } else if (type.equals("deleteUser")) {
                JSONObject transJsonObj = new JSONObject();
                try {
                    transJsonObj = new JSONObject(request.getReader().readLine());

                } catch (Exception e) {
                    e.printStackTrace();
                }

                String username = "";

                try {
                    username = transJsonObj.getString("username");

                    UserDAO uDAO = new UserDAO();
                    uDAO.deleteUser(username);

                    response.getWriter().write("updated user");
                } catch (JSONException ex) {
                    //Logger.getLogger(admincontrol.class.getName()).log(Level.SEVERE, null, ex);
                }

                //System.out.println(transJsonObj);      
            } else if (type.equals("updateUser")) {

                String username = "";
                String firstName = "";
                String lastName = "";
                String usertype = "";
                String isAdmin = "";
                String password = "";   

                try {                        
                    //changed this part as well, same as above, chage the variable names accordingly and remove those thats not needed
                    username = request.getParameter("username");
                    firstName = request.getParameter("firstName");
                    lastName = request.getParameter("lastName");
                    usertype = request.getParameter("isAdmin");
                    if(usertype!=null){
                      if(usertype.equals("Admin")){
                           isAdmin = "Admin";
                        }
                    }
                    password = request.getParameter("password");            

                    UserDAO uDAO = new UserDAO();
                    if (password != null && !password.trim().equals("")) {                    
                        String pwHash = UserDAO.generateHash(password);
                        uDAO.updateUserWithNewPw( username, firstName,lastName, isAdmin, pwHash);
                    } else {
                        uDAO.updateUser(username, firstName, lastName, isAdmin);
                    }
                    response.getWriter().write("updated user");
                    toReturn.put("success", "success");
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
