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
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public String addUser(UserDTO userDTO)
    {
        User user = new User(userDTO.getId(), userDTO.getUsername(), this.passwordEncoder.encode(userDTO.getPassword()));
        
        userRepository.save(user);
        return user.getUsername();
    }

    @Override
    public ResponseEntity<String> loginUser(LoginDTO loginDTO) {
        // Message and status
        String message;
        HttpStatus status;
        
        // Search for user in db
        User user = userRepository.findByUsername(loginDTO.getUsername());
        
        // If user found, authenticate password 
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            message = "Login successful";
            status = HttpStatus.OK;
        }
        else {
            message = "Login unsuccessful: Invalid username or password";
            status = HttpStatus.BAD_REQUEST;
        }

        // Return message and status
        return new ResponseEntity<>(message, status);
    }
    
}
