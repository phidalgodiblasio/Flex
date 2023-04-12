package edu.pitt.flex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import edu.pitt.flex.Entity.Template;

@EnableJpaRepositories
public interface TemplateRepository extends JpaRepository<Template, Integer>{
    public Template findOneById(int id);
}
