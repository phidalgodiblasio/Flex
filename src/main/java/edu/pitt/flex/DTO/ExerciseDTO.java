package edu.pitt.flex.DTO;

import java.util.List;

public class ExerciseDTO {
    private int id;
    private String name;
    private List<SetDTO> sets;

    public ExerciseDTO() {
        // Empty constructor
    }

    public ExerciseDTO(int id, String name, List<SetDTO> sets) {
        this.id = id;
        this.name = name;
        this.sets = sets;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SetDTO> getSets() {
        return sets;
    }

    public void setSets(List<SetDTO> sets) {
        this.sets = sets;
    }
}
