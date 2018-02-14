/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import java.sql.Date;
import classes.Prospects;
import connection.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * @author Timothy
 */
public class ProspectsDAO {
    
    private ArrayList<Prospects> prospects;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    
    
    
    
    public String retrieveIndividualProspects( String username ) {
        JsonArray jsonArray = new JsonArray();
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from prospects where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                JsonObject toReturn = new JsonObject();
                toReturn.addProperty("pName", result.getString(1));
                toReturn.addProperty("username", result.getString(2));
                toReturn.addProperty("pContact", result.getString(3));
                toReturn.addProperty("firstContact", result.getDate(4).toString());
                toReturn.addProperty("remarks", result.getString(5));
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
    
    
    public void createProspect( String pName, String username, String pContact, Date firstContact, String remarks ) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `prospects` (`pName`, `username`, `pContact` , `firstContact`, `remarks`) VALUES"
                    + "(?,?,?,?,?)");

            stmt.setString(1, pName);
            stmt.setString(2, username);
            stmt.setString(3, pContact);
            stmt.setDate(4, firstContact);
            stmt.setString(5, remarks);
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
    
    
    public void deleteProspect(String pName, String username) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from prospects where pName ='" + pName + "' AND username = '" + username + "' " );

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
    
    public void updateProspect(String pName, String username, String pContact, Date firstContact, String remarks) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `prospects` SET `pContact`='" + pContact + "', `remarks`='" + remarks + "',  `firstContact`='" + firstContact + "' where `username` = '" + username + "' and pName = '" + pName + "'");             
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
    
    public int getUserPastThreeMonthsTotalProspects(String username) {
        int total = 0;

        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String startMonth = "" + currentMonth.minus(3).getValue();
        String endMonth = "" + currentMonth.getValue();

        if (startMonth.length() < 2) {
            startMonth = "0" + startMonth;
        }
        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + year + "-" + startMonth + "-01";
        String yearEnd = "" + year + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'totalProspects' from prospects where '" + yearStart + "' <= firstContact and firstContact < '" + yearEnd + "' and username = '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getInt("totalProspects");
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
        return total;
    }
}
    
    
    

