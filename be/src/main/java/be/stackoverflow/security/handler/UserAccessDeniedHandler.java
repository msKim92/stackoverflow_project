package be.stackoverflow.security.handler;

import be.stackoverflow.aop.DiscordWebhook;
import be.stackoverflow.dto.ErrorResponse;
import com.google.gson.Gson;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserAccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

        errorSender(response,HttpStatus.FORBIDDEN);

        DiscordWebhook webhook = new DiscordWebhook();
        webhook.setContent(accessDeniedException.getMessage());
        webhook.execute();
    }

    private void errorSender(HttpServletResponse response, HttpStatus unauthorized) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(unauthorized);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(unauthorized.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}