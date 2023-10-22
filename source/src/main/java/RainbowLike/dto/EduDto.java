package RainbowLike.dto;

import RainbowLike.constant.EduType;
import RainbowLike.constant.RecuMethod;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class EduDto {

    @NotBlank
    private EduType type;

    @NotBlank
    private String eduName;

    @NotBlank
    private String content;

    @NotNull
    private LocalDateTime eduStdt;

    @NotNull
    private LocalDateTime eduEddt;

    @NotBlank
    private String eduAddr;

    @NotBlank
    private String target;

    @NotNull
    private LocalDate recuStdt;

    @NotNull
    private LocalDate recuEddt;

    @NotNull
    private int capacity;

    @NotNull
    private int recuPerson;

    @NotBlank
    private RecuMethod recuMethod;

    @NotBlank
    private String tel;

    static public ArrayList<EduDto> createDefaultEdu() {
        ArrayList<EduDto> eduList = new ArrayList<EduDto>();

        EduDto Edu1 = new EduDto();
        Edu1.setEduName("직장맘토요프로그램 4탄(꽃으로 내마음을 치유하는 플라워테라피)");
        Edu1.setType(EduType.EDU);
        Edu1.setContent("꽃으로 내마음을 치유하는 플라워테라피\n" +
                "\n" +
                " \n" +
                "\n" +
                "1.일시:  23.9.23.(토) 13:00:~15:00\n" +
                "\n" +
                "2.장소:  세종여성플라자 혜윰(세종시 새롬로 14, 새롬종합복지센터 4층)\n" +
                "3.대상:  세종시거주 직장맘 선착순 15명 ,  동반자녀(만 4~9세)\n" +
                "\n" +
                "136 자녀동반시 별도의 강의실에서 돌봄프로그램 운영\n" +
                "\n" +
                "⇒ 흙놀이: 흙그림, 나뭇잎찍기, 허수아비놀이 등\n" +
                "\n" +
                "※정원초과될 경우 신규신청자에게 먼저 기회가 제공됨을 알려드립니다.\n" +
                "\n" +
                "4.신청기간:  23.9.11(화)~9.20(수)\n" +
                "\n" +
                "5.신청방법\n" +
                "\n" +
                "첫번째! 홈페이지 회원가입 후 교육신청 \n" +
                "\n" +
                "두번째! 직장맘토요프로그램 신청서(HWP 파일 다운로드)를  작성하여 업로드(하단에 있어요~)\n" +
                "\n" +
                "세번째! 신청서 확인후 참여확정\n" +
                "\n" +
                " \n" +
                "\n" +
                "6.발표: 선정자분께는 9.20일 이후 개별로 문자를 드려요~!");
        Edu1.setEduStdt(LocalDateTime.of(2023,9,23,15,00,00,000));
        Edu1.setEduEddt(LocalDateTime.of(2023,9,23,17,00,00,000));
        Edu1.setEduAddr("세종여성플라자 내");
        Edu1.setTarget("하단 내용을 자세히 보시고 신청해주세요.");
        Edu1.setRecuStdt(LocalDate.of(2023,9,11));
        Edu1.setRecuEddt(LocalDate.of(2023,9,20));
        Edu1.setCapacity(15);
        Edu1.setRecuPerson(0);
        Edu1.setRecuMethod(RecuMethod.ADMIN_APPROVAL);
        Edu1.setTel("044) 866-0179");
        eduList.add(Edu1);

        EduDto Edu2 = new EduDto();
        Edu2.setType(EduType.EDU);
        Edu2.setEduName("새로운 도전을 꿈꾸는 당신을 위한 브런치 특강 '여성의 잠재력에 주목합니다'");
        Edu2.setContent("※ 많은 관심으로  접수 인원을 70명으로 증원했습니다. 접수 시 참고 부탁드립니다.\n" +
                " \n" +
                "새로운 도전을 꿈꾸는 당신을 위한 '브런치 특강'  참여자 모집\n" +
                "\"여성의 잠재력에 주목합니다\"\n" +
                " \n" +
                "- 경력보유여성의 마인드 셋업과 실질적인  정보 제공 -\n" +
                " \n" +
                "□ 교육일: 2023. 10. 6.(금) 10:30~13:00\n" +
                " \n" +
                "- 신청기간: 2023. 9. 4.(월) ~ 9. 25.(월)\n" +
                "- 신청대상: 세종 지역 여성 누구나 70명(선착순, 무료) \n" +
                "- 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)*\n" +
                "  ※ 신청 인원수 고려하여, 새롬종합복지센터 강의실(2층)로 장소 변경 예정\n" +
                "- 교육내용\n" +
                " \n" +
                "\n" +
                "일시\n" +
                "\n" +
                "내용\n" +
                "\n" +
                "강사\n" +
                "\n" +
                "10:30~12:00\n" +
                "\n" +
                "여성의 삶과 일의 의미\n" +
                "\n" +
                "김수영 강사\n" +
                "\n" +
                "‘엄마의 두 번째 명함’ 저자\n" +
                "\n" +
                "12:00~13:00\n" +
                "\n" +
                "재무설계의 기본에 대한 이해\n" +
                "\n" +
                "국민연금공단 연계\n" +
                "\n" +
                " \n" +
                "\n" +
                "★ 브런치 제공\n" +
                "- 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "- 문의 : 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu2.setEduStdt(LocalDateTime.of(2023,10,6,10,30,00,000));
        Edu2.setEduEddt(LocalDateTime.of(2023,10,6,15,00,00,000));
        Edu2.setEduAddr("세종여성플라자 혜윰");
        Edu2.setTarget("세종 지역 여성 누구나 70명");
        Edu2.setRecuStdt(LocalDate.of(2023,9,4));
        Edu2.setRecuEddt(LocalDate.of(2023,9,25));
        Edu2.setCapacity(70);
        Edu2.setRecuPerson(0);
        Edu2.setRecuMethod(RecuMethod.FIRST_COME);
        Edu2.setTel("044-850-8179");
        eduList.add(Edu2);

        EduDto Edu3 = new EduDto();
        Edu3.setType(EduType.BUSINESS);
        Edu3.setEduName("2023 세종여성플라자 시민포럼, 직장맘 여성잇수다'");
        Edu3.setContent("[2023 세종여성플라자 시민포럼]\n" +
                "직장맘 여성잇수다\n" +
                " \n" +
                " \n" +
                "'여성잇수다'는 '여성이 있다(being), 여성을 잇는다, 여성들이 함께 모여 먹으며(eat) 수다를 나눈다'라는 의미로 육아 퇴근한 저녁, 직장맘들의 솔직한 이야기를 나눌 수 있는 시간입니다.\n" +
                "직장맘의 어려움과 필요한 지원에 대해 여러분의 목소리를  들려주세요. \n" +
                " \n" +
                "직장맘 여성잇수다에 함께할 분들을 모집합니다.\n" +
                " \n" +
                " \n" +
                "○ 일시: 2023. 9. 1.(금) 18:30 ~ 20:30\n" +
                "○ 장소: 세종여성플라자 카페테리아(이음)\n" +
                "○ 모집대상 및 인원: 세종시 직장맘 30명 내외\n" +
                " \n" +
                "○ 신청\n" +
                "- 신청기간: 8. 18.(금) ~ 선착순\n" +
                "- 신청방법: 세종여성플라자 홈페이지 로그인 후 신청 \n" +
                " \n" +
                "○ 주요내용\n" +
                "- 1부 저녁 식사 및 환담\n" +
                "- 2부 직장맘이 말하고 세종이 듣는다\n" +
                "*최민호 세종시장님이 참석하실 예정입니다  \n" +
                "*행사 시간 동안 자녀 돌봄 프로그램이 운영됩니다  \n" +
                " \n" +
                "※ 참가자 혜택 :  저녁 식사, 기념품 제공, 직장맘토요힐링프로그램 우선 참가 기회 제공 \n" +
                " \n" +
                "○ 문의: 세종여성플라자 044-863-0380\n" +
                " \n" +
                " \n" +
                " ※ 접수 마감되었습니다 ");
        Edu3.setEduStdt(LocalDateTime.of(2023,9,1,18,30,00,000));
        Edu3.setEduEddt(LocalDateTime.of(2023,9,1,20,30,00,000));
        Edu3.setEduAddr("세종여성플라자 카페테리아(이음)");
        Edu3.setTarget("세종시 직장맘 30명 내외");
        Edu3.setRecuStdt(LocalDate.of(2023,8,18));
        Edu3.setRecuEddt(LocalDate.of(2023,8,28));
        Edu3.setCapacity(30);
        Edu3.setRecuPerson(0);
        Edu3.setRecuMethod(RecuMethod.FIRST_COME);
        Edu3.setTel("044-863-0380");
        eduList.add(Edu3);

        EduDto Edu4 = new EduDto();
        Edu4.setType(EduType.EDU);
        Edu4.setEduName("노동법 특강 [직장맘의 당연한 권리 찾기]");
        Edu4.setContent(" 세종시직장맘지원센터\n" +
                "\n" +
                "직장맘의 당연한 권리찾기 [노동법 특강]\n" +
                "\n" +
                "점심시간 잠깐 샌드위치 먹으며 노동법을 알아볼까요?  \n" +
                "\n" +
                "*샌드위치 무료제공\n" +
                "\n" +
                "1. 일시: 2023.9.15.(금) 11:30~13:30\n" +
                "\n" +
                "2. 장소: 새롬종합복지센터(새롬로 14) 2층, 강의실 1\n" +
                "\n" +
                "3. 대상: 직장맘⦁직장대디, 사업주 및 인사담당자 (선착순 50명-선정문자 안내드림)\n" +
                "\n" +
                "4. 내용: 임신기 근로자 모성보호, 출산전후휴가, 육아휴직 및 육아기 근로시간 단축 등, 일·가정양립지원제도\n" +
                "\n" +
                "5. 문의: 044-866-0179\n" +
                "\n" +
                " \n" +
                "\n" +
                "교육신청은 꼭!!! 아래 URL에 접속하시어 신청바랍니다.\n" +
                "\n" +
                "https://forms.gle/GQ5uj19pw4uEfyEKA");
        Edu4.setEduStdt(LocalDateTime.of(2023,9,15,11,30,00,000));
        Edu4.setEduEddt(LocalDateTime.of(2023,9,15,13,30,00,000));
        Edu4.setEduAddr("새롬종합복지센터 2층 강의실 1");
        Edu4.setTarget("직장맘, 예비직장맘, 사업주 및 인사담당자");
        Edu4.setRecuStdt(LocalDate.of(2023,8,10));
        Edu4.setRecuEddt(LocalDate.of(2023,9,13));
        Edu4.setCapacity(50);
        Edu4.setRecuPerson(0);
        Edu4.setRecuMethod(RecuMethod.FIRST_COME);
        Edu4.setTel("세종시직장맘지원센터 044) 866-0179");
        eduList.add(Edu4);

        EduDto Edu5 = new EduDto();
        Edu5.setType(EduType.EDU);
        Edu5.setEduName("여성, 창업을 묻다 \"엄마들의 나다움 창업 특강\"");
        Edu5.setContent(" ※ 많은 성원에 힘입어 모집인원을 '30명'으로 증원했습니다.\n" +
                " \n" +
                "여성 창업을 묻다 \"엄마들의 나다움 창업 특강\"\n" +
                "참여자 모집\n" +
                " \n" +
                " \n" +
                "□ 교육일정:  10. 18.(수) 10:00~12:00\n" +
                "□ 모집기간:  9. 25.(월) ~ 10.11.(수)\n" +
                "□ 모집대상: 세종 지역에 창업을 희망하는 여성 20명(선착순, 무료)\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)\n" +
                "□ 교육내용\n" +
                "   - 강사: 문서연 대표(엄마들의 일과 생활 연구소)\n" +
                "시간\n" +
                "\n" +
                "내용\n" +
                "\n" +
                "10:00~11:00\n" +
                "\n" +
                "창업자로서의 마인드 셋업\n" +
                "\n" +
                "11:00~12:00\n" +
                "\n" +
                "엄마들의 다양한 창업 사례 소개\n" +
                "★ 브런치 제공\n" +
                "□ 문의 : 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu5.setEduStdt(LocalDateTime.of(2023,10,18,10,00,00,000));
        Edu5.setEduEddt(LocalDateTime.of(2023,10,18,12,00,00,000));
        Edu5.setEduAddr("세종여성플라자 혜윰");
        Edu5.setTarget("세종 지역에 창업을 희망하는 여성 20명");
        Edu5.setRecuStdt(LocalDate.of(2023,9,25));
        Edu5.setRecuEddt(LocalDate.of(2023,10,11));
        Edu5.setCapacity(30);
        Edu5.setRecuPerson(0);
        Edu5.setRecuMethod(RecuMethod.FIRST_COME);
        Edu5.setTel("세종여성플라자 기획운영팀 ☎044-850-8179");
        eduList.add(Edu5);

        EduDto Edu6 = new EduDto();
        Edu6.setType(EduType.EDU);
        Edu6.setEduName("직장맘힐링프로그램-내마음사용법");
        Edu6.setContent("직장맘힐링프로그램-내마음사용법\n" +
                "\n" +
                " \n" +
                "\n" +
                "1.일시: 1부- 10.21.(토) 13:00~15:00\n" +
                "\n" +
                "           2부- 10.28.(토) 13:00~15:00\n" +
                "\n" +
                "    1부•2부는 주제가 다른 강좌로 연속 또는 개별신청 모두 가능합니다.\n" +
                "\n" +
                "2.장소: 세종여성플라자 혜윰\n" +
                "\n" +
                "(세종시 새롬로 14, 새롬종합복지센터 4층)\n" +
                "\n" +
                "3.대상: 세종시거주 직장맘 15명(동반자녀 만4~9세)\n" +
                "\n" +
                " \n" +
                "\n" +
                "4.내용 \n" +
                "\n" +
                "♦직장맘프로그램: 내마음사용법\n" +
                "\n" +
                "1부: 나의 첫번째 친구는 나\n" +
                "\n" +
                " - 놀면서 만나는 나의 생각과 감정\n" +
                "\n" +
                " - 부정 감정을 다루는 나만의 언어 찾기 \n" +
                "\n" +
                " - 나의 강점으로 회복탄력성 UP하는 법\n" +
                "\n" +
                " - 자녀와의 의사소통 기술\n" +
                "\n" +
                "2부: 알아차림의 기술\n" +
                "\n" +
                "- 감정카드와 욕구카드로 만나는 내 마음\n" +
                "\n" +
                "- 감정과 생각의 순환고리 이해하기\n" +
                "\n" +
                "- 새로운 질문으로 만나는 내 마음\n" +
                "\n" +
                "- 직장에서의 의사소통 기술 \n" +
                "\n" +
                "♦ 동반자녀프로그램: 마음 연극 놀이\n" +
                "\n" +
                "별도의 강의실에서 프로그램을 운영하오니 충분히 재충전의 시간되세요.\n" +
                "\n" +
                " \n" +
                "\n" +
                "5.신청기간: 23.10.6(금)~10.19(목)\n" +
                "\n" +
                "※ 세종시 직장맘이면 누구나 신청(기존 참여 및 추후신청자 중복참여 제한없이 신청되세요~)\n" +
                "\n" +
                "6.신청방법: 세종여성플라자 회원 가입후 신청하기(필수) 및 아래URL 입력(필수)\n" +
                "\n" +
                "https://forms.gle/rpyeAPPVGuuwQkZv6\n" +
                "\n" +
                " \n" +
                "\n" +
                "문의 044) 866-0179");
        Edu6.setEduStdt(LocalDateTime.of(2023,10,21,13,00,00,000));
        Edu6.setEduEddt(LocalDateTime.of(2023,10,21,15,00,00,000));
        Edu6.setEduAddr("세종여성플라자 혜윰");
        Edu6.setTarget("세종시거주 직장맘 15명");
        Edu6.setRecuStdt(LocalDate.of(2023,10,6));
        Edu6.setRecuEddt(LocalDate.of(2023,10,19));
        Edu6.setCapacity(15);
        Edu6.setRecuPerson(0);
        Edu6.setRecuMethod(RecuMethod.FIRST_COME);
        Edu6.setTel("044) 866-0179");
        eduList.add(Edu6);

        EduDto Edu7 = new EduDto();
        Edu7.setType(EduType.EDU);
        Edu7.setEduName("점심 책모임 '여성잇수다' 10월 참여자 모집");
        Edu7.setContent("세종여성플라자 점심 책모임 '여성잇수다' 10월 참여자 모집\n" +
                " \n" +
                "10월의 책 '프랑켄슈타인'\n" +
                " \n" +
                "- 길잡이 : 박민정 (성평등 책마당 활동위원)\n" +
                "- 신청 기간 : 2023.10.13.(금) ~ 10.27.(금) 18:00까지\n" +
                "- 모임 일시 : 2023.10.30.(월) 11:30~13:30\n" +
                "- 장소 : 세종여성플라자 강의실 혜윰(새롬종합복지센터 4층)\n" +
                "- 모집 인원 : 9명 (선착순)\n" +
                "- 문의 : 세종여성플라자 교육사업팀 (044-850-8128)\n" +
                " \n" +
                "* 점심식사로 김밥 제공");
        Edu7.setEduStdt(LocalDateTime.of(2023,10,30,11,30,00,000));
        Edu7.setEduEddt(LocalDateTime.of(2023,10,30,13,30,00,000));
        Edu7.setEduAddr("세종여성플라자 혜윰");
        Edu7.setTarget("세종시거주 여성 9명");
        Edu7.setRecuStdt(LocalDate.of(2023,10,13));
        Edu7.setRecuEddt(LocalDate.of(2023,10,27));
        Edu7.setCapacity(9);
        Edu7.setRecuPerson(0);
        Edu7.setRecuMethod(RecuMethod.FIRST_COME);
        Edu7.setTel("044-850-8128");
        eduList.add(Edu7);

        EduDto Edu8 = new EduDto();
        Edu8.setType(EduType.EDU);
        Edu8.setEduName("(구글교육) 실무에서 바로 쓰는 IT 활용 교육");
        Edu8.setContent("실무에서 바로 쓰는 IT 활용 교육\n" +
                "\n" +
                " \n" +
                "\n" +
                "“카드뉴스 제작툴 및 구글 협업툴 이해 교육”\n" +
                "\n" +
                " \n" +
                "\n" +
                "[교육신청 안내]\n" +
                "\n" +
                "○ 신청기간: 6. 19.(월) ~ 6. 30.(금)\n" +
                "\n" +
                "○ 대상: 세종에서 일하는 여성 20명(선착순, 무료)\n" +
                "\n" +
                "○ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "\n" +
                "○ 장소: 세종여성플라자 ‘하람’(새롬로 14, 새롬종합복지센터 4층)\n" +
                "\n" +
                "○ 준비사항: 구글 개인 계정\n" +
                "\n" +
                "○ 문의: 기획운영팀 044-850-8179\n" +
                "\n" +
                " \n" +
                "\n" +
                "[교육일정 안내]\n" +
                "\n" +
                "○ 1차: 구글 도구를 활용한 스마트워크\n" +
                "\n" +
                "- 일시: 7. 21.(금) 13:30~17:30\n" +
                "\n" +
                "- 강사: 김종원 대표(사회복지 홍보를 말하다, 구글워크스페이스, 구글 팁북 등 출간) \n" +
                "\n" +
                " ※ 1차, 2차 일정과 내용이 다릅니다. 희망하는 일자 확인 후 신청해주시기 바랍니다.");
        Edu8.setEduStdt(LocalDateTime.of(2023,11,2,9,0,00,000));
        Edu8.setEduEddt(LocalDateTime.of(2023,11,2,15,00,00,000));
        Edu8.setEduAddr("세종여성플라자 하람");
        Edu8.setTarget("세종에서 일하는 여성 20명");
        Edu8.setRecuStdt(LocalDate.of(2023,10,15));
        Edu8.setRecuEddt(LocalDate.of(2023,10,29));
        Edu8.setCapacity(20);
        Edu8.setRecuPerson(0);
        Edu8.setRecuMethod(RecuMethod.ADMIN_APPROVAL);
        Edu8.setTel("044-850-8179");
        eduList.add(Edu8);

        EduDto Edu9 = new EduDto();
        Edu9.setType(EduType.EDU);
        Edu9.setEduName("스마트폰 활용 기초 교육");
        Edu9.setContent("스마트폰 기초 사용법부터 앱 활용까지! \n" +
                "□ 교육일정: 11. 10.(금) 14:00~16:00\n" +
                "□ 모집기간: 10. 20.(금) ~ 11. 5.(일)\n" +
                "□ 모집대상: 스마트폰 사용에 어려움을 느끼는 세종시민 20명\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰\n" +
                "□ 교육내용: 스마트폰 기본 사용법, 앱 설치 및 관리\n" +
                "□ 문의: 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu9.setEduStdt(LocalDateTime.of(2023,11,10,14,00,00,000));
        Edu9.setEduEddt(LocalDateTime.of(2023,11,10,16,00,00,000));
        Edu9.setEduAddr("세종여성플라자 혜윰");
        Edu9.setTarget("스마트폰 사용에 어려움을 느끼는 세종시민 20명");
        Edu9.setRecuStdt(LocalDate.of(2023,10,20));
        Edu9.setRecuEddt(LocalDate.of(2023,11,5));
        Edu9.setCapacity(20);
        Edu9.setRecuPerson(0);
        Edu9.setRecuMethod(RecuMethod.FIRST_COME);
        Edu9.setTel("044-850-8179");
        eduList.add(Edu9);

        EduDto Edu10 = new EduDto();
        Edu10.setType(EduType.EDU);
        Edu10.setEduName("영어 회화 기초 특강");
        Edu10.setContent("영어 회화 기초부터 실용회화까지\n" +
                "□ 교육일정: 11. 15.(수) 10:00~12:00\n" +
                "□ 모집기간: 10. 25.(수) ~ 11. 10.(금)\n" +
                "□ 모집대상: 영어에 관심있는 세종시민 15명\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰\n" +
                "□ 교육내용: 기초문법, 일상회화 연습\n" +
                "□ 문의: 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu10.setEduStdt(LocalDateTime.of(2023,11,15,10,00,00,000));
        Edu10.setEduEddt(LocalDateTime.of(2023,11,15,12,00,00,000));
        Edu10.setEduAddr("세종여성플라자 혜윰");
        Edu10.setTarget("영어에 관심있는 세종시민 15명");
        Edu10.setRecuStdt(LocalDate.of(2023,10,25));
        Edu10.setRecuEddt(LocalDate.of(2023,11,10));
        Edu10.setCapacity(15);
        Edu10.setRecuPerson(0);
        Edu10.setRecuMethod(RecuMethod.FIRST_COME);
        Edu10.setTel("044-850-8179");
        eduList.add(Edu10);

        EduDto Edu11 = new EduDto();
        Edu11.setType(EduType.EDU);
        Edu11.setEduName("재테크 기초 교육");
        Edu11.setContent("재테크의 기초를 배우는 시간\n" +
                "□ 교육일정: 11. 20.(월) 13:00~15:00\n" +
                "□ 모집기간: 10. 30.(월) ~ 11. 15.(수)\n" +
                "□ 모집대상: 재테크에 관심있는 세종시민 20명\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰\n" +
                "□ 교육내용: 저축, 투자, 금융상품 알아보기\n" +
                "□ 문의: 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu11.setEduStdt(LocalDateTime.of(2023,11,20,13,00,00,000));
        Edu11.setEduEddt(LocalDateTime.of(2023,11,20,15,00,00,000));
        Edu11.setEduAddr("세종여성플라자 혜윰");
        Edu11.setTarget("재테크에 관심있는 세종시민 20명");
        Edu11.setRecuStdt(LocalDate.of(2023,10,30));
        Edu11.setRecuEddt(LocalDate.of(2023,11,15));
        Edu11.setCapacity(20);
        Edu11.setRecuPerson(0);
        Edu11.setRecuMethod(RecuMethod.FIRST_COME);
        Edu11.setTel("044-850-8179");
        eduList.add(Edu11);

        EduDto Edu12 = new EduDto();
        Edu12.setType(EduType.EDU);
        Edu12.setEduName("사회적 대화의 기술");
        Edu12.setContent("현대 사회에서 효과적인 대화의 중요성과 기술에 대해 배우는 시간입니다.\n" +
                "□ 교육일정: 11. 10.(금) 10:00~12:00\n" +
                "□ 모집기간: 10. 20.(금) ~ 11. 3.(금)\n" +
                "□ 모집대상: 세종 지역에 거주하는 누구나 20명(선착순, 무료)\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)\n" +
                "□ 문의: 세종여성플라자 교육사업팀 ☎044-850-8128");
        Edu12.setEduStdt(LocalDateTime.of(2023,11,10,10,00,00,000));
        Edu12.setEduEddt(LocalDateTime.of(2023,11,10,12,00,00,000));
        Edu12.setEduAddr("세종여성플라자 혜윰");
        Edu12.setTarget("세종 지역에 거주하는 누구나 20명");
        Edu12.setRecuStdt(LocalDate.of(2023,10,20));
        Edu12.setRecuEddt(LocalDate.of(2023,11,3));
        Edu12.setCapacity(20);
        Edu12.setRecuPerson(0);
        Edu12.setRecuMethod(RecuMethod.FIRST_COME);
        Edu12.setTel("044-850-8128");
        eduList.add(Edu12);

        EduDto Edu13 = new EduDto();
        Edu13.setType(EduType.BUSINESS);
        Edu13.setEduName("창업 기초 교육");
        Edu13.setContent("창업을 준비하는 분들을 위한 기초 교육입니다.\n" +
                "□ 교육일정: 11. 14.(화) 13:00~15:00\n" +
                "□ 모집기간: 10. 24.(화) ~ 11. 7.(화)\n" +
                "□ 모집대상: 창업을 준비하는 분들 30명(선착순, 무료)\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)\n" +
                "□ 문의: 세종여성플라자 기획운영팀 ☎044-850-8179");
        Edu13.setEduStdt(LocalDateTime.of(2023,11,14,13,00,00,000));
        Edu13.setEduEddt(LocalDateTime.of(2023,11,14,15,00,00,000));
        Edu13.setEduAddr("세종여성플라자 혜윰");
        Edu13.setTarget("창업을 준비하는 분들 30명");
        Edu13.setRecuStdt(LocalDate.of(2023,10,24));
        Edu13.setRecuEddt(LocalDate.of(2023,11,7));
        Edu13.setCapacity(30);
        Edu13.setRecuPerson(0);
        Edu13.setRecuMethod(RecuMethod.FIRST_COME);
        Edu13.setTel("044-850-8179");
        eduList.add(Edu13);

        EduDto Edu14 = new EduDto();
        Edu14.setType(EduType.EDU);
        Edu14.setEduName("아동 상담 기초 교육");
        Edu14.setContent("아동 상담의 기초에 대해 배우는 교육입니다.\n" +
                "□ 교육일정: 11. 18.(토) 10:00~12:00\n" +
                "□ 모집기간: 10. 28.(토) ~ 11. 11.(토)\n" +
                "□ 모집대상: 아동 상담에 관심 있는 분들 20명(선착순, 무료)\n" +
                "□ 신청방법: 세종여성플라자 홈페이지 로그인 후 신청\n" +
                "□ 교육장소: 세종여성플라자 혜윰(새롬로 14, 새롬종합복지센터 4층)\n" +
                "□ 문의: 세종여성플라자 교육사업팀 ☎044-850-8128");
        Edu14.setEduStdt(LocalDateTime.of(2023,11,18,10,00,00,000));
        Edu14.setEduEddt(LocalDateTime.of(2023,11,18,12,00,00,000));
        Edu14.setEduAddr("세종여성플라자 혜윰");
        Edu14.setTarget("아동 상담에 관심 있는 분들 20명");
        Edu14.setRecuStdt(LocalDate.of(2023,10,28));
        Edu14.setRecuEddt(LocalDate.of(2023,11,11));
        Edu14.setCapacity(20);
        Edu14.setRecuPerson(0);
        Edu14.setRecuMethod(RecuMethod.FIRST_COME);
        Edu14.setTel("044-850-8128");
        eduList.add(Edu14);

//        for (int i = 0; i < 100; i++) {
//            EduDto eduDto = new EduDto();
//            eduDto.setType(EduType.EDU);
//            eduDto.setEduName("페이징 테스트"+i);
//            eduDto.setContent("페이징 테스트" + i);
//            eduDto.setEduStdt(LocalDateTime.of(2023,9,15,11,30,00,000));
//            eduDto.setEduEddt(LocalDateTime.of(2023,9,15,13,30,00,000));
//            eduDto.setEduAddr("새롬종합복지센터 2층 강의실 1");
//            eduDto.setTarget("직장맘, 예비직장맘, 사업주 및 인사담당자");
//            eduDto.setRecuStdt(LocalDate.of(2023,8,10));
//            eduDto.setRecuEddt(LocalDate.of(2023,9,13));
//            eduDto.setCapacity(50);
//            eduDto.setRecuPerson(0);
//            eduDto.setRecuMethod(RecuMethod.FIRST_COME);
//            eduDto.setTel("세종시직장맘지원센터 044) 866-0179");
//            eduList.add(eduDto);
//        }
        return eduList;
    }
}
