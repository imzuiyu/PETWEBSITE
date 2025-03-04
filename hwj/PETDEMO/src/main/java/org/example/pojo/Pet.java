package org.example.pojo;

public class Pet {
    private Integer id;
    private String petName;
    private Integer petAge;
    private String petGender;
    private String petState;
    private String petOutline;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public Integer getPetAge() {
        return petAge;
    }

    public void setPetAge(Integer petAge) {
        this.petAge = petAge;
    }

    public String getPetGender() {
        return petGender;
    }

    public void setPetGender(String petGender) {
        this.petGender = petGender;
    }

    public String getPetState() {
        return petState;
    }

    public void setPetState(String petState) {
        this.petState = petState;
    }

    public String getPetOutline() {
        return petOutline;
    }

    public void setPetOutline(String petOutline) {
        this.petOutline = petOutline;
    }

    @Override
    public String toString() {
        return "Pet{" +
                "id=" + id +
                ", petName='" + petName + '\'' +
                ", petAge=" + petAge +
                ", petGender='" + petGender + '\'' +
                ", petState='" + petState + '\'' +
                ", petOutline='" + petOutline + '\'' +
                '}';
    }
}
