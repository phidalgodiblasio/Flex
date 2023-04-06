package edu.pitt.flex.Utility;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Utility {
    private Utility() {
        throw new IllegalStateException("Utility class");
    }
    
    public static String getTodaysDate() {
        LocalDate localDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        return localDate.format(formatter);
    }
}
