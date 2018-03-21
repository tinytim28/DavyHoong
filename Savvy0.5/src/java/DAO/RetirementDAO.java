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

    public String retrieveRetirementAnalysisInputs(int aid, String pName) {
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

    public String retrieveRetirementAnalysisByAgent(int aid) {
        JsonArray jsonArr = new JsonArray();

        try {
            conn = ConnectionManager.getConnection();
            String query = "SELECT * from retirement where aid = '" + aid + "'";
            stmt = conn.prepareStatement(query);
            result = stmt.executeQuery();

            while (result.next()) {
                JsonObject jsonObject = new JsonObject();
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
                jsonArr.add(jsonObject);

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
        return jsonArr.toString();
    }

    public void addRetirementAnalysis(Retirement r1) {
        if (hasRetirementAnalysis(r1.getAid(), r1.getpName())) {
            deleteAnalysis(r1.getAid(), r1.getpName());
        }

        try {
            conn = ConnectionManager.getConnection();
            stmt = conn.prepareStatement("INSERT INTO `retirement` (`aid`, `pName`, `age` , `rAge`, `eAge`, `dAnnualIncome`, `otherContribuition`, `currentSavings`, `rateSavings`, `rateInflation`) VALUES"
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

    public boolean hasRetirementAnalysis(int aid, String pName) {
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

    public String generateGraphAndTable(int age, int rAge, double amountOfSavings, double presentValueNeededFunds, double firstYearSavingContribuitions, double realDollarContribuition, double rateSavings, double rateInflation, double dAnnualIncome, double otherContribuition, double currentSavings) {
        JsonArray jsonArray = new JsonArray();

        ArrayList<double[]> list = new ArrayList<>();
        ArrayList<double[]> output = new ArrayList<>();

        int ageCounter = age;
        int year = 1;
        int counter = -1;

        for (int i = ageCounter; i <= 90; i++) {
            JsonObject jsonOutput = new JsonObject();
            double[] temp = new double[4];
            double[] outputList = new double[4];
            //System.out.println("counter: " + counter);

            // age
            temp[0] = (double) i;
            outputList[0] = temp[0];
            jsonOutput.addProperty("age", outputList[0]);

            //annual savings
            if (year < (rAge - age + 1)) {
                temp[1] = realDollarContribuition * java.lang.Math.pow((1 + rateInflation), year);
                outputList[1] = Math.ceil(temp[1]);
                jsonOutput.addProperty("annualSavings", outputList[1]);
            } else {
                temp[1] = 0;
                outputList[1] = Math.ceil(temp[1]);
                jsonOutput.addProperty("annualSavings", outputList[1]);
            }

            //Cumulative savings
            if ((double) i == age) {
                temp[2] = temp[1] + currentSavings * (1 + rateSavings);
                outputList[2] = Math.ceil(temp[2]);
                jsonOutput.addProperty("cumulativeSavings", outputList[2]);
            } else {
                if (year < (rAge - age + 1)) {
                    temp[2] = list.get(counter)[2] * (1 + rateSavings) + temp[1];
                    outputList[2] = Math.ceil(temp[2]);
                    jsonOutput.addProperty("cumulativeSavings", outputList[2]);
                } else if (list.get(counter)[2] * (1 + rateSavings) - ((dAnnualIncome - otherContribuition) * ((1 + java.lang.Math.pow((1 + rateInflation), year)))) > 0) {
                    temp[2] = (list.get(counter)[2] * (1 + rateSavings) - ((dAnnualIncome - otherContribuition) * (java.lang.Math.pow((1 + rateInflation), year))));
                    outputList[2] = Math.ceil(temp[2]);
                    jsonOutput.addProperty("cumulativeSavings", outputList[2]);
                } else {
                    temp[2] = 0;
                    outputList[2] = Math.ceil(temp[2]);
                    jsonOutput.addProperty("cumulativeSavings", outputList[2]);
                }
            }

            //Monthly Saving Goal
            temp[3] = temp[1] / 12;
            outputList[3] = Math.ceil(temp[3]);
            jsonOutput.addProperty("monthlySavingGoal", outputList[3]);

            list.add(temp);
            output.add(outputList);

            year++;
            counter++;
            jsonArray.add(jsonOutput);
        }
        return jsonArray.toString();
    }
}
