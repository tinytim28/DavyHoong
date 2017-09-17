
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.sql.Date;
/**
 *
 * @author Timothy
 */
public class SalesObject {
    
    private String username;
    private String pName;
    private Date dateClose;
    private String caseType;
    private double expectedFYC;
    private String remarks;
    
    public SalesObject ( String username,  String pName,Date dateClose, String caseType, double expectedFYC, String remarks ) {
        this.username = username;
        this.pName = pName;
        this.dateClose = dateClose;
        this.caseType = caseType;
        this.expectedFYC = expectedFYC;
        this.remarks = remarks;
        
    }

    public String getusername() {
        return username;
    }

    public Date getDateClose() {
        return dateClose;
    }


    public String getpName() {
        return pName;
    }

    public String getCaseType() {
        return caseType;
    }

    public double getExpectedFYC() {
        return expectedFYC;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setusername(String username) {
        this.username = username;
    }

    public void setDateClose(Date dateClose) {
        this.dateClose = dateClose;
    }


    public void setpName(String pName) {
        this.pName = pName;
    }

    public void setCaseType(String caseType) {
        this.caseType = caseType;
    }

    public void setExpectedFYC(double expectedFYC) {
        this.expectedFYC = expectedFYC;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
            
}
