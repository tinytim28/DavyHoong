
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
    
    private String agentName;
    private Date dateClose;
    private String customerName;
    private String caseType;
    private double expectedFYC;
    private String remarks;
    
    public SalesObject ( String agentName, Date dateClose, String customerName, String caseType, double expectedFYC, String remarks ) {
        this.agentName = agentName;
        this.dateClose = dateClose;
        this.customerName = customerName;
        this.caseType = caseType;
        this.expectedFYC = expectedFYC;
        this.remarks = remarks;
        
    }

    public String getAgentName() {
        return agentName;
    }

    public Date getDateClose() {
        return dateClose;
    }


    public String getCustomerName() {
        return customerName;
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

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public void setDateClose(Date dateClose) {
        this.dateClose = dateClose;
    }


    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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
