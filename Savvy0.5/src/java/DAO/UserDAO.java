/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


package DAO;
 
import connection.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import classes.User;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
//hash
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.*;
import java.util.Date;

/**
 *
 * @author Timothy
 */
public class UserDAO {
    
    private ArrayList<User> users;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    
    /**
     * Retrieve all the users from the database
     *
     * @return all of the user data from the database in an ArrrayList
     */
    public ArrayList<User> retrieveAll() {
        users = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from user");
            result = stmt.executeQuery();
            while (result.next()) {
                String firstName = result.getString("firstName");
                String lastName = result.getString("lastName");
                String username = result.getString("username");
                String password = result.getString("password");
                String usertype = result.getString("usertype");
                String manager = result.getString("manager");
                String active = result.getString("active");
                users.add(new User(firstName, lastName, username, password, usertype, manager, active));
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }
    
    
    /**
     * Retrieve the user object from the database
     *
     * @return the user object of selected username
     * @param inputUsername username of the user. Username is the username that a
     * user uses to log in
     */
    public User retrieve(String inputUsername) {
        User user = null;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from user where username like '" + inputUsername + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                String firstName = result.getString("firstName");
                String lastName = result.getString("lastName");
                String username = result.getString("username");
                String password = result.getString("password");
                String usertype = result.getString("usertype");
                String manager = result.getString("manager");
                String active = result.getString("active");
                user = new User(firstName, lastName, username, password, usertype, manager, active);
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
    
    
    public void createUser( String username, String password, String firstName, String lastName, String usertype, String manager, String active ) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `user` (`firstname`, `lastname`, `username`, `password`, `usertype`, `manager`,`active`) VALUES"
                    + "(?,?,?,?,?,?,?)");
            //conn.setAutoCommit(false);

            stmt.setString(1, firstName);
            stmt.setString(2, lastName);
            stmt.setString(3, username);
            stmt.setString(4, password);
            stmt.setString(5, usertype);
            stmt.setString(6, manager);
            stmt.setString(7, active);
            stmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {

            }
        }
    }
    
    public void changePassword(User user, String password) { 
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update user set password = '" + password + "' where username like '" + user.getUsername() + "'");
            stmt.executeUpdate();

            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    
    public void deleteUser(String username) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE FROM `user` WHERE `username`=?");
            stmt.setString(1, username);

            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public void userInactive(String username) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update user set active = 'Inactive' WHERE `username`=?");
            stmt.setString(1, username);

            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public static String generateHash(String input) {
        StringBuilder hash = new StringBuilder();

        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            byte[] hashedBytes = sha.digest(input.getBytes());
            char[] digits = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'a', 'b', 'c', 'd', 'e', 'f'};
            for (int idx = 0; idx < hashedBytes.length; idx++) {
                byte b = hashedBytes[idx];
                hash.append(digits[(b & 0xf0) >> 4]);
                hash.append(digits[b & 0x0f]);
            }
        } catch (NoSuchAlgorithmException e) {
            // handle error here.
        }

        return hash.toString();
    }
    
    public Boolean login(String username, String password) {
        Boolean isAuthenticated = false;
        User user = retrieve(username);

        // remember to use the same SALT value use used while storing password
        // for the first time.
        String saltedPassword = password;
        String hashedPassword = generateHash(saltedPassword);
        if(user != null){
            String storedPasswordHash = user.getPassword();
            if (hashedPassword.equals(storedPasswordHash)) {
                isAuthenticated = true;
            } else {
                isAuthenticated = false;
            }
        }else {
            isAuthenticated = false;
        }
        return isAuthenticated;
    }
    
    public void updateUserWithNewPw(String username, String firstName, String lastName, String password) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `firstname`='" + firstName + "', `lastname`='" + lastName + "', `password` = '" + password + "'  where `username` = '" + username + "'");             
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
        

    }
    
    public void updateUser(String username, String firstName, String lastName, String manager) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `firstname`='" + firstName + "', `lastName`='" + lastName + "', `manager`='" + manager  + "'  where `username` = '" + username + "'");
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
 public String retrieveUserInfo( String teamRetrieve ) {
        JsonArray jsonArray = new JsonArray();
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from user where `manager` = '" + teamRetrieve + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                JsonObject toReturn = new JsonObject();
                toReturn.addProperty("firstname", result.getString(1));
                toReturn.addProperty("lastname", result.getString(2));
                toReturn.addProperty("username", result.getString(3));
                toReturn.addProperty("usertype", result.getString(5));
                toReturn.addProperty("manager", result.getString(6));
                toReturn.addProperty("Active", result.getString(7));
                jsonArray.add(toReturn);
                
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                result.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                Logger.getLogger(UserDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return jsonArray.toString();
    }
    
    public ArrayList<String> retrieveTeamUsernames (String managerName) {
        ArrayList<String> output = new ArrayList<>();
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select username from user where username like '" + managerName + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                
                String username = result.getString("username");
                
                output.add(username);
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return output;
    }
    
    public void makeManager(String username) {
        
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `Manager`= 'Manager' where `username` = '" + username + "'");             
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
    
    
    public void changeManager(String username, String managerName) {
        
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `Manager`= '" + managerName + "' where `username` = '" + username + "'");             
            stmt.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                //rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {
                //Logger.getLogger(CompanyDAO.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        
    }
    
}
