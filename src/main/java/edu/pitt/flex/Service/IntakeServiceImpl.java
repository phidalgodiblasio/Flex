package edu.pitt.flex.Service;

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

        //get today's date
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String stringDate = "" + year + month + day;
        int date = Integer.parseInt(stringDate);

        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        Intake lastIntake = user.getLastIntake();

        //if there is already an intake looged today
        if(lastIntake != null && lastIntake.getDate() == date){
            //update today's intake values
            lastIntake.setCalorieSum(intakeDTO.getCalorieSum());
            lastIntake.setCarbSum(intakeDTO.getCarbSum());
            lastIntake.setProteinSum(intakeDTO.getProteinSum());
            lastIntake.setFatSum(intakeDTO.getFatSum());
            body = "intake updated";
        }
        else{
            //create new intake and add it to the user's list
            Intake intake = new Intake(intakeDTO.getId(), date, intakeDTO.getCalorieSum(), intakeDTO.getCarbSum(), intakeDTO.getProteinSum(), intakeDTO.getFatSum());
            user.addIntake(intake);
            body = "intake added";
        }

        status = HttpStatus.OK;
        return new ResponseEntity<>(body, status);
    }
    
    public List<Intake> getIntakes(HttpServletRequest request){
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        return user.getAllIntakes();
    }

    @Override
    public Intake getIntake(HttpServletRequest request) {
        //get today's date
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String stringDate = "" + year + month + day;
        int date = Integer.parseInt(stringDate);

        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        Intake lastIntake = user.getLastIntake();

        //if there is already an intake looged today
        if(lastIntake != null && lastIntake.getDate() == date){
            return lastIntake;
        }
        else{
            return new Intake();
        }
    }
    
}
