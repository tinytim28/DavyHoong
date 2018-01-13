/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

/**
 *
 * @author Timothy
 */
public class Goal {
    private String username;
    private double first;
    private double second;
    private double third;
    private double fourth;
    private double yearly;
    private String approved;
    private String changeLeft;

    public Goal(String username, double first, double second, double third, double fourth) {
        this.username = username;
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.yearly = first + second + third + fourth;
        this.approved = "Pending Approval";
        this.changeLeft = "1";   
    }
    
    public Goal(String username, double first, double second, double third, double fourth, String approved, String changeLeft) {
        this.username = username;
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.yearly = first + second + third + fourth;
        this.approved = approved;
        this.changeLeft = changeLeft;   
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public double getFirst() {
        return first;
    }

    public void setFirst(double first) {
        this.first = first;
    }

    public double getSecond() {
        return second;
    }

    public void setSecond(double second) {
        this.second = second;
    }

    public double getThird() {
        return third;
    }

    public void setThird(double third) {
        this.third = third;
    }

    public double getFourth() {
        return fourth;
    }

    public void setFourth(double fourth) {
        this.fourth = fourth;
    }

    public double getYearly() {
        return yearly;
    }

    public String getApproved() {
        return approved;
    }

    public void setApproved(String approved) {
        this.approved = approved;
    }

    public String getChangeLeft() {
        return changeLeft;
    }

    public void setChange(String changeLeft) {
        this.changeLeft = changeLeft;
    }
    
    
        
}
