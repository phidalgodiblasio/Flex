package edu.pitt.flex.Service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import edu.pitt.flex.DTO.TemplateDTO;
import jakarta.servlet.http.HttpServletRequest;

public interface TemplateService {
    public ResponseEntity<String> addTemplate(HttpServletRequest request, TemplateDTO templateDTO);
    public ResponseEntity<String> editTemplate(HttpServletRequest request, TemplateDTO templateDTO);
    public ResponseEntity<String> deleteTemplate(HttpServletRequest request, int id);
    public TemplateDTO getTemplate(HttpServletRequest request, int id);
    public List<TemplateDTO> getAllTemplates(HttpServletRequest request);
}
