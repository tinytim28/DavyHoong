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
        Map<String, Object> toReturn = new HashMap<>();
        String type = request.getParameter("type");
        
        HttpSession session = request.getSession();
        
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
                String usertype = request.getParameter("usertype");
                String pwHash = UserDAO.generateHash(password);
                
                User current = (User) session.getAttribute("loginUser");
                String manager = "";
                
                // Baically, if admin is creating, it will auto set the manager column in DB to Manager, if its manager creating, it will set manager
                // to Manager's first and last name
                
                if (current.checkAdmin().equals("Admin")) {
                    manager = "Manager";
                } else if (current.checkAdmin().equals("Manager")) {
                    manager = "" + current.getFirstName() + " " + current.getLastName().toUpperCase();
                }

                //System.out.println("crating user with " + username);

                UserDAO u = new UserDAO();
                u.createUser(username, pwHash, firstName, lastName, usertype, manager);
                toReturn.put("success", "success");
                write(response, toReturn);
            } else if (type.equals("login")) {
                String username = request.getParameter("username");
                String password = request.getParameter("password");

                UserDAO uDAO = new UserDAO();
                Boolean login = uDAO.login(username, password);

                if (login) {
                    User user = uDAO.retrieve(username);
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
                    String teamRetrieve;
                    User current = (User) session.getAttribute("loginUser");
                    
                    
                    //Basically what i did is to take from the current user to check who is the manager or if the user is a manager himself
                    // Admin can retrieve managers
                    // managers will retrieve those whose 'manager' column has their first and last name inside. 
                    // i altered the DAO codes to take in a string called teamRetrieve, it will only retrieve those under the manager
                    if ( current.checkAdmin().equals("Admin")) {
                        teamRetrieve = "Manager";
                    }else {
                        teamRetrieve = "" + current.getFirstName() + " " + current.getLastName().toUpperCase();
                    }
                    
                    
                    ArrayList<String> list = userDAO.retrieveUserInfo(teamRetrieve);
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

                } catch (IOException | JSONException e) {
                }
                try {
                    String username = transJsonObj.getString("username");

                    UserDAO uDAO = new UserDAO();
                    uDAO.deleteUser(username);

                    response.getWriter().write("updated user");
                } catch (JSONException ex) {
                    //Logger.getLogger(admincontrol.class.getName()).log(Level.SEVERE, null, ex);
                }

                //System.out.println(transJsonObj);      
            } else if (type.equals("updateUser")) {
                try {                        
                    //changed this part as well, same as above, chage the variable names accordingly and remove those thats not needed
                    String username = request.getParameter("username");
                    String firstName = request.getParameter("firstName");
                    String lastName = request.getParameter("lastName");
                    String usertype = request.getParameter("usertype");
                    String manager = request.getParameter("manager");
                    
                    if(usertype!=null){
                      if(usertype.equals("Admin")){
                           usertype = "Admin";
                        }
                    }
                    String password = request.getParameter("password");            

                    UserDAO uDAO = new UserDAO();
                    if (password != null && !password.trim().equals("")) {                    
                        String pwHash = UserDAO.generateHash(password);
                        uDAO.updateUserWithNewPw( username, firstName,lastName, usertype, pwHash);
                    } else {
                        uDAO.updateUser(username, firstName, lastName, usertype, manager);
                    }
                    response.getWriter().write("updated user");
                    toReturn.put("success", "success");
                } catch (Exception e) {
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
