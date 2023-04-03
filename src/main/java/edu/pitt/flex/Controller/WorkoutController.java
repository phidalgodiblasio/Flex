package edu.pitt.flex.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/flex")
public class WorkoutController {
    @Autowired
    private WorkoutService workoutService;

    @PostMapping("/workout")
    public ResponseEntity<String> addWorkout(@RequestBody WorkoutDTO workoutDTO, HttpServletRequest request) {
        return workoutService.addWorkout(workoutDTO, request);
    }

    @GetMapping("/workout")
    public ResponseEntity<List<Workout>> getWorkouts(HttpServletRequest request) {
        return workoutService.getWorkouts(request);
    }
}
