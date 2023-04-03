package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.Calendar;
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
        Calendar calendar = Calendar.getInstance();
        int year = calendar.get(Calendar.YEAR);
        int month = calendar.get(Calendar.MONTH) + 1;
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        String stringDate = "" + year + month + day;
        int date = Integer.parseInt(stringDate);



        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));
        Weight lastWeight=user.getLastWeight();
       
        if(lastWeight!=null && lastWeight.getDate()==date){
            lastWeight.setWeight(weightDTO.getWeight());
        } else{
            Weight weight = new Weight(weightDTO.getId(), weightDTO.getDate(), weightDTO.getWeight());

            user.addWeight(weight);
        }
           

            body = "Weight has been added";
            status = HttpStatus.OK;
        
        return new ResponseEntity<>(body, status);
    }
    
    public List<Weight> getWeights(HttpServletRequest request){
        List<Weight> weights = new ArrayList<Weight>();
        return weights;
        
}

}
