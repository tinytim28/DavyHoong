 /*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import classes.Goal;
import connection.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.Date;
import java.time.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * @author Timothy
 */
public class GoalsDAO {
    
    private ArrayList<Goal> goals;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    
    public String retrieveGoalByAgent(String username) {
        JsonObject toReturn = new JsonObject();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from goals where username like  '" + username + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                toReturn.addProperty("username", result.getString(1));
                toReturn.addProperty("first", result.getString(2));
                toReturn.addProperty("second", result.getString(3));
                toReturn.addProperty("third", result.getString(4));
                toReturn.addProperty("fourth", result.getString(5));
                toReturn.addProperty("yearly", result.getString(6));
                toReturn.addProperty("approved", result.getString(7));
    
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return toReturn.toString();
    }
    
    public void createGoal(String username, double first, double second, double third, double fourth) {
        //  lookupList = new ArrayList<String>();
        Goal toAdd = new Goal(username, first, second, third, fourth);
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `goals` (`username`, `first`, `second` , `third`, `fourth`, `yearly`, `approved`) VALUES"
                    + "(?,?,?,?,?,?,?)");

            stmt.setString(1, toAdd.getUsername());
            stmt.setDouble(2, toAdd.getFirst());
            stmt.setDouble(3, toAdd.getSecond());
            stmt.setDouble(4, toAdd.getThird());
            stmt.setDouble(5, toAdd.getFourth());
            stmt.setDouble(6, toAdd.getYearly());
            stmt.setString(7, toAdd.getApproved());
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
    
    public void changeGoal(double first, double second, double third, double fourth, String username) {
        
        double yearly = first + second + third + fourth;
        
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `goals` SET `first`='" + first + "', `second`='" + second + "', `third` = '" + third + "', `fourth` = '" + fourth + "', `yearly` = '" + yearly + "', `approved` = 'Pending Approval'  where `username` = '" + username + "'");
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
    
    public String retrieveTeamGoals( String managerName ) {
        
        JsonArray jsonArray = new JsonArray();
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * FROM goals g INNER JOIN user u ON g.username = u.username WHERE u.manager = '" + managerName + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();
            while (result.next()) {
                
                JsonObject toReturn = new JsonObject(); 
                toReturn.addProperty("username", result.getString(1));
                toReturn.addProperty("first", result.getString(2));
                toReturn.addProperty("second", result.getString(3));
                toReturn.addProperty("third", result.getString(4));
                toReturn.addProperty("fourth", result.getString(5));
                toReturn.addProperty("yearly", result.getString(6));
                toReturn.addProperty("approved", result.getString(7));
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
    
    public void approval(String username, String approval) {
        
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `goals` SET `approved` = '" + approval + "' where `username` = '" + username + "'");
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
    
    public Double getUserPastQuarterSales(String username, String startMonth, String endMonth) {
        Double total = 0.0;

        LocalDate now = LocalDate.now();
        String endYear = now.toString().substring(0, 4);
        String startYear = now.toString().substring(0, 4);
        
        int temp = Integer.parseInt(endYear) + 1;
        
        if (endYear.equals("1")) {
            endYear = "" + temp;
        }


        if (startMonth.length() < 2) {
            startMonth = "0" + startMonth;
        }
        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + startYear + "-" + startMonth + "-01";
        String yearEnd = "" + endYear + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT SUM(expectedFYC) as 'sumOfFYC' from sales where '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and username = '" + username + "' and dateClose IS NOT NULL";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getDouble("sumOfFYC");
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
    
    public boolean checkRejected(String username) {
        Goal goal = null;
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from goals where username like  '" + username + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                String name = result.getString("username");
                double first = result.getDouble("first");
                double second = result.getDouble("second");
                double third= result.getDouble("third");
                double fourth = result.getDouble("fourth");
                String approved = result.getString("approved");
                goal = new Goal(name, first, second, third, fourth, approved);
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        if (goal != null ) {
            return true;
        }
        return false;
    }
    
    public void deleteGoal(String username) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from goals where username ='" + username + "'" );

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


//lalalaalla