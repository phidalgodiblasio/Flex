package edu.pitt.flex.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pitt.flex.DTO.IntakeDTO;
import edu.pitt.flex.Entity.Intake;
import edu.pitt.flex.Service.IntakeService;
import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin
public class IntakeController {
    @Autowired
    private IntakeService intakeService;

    //API call to either add or update today's intake values
    @PostMapping("/intake")
    public ResponseEntity<String> addIntake(@RequestBody IntakeDTO intakeDTO, HttpServletRequest request){
        return intakeService.addIntake(intakeDTO, request);
    }

    //API call to retrieve a list of all intakes for a user
    @GetMapping("/intake/all")
    public List<Intake> getIntakes(HttpServletRequest request){
        return intakeService.getIntakes(request);
    }

    //API call to retrieve today's intake values
    @GetMapping("/intake/one")
    public Intake getIntake(HttpServletRequest request){
        return intakeService.getIntake(request);
    }
    
}
