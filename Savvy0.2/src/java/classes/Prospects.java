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
public class Prospects {
    private String pName;
    private String aName;
    private String pContact;
    private Date firstContact;
    private String remarks;
    
    public Prospects (String pName, String aName, String pContact, Date firstContact, String remarks){
        
        this.pName = pName;
        this.aName = aName;
        this.pContact = pContact;
        this.firstContact = firstContact;
        this.remarks = remarks;
    }
    
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
    
    public String getRemarks() {
        return remarks;
    }
    
    public String getpName() {
        return pName;
    }

    public void setpName(String pName) {
        this.pName = pName;
    }

    public String getaName() {
        return aName;
    }

    public void setaName(String aName) {
        this.aName = aName;
    }

    public String getpContact() {
        return pContact;
    }

    public void setpContact(String pContact) {
        this.pContact = pContact;
    }

    public Date getFirstContact() {
        return firstContact;
    }

    public void setFirstContact(Date firstContact) {
        this.firstContact = firstContact;
    }
 

    

}

