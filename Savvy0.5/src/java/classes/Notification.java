/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package classes;

import java.sql.Date;
import java.sql.Time;

/**
 *
 * @author Timothy
 */
public class Notification {
    int notiID;
    int managerID;
    String notificationType;
    String message;
    Date date;
    Time start;
    Time end;
    int priority;
    int audience;  // 0 if meant for team, else individual agentID

    public Notification(int notiID, int managerID, String notificationType, Date date, Time start, Time end, int priority, int audience, String message) {
        this.notiID = notiID;
        this.managerID = managerID;
        this.notificationType = notificationType;
        this.date = date;
        this.start = start;
        this.end = end;
        this.priority = priority;
        this.audience = audience;
        this.message = message;
    }

    public int getNotiID() {
        return notiID;
    }

    public void setNotiID(int notiID) {
        this.notiID = notiID;
    }
    
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    
    public int getManagerID() {
        return managerID;
    }

    public void setManagerID(int managerID) {
        this.managerID = managerID;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getStart() {
        return start;
    }

    public void setStart(Time start) {
        this.start = start;
    }

    public Time getEnd() {
        return end;
    }

    public void setEnd(Time end) {
        this.end = end;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public int getAudience() {
        return audience;
    }

    public void setAudience(int audience) {
        this.audience = audience;
    }
    
    
}
