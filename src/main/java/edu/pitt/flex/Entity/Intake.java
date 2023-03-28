package edu.pitt.flex.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "intakes")
public class Intake {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column
    private int date;

    @Column
    private int calorieSum;

    @Column
    private int carbSum;

    @Column
    private int proteinSum;

    @Column
    private int fatSum;



    public Intake() {
    }

    public Intake(int id, int date, int calorieSum, int carbSum, int proteinSum, int fatSum) {
        this.id = id;
        this.date = date;
        this.calorieSum = calorieSum;
        this.carbSum = carbSum;
        this.proteinSum = proteinSum;
        this.fatSum = fatSum;
    }

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
