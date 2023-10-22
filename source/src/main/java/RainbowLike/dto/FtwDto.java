package RainbowLike.dto;

import RainbowLike.constant.DelYN;
import RainbowLike.constant.LicenseYN;
import RainbowLike.entity.Board;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.print.DocFlavor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FtwDto {

    private Long memNum;
    @JsonIgnore
    private Member member;
    private String speField;
    private LicenseYN licenseYN;
    private String licenseDtl;
    private String ftDtl;
    private String ftStatus;
    private String statusDtl;
    private DelYN delYN;
    private LocalDateTime writeDate;
    private LocalDateTime editDate;


    public FtwDto(){

    }

    public FtwDto(Long memNum, String speField, LicenseYN licenseYN, String licenseDtl, String ftDtl, String ftStatus, String StatusDtl,
                  DelYN delYN, LocalDateTime writeDate, LocalDateTime editDate){
        this.memNum = memNum;
        this.speField = speField;
        this.licenseYN = licenseYN;
        this.licenseDtl = licenseDtl;
        this.ftDtl = ftDtl;
        this.ftStatus = ftStatus;
        this.delYN = delYN;
        this.writeDate = writeDate;
        this.editDate = editDate;
    }

    static public ArrayList<FtwDto> createTestFtw() {
        ArrayList<FtwDto> ftwList = new ArrayList<>();

        List<Member> members = new ArrayList<>();
        for (int i = 1; i <= 15; i++) {
            Member member = new Member();
            member.setMemNum((long) i);
            members.add(member);
        }

        FtwDto ftw1 = new FtwDto();
        ftw1.setMember(members.get(0));
        ftw1.setSpeField("IT");
        ftw1.setLicenseYN(LicenseYN.Y);
        ftw1.setLicenseDtl("정보처리기사");
        ftw1.setFtDtl("웹개발 가능합니다. java, spring, springboot를 사용할 수 있습니다.");
        ftw1.setFtStatus("승인");
        ftw1.setDelYN(DelYN.N);

        ftwList.add(ftw1);


        FtwDto ftw2 = new FtwDto();
        ftw2.setMember(members.get(1));
        ftw2.setSpeField("디자인");
        ftw2.setLicenseYN(LicenseYN.Y);
        ftw2.setLicenseDtl("영상관련 자격증, 영상관련 자격증");
        ftw2.setFtDtl("영상촬영 및 프리미어/애프터이펙트 이용한 영상편집 전반");
        ftw2.setFtStatus("승인");
        ftw2.setDelYN(DelYN.N);

        ftwList.add(ftw2);


        FtwDto ftw3 = new FtwDto();
        ftw3.setMember(members.get(2));
        ftw3.setSpeField("디자인");
        ftw3.setLicenseYN(LicenseYN.N);
        ftw3.setFtDtl("일러스트 작업 / 명함 디자인 등 맡겨만 주시면 뭐든 그립니다.");
        ftw3.setFtStatus("승인대기");
        ftw3.setDelYN(DelYN.N);

        ftwList.add(ftw3);


        FtwDto ftw4 = new FtwDto();
        ftw4.setMember(members.get(3));
        ftw4.setSpeField("기타");
        ftw4.setLicenseYN(LicenseYN.N);
        ftw4.setFtDtl("신기해서 신청해봅니다ㅎ ");
        ftw4.setFtStatus("거부");
        ftw4.setStatusDtl("부적절한 신청입니다.");
        ftw4.setDelYN(DelYN.N);

        ftwList.add(ftw4);


        FtwDto ftw5 = new FtwDto();
        ftw5.setMember(members.get(4));
        ftw5.setSpeField("IT");
        ftw5.setLicenseYN(LicenseYN.Y);
        ftw5.setLicenseDtl("정보처리기능사");
        ftw5.setFtDtl("js, react, next.js 등 프론트를 할 줄 압니다");
        ftw5.setFtStatus("승인");
        ftw5.setDelYN(DelYN.Y);

        ftwList.add(ftw5);


        FtwDto ftw6 = new FtwDto();
        ftw6.setMember(members.get(5));
        ftw6.setSpeField("마케팅");
        ftw6.setLicenseYN(LicenseYN.N);
        ftw6.setFtDtl("SNS 마케팅, 광고 캠페인 기획 및 실행 가능합니다.");
        ftw6.setFtStatus("승인");
        ftw6.setDelYN(DelYN.N);

        ftwList.add(ftw6);

        FtwDto ftw7 = new FtwDto();
        ftw7.setMember(members.get(6));
        ftw7.setSpeField("번역");
        ftw7.setLicenseYN(LicenseYN.Y);
        ftw7.setFtDtl("문서 번역 및 통역 가능합니다. 전문 분야는 IT와 의학입니다.");
        ftw7.setLicenseDtl("토익 900점");
        ftw7.setFtStatus("승인대기");
        ftw7.setDelYN(DelYN.N);

        ftwList.add(ftw7);

        FtwDto ftw8 = new FtwDto();
        ftw8.setMember(members.get(7));
        ftw8.setSpeField("음악");
        ftw8.setLicenseYN(LicenseYN.N);
        ftw8.setFtDtl("피아노와 기타 연주 가능합니다. 음악 작곡 및 편곡 경험도 있습니다.");
        ftw8.setFtStatus("승인");
        ftw8.setDelYN(DelYN.N);

        ftwList.add(ftw8);

        FtwDto ftw9 = new FtwDto();
        ftw9.setMember(members.get(8));
        ftw9.setSpeField("요리");
        ftw9.setLicenseYN(LicenseYN.Y);
        ftw9.setLicenseDtl("한식 기능사");
        ftw9.setFtDtl("다양한 한식과 이탈리안 요리 가능합니다.");
        ftw9.setFtStatus("승인");
        ftw9.setDelYN(DelYN.N);

        ftwList.add(ftw9);

        FtwDto ftw10 = new FtwDto();
        ftw10.setMember(members.get(9));
        ftw10.setSpeField("사진");
        ftw10.setLicenseYN(LicenseYN.N);
        ftw10.setFtDtl("포트레이트 및 제품 사진 촬영 가능합니다. 자체 스튜디오 운영중입니다.");
        ftw10.setFtStatus("승인대기");
        ftw10.setDelYN(DelYN.N);

        ftwList.add(ftw10);

        FtwDto ftw11 = new FtwDto();
        ftw11.setMember(members.get(10));
        ftw11.setSpeField("운동");
        ftw11.setLicenseYN(LicenseYN.Y);
        ftw11.setLicenseDtl("피트니스 트레이너 자격증");
        ftw11.setFtDtl("생활 체육 지도자 2급");
        ftw11.setFtStatus("승인");
        ftw11.setDelYN(DelYN.N);

        ftwList.add(ftw11);

        FtwDto ftw12 = new FtwDto();
        ftw12.setMember(members.get(11));
        ftw12.setSpeField("뷰티");
        ftw12.setLicenseYN(LicenseYN.Y);
        ftw12.setLicenseDtl("메이크업 아티스트 자격증");
        ftw12.setFtDtl("다양한 스타일의 메이크업 및 헤어 스타일링 가능합니다.");
        ftw12.setFtStatus("승인대기");
        ftw12.setDelYN(DelYN.N);

        ftwList.add(ftw12);

        FtwDto ftw13 = new FtwDto();
        ftw13.setMember(members.get(12));
        ftw13.setSpeField("영화");
        ftw13.setLicenseYN(LicenseYN.N);
        ftw13.setFtDtl("영화 감독 및 촬영 경험 있습니다. 작품 제작부터 후반작업까지 가능합니다.");
        ftw13.setFtStatus("거부");
        ftw13.setStatusDtl("매칭불가 : 여성인재풀 DB에 아직 부합한 요청이 등록되지 않았습니다.");
        ftw13.setDelYN(DelYN.N);

        ftwList.add(ftw13);

        FtwDto ftw14 = new FtwDto();
        ftw14.setMember(members.get(13));
        ftw14.setSpeField("과학");
        ftw14.setLicenseYN(LicenseYN.Y);
        ftw14.setLicenseDtl("생물공학 기사");
        ftw14.setFtDtl("생물학적 연구 및 데이터 분석 가능합니다.");
        ftw14.setFtStatus("거부");
        ftw14.setStatusDtl("매칭불가 : 여성인재풀 DB에 아직 부합한 요청이 등록되지 않았습니다.");
        ftw14.setDelYN(DelYN.N);

        ftwList.add(ftw14);

        FtwDto ftw15 = new FtwDto();
        ftw15.setMember(members.get(14));
        ftw15.setSpeField("교육");
        ftw15.setLicenseYN(LicenseYN.N);
        ftw15.setFtDtl("수학과 과학 교육 경험 있습니다. 중학생 및 고등학생 대상으로 지도 가능합니다.");
        ftw15.setFtStatus("승인대기");
        ftw15.setDelYN(DelYN.N);

        ftwList.add(ftw15);


        return ftwList;
    }

}