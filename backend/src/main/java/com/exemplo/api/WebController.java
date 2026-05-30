package com.exemplo.api;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;

@RestController
public class WebController {
    @PostMapping("/api/sum")
    public Map<String, Double> sum(@RequestBody Request request) {
        return Response.getMapResult(request.getNum1() + request.getNum2());
    }

    @PostMapping("/api/subtraction")
    public Map<String, Double> subtraction(@RequestBody Request request) {
        return Response.getMapResult(request.getNum1() - request.getNum2());
    }

    @PostMapping("/api/multiplication")
    public Map<String, Double> multiplication(@RequestBody Request request) {
        return Response.getMapResult(request.getNum1() * request.getNum2());
    }

    @PostMapping("/api/division")
    public Map<String, Double> division(@RequestBody Request request) {
        if (request.getNum2() == 0) {
            throw new IllegalArgumentException("Divisão por zero não é permitida.");
        }

        return Response.getMapResult(request.getNum1() / request.getNum2());
    }
}