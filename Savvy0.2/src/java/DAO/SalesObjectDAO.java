/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import classes.SalesObject;
import connection.ConnectionManager;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.sql.Date;


/**
 *
 * @author Timothy
 */
public class SalesObjectDAO {
    
    private ArrayList<SalesObject> sales;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    public ArrayList<SalesObject> retrieveAllByAgent( String agentName ) {
         sales = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from sales where agentName like  '" + agentName + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                String name = result.getString("agentName");
                Date dateClose = result.getDate("dateClose");
                String customerName = result.getString("usertype");
                String caseType = result.getString("caseType");
                double expectedFYC = result.getDouble("expectedFYC");
                String remarks = result.getString("remarks");
                sales.add(new SalesObject(name, dateClose, customerName, caseType, expectedFYC, remarks));
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sales;
    }
    
    public ArrayList<String> retrieveIndividualSales( String agentName ) {
        ArrayList<String> lookupStringList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from sales where agentName like '" + agentName + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                lookupStringList.add(result.getString(1));
                lookupStringList.add("" + result.getDate(2));
                lookupStringList.add(result.getString(3));
                lookupStringList.add(result.getString(4));
                lookupStringList.add("" + result.getDouble(5));
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
    
    public void createSale( String agentName, Date dateClose, String customerName, String caseType, double expectedFYC, String remarks ) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `sales` (`agentName`, `dateClose`, `customerName` , `caseType`, `expectedFYC`, `remarks`) VALUES"
                    + "(?,?,?,?,?,?)");

            stmt.setString(1, agentName);
            stmt.setDate(2, dateClose);
            stmt.setString(3, customerName);
            stmt.setString(4, caseType);
            stmt.setDouble(5, expectedFYC);
            stmt.setString(6, remarks);
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
    
    public void deleteSale(String customerName, String caseType) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from sales where customerName ='" + customerName + "' AND caseType = '" + caseType + "' " );

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
    
    public void updateSale(String agentName, Date dateClose, String customerName, String caseType, double expectedFYC, String remarks) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `sales` SET `expectedFYC`='" + expectedFYC + "', `remarks`='" + remarks + "'  where `agentName` = '" + agentName + "' and `caseType` = '"+ caseType +"' and `customerName` = '" + customerName + "'");             
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
