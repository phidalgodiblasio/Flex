package edu.pitt.flex.Component;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
/*
 * This is a filter that intercepts all requests at /flex/*
 * It sets CORS-related headers so that we can make requests that require authentication
 * It also catches preflight requests and returns an HTTP OK for them (tbh idk why we have to do this but apparently we do)
 */
@WebFilter("/flex/*")
public class CORSResponseFilter implements Filter {
    @Override
    public void doFilter(
      ServletRequest request, 
      ServletResponse response, 
      FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        
        httpServletResponse.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        httpServletResponse.setHeader("Access-Control-Allow-Credentials", "true");
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "*");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        // Catch preflight requests and return HTTP OK
        if (httpServletRequest.getMethod().equals("OPTIONS")) {
          httpServletResponse.setStatus(HttpServletResponse.SC_OK);
          return;
        }

        // Call other filters if there are any
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}

    @Override
    public void destroy() {}
}
