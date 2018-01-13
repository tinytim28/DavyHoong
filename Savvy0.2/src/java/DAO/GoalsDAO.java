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
                goal = new Goal(username, first, second, third, fourth, approved, changeLeft);
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
    
}
