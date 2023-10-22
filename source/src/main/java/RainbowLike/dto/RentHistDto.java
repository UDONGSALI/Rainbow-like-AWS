package RainbowLike.dto;


import RainbowLike.constant.Status;
import RainbowLike.entity.Member;
import RainbowLike.entity.Space;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.SpaceRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Random;

@Getter
@Setter
public class RentHistDto {

    private static MemberRepository memberRepository;
    private static SpaceRepository spaceRepository;

    @NotNull
    @JsonIgnore
    private Member member;

    @NotNull
    @JsonIgnore
    private Space space;

    @NotNull
    private LocalDateTime rentStdt;

    @NotNull
    private LocalDateTime rentEddt;

    @NotNull
    private LocalDateTime applyDate;

    @NotBlank
    private Status applyStatus;


    private Status payStatus;


    static public ArrayList<RentHistDto> createRentHists() {
        ArrayList<RentHistDto> rentHistList = new ArrayList<RentHistDto>();


        Member member1 = new Member();
        member1.setMemNum(1L);

        Member member2 = new Member();
        member2.setMemNum(2L);

        Space space2 = new Space();
        space2.setSpaceNum(2L);

        Space space7 = new Space();
        space7.setSpaceNum(7L);

        Space space8 = new Space();
        space7.setSpaceNum(6L);

        RentHistDto rentHistDto1 = new RentHistDto();
        rentHistDto1.setMember(member1);
        rentHistDto1.setSpace(space7);
        rentHistDto1.setRentStdt(LocalDateTime.of(2023, 10, 15, 18, 30, 0, 0));
        rentHistDto1.setRentEddt(LocalDateTime.of(2023, 10, 15, 20, 30, 0, 0));
        rentHistDto1.setApplyDate(LocalDateTime.of(2023, 10, 10, 9, 30, 0, 0));
        rentHistDto1.setApplyStatus(Status.APPROVE);
        rentHistDto1.setPayStatus(Status.WAIT);

        rentHistList.add(rentHistDto1);

        RentHistDto rentHistDto2 = new RentHistDto();
        rentHistDto2.setMember(member2);
        rentHistDto2.setSpace(space2);
        rentHistDto2.setRentStdt(LocalDateTime.of(2023, 10, 20, 18, 30, 0, 0));
        rentHistDto2.setRentEddt(LocalDateTime.of(2023, 10, 20, 18, 30, 0, 0));
        rentHistDto2.setApplyDate( LocalDateTime.of(2023, 10, 15, 9, 30, 0, 0));
        rentHistDto2.setApplyStatus(Status.APPROVE);
        rentHistDto2.setPayStatus(Status.COMPLETE);

        rentHistList.add(rentHistDto2);

        RentHistDto rentHistDto3 = new RentHistDto();
        rentHistDto3.setMember(member2);
        rentHistDto3.setSpace(space7);
        rentHistDto3.setRentStdt(LocalDateTime.of(2023, 11, 1, 11, 30, 0, 0));
        rentHistDto3.setRentEddt(LocalDateTime.of(2023, 11, 1, 13, 30, 0, 0));
        rentHistDto3.setApplyDate( LocalDateTime.of(2023, 10, 22, 0, 26, 42, 0));
        rentHistDto3.setApplyStatus(Status.APPROVE);
        rentHistDto3.setPayStatus(Status.WAIT);

        rentHistList.add(rentHistDto3);

        return rentHistList;
    }

}
