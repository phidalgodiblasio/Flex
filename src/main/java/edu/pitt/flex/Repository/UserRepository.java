package edu.pitt.flex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import edu.pitt.flex.Entity.User;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Integer>{
    public User findOneByUsernameAndPassword(String username, String password);
    public User findByUsername(String username);
}
