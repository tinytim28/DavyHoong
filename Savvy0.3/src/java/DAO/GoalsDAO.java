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

/**
 *
 * @author Timothy
 */
public class GoalsDAO {
    
    private ArrayList<Goal> goals;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    
    public Goal retrieveGoalByAgent(String username) {
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
                String changeLeft = result.getString("changeLeft");
                goal = new Goal(name, first, second, third, fourth, approved, changeLeft);
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return goal;
    }
    
    public void createGoal(String username, double first, double second, double third, double fourth) {
        //  lookupList = new ArrayList<String>();
        Goal toAdd = new Goal(username, first, second, third, fourth);
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `goals` (`username`, `first`, `second` , `third`, `fourth`, `yearly`, `approved`, `changeLeft`) VALUES"
                    + "(?,?,?,?,?,?,?,?)");

            stmt.setString(1, toAdd.getUsername());
            stmt.setDouble(2, toAdd.getFirst());
            stmt.setDouble(3, toAdd.getSecond());
            stmt.setDouble(4, toAdd.getThird());
            stmt.setDouble(5, toAdd.getFourth());
            stmt.setDouble(6, toAdd.getYearly());
            stmt.setString(7, toAdd.getApproved());
            stmt.setString(8, toAdd.getChangeLeft());
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
            stmt = conn.prepareStatement("Update `goals` SET `first`='" + first + "', `second`='" + second + "', `third` = '" + third + "', `fourth` = '" + fourth + "', `yearly` = '" + yearly + "', `approved` = 'Pending Approval', `changeLeft` = '0'  where `username` = '" + username + "'");
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
    
    
    public void approveGoal(String username) {
        
 
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `goals` SET  `approved` = 'Approved' where `username` = '" + username + "'");
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
    
    
    public ArrayList<String> retrieveTeamGoals( String managerName ) {
        
        ArrayList<String> toReturn = new ArrayList<>();
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * FROM goals g INNER JOIN user u ON g.username = u.username WHERE u.manager = '" + managerName + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();
            while (result.next()) {
                
                toReturn.add(result.getString(1));
                toReturn.add(result.getString(2));
                toReturn.add(result.getString(3));
                toReturn.add(result.getString(4));
                toReturn.add(result.getString(5));
                toReturn.add(result.getString(6));
                toReturn.add(result.getString(7));
                toReturn.add(result.getString(8));
                
                
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
    
}
