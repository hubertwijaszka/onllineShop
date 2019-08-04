package com.AI.onlineShop.entities;


import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "clients")
@Entity
public class Client {
    @Id
    private long clientId;
    private String login;
    private String mailAddres;
    private long isAdmin;
    private long isActive;
    private String password;


    public long getClientId() {
        return clientId;
    }

    public void setClientId(long clientId) {
        this.clientId = clientId;
    }


    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }


    public String getMailAddres() {
        return mailAddres;
    }

    public void setMailAddres(String mailAddres) {
        this.mailAddres = mailAddres;
    }


    public long getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(long isAdmin) {
        this.isAdmin = isAdmin;
    }


    public long getIsActive() {
        return isActive;
    }

    public void setIsActive(long isActive) {
        this.isActive = isActive;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
