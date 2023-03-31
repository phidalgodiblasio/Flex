package edu.pitt.flex.Entity;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "weight")
public class Weight {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column
    private int date;

    @Column
    private double weight;

    public Weight(){
    }

    public Weight(int id, int date, double weight){
        this.id=id;
        this.date=date;
        this.weight=weight;
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

    public void setWeight(double weight){
        this.weight=weight;
    }

    public double getWeight(){
        return this.weight;
    }


}
