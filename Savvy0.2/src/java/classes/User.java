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
public class User {
    
    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String usertype;  // 3 levels, Admin, Manager, Agent
    
    public User ( String firstName, String lastName, String username, String password, String usertype ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
        this.usertype = usertype;
    }
    
    public void setFirstName( String firstName ) {
        this.firstName = firstName;
    }
    
    public void setLastName( String lastName ) {
        this.lastName = lastName;
    }
    
    public void setUsername( String username ) {
        this.username = username;
    }
    
    public void setPassword ( String password ) {
        this.password = password;
    }
    
    public void setAdmin ( String usertype ) {
        this.usertype = usertype;
    }
    
    public String getFirstName() {
        return firstName;
    }
    
    public String getLastName() {
        return lastName;
    }
    
    public String getUsername() {
        return username;
    }
    
    public String getPassword() {
        return password;
    }
    
    public String checkAdmin() {
        return usertype;
    }
}
