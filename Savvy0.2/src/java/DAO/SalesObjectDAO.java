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
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

/**
 *
 * @author Timothy
 */
public class SalesObjectDAO {

    private ArrayList<SalesObject> sales;
    private Connection conn;
    private ResultSet result;
    private PreparedStatement stmt;

    

    public String retrieveIndividualSales(String username) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from sales where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                JsonObject toReturn = new JsonObject();
                
                toReturn.addProperty("SalesID", result.getString(1));
                toReturn.addProperty("username" ,result.getString(2));
                toReturn.addProperty("pName", result.getString(3));
                Date dateCheck = result.getDate(4);
                if (dateCheck == null) {
                    toReturn.addProperty("dateClose", "Work in Progress!");
                } else {
                    toReturn.addProperty("dateClose", dateCheck.toString());
                }
                toReturn.addProperty("caseType", result.getString(5));
                toReturn.addProperty("expectedFYC" , result.getDouble(6));
                toReturn.addProperty("remarks", result.getString(7));
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

    public void deleteSale(String pName, int salesID) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from sales where pName ='" + pName + "' AND salesID = '" + salesID + "' ");

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

    public void updateSale(int salesID, String username, String pName, Date dateClose, String caseType, double expectedFYC, String remarks) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `sales` SET `expectedFYC`='" + expectedFYC + "', `remarks`='" + remarks + "', `caseType`='" + caseType + "'   where `username` = '" + username + "' and `salesID` = '" + salesID + "' and dateClose IS NOT NULL");
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

    public void closeSale(String username, int salesID, Date dateClose) {

        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("Update `sales` SET `dateClose`='" + dateClose + "'  where `username` = '" + username + "' and `salesID` = '" + salesID + "'  and dateClose IS NULL");
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

        if (currentMonth.getValue() <= 3) {
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

    public int getUserPastThreeMonthsTotalDeals(String username) {
        int total = 0;

        LocalDate now = LocalDate.now();
        String endYear = now.toString().substring(0, 4);
        String startYear = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();

        if (currentMonth.getValue() <= 3) {
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
            String query = "SELECT count(*) as 'totalDeals' from sales where '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and username = '" + username + "' and dateClose IS NOT NULL";
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

        if (currentMonth.getValue() == 12) {
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

        if (currentMonth.getValue() == 12) {
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

        if (currentMonth.getValue() == 12) {
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

        if (currentMonth.getValue() == 12) {
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
    
    public ArrayList<String> retrieveTeamSalesMonthAny (String managerName, String month) {
        ArrayList<String> output = new ArrayList<>();
        
        ArrayList<String> usernames = new ArrayList<>();
        ArrayList<Double> fyc = new ArrayList<>();
        double total = 0.0;
        
        LocalDate now = LocalDate.now();
        String yearStart = now.toString().substring(0, 4);
        String yearEnd = now.toString().substring(0, 4);
        String startMonth = "";
        String endMonth = "";
        
        if ( month.length() < 2 ) {
            startMonth = "0" + month;
        } else {
            startMonth = "" + month;
        }
        
        if (month.equals("12")) {
            int tempYear = Integer.parseInt(yearEnd) + 1;
            yearEnd = "" + tempYear;
            endMonth = "01";
        } else if (Integer.parseInt(month) < 10 ) {
            int temp = Integer.parseInt(month) + 1;
            endMonth = "0" + temp;
        } else {
            int temp = Integer.parseInt(month) + 1;
            endMonth = "" + temp;
        }
        
        String dateStart = "" + yearStart + "-" + startMonth + "-01";
        String dateEnd = "" +  yearEnd + "-" + endMonth + "-01";
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select username, sum(expectedFYC) as totalSales from sales where username in (select username from user where manager = '"+ managerName +"') and dateClose IS NOT NULL and '"+ dateStart + "' <= dateClose and dateClose < '"+ dateEnd +"' group by username order by totalSales desc");
            result = stmt.executeQuery();
            while (result.next()) {
                String username = result.getString("username");
                double totalSales = result.getDouble("totalSales");
                
                usernames.add(username);
                fyc.add(totalSales);
                
            }
            
            for ( int i = 0; i < usernames.size(); i++ ) {
                String current = usernames.get(i);
                output.add(current);
            }
            
            for ( int j = 0; j < fyc.size(); j++ ) {
                double currentFigure = fyc.get(j);
                total = total + currentFigure;
                String toAdd = "" + currentFigure;
                output.add(toAdd);
            }
            
            String last = "" + total;
            output.add(last);
            
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return output;
    }
    
    
    public ArrayList<String> retrieveTeamSalesMonthYTD (String managerName) {
        ArrayList<String> output = new ArrayList<>();
        
        ArrayList<String> usernames = new ArrayList<>();
        ArrayList<Double> fyc = new ArrayList<>();
        double total = 0.0;
        
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.getValue();
        
        
        
        String dateStart = "" + year + "-01-01";
        String dateEnd = "" +  year+ "-" + endMonth + "-01";
        
        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select username, sum(expectedFYC) as totalSales from sales where username in (select username from user where manager = '"+ managerName +"') and dateClose IS NOT NULL and '"+ dateStart + "' <= dateClose and dateClose < '"+ dateEnd +"' group by username order by totalSales desc");
            result = stmt.executeQuery();
            while (result.next()) {
                String username = result.getString("username");
                double totalSales = result.getDouble("totalSales");
                
                usernames.add(username);
                fyc.add(totalSales);
                
            }
            
            for ( int i = 0; i < usernames.size(); i++ ) {
                String current = usernames.get(i);
                output.add(current);
            }
            
            for ( int j = 0; j < fyc.size(); j++ ) {
                double currentFigure = fyc.get(j);
                total = total + currentFigure;
                String toAdd = "" + currentFigure;
                output.add(toAdd);
            }
            
            String last = "" + total;
            output.add(last);
            
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return output;
    }
    
    
    public int retrieveTotalLifeCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;
         
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Life'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        
        return output;
    }
    
    public int retrieveTotalInvestmentCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;
        
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Investment'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        
        return output;
    }
    
    public int retrieveTotalSavingsCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;
         
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Savings'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        return output;
    }
    
    public int retrieveTotalHospitalCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;
         
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Hospitalisation'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        return output;
    }
    
    public int retrieveTotalRetirementCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;
         
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Retirement'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        return output;
    }
    
    public int retrieveTotalOthersCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0; 
        
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '"+ managerName +"' and dateClose IS NOT NULL and '"+ yearStart +"' <= dateClose and dateClose < '"+ yearEnd +"' and caseType = 'Others'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                output = result.getInt("selected");
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
        
        return output;
    }
    
    
    public ArrayList<String> getCaseBreakdownYTD (String managerName, String yearStart, String yearEnd) {
        
        ArrayList<String> output = new ArrayList<>();
        
        output.add( "" + retrieveTotalLifeCasesTeam(managerName, yearStart, yearEnd));
        output.add( "" + retrieveTotalInvestmentCasesTeam(managerName, yearStart, yearEnd));
        output.add( "" + retrieveTotalSavingsCasesTeam(managerName, yearStart, yearEnd));
        output.add( "" + retrieveTotalHospitalCasesTeam(managerName, yearStart, yearEnd));
        output.add( "" + retrieveTotalRetirementCasesTeam(managerName, yearStart, yearEnd));
        output.add( "" + retrieveTotalOthersCasesTeam(managerName, yearStart, yearEnd));
        
        return output;
       
    }
    
}


//lalalaalal