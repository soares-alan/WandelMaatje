package nl.wandelmaatje.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
@Table(name = "walk")
public class Walk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "elderly_id", nullable = false)
    @NotNull
    private Elderly elderly;

    @ManyToOne
    @JoinColumn(name = "volunteer_id", nullable = false)
    @NotNull
    private Volunteer volunteer;

    @Column(name = "walk_date", nullable = false)
    private LocalDate walkDate;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "distance_km", nullable = false)
    private Double distanceKm;

    @NotNull
    @Min(1)
    @Max(5)
    @Column(name = "pain_mood", nullable = false)
    private Integer painMood;

    private String notes;

    public Walk() {
    }

    public Long getId() {
        return id;
    }

    public Elderly getElderly() {
        return elderly;
    }

    public void setElderly(Elderly elderly) {
        this.elderly = elderly;
    }

    public Volunteer getVolunteer() {
        return volunteer;
    }

    public void setVolunteer(Volunteer volunteer) {
        this.volunteer = volunteer;
    }

    public LocalDate getWalkDate() {
        return walkDate;
    }

    public void setWalkDate(LocalDate walkDate) {
        this.walkDate = walkDate;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public Double getDistanceKm() {
        return distanceKm;
    }

    public void setDistanceKm(Double distanceKm) {
        this.distanceKm = distanceKm;
    }

    public Integer getPainMood() {
        return painMood;
    }

    public void setPainMood(Integer painMood) {
        this.painMood = painMood;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public void setId(Long id) {
        this.id = id;
    }
}