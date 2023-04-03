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
@Table(name = "users")
public class User{

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(length = 30, unique = true, nullable = false)
    private String username;

    @Column(length = 255, nullable = false)
    private String password;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Intake.class)
    @JoinColumn(name = "fk_userId", referencedColumnName = "id")
    private List<Intake> intakes;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Weight.class)
    @JoinColumn(name = "fk_userId", referencedColumnName = "id")
    private List<Weight> weights;

    @OneToMany(cascade = CascadeType.ALL, targetEntity = Workout.class)
    @JoinColumn(name = "fk_userId", referencedColumnName = "id")
    private List<Workout> workouts;
    
   
    public User()
    {
        // Empty constructor
    }

    public User(int id, String username, String password)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        intakes = new ArrayList<>();
        weights=new ArrayList<>();
        workouts = new ArrayList<>();
    }

    public List<Weight> getAllWeights()
    {
        return weights;
    }

    public void addWeight(Weight weight)
    {
        weights.add(weight);
    }

    public Weight getLastWeight(){
        if (weights.size()==0){
            return null;
        }
        return weights.get(weights.size()-1);
    }


    public List<Intake> getAllIntakes()
    {
        return intakes;
    }

    //returns the intake added most recently
    public Intake getLastIntake()
    {
        if(intakes.size() == 0)
            return null;
        else
            return intakes.get(intakes.size() - 1);
    }

    //adds intake to the list
    public void addIntake(Intake intake)
    {
        intakes.add(intake);
    }

    public void addWorkout(Workout workout) {
        workouts.add(workout);
    }

    public List<Workout> getAllWorkouts() {
        return workouts;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
