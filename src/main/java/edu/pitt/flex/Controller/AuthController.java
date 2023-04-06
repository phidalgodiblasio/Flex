package edu.pitt.flex.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.pitt.flex.DTO.LoginDTO;
import edu.pitt.flex.DTO.UserDTO;
import edu.pitt.flex.Service.UserService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {
	@Autowired
	private UserService userService;

	@PostMapping("/save")
	public ResponseEntity<String> saveUser(@RequestBody UserDTO userDTO, HttpServletRequest request) {
		return userService.addUser(userDTO, request);
	}

	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
		return userService.loginUser(loginDTO, request);
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logOutUser(HttpServletRequest request) {
		return userService.logoutUser(request);
	}
}
