package edu.pitt.flex.DTO;

public class SetDTO {
    private int id;
    private int reps;
    private int weight;

    public SetDTO() {
        // Empty constructor
    }

    public SetDTO(int id, int reps, int weight) {
        this.id = id;
        this.reps = reps;
        this.weight = weight;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }
}
