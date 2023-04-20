package edu.pitt.flex.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import edu.pitt.flex.DTO.TemplateDTO;
import edu.pitt.flex.Entity.Template;
import edu.pitt.flex.Entity.User;
import edu.pitt.flex.Repository.TemplateRepository;
import edu.pitt.flex.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class TemplateServiceImpl implements TemplateService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TemplateRepository templateRepository;

    @Override
    public ResponseEntity<String> addTemplate(HttpServletRequest request, TemplateDTO templateDTO) {
        String body;
        HttpStatus status;

        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        //convert array from DTO to one string
        String[][] exercises = templateDTO.getExercises();
        String exerciseString = "";
        for(int i = 0; i < exercises.length; i++){
            exerciseString += exercises[i][0];
            exerciseString += "*";
            exerciseString += exercises[i][1];
            exerciseString += "*";
        }

        //create new template and save it
        Template template = new Template(templateDTO.getId(), templateDTO.getName(), exerciseString);
        user.addTemplate(template);
        template = templateRepository.save(template);
        
        //return the ID of the template for the frontend to use
        // System.out.println("TEMPLATE ID:" + template.getId());
        body = String.valueOf(template.getId()); // Returning 0 for some reason?
        status = HttpStatus.OK;
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> editTemplate(HttpServletRequest request, TemplateDTO templateDTO){
        String body;
        HttpStatus status;

        Template template = templateRepository.findOneById(templateDTO.getId());

        if(template == null){
            body = "Template does not exist";
            status = HttpStatus.BAD_REQUEST;
        }
        else{
            //convert array from DTO to one string
            String[][] exercises = templateDTO.getExercises();
            String exerciseString = "";
            for(int i = 0; i < exercises.length; i++){
                exerciseString += exercises[i][0];
                exerciseString += "*";
                exerciseString += exercises[i][1];
                exerciseString += "*";
            }

            //update template variables
            template.setName(templateDTO.getName());
            template.setExercises(exerciseString);

            //set message
            body = "Template successfuly updated";
            status = HttpStatus.OK;
        }

        //return message
        return new ResponseEntity<>(body, status);
    }

    @Override
    public ResponseEntity<String> deleteTemplate(HttpServletRequest request, int id){
        if (templateRepository.findOneById(id) == null) {
            return new ResponseEntity<>("ERROR: Template with given id not in database", HttpStatus.BAD_REQUEST);
        } else {
            templateRepository.deleteById(id);
            return new ResponseEntity<>("Template successfuly deleted", HttpStatus.OK);
        }

    }

    @Override
    public TemplateDTO getTemplate(HttpServletRequest request, int id) {
        Template template = templateRepository.findOneById(id);
        if(template == null){
            return new TemplateDTO();
        }
        else{
            //convert from string in template to array in DTO
            String[] split = template.getExercises().split("\\*");
            String[][] exercises = new String[split.length / 2][2];
            int count = 0;
            for(int i = 0; i < exercises.length; i++){
                for(int j = 0; j < exercises[i].length; j++){
                    exercises[i][j] = split[count];
                    count++;
                }
            }
            return new TemplateDTO(template.getId(), template.getName(), exercises);
        }
    }

    @Override
    public List<TemplateDTO> getAllTemplates(HttpServletRequest request) {
        User user = userRepository.findOneById((int)request.getSession().getAttribute("USER_ID"));

        List<Template> templates = user.getAllTemplates();
        List<TemplateDTO> dtos = new ArrayList<>();
        for(Template template : templates){
            //convert from string in template to array in DTO
            String[] split = template.getExercises().split("\\*");
            String[][] exercises = new String[split.length / 2][2];
            int count = 0;
            for(int i = 0; i < exercises.length; i++){
                for(int j = 0; j < exercises[i].length; j++){
                    exercises[i][j] = split[count];
                    count++;
                }
            }
            TemplateDTO templateDTO = new TemplateDTO(template.getId(), template.getName(), exercises);
            dtos.add(templateDTO);
        }
        return dtos;
    }
    
}
