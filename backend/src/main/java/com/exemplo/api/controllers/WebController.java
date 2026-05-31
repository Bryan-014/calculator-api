package com.exemplo.api.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;
import com.exemplo.api.models.Request;
import com.exemplo.api.utils.Operations;
import com.exemplo.api.utils.Response;

@RestController
public class WebController {
    @PostMapping("/api/sum")
    public Map<String, Double> sum(@RequestBody Request request) {
        Double result = Operations.getSum(request);
        return Response.getMapResult(result);
    }

    @PostMapping("/api/subtraction")
    public Map<String, Double> subtraction(@RequestBody Request request) {
        Double result = Operations.getSubtraction(request);
        return Response.getMapResult(result);
    }

    @PostMapping("/api/multiplication")
    public Map<String, Double> multiplication(@RequestBody Request request) {
        Double result = Operations.getMultiplication(request);
        return Response.getMapResult(result);
    }

    @PostMapping("/api/division")
    public Map<String, Double> division(@RequestBody Request request) {
        Double result = Operations.getDivision(request);
        return Response.getMapResult(result);
    }
}