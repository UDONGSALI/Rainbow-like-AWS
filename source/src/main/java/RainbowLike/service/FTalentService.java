package RainbowLike.service;

import RainbowLike.dto.FtcDto;
import RainbowLike.dto.FtmDto;
import RainbowLike.dto.FtwDto;
import RainbowLike.entity.FemaleTalentMatching;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import RainbowLike.repository.FemaleTalentMatchingRepository;
import RainbowLike.repository.FtConsumerRepository;
import RainbowLike.repository.FtWorkerRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FTalentService {
    @Autowired
    FtWorkerRepository ftwRepository;
    @Autowired
    FtConsumerRepository ftcRepository;
    @Autowired
    FemaleTalentMatchingRepository ftmRepository;

    private final ModelMapper mapper;

    public void createFtw(ArrayList<FtwDto> ftwList){
        for(FtwDto ftwDto : ftwList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FtWorker ftw = mapper.map(ftwDto, FtWorker.class);

            ftwRepository.save(ftw);
        }
    }

    public void createFtc(ArrayList<FtcDto> ftcList){
        for(FtcDto ftcDto : ftcList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FtConsumer ftc = mapper.map(ftcDto, FtConsumer.class);

            ftcRepository.save(ftc);
        }
    }

    public void createFtm(ArrayList<FtmDto> ftmList){
        for(FtmDto ftmDto : ftmList){
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
            FemaleTalentMatching ftm = mapper.map(ftmDto, FemaleTalentMatching.class);

            ftmRepository.save(ftm);
        }
    }

    public List<String> findWTelByConsumerNum(Long ftcNum) {
        return ftmRepository.findWorkerTelByConsumerNum(ftcNum);
    }

    public List<String> findCTelByConsumerNum(Long ftcNum) {
        return ftmRepository.findConsumerTelByConsumerNum(ftcNum);
    }

    public FtWorker createFtw(FtwDto ftwDto) {
        FtWorker newFtw = new FtWorker();

        Member member = new Member();
        member.setMemNum(ftwDto.getMemNum());
        newFtw.setMember(member);

        newFtw.setSpeField(ftwDto.getSpeField());
        newFtw.setLicenseYN(ftwDto.getLicenseYN());
        newFtw.setLicenseDtl(ftwDto.getLicenseDtl());
        newFtw.setFtDtl(ftwDto.getFtDtl());
        newFtw.setFtStatus(ftwDto.getFtStatus());
        newFtw.setStatusDtl(ftwDto.getStatusDtl());
        newFtw.setDelYN(ftwDto.getDelYN());

        return ftwRepository.save(newFtw);
    }


    public FtConsumer createFtc(FtcDto ftcDto) {
        FtConsumer newFtc = new FtConsumer();

        Member member = new Member();
        member.setMemNum(ftcDto.getMemNum());
        newFtc.setMember(member);

        newFtc.setSpeField(ftcDto.getSpeField());
        newFtc.setApplyContent(ftcDto.getApplyContent());
        newFtc.setStatusDtl(ftcDto.getStatusDtl());
        newFtc.setFtmYN(ftcDto.getFtmYN());

        return ftcRepository.save(newFtc);

    }

    public FemaleTalentMatching createFtm(FtmDto ftmDto) {
        FemaleTalentMatching newFtm = new FemaleTalentMatching();

        FtWorker ftw = new FtWorker();
        ftw.setFtWorkerNum(ftmDto.getFtWorkerNum());
        newFtm.setFtWorker(ftw);
        FtConsumer ftc = new FtConsumer();
        ftc.setFtConsumerNum(ftmDto.getFtConsumerNum());
        newFtm.setFtConsumer(ftc);

        return ftmRepository.save(newFtm);
    }

    public FtWorker editFtw(Long ftwId, FtwDto ftwDto) {
        FtWorker editFtw = new FtWorker();

        editFtw.setFtWorkerNum(ftwId);

        Member member = new Member();
        member.setMemNum(ftwDto.getMemNum());
        editFtw.setMember(member);

        editFtw.setSpeField(ftwDto.getSpeField());
        editFtw.setLicenseYN(ftwDto.getLicenseYN());
        editFtw.setLicenseDtl(ftwDto.getLicenseDtl());
        editFtw.setFtDtl(ftwDto.getFtDtl());
        editFtw.setFtStatus(ftwDto.getFtStatus());
        editFtw.setStatusDtl(ftwDto.getStatusDtl());
        editFtw.setDelYN(ftwDto.getDelYN());

        return ftwRepository.save(editFtw);
    }

    public FtConsumer editFtc(Long ftcId, FtcDto ftcDto) {
        FtConsumer editFtc = new FtConsumer();

        editFtc.setFtConsumerNum(ftcId);

        Member member = new Member();
        member.setMemNum(ftcDto.getMemNum());
        editFtc.setMember(member);

        editFtc.setSpeField(ftcDto.getSpeField());
        editFtc.setApplyContent(ftcDto.getApplyContent());
        editFtc.setStatusDtl(ftcDto.getStatusDtl());
        editFtc.setFtmYN(ftcDto.getFtmYN());

        return ftcRepository.save(editFtc);
    }

    public FemaleTalentMatching editFtc(Long ftmId, FtmDto ftmDto) {
        FemaleTalentMatching editFtm = new FemaleTalentMatching();

        editFtm.setFtmNum(ftmId);

        FtWorker ftw = new FtWorker();
        ftw.setFtWorkerNum(ftmDto.getFtWorkerNum());
        editFtm.setFtWorker(ftw);
        FtConsumer ftc = new FtConsumer();
        ftc.setFtConsumerNum(ftmDto.getFtConsumerNum());
        editFtm.setFtConsumer(ftc);

        return ftmRepository.save(editFtm);
    }


    public void ftcSms (String to, Long ftcNum) {
        System.out.println("메시지를 받을 컨슈머 : " + to);
        System.out.println("[세종여성플라자] 신청하신 여성인재풀DB이 매칭되었습니다. \n신청하신 글을 확인해주세요.(로그인 후 확인 가능)  \n" + "http://localhost:3000/ftc/" + ftcNum);
    }
    public void ftwSms (String to) {
        System.out.println("메시지를 받을 워커 : " + to);
        System.out.println("[세종여성플라자] 회원님의 여성인재풀DB가 열람되었습니다. \n여성인재풀DB에 기재하신 연락처로 연락이 갈 수 있습니다.");
    }
}
