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
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> addUser(UserDTO userDTO, HttpServletRequest request) {
        // Response body and status
        String body;
        HttpStatus status;

        // Search to see if username is taken
        if (userRepository.findByUsername(userDTO.getUsername()) == null) {
            // Create new user and add to repository
            User user = new User(userDTO.getId(), userDTO.getUsername(),
                    this.passwordEncoder.encode(userDTO.getPassword()));
            userRepository.save(user);

            // Add user id to sessions
            request.getSession().setAttribute("USER_ID", user.getId());

            // Update response to show success
            body = "Registration successful";
            status = HttpStatus.OK;
        } else {
            // Update response to show failure
            body = "Registration unsuccessful: username already taken";
            status = HttpStatus.BAD_REQUEST;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> loginUser(LoginDTO loginDTO, HttpServletRequest request) {
        // Response body and status
        String body;
        HttpStatus status;

        // Search for user in db
        User user = userRepository.findByUsername(loginDTO.getUsername());

        // If user found, authenticate password
        if (user != null && passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            // Add user id to sessions
            request.getSession().setAttribute("USER_ID", user.getId());

            // Update response to show success
            body = "Login successful";
            status = HttpStatus.OK;
        } else {
            // Update response to show failure
            body = "Login unsuccessful: Invalid username or password";
            status = HttpStatus.BAD_REQUEST;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> logoutUser(HttpServletRequest request) {
        // Response body and status
        String body;
        HttpStatus status;

        // Invalidate user session
        try {
            request.getSession().invalidate();
            body = "Logout successful";
            status = HttpStatus.OK;
        } catch (IllegalStateException e) {
            body = "Logout unsuccessful: " + e.getMessage();
            status = HttpStatus.BAD_REQUEST;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> setIntakeGoal(UserDTO userDTO, HttpServletRequest request) {
        String body;
        HttpStatus status;

        // TODO: look into sessions, first case is returning null, so this only works
        // when userDTO has username
        User currUser = userRepository.findOneById((int) request.getSession().getAttribute("USER_ID"));

        // Search to see if username exists
        if (userRepository.findByUsername(currUser.getUsername()) == null) {
            // Update response to show failure
            body = "Update unsuccessful: username not found";
            status = HttpStatus.BAD_REQUEST;
        } else {
            // update intake goals all goals need to be set each time.
            currUser.setCalGoal(userDTO.getCalGoal());
            currUser.setCarbGoal(userDTO.getCarbGoal());
            currUser.setFatGoal(userDTO.getFatGoal());
            currUser.setProteinGoal(userDTO.getProteinGoal());

            userRepository.save(currUser);

            // Update response to show success
            body = "Intake goals set";
            status = HttpStatus.OK;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> setWeightGoal(UserDTO userDTO, HttpServletRequest request) {
        String body;
        HttpStatus status;

        // TODO: look into sessions, first case is returning null, so this only works
        // when userDTO has username
        User currUser = userRepository.findOneById((int) request.getSession().getAttribute("USER_ID"));

        // Search to see if username exists
        if (userRepository.findByUsername(currUser.getUsername()) == null) {
            // Update response to show failure
            body = "Update unsuccessful: username not found";
            status = HttpStatus.BAD_REQUEST;
        } else {
            // update weight goals
            currUser.setWeightGoal(userDTO.getWeightGoal());
            userRepository.save(currUser);

            // Update response to show success
            body = "Weight goal set";
            status = HttpStatus.OK;
        }

        // Return response
        return new ResponseEntity<>(body, status);
    }

    @Override
    public String getIntakeGoal(HttpServletRequest request) {
        String body;

        // TODO: look into sessions, first case is returning null, so this only works
        // when userDTO has username
        User currUser = userRepository.findOneById((int) request.getSession().getAttribute("USER_ID"));

        // body = '{"calGoal":"'+currUser.getCalGoal()+'",}';

        body = "{\"calGoal\":\"" + currUser.getCalGoal() + "\",\"proteinGoal\":\"" + currUser.getProteinGoal()
                + "\",\"carbGoal\":\"" + currUser.getCarbGoal() + "\",\"fatGoal\":\"" + currUser.getFatGoal() + "\"}";
        return body;

        // // Search to see if username exists
        // if (userRepository.findByUsername(currUser.getUsername()) == null) {
        // // Update response to show failure
        // body = "Update unsuccessful: username not found";
        // status = HttpStatus.BAD_REQUEST;
        // } else {
        // // update weight goals
        // currUser.setWeightGoal(userDTO.getWeightGoal());
        // userRepository.save(currUser);

        // // Update response to show success
        // body = "Weight goal set";
        // status = HttpStatus.OK;
        // }
        // return "";
    }

    @Override
    public int getWeightGoal(UserDTO userDTO, HttpServletRequest request) {
        String body;
        HttpStatus status;

        // TODO: look into sessions, first case is returning null, so this only works
        // when userDTO has username
        User currUser = userRepository.findOneById((int) request.getSession().getAttribute("USER_ID"));
        return currUser.getWeightGoal();
        // Search to see if username exists
        // if (userRepository.findByUsername(currUser.getUsername()) == null) {
        // // Update response to show failure
        // body = "Update unsuccessful: username not found";
        // status = HttpStatus.BAD_REQUEST;
        // } else {
        // // update weight goals
        // currUser.setWeightGoal(userDTO.getWeightGoal());
        // userRepository.save(currUser);

        // // Update response to show success
        // body = "Weight goal set";
        // status = HttpStatus.OK;
        // }

        // // Return response
        // return 0;
    }
}
