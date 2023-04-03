package edu.pitt.flex.DTO;

public class IntakeDTO {
    
    private int id;
    private int date;
    private int calorieSum;
    private int carbSum;
    private int proteinSum;
    private int fatSum;

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDate() {
        return this.date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public int getCalorieSum() {
        return this.calorieSum;
    }

    public void setCalorieSum(int calorieSum) {
        this.calorieSum = calorieSum;
    }

    public int getCarbSum() {
        return this.carbSum;
    }

    public void setCarbSum(int carbSum) {
        this.carbSum = carbSum;
    }

    public int getProteinSum() {
        return this.proteinSum;
    }

    public void setProteinSum(int proteinSum) {
        this.proteinSum = proteinSum;
    }

    public int getFatSum() {
        return this.fatSum;
    }

    public void setFatSum(int fatSum) {
        this.fatSum = fatSum;
    }
}
