package edu.pitt.flex.DTO;

public class UserDTO {

    private int id;
    private String username;
    private String password;
    private int weightGoal;
    private int calGoal;
    private int proteinGoal;
    private int carbGoal;
    private int fatGoal;

    public UserDTO() {
        // Empty constructor
    }

    // goals not part of constructor
    public UserDTO(int id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getWeightGoal() {
        return weightGoal;
    }

    public void setWeightGoal(int weightGoal) {
        this.weightGoal = weightGoal;
    }

    public int getCalGoal() {
        return calGoal;
    }

    public void setCalGoal(int calGoal) {
        this.calGoal = calGoal;
    }

    public int getProteinGoal() {
        return proteinGoal;
    }

    public void setProteinGoal(int proteinGoal) {
        this.proteinGoal = proteinGoal;
    }

    public int getCarbGoal() {
        return carbGoal;
    }

    public void setCarbGoal(int carbGoal) {
        this.carbGoal = carbGoal;
    }

    public int getFatGoal() {
        return fatGoal;
    }

    public void setFatGoal(int fatGoal) {
        this.fatGoal = fatGoal;
    }
}
