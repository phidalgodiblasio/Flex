package edu.pitt.flex.Component;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {

        // If user id not in session, intercept request and return unauthorized error code
        if (request.getSession().getAttribute("USER_ID") == null) {
            response.getWriter().write("ERROR: User not authenticated");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return false;
        }

        // User id is in session, continue to handle request
        return true;
    }
}
