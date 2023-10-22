package RainbowLike.service;

import RainbowLike.dto.SmsHistDto;
import RainbowLike.dto.SmsRecepTelDto;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.Post;
import RainbowLike.entity.SmsHist;
import RainbowLike.entity.SmsRecepTel;
import RainbowLike.repository.*;
import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class SmsService {
    private final String apiKey = "NCSB52VZNJWSSRPP";
    private final String apiSecret = "KNLBRR4PSHSL7QERAHM2SD6WQMNK3VZ4";

    private final DefaultMessageService messageService;
    @Autowired
    ModelMapper mapper;
    @Autowired
    SmsHistRepository smsHistRepository;
    @Autowired
    SmsRecepTelRepository smsRecepTelRepository;
    @Autowired
    RentHistRepository rentRepository;
    @Autowired
    PayHistRepository payRepository;
    @Autowired
    EduHistRepository eduHistRepository;
    @Autowired
    PostRepository postRepository;

    private final Map<String, String> phoneVerificationMap = new HashMap<>();

    public SmsService() {
        this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
    }


    // 인재풀 매칭시 매칭신청자에게 메세지 전송
    public SingleMessageSentResponse ftcSms(String to, Long ftcNum) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 신청하신 여성인재풀DB가 매칭되었습니다.\n신청하신 글을 확인해주세요.(로그인 후 확인 가능) " + "http://localhost:3000/ftc/" + ftcNum);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    // 인재풀 매칭 시 매칭된 인재에게 메세지 전송
    public SingleMessageSentResponse ftwSms(String to) {
        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("[세종여성플라자] 회원님의 여성인재풀DB가 열람되었습니다.\n여성인재풀DB에 기재하신 연락처로 연락이 갈 수 있습니다.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    // 메세지 예제 작성
    public void createTestSms(ArrayList<SmsHistDto> smsList) {
        for (SmsHistDto smsHistDto : smsList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            SmsHist smsHist = mapper.map(smsHistDto, SmsHist.class);

            smsHistRepository.save(smsHist);
        }

    }

    // 메세지 수신번호목록 예제 작성
    public void createTestSmsRecep(ArrayList<SmsRecepTelDto> smsList) {
        for (SmsRecepTelDto smsRecepTelDto : smsList) {
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            SmsRecepTel smsRecepTel = mapper.map(smsRecepTelDto, SmsRecepTel.class);

            smsRecepTelRepository.save(smsRecepTel);
        }

    }

    // 작성 메세지 전송 메서드
    public SingleMessageSentResponse sendSMS(String from, String to, String txt) {
        Message message = new Message();
        message.setFrom(from);
        message.setTo(to);
        message.setText(txt);

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    //작성메세지 수신번호 리스트 저장
    public void saveSmsRecepTels(List<String> telList, Long histNum) {
        for (String t : telList) {
            SmsHist smsHist = new SmsHist();
            smsHist.setSmsHistNum(histNum);

            SmsRecepTel smsRecepTel = new SmsRecepTel();
            smsRecepTel.setSmsHist(smsHist);
            smsRecepTel.setRecepTel(t);

            smsRecepTelRepository.save(smsRecepTel);
        }
    }

    // 교육 승인 메세지
    public SingleMessageSentResponse eduApplySms(Long eduHistNum) {

        EduHist eduHist = eduHistRepository.findByEduHistNum(eduHistNum);
        String to = eduHist.getMember().getTel();
        String eduName = eduHist.getEdu().getEduName();
        String day = eduHist.getEdu().getEduStdt().toString().substring(0, 10);
        String startTime = eduHist.getEdu().getEduStdt().toString().substring(11, 16);
        String endTime = eduHist.getEdu().getEduEddt().toString().substring(11, 16);
        String time = startTime + " ~ " + endTime;

        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("신청하신" + eduName + "이 승인되었습니다. 교육 날짜와 시간(" + day + "," + time + ")을 확인하시고 이용해주세요.");
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    // 대관 승인 메세지
    public SingleMessageSentResponse rentApplySms(Long rentNum) {
        List<Object[]> data = rentRepository.findData(rentNum);
        String to = data.get(0)[0].toString();
        String space = data.get(0)[1].toString();
        String fee = data.get(0)[2].toString();
        String datetime = data.get(0)[3].toString();
        String day = datetime.substring(0, 10);
        String startTime = datetime.substring(11, 16);
        String endTime = data.get(0)[4].toString().substring(11, 16);
        String time = startTime + " ~ " + endTime;

        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        if (space.equals("강의실(혜윰)") || space.equals("다목적 활동실(라온)") || space.equals("멀티미디어실(하람)")) {
            message.setText("신청하신 " + space + "의 공간대여가 승인되었습니다. 사이트에 방문하여 결제금액 " + fee + "을 반드시 결제해주세요.");
        } else {
            message.setText("신청하신" + space + "의 공간대여가 승인되었습니다. 예약 날짜와 시간(" + day + "," + time + ")을 확인하시고 이용해주세요.");
        }
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;

    }

    // 대관 결제 확인 메세지
    public SingleMessageSentResponse rentPaySms(Long rentNum) {
        List<Object[]> data = rentRepository.findData(rentNum);
        String to = data.get(0)[0].toString();
        String space = data.get(0)[1].toString();
        String fee = data.get(0)[2].toString();
        String datetime = data.get(0)[3].toString();
        String day = datetime.substring(0, 10);
        String startTime = datetime.substring(11, 16);
        String endTime = data.get(0)[4].toString().substring(11, 16);
        String time = startTime + " ~ " + endTime;

        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        message.setText("신청하신 " + space + "의 결제가 확인되었습니다. 예약시간(" + day + ", " + time + ")을 확인하시고 이용해주세요.");

        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    // 노무사 배정 메시지
    public SingleMessageSentResponse updateLaborSms(Long postNum, boolean option) {
        Post post = postRepository.findByPostNum(postNum);
        String to = post.getMember().getTel();
        String tittle = post.getTitle();

        Message message = new Message();
        message.setFrom("01075260231");
        message.setTo(to);
        if (option) {
            message.setText("작성하신 " + tittle + "에 담당 노무사가 배정되었습니다. 곧 답변을 드릴 예정입니다.");
        } else {
            message.setText("작성하신 " + tittle + "에 담당 노무사 배정이 취소 되었습니다. 곧 더욱 적합한 노무사를 배정해 드리겠습니다.");
        }
        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
        return response;
    }

    //대관신청 확인 테스트(콘솔출력)
    public void rentApplyTest(Long rentNum) {
        List<Object[]> data = rentRepository.findData(rentNum);
        String to = data.get(0)[0].toString();
        String space = data.get(0)[1].toString();
        String fee = data.get(0)[2].toString();
        String day = data.get(0)[3].toString().substring(0, 10);
        String time = data.get(0)[3].toString().substring(11, 16);

        if ("무료".equals(fee)) {
            System.out.println("신청하신 " + space + "의 공간대여가 승인되었습니다. 예약일정(" + day + ", " + time + ")을 확인하시고 이용해주세요.");
        } else {
            System.out.println("신청하신 " + space + "의 공간대여가 승인되었습니다. 사이트에 방문하여 결제금액 " + fee + "을 반드시 결제해주세요.");
        }


    }

    //대관 결제 확인 테스트(콘솔출력)
    public void rentPayTest(Long rentNum) {
        List<Object[]> data = rentRepository.findData(rentNum);
        String to = data.get(0)[0].toString();
        String space = data.get(0)[1].toString();
        String fee = data.get(0)[2].toString();
        String day = data.get(0)[3].toString().substring(0, 10);
        String time = data.get(0)[3].toString().substring(11, 16);

        System.out.println("신청하신 " + space + "의 결제가 확인되었습니다. 예약일정(" + day + ", " + time + ")을 확인하시고 이용해주세요.");

    }


//    public SingleMessageSentResponse rentAgoSms(Long rentNum) {
//        List<Object[]> data = rentRepository.findData(rentNum);
//        String to = data.get(0)[0].toString();
//        String space = data.get(0)[1].toString();
//        String fee = data.get(0)[2].toString();
//        String day = data.get(0)[3].toString().substring(0, 10);
//        String time = data.get(0)[3].toString().substring(12, 17);
//        Message message = new Message();
//        message.setFrom("01075260231");
//        message.setTo(to);
//        message.setText("신청하신" + space + "의 공간대여가 하루 남았습니다. 예약시간(" + time + ")을 확인하시고 이용해주세요.");
//
//        SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
//        return response;
//    }
}
