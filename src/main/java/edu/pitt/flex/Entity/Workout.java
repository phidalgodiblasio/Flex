package edu.pitt.flex.Entity;

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
@Table(name = "workout")
public class Workout {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    
    @Column(nullable = false)
    private int date;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Exercise.class)
    @JoinColumn(name = "fk_workout_id", referencedColumnName = "id")
    private List<Exercise> exercises;

    public Workout() {
        // Empty constructor
    }

    public Workout(int id, int date, List<Exercise> exercises) {
        this.id = id;
        this.date = date;
        this.exercises = exercises;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDate() {
        return date;
    }

    public void setDate(int date) {
        this.date = date;
    }

    public List<Exercise> getExercises() {
        return exercises;
    }
}
