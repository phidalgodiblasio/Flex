package edu.pitt.flex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import edu.pitt.flex.Entity.Workout;

@EnableJpaRepositories
public interface WorkoutRepository extends JpaRepository<Workout, Integer> {
    public Workout findOneById(int id);
}
