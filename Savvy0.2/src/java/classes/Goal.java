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
    private String aName;
    private double yTarget;
    private double aTarget;
    private int recruits;

    public Goal(String aName, double yTarget, double aTarget, int recruits) {
        this.aName = aName;
        this.yTarget = yTarget;
        this.aTarget = aTarget;
        this.recruits = recruits;
    }
    
    public String getaName() {
        return aName;
    }

    public void setaName(String aName) {
        this.aName = aName;
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
