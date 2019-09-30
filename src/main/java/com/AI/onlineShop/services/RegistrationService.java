package com.AI.onlineShop.services;

import com.AI.onlineShop.entities.Authority;
import com.AI.onlineShop.entities.Token;
import com.AI.onlineShop.entities.User;
import com.AI.onlineShop.repositories.AuthorityRepository;
import com.AI.onlineShop.repositories.TokenRepository;
import com.AI.onlineShop.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.UUID;

@Component
public class RegistrationService {

    private PasswordEncoder passwordEncoder;
    private AuthorityRepository authorityRepository;
    private UserRepository userRepository;
    private JavaMailSender javaMailSender;
    TokenRepository tokenRepository;

    @Autowired
    public RegistrationService(PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository,
                               UserRepository userRepository, JavaMailSender javaMailSender, TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
        this.javaMailSender = javaMailSender;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.userRepository = userRepository;
    }

    public void saveNewUser(String username, String mail, String password){
        User user = new User(username,mail,passwordEncoder.encode(password),false);
        Authority authority = new Authority(username,"User");
        userRepository.save(user);
        authorityRepository.save(authority);
        String tokenUUID = UUID.randomUUID().toString();
        Token token = new Token(tokenUUID,user);
        tokenRepository.save(token);
        this.sendEmail(mail,"Confirm your account","\n" +
                "Please click on the link below to activate your account on " +
                "our site: \"http://localhost:8080/free/confirm?token=" + tokenUUID);
    }

    private void sendEmail(String to, String title, String content) {
        MimeMessage mail = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mail, true);
            helper.setTo(to);
            helper.setReplyTo("onlineshopaiproject@gmail.com");
            helper.setFrom("onlineshopaiproject@gmail.com");
            helper.setSubject(title);
            helper.setText(content,true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        javaMailSender.send(mail);
    }
    public boolean activateAccount(String tokenUUID){
        List<Token> tokens = tokenRepository.findByToken(tokenUUID);
        Token activateToken = null;
        if(tokens != null && !tokens.isEmpty()){
            activateToken = tokens.get(0);
            User user = activateToken.getUser();
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
        else {
            return false;
        }
    }

    public void resetPassword(String username, String mail) {
        User user = userRepository.getOne(username);
        String newPassword = UUID.randomUUID().toString();
        if(mail.equals(user.getMail())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            sendEmail(mail, "Password change", "Your new password: "+ newPassword);
            userRepository.save(user);
        }


    }
}
