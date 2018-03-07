/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import classes.Notification;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import connection.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.Date;
import java.sql.Time;

/**
 *
 * @author Timothy
 */
public class NotificationDAO {
    
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    public String retrieveTeamNotification(int managerID) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from notification where managerID like '" + managerID + "' and audience = 0";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                JsonObject toReturn = new JsonObject();
                
                toReturn.addProperty("notiID", result.getInt("notiID"));
                toReturn.addProperty("managerID", result.getInt("managerID"));
                toReturn.addProperty("notificationType", result.getString("notificationType"));
                toReturn.addProperty("date", result.getDate("date").toString());
                
                if (result.getString("notificationType").toLowerCase().equals("roadshow") || result.getString("notificationType").toLowerCase().equals("calling session") || result.getString("notificationType").toLowerCase().equals("meeting")) {       
                    toReturn.addProperty("start", result.getTime("start").toString());
                    toReturn.addProperty("end", result.getTime("end").toString());
                }
                
                toReturn.addProperty("end", result.getTime("end").toString());
                toReturn.addProperty("audience", result.getInt("audience"));
                toReturn.addProperty("message", result.getString("message"));
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
    
    public String retrieveIndividualNotification(int managerID, int agentID) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from notification where managerID like '" + managerID + "' and audience = '" + agentID + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                JsonObject toReturn = new JsonObject();
                
                toReturn.addProperty("notiID", result.getInt("notiID"));
                toReturn.addProperty("managerID", result.getInt("managerID"));
                toReturn.addProperty("notificationType", result.getString("notificationType"));
                toReturn.addProperty("date", result.getDate("date").toString());         
                toReturn.addProperty("audience", result.getInt("audience"));
                toReturn.addProperty("message", result.getString("message"));
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
    
    public void createNotification(int managerID, String notificationType, Date date, Time start,  Time end, int audience, String message) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `notification` (`managerID`, `notificationType, `date` , `start`, `end`, `message`) VALUES"
                    + "(?,?,?,?,?,?)");
            stmt.setInt(1, managerID);
            stmt.setString(2, notificationType);
            stmt.setDate(3, date);
            stmt.setTime(4, start);
            stmt.setTime(5, end);
            stmt.setInt(6, audience);
            stmt.setString(7, message);
            stmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
            String error = e.getMessage();
            System.out.println(error);
        } finally {
            try {
                // rs.close();
                stmt.close();
                conn.close();
            } catch (SQLException ex) {

            }
        }
    }
    
    public void deleteNotification(int notiID) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from notification where notiID =" + notiID + "");

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
}
