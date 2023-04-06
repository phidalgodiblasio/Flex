package edu.pitt.flex.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "weight")
public class Weight {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column
    private String date;

    @Column
    private double weight;

    public Weight(){
    }

    public Weight(int id, String date, double weight){
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

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setWeight(double weight){
        this.weight=weight;
    }

    public double getWeight(){
        return this.weight;
    }
}
