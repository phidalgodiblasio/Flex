package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.WeightDTO;
import edu.pitt.flex.Entity.Weight;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class WeightServiceImpl implements WeightService {
     @Autowired
    private UserRepository userRepository;

    public ResponseEntity<String> addWeight(WeightDTO weightDTO, HttpServletRequest request){
        String body;
        HttpStatus status;

        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        if(user == null){
            body = "User not logged in";
            status = HttpStatus.BAD_REQUEST;
        }
        else{
            Weight weight = new Weight(weightDTO.getId(), weightDTO.getDate(), weightDTO.getWeight());

            user.addWeight(weight);

            body = "Weight has been added";
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(body, status);
    }
    
    public List<Weight> getWeights(HttpServletRequest request){
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        if(user != null){
           return user.getAllWeights();
        }
        else{
            List<Weight> weights = new ArrayList<Weight>();
            return weights;
        }
}

}
