package com.exemplo.api.models;

import java.util.HashMap;

public class Response {
    public static HashMap<String, Double> getMapResult(Double result) {
        HashMap<String, Double> response = new HashMap<>();
        response.put("result", result);
        return response;
    }
}