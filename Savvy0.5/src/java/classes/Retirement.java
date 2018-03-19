/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

/**
 *
 * @author tim
 */
public class Retirement {
    
    int aid;
    String pName;
    int age;
    int rAge;
    int eAge;
    double dAnnualIncome;
    double otherContribuition;
    double currentSavings;
    double rateSavings;
    double rateInflation;

    public Retirement(int aid, String pName, int age, int rAge, int eAge, double dAnnualIncome, double otherContribuition, double currentSavings, double rateSavings, double rateInflation) {
        this.aid = aid;
        this.pName = pName;
        this.age = age;
        this.rAge = rAge;
        this.eAge = eAge;
        this.dAnnualIncome = dAnnualIncome;
        this.otherContribuition = otherContribuition;
        this.currentSavings = currentSavings;
        this.rateSavings = rateSavings;
        this.rateInflation = rateInflation;
    }
    
    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }
   
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getrAge() {
        return rAge;
    }

    public void setrAge(int rAge) {
        this.rAge = rAge;
    }

    public int geteAge() {
        return eAge;
    }

    public void seteAge(int eAge) {
        this.eAge = eAge;
    }

    public double getdAnnualIncome() {
        return dAnnualIncome;
    }

    public void setdAnnualIncome(double dAnnualIncome) {
        this.dAnnualIncome = dAnnualIncome;
    }

    public double getOtherContribuition() {
        return otherContribuition;
    }

    public void setOtherContribuition(double otherContribuition) {
        this.otherContribuition = otherContribuition;
    }

    public double getCurrentSavings() {
        return currentSavings;
    }

    public void setCurrentSavings(double currentSavings) {
        this.currentSavings = currentSavings;
    }

    public double getRateSavings() {
        return rateSavings;
    }

    public void setRateSavings(double rateSavings) {
        this.rateSavings = rateSavings;
    }

    public double getRateInflation() {
        return rateInflation;
    }

    public void setRateInflation(double rateInflation) {
        this.rateInflation = rateInflation;
    }
    
    
}
