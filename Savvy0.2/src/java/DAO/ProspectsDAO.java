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
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Timothy
 */
public class ProspectsDAO {
    
    private ArrayList<Prospects> prospects;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;
    
    
    public ArrayList<Prospects> retrieveAllByAgent( String username ) {
        prospects = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from prospects where username like  '" + username + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                String pName = result.getString("pName");
                String pContact = result.getString("pContact");
                Date firstContact = result.getDate("firstContact");
                String remarks = result.getString("remarks");
                
                prospects.add(new Prospects(pName, username, pContact, firstContact, remarks));
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return prospects;
    }
    
    
    public ArrayList<String> retrieveIndividualSales( String username ) {
        ArrayList<String> lookupStringList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from prospects where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                lookupStringList.add(result.getString(1));
                lookupStringList.add(result.getString(2));
                lookupStringList.add(result.getString(3));
                lookupStringList.add("" + result.getDate(4));
                lookupStringList.add(result.getString(5));
                
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
            stmt = conn.prepareStatement("Update `prospects` SET `pContact`='" + pContact + "', `remarks`='" + remarks + "',  `firstContact`='" + firstContact + "' where `pName` = '" + pName + "' and `username` = '" + username + "'");             
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
    
    
    

