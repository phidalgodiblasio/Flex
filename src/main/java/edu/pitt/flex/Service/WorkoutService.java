package edu.pitt.flex.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import edu.pitt.flex.DTO.WorkoutDTO;
import edu.pitt.flex.Entity.Workout;
import jakarta.servlet.http.HttpServletRequest;

public interface WorkoutService {
    public ResponseEntity<String> addWorkout(WorkoutDTO workoutDTO, HttpServletRequest request);
    public ResponseEntity<String> deleteWorkout(int id, HttpServletRequest request);
    public ResponseEntity<List<Workout>> getAllWorkouts(HttpServletRequest request);
    public ResponseEntity<List<Workout>> getTodaysWorkouts(HttpServletRequest request);
}
