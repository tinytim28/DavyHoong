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
import java.time.*;

/**
 *
 * @author Timothy
 */
public class SalesObjectDAO {

    private ArrayList<SalesObject> sales;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;

    public ArrayList<SalesObject> retrieveAllByAgent(String username) {
        sales = new ArrayList<>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Select * from sales where username like  '" + username + "'");
            result = stmt.executeQuery();
            while (result.next()) {
                String name = result.getString("username");
                String pName = result.getString("pName");
                Date dateClose = result.getDate("dateClose");
                String caseType = result.getString("caseType");
                double expectedFYC = result.getDouble("expectedFYC");
                String remarks = result.getString("remarks");
                sales.add(new SalesObject(name, pName, dateClose, caseType, expectedFYC, remarks));
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sales;
    }

    public ArrayList<String> retrieveIndividualSales(String username) {
        ArrayList<String> lookupStringList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from sales where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                lookupStringList.add(result.getString(1));
                lookupStringList.add(result.getString(2));
                Date dateCheck = result.getDate(3);
                if (dateCheck == null) {
                    lookupStringList.add("Work in Progress!");
                } else {
                    lookupStringList.add("" + dateCheck);
                }
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

    public void createSale(String username, Date dateClose, String pName, String caseType, double expectedFYC, String remarks) {
        //  lookupList = new ArrayList<String>();
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `sales` (`username`, `dateClose`, `pName` , `caseType`, `expectedFYC`, `remarks`) VALUES"
                    + "(?,?,?,?,?,?)");

            stmt.setString(1, username);
            stmt.setDate(2, dateClose);
            stmt.setString(3, pName);
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

    public void deleteSale(String pName, String caseType) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from sales where pName ='" + pName + "' AND caseType = '" + caseType + "' ");

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

    public void updateSale(String username, String pName, Date dateClose, String caseType, double expectedFYC, String remarks) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `sales` SET `expectedFYC`='" + expectedFYC + "', `remarks`='" + remarks + "'  where `username` = '" + username + "' and `caseType` = '" + caseType + "' and `pName` = '" + pName + "'");
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

    public void closeSale(String username, String pName, Date dateClose, String caseType) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `sales` SET `dateClose`='" + dateClose + "'  where `username` = '" + username + "' and `caseType` = '" + caseType + "' and `pName` = '" + pName + "'");
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
    
    //MANGER METHODS FOR HOUSEKEEPING

    public Double getUserPastThreeMonthsSalesTotal(String username) {
        Double total = 0.0;

        LocalDate now = LocalDate.now();
        String endYear = now.toString().substring(0, 4); 
        String startYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        
        if (currentMonth.getValue() <= 3 ) {
            startYear = "" + (Integer.parseInt(startYear) - 1);
        }
        
        
        String startMonth = "" + currentMonth.minus(3).getValue();
        String endMonth = "" + currentMonth.getValue();

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
            String query = "SELECT SUM(expectedFYC) as 'sumOfFYC' from sales where '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and username = '" + username + "'";
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
    
    public int getUserPastThreeMonthsTotalDeals(String username) {
        int total = 0;

        LocalDate now = LocalDate.now();
        String endYear = now.toString().substring(0, 4); 
        String startYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        
        if (currentMonth.getValue() <= 3 ) {
            startYear = "" + (Integer.parseInt(startYear) - 1);
        }
        
        
        String startMonth = "" + currentMonth.minus(3).getValue();
        String endMonth = "" + currentMonth.getValue();

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
            String query = "SELECT count(*) as 'totalDeals' from sales where '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and username = '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getInt("totalDeals");
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
    
    
    public double getTeamTotalSalesOneMonth(String managerName) {
        double total = 0.0;
        int yearInt = 0;
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        String endYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String startMonth = "" + currentMonth.getValue();
        String endMonth = "" + currentMonth.plus(1).getValue();
        
        if (currentMonth.getValue() == 12 ) {
            int tempYear = Integer.parseInt(year) + 1;
            endYear = "" + tempYear;
        }

        if (startMonth.length() < 2) {
            startMonth = "0" + startMonth;
        }
        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + year + "-" + startMonth + "-01";
        String yearEnd = "" + endYear + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT sum(expectedFYC) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getDouble("selected");
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
    
    
    public double getTeamTotalSalesYTD(String managerName) {
        double total = 0.0;
        int yearInt = 0;
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        String endYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.plus(1).getValue();
        
        if (currentMonth.getValue() == 12 ) {
            int tempYear = Integer.parseInt(year) + 1;
            endYear = "" + tempYear;
        }

        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + year + "-01-01";
        String yearEnd = "" + endYear + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT sum(expectedFYC) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getDouble("selected");
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
    
    //AGENT METHODS FOR HOUSEKEEPING
    
    public double getIndividualTotalSalesOneMonth(String username) {
        double total = 0.0;
        int yearInt = 0;
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        String endYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String startMonth = "" + currentMonth.getValue();
        String endMonth = "" + currentMonth.plus(1).getValue();
        
        if (currentMonth.getValue() == 12 ) {
            int tempYear = Integer.parseInt(year) + 1;
            endYear = "" + tempYear;
        }

        if (startMonth.length() < 2) {
            startMonth = "0" + startMonth;
        }
        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + year + "-" + startMonth + "-01";
        String yearEnd = "" + endYear + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "select sum(expectedFYC) as 'selected' from sales where username ='" + username + "' and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and dateClose IS NOT NULL";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getDouble("selected");
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
    
    
    public double getIndividualTotalSalesYTD(String username) {
        double total = 0.0;
        int yearInt = 0;
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        String endYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.plus(1).getValue();
        
        if (currentMonth.getValue() == 12 ) {
            int tempYear = Integer.parseInt(year) + 1;
            endYear = "" + tempYear;
        }

        if (endMonth.length() < 2) {
            endMonth = "0" + endMonth;
        }

        String yearStart = "" + year + "-01-01";
        String yearEnd = "" + endYear + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "select sum(expectedFYC) as 'selected' from sales where username ='" + username + "' and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and dateClose IS NOT NULL";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                total = result.getDouble("selected");
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
