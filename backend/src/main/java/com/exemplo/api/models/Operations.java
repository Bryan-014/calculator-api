package com.exemplo.api.models;

public class Operations {
    public static double getSum(Request request) {
        return request.getNum1() + request.getNum2();
    }

    public static double getSubtraction(Request request) {
        return request.getNum1() - request.getNum2();
    }

    public static double getMultiplication(Request request) {
        return request.getNum1() * request.getNum2();
    }

    public static double getDivision(Request request) {
        if (request.getNum2() == 0) {
            throw new IllegalArgumentException("Divisão por zero não é permitida.");
        }
        return request.getNum1() / request.getNum2();
    }
}