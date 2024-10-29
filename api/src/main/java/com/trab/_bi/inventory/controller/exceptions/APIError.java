package com.trab._bi.inventory.controller.exceptions;

import java.util.List;

public class APIError {

    private String moreInfo;
    private int status;
    private List<String> messages;

    public static APIError newInstance(int status) {
        APIError apiError = new APIError();
        apiError.moreInfo = "https://www.folhastech.com/";
        apiError.status = status;
        return apiError;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }


}
