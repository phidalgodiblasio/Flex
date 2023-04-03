package edu.pitt.flex.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import edu.pitt.flex.DTO.IntakeDTO;
import edu.pitt.flex.Entity.Intake;
import jakarta.servlet.http.HttpServletRequest;

public interface IntakeService {
    public ResponseEntity<String> addIntake(IntakeDTO intakeDTO, HttpServletRequest request);
    public List<Intake> getIntakes(HttpServletRequest request);
    
}
