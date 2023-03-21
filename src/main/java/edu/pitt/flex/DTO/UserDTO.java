package edu.pitt.flex.DTO;

public class UserDTO {
  
    private int id;
    private String username;
    private String password;
   
    public UserDTO()
    {
        // Empty constructor
    }

    public UserDTO(int id, String username, String password)
    {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public String getPassword()
    {
        return password;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
}
