package com.programmingfree.springservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class HomeController {

	@Autowired
	UserRepository userRepository;
	
    @GetMapping("/*")
	public String home() {
		return "index";
	}
    
    @PostMapping(value = "/login")
    public String login(Model model, @RequestBody User user) {
    	
    	User result = userRepository.findByUserName(user.getUsername());
    	if(result.getPassword().equalsIgnoreCase(user.getPassword())) {
    		return "index";
    	}
      return "index";
    }

}
