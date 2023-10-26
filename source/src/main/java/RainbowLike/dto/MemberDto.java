package RainbowLike.dto;


import RainbowLike.constant.Gender;
import RainbowLike.constant.Type;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Getter
@Setter
public class MemberDto {

    private Type type;

    private String memId;

    private String checked;
    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    private String pwd;

    private String passwordConfirm;

    private String name;

    private String email;

    private Gender gender;

    private String tel;

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate bir;

    private String addr;

    private String addrDtl;

    private String addrPost;

    @JsonSerialize(using = LocalDateSerializer.class)
    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate jdate;

    static public List<MemberDto> createtestMember() {
        List<MemberDto> memberDtoList = new ArrayList<>();

        MemberDto memberDto1 = new MemberDto();
        memberDto1.setMemId("admin");
        memberDto1.setPwd("12341234");
        memberDto1.setName("관리자");
        memberDto1.setEmail("admin@company.com");
        memberDto1.setType(Type.ADMIN);
        memberDto1.setGender(Gender.FEMALE);
        memberDto1.setTel("01012345678");
        memberDto1.setBir(LocalDate.of(1975, 5, 20));
        memberDto1.setAddr("대전광역시 중구 대둔산로 50");
        memberDto1.setAddrDtl("프라임빌딩 7층");
        memberDto1.setAddrPost("300-100");
        memberDto1.setJdate(LocalDate.now().minusDays(500));
        memberDtoList.add(memberDto1);

        MemberDto memberDto2 = new MemberDto();
        memberDto2.setMemId("user");
        memberDto2.setPwd("12341234");
        memberDto2.setName("유저");
        memberDto2.setEmail("user@personal.com");
        memberDto2.setType(Type.USER);
        memberDto2.setGender(Gender.FEMALE);
        memberDto2.setTel("01012345678");
        memberDto2.setBir(LocalDate.of(1992, 3, 11));
        memberDto2.setAddr("세종특별자치시 보람동 234");
        memberDto2.setAddrDtl("레전드타워 12층");
        memberDto2.setAddrPost("30050");
        memberDto2.setJdate(LocalDate.now().minusDays(250));
        memberDtoList.add(memberDto2);

        MemberDto memberDto3 = new MemberDto();
        memberDto3.setMemId("labor");
        memberDto3.setPwd("12341234");
        memberDto3.setName("노무사");
        memberDto3.setEmail("labor@lawfirm.com");
        memberDto3.setType(Type.LABOR);
        memberDto3.setGender(Gender.FEMALE);
        memberDto3.setTel("01012345678");
        memberDto3.setBir(LocalDate.of(1988, 12, 5));
        memberDto3.setAddr("세종특별자치시 나성동 120");
        memberDto3.setAddrDtl("하이빌딩 5층");
        memberDto3.setAddrPost("30150");
        memberDto3.setJdate(LocalDate.now().minusDays(130));
        memberDtoList.add(memberDto3);

        MemberDto memberDto4 = new MemberDto();
        memberDto4.setMemId("counselor");
        memberDto4.setPwd("12341234");
        memberDto4.setName("상담사");
        memberDto4.setEmail("counselor@therapy.com");
        memberDto4.setType(Type.COUNSELOR);
        memberDto4.setGender(Gender.FEMALE);
        memberDto4.setTel("01012345678");
        memberDto4.setBir(LocalDate.of(1995, 7, 14));
        memberDto4.setAddr("대전광역시 유성구 원신흥동 45");
        memberDto4.setAddrDtl("뉴월드센터 3층");
        memberDto4.setAddrPost("30500");
        memberDto4.setJdate(LocalDate.now().minusDays(40));
        memberDtoList.add(memberDto4);

        MemberDto memberDto5 = new MemberDto();
        memberDto5.setMemId("cinnamoroll");
        memberDto5.setPwd("20010306");
        memberDto5.setName("시나모롤");
        memberDto5.setEmail("cinnamoroll@.sanrio.co.jp");
        memberDto5.setType(Type.ADMIN);
        memberDto5.setGender(Gender.MALE);
        memberDto5.setTel("01012345678");
        memberDto5.setBir(LocalDate.of(2001, 3, 6));
        memberDto5.setAddr("동교동 190-1");
        memberDto5.setAddrDtl("AK PLAZA 홍대 2층");
        memberDto5.setAddrPost("04051");
        memberDto5.setJdate(LocalDate.now().minusDays(35));
        memberDtoList.add(memberDto5);

// 추가 16명의 데이터 생성
        String[] names = {"김지수", "최철수", "오영희", "박민수", "김수진", "송은지", "박선영", "이태민", "고민호", "오하은", "박서진", "김예은", "최진영", "오재현"};
        String[] emails = {"js@", "cs@", "yh@", "ms@", "sj@", "ej@", "sy@", "tm@", "mh@", "he@", "sj2@", "ye@", "jy@", "jh@"};
        String[] sejongAddresses = {
                "세종특별자치시 보람동",
                "세종특별자치시 나성동",
                "세종특별자치시 도담동",
                "세종특별자치시 조치원읍",
                "세종특별자치시 연동면",
                "세종특별자치시 연서면",
                "세종특별자치시 전의면"
        };
        String[] daejeonAddresses = {
                "대전광역시 중구 대둔산로",
                "대전광역시 서구 둔산동",
                "대전광역시 유성구 원신흥동",
                "대전광역시 동구 판암동"
        };
        Random random = new Random();

        for (int i = 0; i < 14; i++) {
            MemberDto userDto = new MemberDto();
            userDto.setMemId("user" + (i + 3));
            userDto.setPwd("12341234");
            userDto.setName(names[i]);
            userDto.setEmail(emails[i] + "mail.com");
            userDto.setType(Type.USER);
            userDto.setGender(i % 2 == 0 ? Gender.MALE : Gender.FEMALE);
            userDto.setTel("01012345678");
            userDto.setBir(LocalDate.of(1985 + random.nextInt(20), random.nextInt(12) + 1, random.nextInt(28) + 1));
            if (random.nextInt(10) < 7) {
                userDto.setAddr(sejongAddresses[random.nextInt(sejongAddresses.length)] + " " + (i * 10));
            } else {
                userDto.setAddr(daejeonAddresses[random.nextInt(daejeonAddresses.length)] + " " + (i * 10));
            }
            userDto.setAddrDtl("아파트" + (i + 1) + "동 " + (i + 1) + "호");
            userDto.setAddrPost("35" + (i + 10));
            userDto.setJdate(LocalDate.now().minusDays(random.nextInt(365)));
            memberDtoList.add(userDto);
        }

// 노무사 추가
        MemberDto laborDto = new MemberDto();
        laborDto.setMemId("labor2");
        laborDto.setPwd("12341234");
        laborDto.setName("노무사2");
        laborDto.setEmail("labor2@lawfirm.com");
        laborDto.setType(Type.LABOR);
        laborDto.setGender(Gender.MALE);
        laborDto.setTel("01012345678");
        laborDto.setBir(LocalDate.of(1985, 9, 9));
        laborDto.setAddr("세종특별자치시 도담동 345");
        laborDto.setAddrDtl("더존타워 2층");
        laborDto.setAddrPost("30200");
        laborDto.setJdate(LocalDate.now().minusDays(280));
        memberDtoList.add(laborDto);

// 상담사 추가
        MemberDto counselorDto = new MemberDto();
        counselorDto.setMemId("counselor2");
        counselorDto.setPwd("12341234");
        counselorDto.setName("상담사2");
        counselorDto.setEmail("counselor2@therapy.com");
        counselorDto.setType(Type.COUNSELOR);
        counselorDto.setGender(Gender.MALE);
        counselorDto.setTel("01012345678");
        counselorDto.setBir(LocalDate.of(1990, 3, 3));
        counselorDto.setAddr("대전광역시 동구 판암동 12");
        counselorDto.setAddrDtl("스타빌딩 1층");
        counselorDto.setAddrPost("31010");
        counselorDto.setJdate(LocalDate.now().minusDays(180));
        memberDtoList.add(counselorDto);
        return memberDtoList;
    }
}
