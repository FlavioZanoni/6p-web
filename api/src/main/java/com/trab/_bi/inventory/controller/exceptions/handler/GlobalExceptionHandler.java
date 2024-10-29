package com.trab._bi.inventory.controller.exceptions.handler;

import com.trab._bi.inventory.controller.exceptions.APIError;
import jakarta.security.auth.message.AuthException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Object> handleRestfulExceptions(AuthenticationException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        APIError apiError = APIError.newInstance(httpStatus.value());
        apiError.setMessages(List.of("Invalid credentials"));

        ex.printStackTrace();

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Object> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.FORBIDDEN;
        APIError apiError = APIError.newInstance(httpStatus.value());
        List<String> messages = List.of("Access denied");

        apiError.setMessages(messages);

        ex.printStackTrace();

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<Object> handleAuthException(AuthException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        APIError apiError = APIError.newInstance(httpStatus.value());
        List<String> messages = new ArrayList<>();
        messages.add(ex.getMessage());
        apiError.setMessages(messages);

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Object> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
        APIError apiError = APIError.newInstance(httpStatus.value());
        List<String> messages = List.of("Invalid credentials");
        apiError.setMessages(messages);

        ex.printStackTrace();

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Object> handleRuntimeException(RuntimeException ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        APIError apiError = APIError.newInstance(httpStatus.value());
        List<String> messages = List.of(ex.getMessage());
        apiError.setMessages(messages);

        ex.printStackTrace();

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), httpStatus, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleExceptions(Exception ex, WebRequest request) {
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        APIError apiError = APIError.newInstance(httpStatus.value());
        List<String> messages = List.of("Internal server error", ex.getMessage());
        apiError.setMessages(messages);

        ex.printStackTrace();

        return handleExceptionInternal(ex, apiError, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    /* utility */

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders
            headers, HttpStatusCode status, WebRequest request) {
        return super.handleExceptionInternal(ex, body, headers, status, request);
    }
}
