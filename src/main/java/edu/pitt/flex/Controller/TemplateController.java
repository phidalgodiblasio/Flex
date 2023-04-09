package edu.pitt.flex.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pitt.flex.DTO.TemplateDTO;
import edu.pitt.flex.Service.TemplateService;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/flex")
public class TemplateController {
    @Autowired
    private TemplateService templateService;
    

    @PostMapping("/template-add")
    public ResponseEntity<String> addTemplate(@RequestBody TemplateDTO templateDTO, HttpServletRequest request){
        return templateService.addTemplate(request, templateDTO);
    }

    @PostMapping("template-edit")
    public ResponseEntity<String> editTemplate(@RequestBody TemplateDTO templateDTO, HttpServletRequest request){
        return templateService.editTemplate(request, templateDTO);
    }

    @PostMapping("template-delete")
    public ResponseEntity<String> deleteTemplate(@RequestBody int id, HttpServletRequest request){
        return templateService.deleteTemplate(request, id);
    }

    @GetMapping("/template-all")
    public List<TemplateDTO> getTemplates(HttpServletRequest request){
        return templateService.getAllTemplates(request);
    }

    @GetMapping("/template-{id}")
    public TemplateDTO getTemplate(HttpServletRequest request, @PathVariable int id){
        return templateService.getTemplate(request, id);
    }
}
