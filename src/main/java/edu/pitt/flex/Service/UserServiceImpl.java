package edu.pitt.flex.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.LoginDTO;
import edu.pitt.flex.DTO.UserDTO;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> addUser(UserDTO userDTO)
    {
        // Response body and status
        String body;
        HttpStatus status;

        // Search to see if username is taken
        if (userRepository.findByUsername(userDTO.getUsername()) == null) {
            // Create new user and add to repository
            User user = new User(userDTO.getId(), userDTO.getUsername(), this.passwordEncoder.encode(userDTO.getPassword()));
            userRepository.save(user);

            body = "Registration successful";
            status = HttpStatus.OK;
        }
        else {
            body = "Registration unsuccessful: username already taken";
            status = HttpStatus.BAD_REQUEST;
        }
        
        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> loginUser(LoginDTO loginDTO) 
    {
        // Response body and status
        String body;
        HttpStatus status;
        
        // Search for user in db
        User user = userRepository.findByUsername(loginDTO.getUsername());
        
        // If user found, authenticate password 
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) 
        {
            body = "Login successful";
            status = HttpStatus.OK;
        }
        else 
        {
            body = "Login unsuccessful: Invalid username or password";
            status = HttpStatus.BAD_REQUEST;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }
}
