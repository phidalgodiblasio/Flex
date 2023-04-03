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

import edu.pitt.flex.DTO.IntakeDTO;
import edu.pitt.flex.DTO.UserDTO;
import edu.pitt.flex.Entity.Intake;
import edu.pitt.flex.Service.IntakeService;
import edu.pitt.flex.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
@RequestMapping("/flex")
public class IntakeController {
    @Autowired
    private IntakeService intakeService;
    @Autowired
    private UserService userService;

    // API call to either add or update today's intake values
    @PostMapping("/intake")
    public ResponseEntity<String> addIntake(@RequestBody IntakeDTO intakeDTO, HttpServletRequest request) {
        return intakeService.addIntake(intakeDTO, request);
    }

    // for goals.
    @PostMapping("/intake-goal")
    public ResponseEntity<String> setIntakeGoals(@RequestBody UserDTO userDTO, HttpServletRequest request) {
        return userService.setIntakeGoal(userDTO, request);
    }

    @GetMapping("/intake")
    public List<Intake> getIntakes(HttpServletRequest request) {
        return intakeService.getIntakes(request);
    }

    // API call to retrieve today's intake values
    @GetMapping("/intake/one")
    public Intake getIntake(HttpServletRequest request) {
        return intakeService.getIntake(request);
    }

}
