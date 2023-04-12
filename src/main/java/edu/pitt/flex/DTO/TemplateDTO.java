package edu.pitt.flex.DTO;

public class TemplateDTO {

    private int id;
    private String name;
    private String[][] exercises;

    public TemplateDTO() {
    }

    public TemplateDTO(int id, String name, String[][] exercises) {
        this.id = id;
        this.name = name;
        this.exercises = exercises;
    }

    public int getId() {
        return this.id;
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

    public String[][] getExercises() {
        return this.exercises;
    }

    public void setExercises(String[][] exercises) {
        this.exercises = exercises;
    }
    
}
