package nl.wandelmaatje.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Locale;

public enum MobilityLevel {
    LOW,
    MEDIUM,
    HIGH;

    @JsonCreator
    public static MobilityLevel fromValue(String value) {
        if (value == null) {
            return null;
        }

        return MobilityLevel.valueOf(value.trim().toUpperCase(Locale.ROOT));
    }

    @JsonValue
    public String toValue() {
        return name();
    }
}
