package edu.pitt.flex.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.WeightDTO;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Entity.Weight;
import edu.pitt.flex.Repository.UserRepository;
import edu.pitt.flex.Utility.Utility;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class WeightServiceImpl implements WeightService {
     @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> addWeight(WeightDTO weightDTO, HttpServletRequest request){
        String body;
        HttpStatus status;
        String date = Utility.getTodaysDate();
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        Weight lastWeight=user.getLastWeight();

        if(lastWeight!=null && date.compareTo(lastWeight.getDate())==0){
            lastWeight.setWeight(weightDTO.getWeight());
            body="Weight updated";
        }else{
            Weight weight = new Weight(weightDTO.getId(), Utility.getTodaysDate(), weightDTO.getWeight());

            user.addWeight(weight);
    
            body = "Weight has been added";
        }

        status = HttpStatus.OK;

        return new ResponseEntity<>(body, status);
    }
    
    public List<Weight> getWeights(HttpServletRequest request){
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        return user.getAllWeights();
    }

    public Weight getWeight(HttpServletRequest request){
        String date = Utility.getTodaysDate();
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        Weight lastWeight=user.getLastWeight();
        if(lastWeight!=null && date.compareTo(lastWeight.getDate())==0){
            return lastWeight;
        }
        return new Weight();
    }
}