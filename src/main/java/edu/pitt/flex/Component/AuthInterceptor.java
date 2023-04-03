package edu.pitt.flex.Component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import edu.pitt.flex.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        // If user id not in session or db,
        // intercept request and return unauthorized error code
        if (request.getSession().getAttribute("USER_ID") == null) {
            response.getWriter().write("ERROR: User not authenticated");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        } else if (userRepository.findOneById((int) request.getSession().getAttribute("USER_ID")) == null) {
            response.getWriter().write("ERROR: User not in db");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }

        // User id is in session and db, continue to handle request
        return true;
    }
}
