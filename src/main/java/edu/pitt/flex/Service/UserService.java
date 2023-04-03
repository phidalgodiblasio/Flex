package edu.pitt.flex.Service;

import org.springframework.http.ResponseEntity;

import edu.pitt.flex.DTO.LoginDTO;
import edu.pitt.flex.DTO.UserDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
    public ResponseEntity<String> addUser(UserDTO userDTO, HttpServletRequest request);

    public ResponseEntity<String> loginUser(LoginDTO loginDTO, HttpServletRequest request);

    public ResponseEntity<String> logoutUser(HttpServletRequest request);

    // goal setting
    public ResponseEntity<String> setIntakeGoal(UserDTO userDTO, HttpServletRequest request);

    public ResponseEntity<String> setWeightGoal(UserDTO userDTO, HttpServletRequest request);
}
