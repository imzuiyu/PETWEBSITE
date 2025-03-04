package org.example.mapper;
import org.apache.ibatis.annotations.Insert;
import org.example.pojo.Pet;
public interface PetMapper {
    @Insert("insert into pet_inf(pet_name,pet_age,pet_gender,pet_outline) values(#{petName},#{petAge},#{petGender},#{petOutline})")
    void insertPet(Pet pet);
}
