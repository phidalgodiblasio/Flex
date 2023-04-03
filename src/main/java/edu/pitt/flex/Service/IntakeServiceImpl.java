package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.IntakeDTO;
import edu.pitt.flex.Entity.Intake;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class IntakeServiceImpl implements IntakeService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> addIntake(IntakeDTO intakeDTO, HttpServletRequest request){
        // Response body and status
        String body;
        HttpStatus status;

        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        if(user == null){
            body = "User not logged in";
            status = HttpStatus.BAD_REQUEST;
        }
        else{
            Intake intake = new Intake(intakeDTO.getId(), intakeDTO.getDate(), intakeDTO.getCalorieSum(), intakeDTO.getCarbSum(), intakeDTO.getProteinSum(), intakeDTO.getFatSum());

            user.addIntake(intake);

            body = "intake added";
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(body, status);
    }
    
    public List<Intake> getIntakes(HttpServletRequest request){
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        if(user != null){
           return user.getAllIntakes();
        }
        else{
            List<Intake> intakes = new ArrayList<Intake>();
            return intakes;
        }
    }
    
}
