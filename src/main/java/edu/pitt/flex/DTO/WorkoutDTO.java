package edu.pitt.flex.DTO;

import java.util.List;

public class WorkoutDTO {
    private int id;
    private int date;
    private List<ExerciseDTO> exercises;


    public WorkoutDTO() {
        // Empty constructor
    }

    public WorkoutDTO(int id, int date, List<ExerciseDTO> exercises) {
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

    public List<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
}
