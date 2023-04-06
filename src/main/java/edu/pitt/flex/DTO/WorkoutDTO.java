package edu.pitt.flex.DTO;

import java.util.List;

public class WorkoutDTO {
    private int id;
    private String name;
    private String date;
    private List<ExerciseDTO> exercises;

    public WorkoutDTO() {
        // Empty constructor
    }

    public WorkoutDTO(int id, String name, String date, List<ExerciseDTO> exercises) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.exercises = exercises;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<ExerciseDTO> getExercises() {
        return exercises;
    }

    public void setExercises(List<ExerciseDTO> exercises) {
        this.exercises = exercises;
    }
}
