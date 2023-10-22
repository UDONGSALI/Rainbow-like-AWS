package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.FtmYN;
import RainbowLike.constant.LicenseYN;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FtcDto {

    private Long memNum;
    @JsonIgnore
    private Member member;
    private String speField;
    private String applyContent;
    private String statusDtl;
    private FtmYN ftmYN;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;


    public FtcDto(){

    }

    public FtcDto(Long memNum, String speField, String applyContent, String statusDtl, FtmYN ftmYN, LocalDateTime writeDate, LocalDateTime editDate){
        this.memNum = memNum;
        this.speField = speField;
        this.applyContent = applyContent;
        this.statusDtl = statusDtl;
        this.ftmYN = ftmYN;
        this.writeDate = writeDate;
        this.editDate = editDate;
    }

    static public ArrayList<FtcDto> createTestFtc() {
        ArrayList<FtcDto> ftcList = new ArrayList<>();

        List<Member> members = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            Member member = new Member();
            member.setMemNum((long) i);
            members.add(member);
        }

        FtcDto ftc1 = new FtcDto();
        ftc1.setMember(members.get(0));
        ftc1.setSpeField("디자인");
        ftc1.setApplyContent("카페 마스코트 캐릭터를 그려줄 수 있는 인재가 필요합니다. 포트폴리오를 확인하고 싶어요.");
        ftc1.setFtmYN(FtmYN.N);

        ftcList.add(ftc1);


        FtcDto ftc2 = new FtcDto();
        ftc2.setMember(members.get(1));
        ftc2.setSpeField("디자인");
        ftc2.setApplyContent("자격증 있는 사람이 필요합니다. 업체 홍보용 영상을 제작해야 하고, 이미 촬영분이 있어 편집만 가능하면 됩니다.");
        ftc2.setFtmYN(FtmYN.N);

        ftcList.add(ftc2);


        FtcDto ftc3 = new FtcDto();
        ftc3.setMember(members.get(2));
        ftc3.setSpeField("IT");
        ftc3.setApplyContent("학원 홍보를 위한 간단한 웹사이트 개발 인재 요망 <br/> 자격증 유무 상관 없으나 간단한 유지보수 필요");
        ftc3.setFtmYN(FtmYN.N);

        ftcList.add(ftc3);


        FtcDto ftc4 = new FtcDto();
        ftc4.setMember(members.get(3));
        ftc4.setSpeField("기타");
        ftc4.setApplyContent("10월 10일부터 20일까지 유치원 아이 하원 도우미를 찾고 있습니다.");
        ftc4.setFtmYN(FtmYN.N);

        ftcList.add(ftc4);


        FtcDto ftc5 = new FtcDto();
        ftc5.setMember(members.get(4));
        ftc5.setSpeField("기타");
        ftc5.setApplyContent("벌레 좀 잡아주세요ㅠ");
        ftc5.setStatusDtl("매칭거부 : 부적절한 요청입니다.");
        ftc5.setFtmYN(FtmYN.N);

        ftcList.add(ftc5);


        FtcDto ftc6 = new FtcDto();
        ftc6.setMember(members.get(5));
        ftc6.setSpeField("IT");
        ftc6.setApplyContent("도박 사이트 개발자 구합니다 ^^ 수익은 무조건 7:3");
        ftc6.setStatusDtl("매칭거부 : 적절하지 않은 요청입니다.");
        ftc6.setFtmYN(FtmYN.N);

        ftcList.add(ftc6);


        FtcDto ftc7 = new FtcDto();
        ftc7.setMember(members.get(6));
        ftc7.setSpeField("기타");
        ftc7.setApplyContent("사진촬영 가능하신 분을 찾습니다.");
        ftc7.setStatusDtl("매칭불가 : 여성인재풀 DB에 아직 부합한 인재가 등록되지 않았습니다.");
        ftc7.setFtmYN(FtmYN.N);

        ftcList.add(ftc7);

        FtcDto ftc8 = new FtcDto();
        ftc8.setMember(members.get(7));
        ftc8.setSpeField("디자인");
        ftc8.setApplyContent("사업 확장을 위한 로고 디자이너를 찾고 있습니다.");
        ftc8.setFtmYN(FtmYN.N);
        ftcList.add(ftc8);

        FtcDto ftc9 = new FtcDto();
        ftc9.setMember(members.get(8));
        ftc9.setSpeField("IT");
        ftc9.setApplyContent("모바일 앱 개발 가능한 프로그래머를 구합니다.");
        ftc9.setFtmYN(FtmYN.N);
        ftcList.add(ftc9);

        FtcDto ftc10 = new FtcDto();
        ftc10.setMember(members.get(9));
        ftc10.setSpeField("교육");
        ftc10.setApplyContent("온라인 화상영어 튜터를 찾습니다.");
        ftc10.setFtmYN(FtmYN.N);
        ftcList.add(ftc10);

        FtcDto ftc11 = new FtcDto();
        ftc11.setMember(members.get(10));
        ftc11.setSpeField("기타");
        ftc11.setApplyContent("가정 내 청소 도와줄 분을 찾습니다.");
        ftc11.setFtmYN(FtmYN.N);
        ftcList.add(ftc11);

        FtcDto ftc12 = new FtcDto();
        ftc12.setMember(members.get(11));
        ftc12.setSpeField("마케팅");
        ftc12.setApplyContent("SNS 홍보 전략가를 구합니다.");
        ftc12.setFtmYN(FtmYN.N);
        ftcList.add(ftc12);

        FtcDto ftc13 = new FtcDto();
        ftc13.setMember(members.get(12));
        ftc13.setSpeField("음악");
        ftc13.setApplyContent("웨딩에서 연주해줄 바이올린 연주자를 찾습니다.");
        ftc13.setFtmYN(FtmYN.N);
        ftcList.add(ftc13);

        FtcDto ftc14 = new FtcDto();
        ftc14.setMember(members.get(13));
        ftc14.setSpeField("디자인");
        ftc14.setApplyContent("포스터 디자인 전문가를 찾습니다.");
        ftc14.setFtmYN(FtmYN.N);
        ftcList.add(ftc14);

        FtcDto ftc15 = new FtcDto();
        ftc15.setMember(members.get(14));
        ftc15.setSpeField("유치원");
        ftc15.setApplyContent("어린이집에서 아이들을 돌봐줄 보모를 찾습니다.");
        ftc15.setFtmYN(FtmYN.N);
        ftcList.add(ftc15);

        FtcDto ftc16 = new FtcDto();
        ftc16.setMember(members.get(15));
        ftc16.setSpeField("운동");
        ftc16.setApplyContent("퍼스널 트레이너를 찾고 있습니다.");
        ftc16.setFtmYN(FtmYN.N);
        ftcList.add(ftc16);

        FtcDto ftc17 = new FtcDto();
        ftc17.setMember(members.get(16));
        ftc17.setSpeField("요리");
        ftc17.setApplyContent("집에서 간단한 쿠킹 클래스를 원합니다.");
        ftc17.setFtmYN(FtmYN.N);
        ftcList.add(ftc17);

        FtcDto ftc18 = new FtcDto();
        ftc18.setMember(members.get(17));
        ftc18.setSpeField("번역");
        ftc18.setApplyContent("영어 논문을 한국어로 번역해주세요.");
        ftc18.setFtmYN(FtmYN.N);
        ftcList.add(ftc18);

        FtcDto ftc19 = new FtcDto();
        ftc19.setMember(members.get(18));
        ftc19.setSpeField("건축");
        ftc19.setApplyContent("인테리어 설계가 필요합니다. 서울 지역입니다.");
        ftc19.setFtmYN(FtmYN.N);
        ftcList.add(ftc19);

        FtcDto ftc20 = new FtcDto();
        ftc20.setMember(members.get(19));
        ftc20.setSpeField("가르침");
        ftc20.setApplyContent("주말마다 수학 과외를 해주실 분을 찾습니다.");
        ftc20.setFtmYN(FtmYN.N);
        ftcList.add(ftc20);


        return ftcList;
    }

}