package RainbowLike.service;

import RainbowLike.constant.Status;
import RainbowLike.constant.Type;
import RainbowLike.dto.RentHistDto;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.MemberRepository;
import RainbowLike.repository.RentHistRepository;
import RainbowLike.repository.SpaceRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class RentHistService {
    private final RentHistRepository rentHistRepository;
    private final MemberRepository memberRepository;
    private final SpaceRepository spaceRepository;
    private final SmsService smsService;
    private final ModelMapper modelMapper;

    public List<RentHist> getAllRentHists() {
        return rentHistRepository.findAll();

    }

    //대관신청하기
    public RentHist applyForRent(RentHistDto rentHistDto, Long spaceNum, Long memNum) {
        // RentHistDto를 RentHist 엔터티로 매핑

        RentHist rentHist = modelMapper.map(rentHistDto, RentHist.class);
        rentHist.setSpace(spaceRepository.findBySpaceNum(spaceNum));
        rentHist.setMember(memberRepository.findByMemNum(memNum));
        // 기타 필요한 로직 추가
        rentHist.setApplyDate(LocalDateTime.now());  // 현재 시간으로 설정하거나 DTO에서 받아온 값 사용
        // 저장된 RentHist 엔터티를 반환
        return rentHistRepository.save(rentHist);
    }


    public Iterable<RentHist> searchRentHist(String option, String value, String memId) {
        Iterable<RentHist> result;
        switch (option) {
            case "spaceName":
                result = rentHistRepository.findBySpaceIn(spaceRepository.findBySpaceNameContaining(value));
                break;
            case "memId":
                result = rentHistRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
                break;
            case "applyStatus":
                Status applyStatus = Status.valueOf(value);
                result = rentHistRepository.findByApplyStatus(applyStatus);
                break;
            case "payStatus":
                Status payStatus = Status.valueOf(value);
                result = rentHistRepository.findByPayStatus(payStatus);
                break;
            default:
                result = new ArrayList<>();
        }
        if (!isAdmin(memId)) {
            List<RentHist> filteredList = new ArrayList<>();
            for (RentHist rentHist : result) {
                if (rentHist.getMember().getMemId().equals(memId)) {
                    filteredList.add(rentHist);
                }
            }
            result = filteredList;
        }
        return result;
    }

    private boolean isAdmin(String memId) {
        return memberRepository.findByMemId(memId).getType() == Type.ADMIN;
    }

    public void createRentHists(List<RentHistDto> rentHistDtoList) {
        for (RentHistDto rentHistDto : rentHistDtoList) {
            RentHist rentHist = modelMapper.map(rentHistDto, RentHist.class);
            rentHistRepository.save(rentHist);
        }
    }

    @Transactional
    public Optional<RentHist> updateRentHistApplyStatus(Long rentHistNum, Status status) {
        Optional<RentHist> optionalRentHist = rentHistRepository.findById(rentHistNum);
        if (status == Status.APPROVE){
            smsService.rentApplySms(rentHistNum);
        }
        if (optionalRentHist.isPresent()) {
            RentHist rentHist = optionalRentHist.get();
            rentHist.setApplyStatus(status);
            return Optional.of(rentHistRepository.save(rentHist));
        }
        return Optional.empty();
    }

    public RentHist updateRentHistPayStatus(RentHist rentHist) {
        rentHist.setPayStatus(Status.COMPLETE);
        return rentHistRepository.save(rentHist);
    }

    public void cancelRentHist(Long rentHistNum) {
        rentHistRepository.deleteById(rentHistNum);
    }

    public void createDefaultRent() {
        ArrayList<RentHistDto> rentHistDtoList = RentHistDto.createRentHists();
        createRentHists(rentHistDtoList);
    }

}
