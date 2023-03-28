package edu.pitt.flex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import edu.pitt.flex.Entity.Intake;

@EnableJpaRepositories
public interface IntakeRepository extends JpaRepository<Intake, Integer>{
    
}
