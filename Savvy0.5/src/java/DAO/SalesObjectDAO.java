/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package DAO;

import classes.SalesObject;
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
                int salesID = result.getInt("salesID");
                String name = result.getString("username");
                String pName = result.getString("pName");
                Date dateClose = result.getDate("dateClose");
                String caseType = result.getString("caseType");
                double expectedFYC = result.getDouble("expectedFYC");
                String remarks = result.getString("remarks");
                sales.add(new SalesObject(salesID, name, pName, dateClose, caseType, expectedFYC, remarks));
            }
            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return sales;
    }

    public String retrieveAllSales(String username) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT salesid,sales.username,pName,dateClose,caseType,expectedFYC,remarks from user,sales where sales.username = user.username AND user.manager like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                JsonObject toReturn = new JsonObject();

                toReturn.addProperty("SalesID", result.getString(1));
                toReturn.addProperty("username", result.getString(2));
                toReturn.addProperty("pName", result.getString(3));
                Date dateCheck = result.getDate(4);
                if (dateCheck == null) {
                    toReturn.addProperty("dateClose", "Work in Progress!");
                } else {
                    toReturn.addProperty("dateClose", dateCheck.toString());
                }
                toReturn.addProperty("caseType", result.getString(5));
                toReturn.addProperty("expectedFYC", result.getDouble(6));
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
                toReturn.addProperty("username", result.getString(2));
                toReturn.addProperty("pName", result.getString(3));
                Date dateCheck = result.getDate(4);
                if (dateCheck == null) {
                    toReturn.addProperty("dateClose", "Work in Progress!");
                } else {
                    toReturn.addProperty("dateClose", dateCheck.toString());
                }
                toReturn.addProperty("caseType", result.getString(5));
                toReturn.addProperty("expectedFYC", result.getDouble(6));
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

    public String retrieveProgressSales(String username) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from sales where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {

                JsonObject toReturn = new JsonObject();
                Date dateCheck = result.getDate(4);
                if (dateCheck == null) {
                    toReturn.addProperty("SalesID", result.getString(1));
                    toReturn.addProperty("username", result.getString(2));
                    toReturn.addProperty("pName", result.getString(3));
                    toReturn.addProperty("dateClose", "Work in Progress!");
                    toReturn.addProperty("caseType", result.getString(5));
                    toReturn.addProperty("expectedFYC", result.getDouble(6));
                    toReturn.addProperty("remarks", result.getString(7));
                    jsonArray.add(toReturn);
                }

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

    public String retrieveClosedSales(String username) {
        JsonArray jsonArray = new JsonArray();
        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from sales where username like '" + username + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                JsonObject toReturn = new JsonObject();
                Date dateCheck = result.getDate(4);
                if (dateCheck != null) {
                    toReturn.addProperty("SalesID", result.getString(1));
                    toReturn.addProperty("username", result.getString(2));
                    toReturn.addProperty("pName", result.getString(3));
                    toReturn.addProperty("dateClose", dateCheck.toString());
                    toReturn.addProperty("caseType", result.getString(5));
                    toReturn.addProperty("expectedFYC", result.getDouble(6));
                    toReturn.addProperty("remarks", result.getString(7));
                    jsonArray.add(toReturn);
                }

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

    public void deleteSale(String username, String pName, int salesID) {
        try {

            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("DELETE from sales where username ='" + username + "' AND pName ='" + pName + "' AND salesid = '" + salesID + "'");

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
            stmt = conn.prepareStatement("Update `sales` SET `expectedFYC`='" + expectedFYC + "', `remarks`='" + remarks + "', `caseType`='" + caseType + "'   where `username` = '" + username + "' and `salesID` = '" + salesID + "'");
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

    //AGENT METHODS FOR HOUSEKEEPING
    public JsonObject getIndividualTotalSalesOneMonth(String username) {
        JsonObject jsonObj = new JsonObject();
        double sum = 0.0;
        double average = 0.0;
        int lifeCount = 0;
        int investmentCount = 0;
        int savingsCount = 0;
        int hospitalisationCount = 0;
        int retirementCount = 0;
        int othersCount = 0;
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
            String query = "select sum(expectedFYC) as 'sum', avg(expectedFYC) as 'average',if((`caseType` = \"Life\"),1,0) as lifeCount, if((`caseType` = \"Investment\"),1,0) as investmentCount,if((`caseType` = \"Savings\"),1,0) as savingsCount,if((`caseType` = \"Hospitalisation\"),1,0) as hospitalisationCount, if((`caseType` = \"Retirement\"),1,0) as retirementCount,if((`caseType` = \"Others\"),1,0) as othersCount  from sales where username ='" + username + "' and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and dateClose IS NOT NULL group by salesid";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                sum = result.getDouble("sum");
                average = result.getDouble("average");
                lifeCount = result.getInt("lifeCount");
                investmentCount = result.getInt("investmentCount");
                savingsCount = result.getInt("savingsCount");
                hospitalisationCount = result.getInt("hospitalisationCount");
                retirementCount = result.getInt("retirementCount");
                othersCount = result.getInt("othersCount");
                jsonObj.addProperty("sum", sum);
                jsonObj.addProperty("average", average);
                jsonObj.addProperty("lifeCount", lifeCount);
                jsonObj.addProperty("investmentCount", investmentCount);
                jsonObj.addProperty("savingsCount", savingsCount);
                jsonObj.addProperty("hospitalisationCount", hospitalisationCount);
                jsonObj.addProperty("retirementCount", retirementCount);
                jsonObj.addProperty("othersCount", othersCount);

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
        return jsonObj;
    }

    public JsonArray getIndividualTotalSalesYTD(String username) {

        JsonArray jsonArr = new JsonArray();
        String dateClose = "";
        double expectedFYC = 0.0;
        int lifeCount = 0;
        int investmentCount = 0;
        int savingsCount = 0;
        int hospitalisationCount = 0;
        int retirementCount = 0;
        int othersCount = 0;
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.getValue();

        String dateStart = "" + year + "-01-01";
        String dateEnd = "" + year + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            String query = "select dateClose,expectedFYC,if((`caseType` = \"Life\"),1,0) as lifeCount, if((`caseType` = \"Investment\"),1,0) as investmentCount,if((`caseType` = \"Savings\"),1,0) as savingsCount,if((`caseType` = \"Hospitalisation\"),1,0) as hospitalisationCount, if((`caseType` = \"Retirement\"),1,0) as retirementCount,if((`caseType` = \"Others\"),1,0) as othersCount  from sales where username ='" + username + "' and '" + dateStart + "' <= dateClose and dateClose < '" + dateEnd + "' and dateClose IS NOT NULL group by salesid order by dateClose";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                JsonObject jsonObj = new JsonObject();
                dateClose = result.getString("dateClose");
                expectedFYC = result.getDouble("expectedFYC");
                lifeCount = result.getInt("lifeCount");
                investmentCount = result.getInt("investmentCount");
                savingsCount = result.getInt("savingsCount");
                hospitalisationCount = result.getInt("hospitalisationCount");
                retirementCount = result.getInt("retirementCount");
                othersCount = result.getInt("othersCount");
                jsonObj.addProperty("dateClose", dateClose);
                jsonObj.addProperty("expectedFYC", expectedFYC);
                jsonObj.addProperty("lifeCount", lifeCount);
                jsonObj.addProperty("investmentCount", investmentCount);
                jsonObj.addProperty("savingsCount", savingsCount);
                jsonObj.addProperty("hospitalisationCount", hospitalisationCount);
                jsonObj.addProperty("retirementCount", retirementCount);
                jsonObj.addProperty("othersCount", othersCount);
                jsonArr.add(jsonObj);
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
        return jsonArr;
    }

    public String retrieveTeamSalesMonth(String managerName, String month) {
        JsonArray returnArray = new JsonArray();
        LocalDate now = LocalDate.now();
        String yearStart = now.toString().substring(0, 4);
        String yearEnd = now.toString().substring(0, 4);
        String startMonth = "";
        String endMonth = "";
        if (month.length() < 2) {
            startMonth = "0" + month;
        } else {
            startMonth = "" + month;
        }

        if (month.equals("12")) {
            int tempYear = Integer.parseInt(yearEnd) + 1;
            yearEnd = "" + tempYear;
            endMonth = "01";
        } else if (Integer.parseInt(month) < 10) {
            int temp = Integer.parseInt(month) + 1;
            endMonth = "0" + temp;
        } else {
            int temp = Integer.parseInt(month) + 1;
            endMonth = "" + temp;
        }

        String dateStart = "" + yearStart + "-" + startMonth + "-01";
        String dateEnd = "" + yearEnd + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select username, sum(expectedFYC) as totalSales from sales where username in (select username from user where manager = '" + managerName + "') and dateClose IS NOT NULL and '" + dateStart + "' <= dateClose and dateClose < '" + dateEnd + "' group by username order by totalSales desc");
            result = stmt.executeQuery();
            while (result.next()) {
                JsonObject jsonObj = new JsonObject();
                String username = result.getString("username");
                double totalSales = result.getDouble("totalSales");
                jsonObj.addProperty("username", username);
                jsonObj.addProperty("totalSales", totalSales);
                returnArray.add(jsonObj);

            }

            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return returnArray.toString();
    }

    public String retrieveTeamSalesYTD(String managerName) {
        JsonArray returnArray = new JsonArray();
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.getValue();

        String dateStart = "" + year + "-01-01";
        String dateEnd = "" + year + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select username, sum(expectedFYC) as totalSales,avg(expectedFYC) as averageSales  "
                    + " from sales where username in (select username from user where manager = '" + managerName + "') and dateClose IS NOT NULL and '" + dateStart + "' <= dateClose and dateClose < '" + dateEnd + "' group by username order by totalSales desc");
            result = stmt.executeQuery();
            while (result.next()) {
                JsonObject jsonObj = new JsonObject();

                String username = result.getString("username");
                double totalSales = result.getDouble("totalSales");
                jsonObj.addProperty("username", username);
                jsonObj.addProperty("totalSales", totalSales);
                returnArray.add(jsonObj);

            }

            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return returnArray.toString();
    }

    public String retrieveTeamSalesCaseType(String managerName, String casetype) {
        JsonArray returnArray = new JsonArray();
        LocalDate now = LocalDate.now();
        String year = now.toString().substring(0, 4);
        Month currentMonth = now.getMonth();
        String endMonth = "" + currentMonth.getValue();

        String dateStart = "" + year + "-01-01";
        String dateEnd = "" + year + "-" + endMonth + "-01";

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("select username, sum(expectedFYC) as totalSales"
                    + " from sales where username in (select username from user where  manager = '" + managerName + "') and caseType = '" + casetype + "' and dateClose IS NOT NULL and '" + dateStart + "' <= dateClose and dateClose < '" + dateEnd + "' group by username order by totalSales desc");
            result = stmt.executeQuery();
            while (result.next()) {
                JsonObject jsonObj = new JsonObject();

                String username = result.getString("username");
                double totalSales = result.getDouble("totalSales");
                jsonObj.addProperty("username", username);
                jsonObj.addProperty("totalSales", totalSales);
                returnArray.add(jsonObj);

            }

            if (conn != null) {
                ConnectionManager.close(conn, stmt, result);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return returnArray.toString();
    }

    public int retrieveTotalLifeCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Life'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public int retrieveTotalInvestmentCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Investment'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public int retrieveTotalSavingsCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Savings'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public int retrieveTotalHospitalCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Hospitalisation'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public int retrieveTotalRetirementCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Retirement'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public int retrieveTotalOthersCasesTeam(String managerName, String yearStart, String yearEnd) {
        int output = 0;

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT count(*) as 'selected' FROM sales s INNER JOIN user u ON s.username = u.username WHERE u.manager = '" + managerName + "' and dateClose IS NOT NULL and '" + yearStart + "' <= dateClose and dateClose < '" + yearEnd + "' and caseType = 'Others'";
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
                Logger.getLogger(UserDAO.class
                        .getName()).log(Level.SEVERE, null, ex);
            }
        }

        return output;
    }

    public String getCaseBreakdownYTD(String managerName, String yearStart, String yearEnd) {
        JsonArray jsonArray = new JsonArray();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("Life", retrieveTotalLifeCasesTeam(managerName, yearStart, yearEnd));
        jsonObject.addProperty("Investment", retrieveTotalInvestmentCasesTeam(managerName, yearStart, yearEnd));
        jsonObject.addProperty("Savings", retrieveTotalSavingsCasesTeam(managerName, yearStart, yearEnd));
        jsonObject.addProperty("Hospitalisation", retrieveTotalHospitalCasesTeam(managerName, yearStart, yearEnd));
        jsonObject.addProperty("Retirement", retrieveTotalRetirementCasesTeam(managerName, yearStart, yearEnd));
        jsonObject.addProperty("Others", retrieveTotalOthersCasesTeam(managerName, yearStart, yearEnd));
        jsonArray.add(jsonObject);

        return jsonArray.toString();

    }

}
