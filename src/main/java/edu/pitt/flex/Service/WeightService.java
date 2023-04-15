package edu.pitt.flex.Service;
import java.util.List;

import org.springframework.http.ResponseEntity;

import edu.pitt.flex.DTO.WeightDTO;
import edu.pitt.flex.Entity.Weight;
import jakarta.servlet.http.HttpServletRequest;
public interface WeightService {
    public ResponseEntity<String> addWeight(WeightDTO weightDTO, HttpServletRequest request);
    public List<Weight> getWeights(HttpServletRequest request);
    public Weight getWeight(HttpServletRequest request);
}
