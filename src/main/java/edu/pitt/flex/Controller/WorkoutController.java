package edu.pitt.flex.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pitt.flex.DTO.WorkoutDTO;
import edu.pitt.flex.Entity.Workout;
import edu.pitt.flex.Service.WorkoutService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/flex")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @PostMapping("/workout")
    public ResponseEntity<String> addWorkout(@RequestBody WorkoutDTO workoutDTO, HttpServletRequest request) {
        return workoutService.addWorkout(workoutDTO, request);
    }

    @PostMapping("/workout-delete")
    public ResponseEntity<String> deleteWorkout(@RequestBody int id, HttpServletRequest request) {
        return workoutService.deleteWorkout(id, request); // Need to parse to int since JSON sends over String
    }

    @GetMapping("/workout-all")
    public ResponseEntity<List<Workout>> getAllWorkouts(HttpServletRequest request) {
        return workoutService.getAllWorkouts(request);
    }

    @GetMapping("/workout-today")
    public ResponseEntity<List<Workout>> getTodaysWorkouts(HttpServletRequest request) {
        return workoutService.getTodaysWorkouts(request);
    }
}
