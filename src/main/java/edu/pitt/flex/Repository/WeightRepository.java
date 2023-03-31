package edu.pitt.flex.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import edu.pitt.flex.Entity.Weight;

@EnableJpaRepositories
public interface WeightRepository extends JpaRepository<Weight, Integer> {
    
}
