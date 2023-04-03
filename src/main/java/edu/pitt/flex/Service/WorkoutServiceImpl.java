package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.ExerciseDTO;
import edu.pitt.flex.DTO.SetDTO;
import edu.pitt.flex.DTO.WorkoutDTO;
import edu.pitt.flex.Entity.Exercise;
import edu.pitt.flex.Entity.Set;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Entity.Workout;
import edu.pitt.flex.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class WorkoutServiceImpl implements WorkoutService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<String> addWorkout(WorkoutDTO workoutDTO, HttpServletRequest request) {
        // Get user
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        // Create list of exercises and add to user
        List<Exercise> exercises = createExercises(workoutDTO.getExercises());
        Workout workout = new Workout(workoutDTO.getId(), workoutDTO.getDate(), exercises);
        user.addWorkout(workout);

        // Return response
        return new ResponseEntity<>("Workout added successfuly", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<Workout>> getWorkouts(HttpServletRequest request) {
        // Get user from repository and return workouts
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        return new ResponseEntity<>(user.getAllWorkouts(), HttpStatus.OK);
    }

    private List<Set> createSets(List<SetDTO> setDTOList) {
        // Create list of exercises
        List<Set> sets = new ArrayList<>();

        // Go through DTO list amd generate sets
        for (SetDTO setDTO : setDTOList) {
            sets.add(new Set(setDTO.getId(), setDTO.getReps(), setDTO.getWeight()));
        }

        // Return final list of sets
        return sets;
    }

    private List<Exercise> createExercises(List<ExerciseDTO> exerciseDTOList) {
        // Create list of exercises
        List<Exercise> exercises = new ArrayList<>();

        // Go through DTO list and generate exercises
        for (ExerciseDTO exerciseDTO : exerciseDTOList) {
            List<Set> sets = createSets(exerciseDTO.getSets());
            exercises.add(new Exercise(exerciseDTO.getId(), exerciseDTO.getName(), sets));
        }

        // Return final list of excercises
        return exercises;
    }
}
