package RainbowLike.dto;

import RainbowLike.entity.Space;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;

@Getter
@Setter
public class SpaceDto {

    @NotNull
    private String spaceName;

    @NotBlank
    private int maxPerson;

    @NotBlank
    private String spaceUsage;

    @NotBlank
    private String rentTime;

    @NotBlank
    private String rentFee;

    @NotBlank
    private String facilities;


    static public ArrayList<SpaceDto> createSpaces(){
        ArrayList<SpaceDto> spaceList =new ArrayList<SpaceDto>();

        SpaceDto space1 = new SpaceDto();
        space1.setSpaceName("공유오피스(폴짝)");
        space1.setMaxPerson(6);
        space1.setSpaceUsage("소모임");
        space1.setRentTime("1회/2시간");
        space1.setRentFee("무료");
        space1.setFacilities("회의용 테이블, 의자");

        spaceList.add(space1);


        SpaceDto space2 = new SpaceDto();
        space2.setSpaceName("공유오피스(반짝)");
        space2.setMaxPerson(6);
        space2.setSpaceUsage("소모임");
        space2.setRentTime("1회/2시간");
        space2.setRentFee("무료");
        space2.setFacilities("회의용 테이블, 의자");

        spaceList.add(space2);

        SpaceDto space3 = new SpaceDto();
        space3.setSpaceName("공유오피스(활짝)");
        space3.setMaxPerson(8);
        space3.setSpaceUsage("개인, 단체 사무");
        space3.setRentTime("1회/2시간");
        space3.setRentFee("무료");
        space3.setFacilities("공용 PC 2대, 테이블, 의자, 프린터 1대(용지는 개인이 준비)");

        spaceList.add(space3);

        SpaceDto space4 = new SpaceDto();
        space4.setSpaceName("상담실(꼼지락)");
        space4.setMaxPerson(4);
        space4.setSpaceUsage("상담실, 소모임");
        space4.setRentTime("1회/2시간");
        space4.setRentFee("무료");
        space4.setFacilities("쇼파, 테이블, 의자");

        spaceList.add(space4);

        SpaceDto space5 = new SpaceDto();
        space5.setSpaceName("상담실(어슬렁)");
        space5.setMaxPerson(4);
        space5.setSpaceUsage("상담실, 소모임");
        space5.setRentTime("1회/2시간");
        space5.setRentFee("무료");
        space5.setFacilities("쇼파, 테이블, 의자");

        spaceList.add(space5);

        SpaceDto space6 = new SpaceDto();
        space6.setSpaceName("강의실(혜윰)");
        space6.setMaxPerson(24);
        space6.setSpaceUsage("강의실");
        space6.setRentTime("1회/1시간");
        space6.setRentFee("5,000원");
        space6.setFacilities("전자 칠판, 전자 교탁, 세미나 테이블, 의자");

        spaceList.add(space6);

        SpaceDto space7 = new SpaceDto();
        space7.setSpaceName("다목적 활동실(라온)");
        space7.setMaxPerson(20);
        space7.setSpaceUsage("예술활동 및 운동 등");
        space7.setRentTime("1회/1시간");
        space7.setRentFee("5,000원");
        space7.setFacilities("빔, 스크린, 스피커, 노트북(대여), 마이크(유/무선, 핀마이크)");

        spaceList.add(space7);

        SpaceDto space8 = new SpaceDto();
        space8.setSpaceName("멀티미디어실(하람)");
        space8.setMaxPerson(20);
        space8.setSpaceUsage("컴퓨터 관련 강의실");
        space8.setRentTime("1회/1시간");
        space8.setRentFee("20,000원");
        space8.setFacilities("컴퓨터, 전자 칠판, 전자 교탁");

        spaceList.add(space8);


        return spaceList;
    }



}
