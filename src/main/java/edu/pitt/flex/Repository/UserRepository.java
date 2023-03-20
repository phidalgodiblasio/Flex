package edu.pitt.flex.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import edu.pitt.flex.Entity.User;

@EnableJpaRepositories
@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
    User findOneByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
}
