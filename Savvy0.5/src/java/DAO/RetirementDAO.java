/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import classes.Retirement;
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

/**
 *
 * @author tim
 */
public class RetirementDAO {

    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    public String retrieveRetirementAnalysis(int aid, String pName) {
        JsonObject jsonObject = new JsonObject();
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from retirement where pName = '" + pName + "' and aid = '" + aid + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                jsonObject.addProperty("aid", result.getInt("aid"));
                jsonObject.addProperty("pName", result.getString("pName"));
                jsonObject.addProperty("age", result.getInt("age"));
                jsonObject.addProperty("rAge", result.getInt("rAge"));
                jsonObject.addProperty("eAge", result.getInt("eAge"));
                jsonObject.addProperty("dAnnualIncome", result.getDouble("dAnnualIncome"));
                jsonObject.addProperty("otherContribuition", result.getDouble("otherContribuition"));
                jsonObject.addProperty("currentSavings", result.getDouble("currentSavings"));
                jsonObject.addProperty("rateSavings", result.getDouble("rateSavings"));
                jsonObject.addProperty("rateInflation", result.getDouble("rateInflation"));

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
        return jsonObject.toString();
    }
    
    public void addRetirementAnalysis(Retirement r1) {
        if(hasRetirementAnalysis(r1.getAid(), r1.getpName())) {
            deleteAnalysis(r1.getAid(), r1.getpName());
        }
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `retirement` (`aid`, `pName`, `age` , `rAge`, `eAge`, `dAnnualIncome`, `otherContribuitions`, `currentSavings`, `rateSavings`, `rateInflation`) VALUES"
                    + "(?,?,?,?,?,?,?,?,?,?)");
            stmt.setInt(1, r1.getAid());
            stmt.setString(2, r1.getpName());
            stmt.setInt(3, r1.getAge());
            stmt.setInt(4, r1.getrAge());
            stmt.setInt(5, r1.geteAge());
            stmt.setDouble(6, r1.getdAnnualIncome());
            stmt.setDouble(7, r1.getOtherContribuition());
            stmt.setDouble(8, r1.getCurrentSavings());
            stmt.setDouble(9, r1.getRateSavings());
            stmt.setDouble(10, r1.getRateInflation());
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
    
    public boolean hasRetirementAnalysis(int aid , String pName) {
        boolean toReturn = false;
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from retirement where pName = '" + pName + "' and aid = '" + aid + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                toReturn = true;
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
        return toReturn;
    }
    
    public void deleteAnalysis(int aid, String pName) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from retirement where aid ='" + aid + "' AND pName ='" + pName + "'");

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


