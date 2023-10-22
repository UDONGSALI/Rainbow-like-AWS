package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.dto.EduHistDto;
import RainbowLike.dto.PayHistDto;
import RainbowLike.dto.PaymentAndStatusChangeResult;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.PayHist;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.PayHistRepository;
import RainbowLike.repository.RentHistRepository;
import RainbowLike.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PayHistService {

    private final PayHistRepository payHistRepository;
    private final RentHistRepository rentHistRepository;
    private final SpaceRepository spaceRepository;
    private final MemberRepository memberRepository;
    private final RentHistService rentHistService;
    private final SmsService smsService;
    public Iterable<PayHist> findAll() {
        return payHistRepository.findAll();
    }

    public Iterable<PayHist> searchByOptionAndValue(String option, String value) {
        Iterable<PayHist> result;
        switch (option) {
            case "rentHistNum":
                result = payHistRepository.findByRentHist(rentHistRepository.findByRentHistNum(Long.parseLong(value)));
                break;
            case "spaceName":
                result = payHistRepository.findByRentHistIn(rentHistRepository.findBySpaceIn(spaceRepository.findBySpaceNameContaining(value)));
                break;
            case "memId":
                result = payHistRepository.findByRentHistIn(rentHistRepository.findByMemberIn(memberRepository.findByMemIdContaining(value)));
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
    }


    @Transactional
    public PaymentAndStatusChangeResult addPayHist(PayHistDto payHistDto) {

        PayHist payHist = new PayHist();
        RentHist rentHist = rentHistRepository.findByRentHistNum(payHistDto.getRentHistNum());
        payHist.setRentHist(rentHist);
        payHist.setFee(payHistDto.getFee());

        payHistRepository.save(payHist);
        smsService.rentPaySms(payHistDto.getRentHistNum());

        RentHist updatedRentHist = rentHistService.updateRentHistPayStatus(rentHist);

        return new PaymentAndStatusChangeResult(payHist, updatedRentHist);
    }
    @Transactional
    public void creatDefaultPayHists(){
        List<PayHistDto> payHists = PayHistDto.createPayHists();
        for (PayHistDto payHistDto:
             payHists) {
            addPayHist(payHistDto);
        }
    }
}
