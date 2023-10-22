package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class SmsHistDto {
    private String smsType;
    private String sendTel;
    private String content;
    private LocalDateTime sendDate;

    public SmsHistDto(){

    }

    public SmsHistDto(String smsType, String sendTel, String content, LocalDateTime sendDate){
        this.smsType = smsType;
        this.sendTel = sendTel;
        this.content = content;
        this.sendDate = sendDate;
    }

    static public ArrayList<SmsHistDto> createTestSms(){
        ArrayList<SmsHistDto> smsList = new ArrayList<>();
        SmsHistDto sms1 = new SmsHistDto();
        SmsHistDto sms2 = new SmsHistDto();
        SmsHistDto sms3 = new SmsHistDto();

        sms1.setSmsType("공지");
        sms1.setSendTel("01075260231");
        sms1.setContent("[세종여성플라자 공지] 세종여성플라자가 새로워졌습니다! \n지금 방문해서 확인해보세요.");
        sms1.setSendDate(LocalDateTime.now());
        smsList.add(sms1);

        sms2.setSmsType("홍보");
        sms2.setSendTel("01075260231");
        sms2.setContent("[세종여성플라자] 세종여성플라자에서 소모임을 만나보세요.");
        sms2.setSendDate(LocalDateTime.now());
        smsList.add(sms2);

        sms3.setSmsType("홍보");
        sms3.setSendTel("01075260231");
        sms3.setContent("[세종여성플라자] 세종여성플라자에서 새로운 교육이 시작됩니다. 홈페이지를 참조해주세요.");
        sms3.setSendDate(LocalDateTime.now());
        smsList.add(sms3);

        return smsList;

    }

}

