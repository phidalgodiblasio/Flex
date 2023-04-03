package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.Calendar;
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

    @Override
    public Intake getIntake(HttpServletRequest request) {
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));


        //get today's date
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String stringDate = "" + year + month + day;
        int date = Integer.parseInt(stringDate);

        Intake lastIntake = user.getLastIntake();

        //if there is already an intake looged today
        if(lastIntake != null && lastIntake.getDate() == date){
            //IntakeDTO intakeDTO = new IntakeDTO(lastIntake.getId(), lastIntake.getCalorieSum(), lastIntake.getCarbSum(), lastIntake.getProteinSum(), lastIntake.getFatSum());
            //return intakeDTO;
            return lastIntake;
        }
        else{
            return null;
        }
    }
    
}
