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
                users.add(new User(firstName, lastName, username, password, usertype, manager));
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
                user = new User(firstName, lastName, username, password, usertype, manager);
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
    
    
    public void createUser( String username, String password, String firstName, String lastName, String usertype, String manager ) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `user` (`username`, `password`, `firstname`, `lastname`, `usertype`, `manager`) VALUES"
                    + "(?,?,?,?,?)");
            //conn.setAutoCommit(false);

            stmt.setString(1, username);
            stmt.setString(2, password);
            stmt.setString(3, firstName);
            stmt.setString(4, lastName);
            stmt.setString(5, usertype);
            stmt.setString(6, manager);
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
            stmt = conn.prepareStatement("Update user set password = '" + password + "' where StudentID like '" + user.getUsername() + "'");
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
    
    public void updateUserWithNewPw(String username, String firstName, String lastName, String usertype, String password) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `firstname`='" + firstName + "', `lastname`='" + lastName + "',  `usertype`='" + usertype + "', `password` = '" + password + "'  where `username` = '" + username + "'");             
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
    
    public void updateUser(String username, String firstName, String lastName, String usertype, String manager) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `user` SET `firstname`='" + firstName + "', `lastName`='" + lastName + "', `manager`='" + manager + "',`usertype`='" + usertype + "'  where `username` = '" + username + "'");
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
    
    public ArrayList<String> retrieveUserInfo( String teamRetrieve ) {
        ArrayList<String> lookupStringList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from user where `manager` = '" + teamRetrieve + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                
                lookupStringList.add(result.getString(1));
                lookupStringList.add(result.getString(3));
                lookupStringList.add(result.getString(4));
                lookupStringList.add(result.getString(5));
                lookupStringList.add(result.getString(6));
                
                
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
        return lookupStringList;
    }
    
}
