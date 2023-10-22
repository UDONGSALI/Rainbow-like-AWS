package RainbowLike.dto;

import RainbowLike.entity.SmsHist;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class SmsRecepTelDto {
    private Long smsHistNum;
    @JsonIgnore
    private SmsHist smsHist;
    private String recepTel;

    public SmsRecepTelDto(){

    }

    public SmsRecepTelDto(Long smsHistNum, String recepTel){
        this.smsHistNum = smsHistNum;
        this.recepTel = recepTel;
    }

    static public ArrayList<SmsRecepTelDto> createTestSmsRecepTel(){
        ArrayList<SmsRecepTelDto> SRTList = new ArrayList<>();
        SmsHist smsHist1 = new SmsHist();
        SmsHist smsHist2 = new SmsHist();
        SmsHist smsHist3 = new SmsHist();

        smsHist1.setSmsHistNum(1L);
        smsHist2.setSmsHistNum(2L);
        smsHist3.setSmsHistNum(3L);

        SmsRecepTelDto smsDto1 = new SmsRecepTelDto();
        smsDto1.setSmsHist(smsHist1);
        smsDto1.setRecepTel("01011111111");
        SRTList.add(smsDto1);

        SmsRecepTelDto smsDto2 = new SmsRecepTelDto();
        smsDto2.setSmsHist(smsHist1);
        smsDto2.setRecepTel("01022222222");
        SRTList.add(smsDto2);

        SmsRecepTelDto smsDto3 = new SmsRecepTelDto();
        smsDto3.setSmsHist(smsHist1);
        smsDto3.setRecepTel("01033333333");
        SRTList.add(smsDto3);

        SmsRecepTelDto smsDto4 = new SmsRecepTelDto();
        smsDto4.setSmsHist(smsHist2);
        smsDto4.setRecepTel("01012121212");
        SRTList.add(smsDto4);

        SmsRecepTelDto smsDto5 = new SmsRecepTelDto();
        smsDto5.setSmsHist(smsHist2);
        smsDto5.setRecepTel("01023232323");
        SRTList.add(smsDto5);

        SmsRecepTelDto smsDto6 = new SmsRecepTelDto();
        smsDto6.setSmsHist(smsHist3);
        smsDto6.setRecepTel("01012341234");
        SRTList.add(smsDto6);


        return SRTList;

    }

}

