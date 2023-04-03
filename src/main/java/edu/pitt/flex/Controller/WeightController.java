package edu.pitt.flex.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pitt.flex.DTO.WeightDTO;
import edu.pitt.flex.Entity.Weight;
import edu.pitt.flex.Service.WeightService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class WeightController {
    @Autowired
    private WeightService weightService;


    @PostMapping("/weight")
    public ResponseEntity<String> addWeight(@RequestBody WeightDTO weightDTO, HttpServletRequest request){
        return weightService.addWeight(weightDTO, request);
    }

    @GetMapping("/weight")
    public List<Weight> getWeights(HttpServletRequest request){
        return weightService.getWeights(request);
    }
}
