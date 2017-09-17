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
    private double yTarget;
    private double aTarget;
    private int recruits;

    public Goal(String username, double yTarget, double aTarget, int recruits) {
        this.username = username;
        this.yTarget = yTarget;
        this.aTarget = aTarget;
        this.recruits = recruits;
    }
    
    public String getusername() {
        return username;
    }

    public void setusername(String username) {
        this.username = username;
    }

    public double getyTarget() {
        return yTarget;
    }

    public void setyTarget(double yTarget) {
        this.yTarget = yTarget;
    }

    public double getaTarget() {
        return aTarget;
    }

    public void setaTarget(double aTarget) {
        this.aTarget = aTarget;
    }

    public int getRecruits() {
        return recruits;
    }

    public void setRecruits(int recruits) {
        this.recruits = recruits;
    }
    
}
