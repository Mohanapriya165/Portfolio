package com.example.portfolio.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.portfolio.model.User;
import com.example.portfolio.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class HomeController {

    @Autowired
    private UserService userService;

    @PostMapping("/contact")
    public ResponseEntity<String> submitContact(@RequestBody User user) {
        try {
            userService.saveUserMessage(user);
            return new ResponseEntity<>("Message submitted successfully!", HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Error saving user message: " + e.getMessage());
            return new ResponseEntity<>("Error submitting message.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
