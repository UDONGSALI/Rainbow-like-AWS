package RainbowLike.controller;

import RainbowLike.dto.FTInfo;
import RainbowLike.dto.FtcDto;
import RainbowLike.dto.FtmDto;
import RainbowLike.dto.FtwDto;
import RainbowLike.entity.*;
import RainbowLike.repository.FemaleTalentMatchingRepository;
import RainbowLike.repository.FtConsumerRepository;
import RainbowLike.repository.FtWorkerRepository;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.FTalentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class FtalentController {

    @Autowired
    FtWorkerRepository ftwRepository;
    @Autowired
    FtConsumerRepository ftcRepository;
    @Autowired
    FemaleTalentMatchingRepository ftmRepository;
    @Autowired
    MemberRepository memRepository;
    @Autowired
    FTalentService ftService;


    @RequestMapping("/ftw")
    public Iterable<FtWorker> getWorkers() {return ftwRepository.findAll();
    }

    @RequestMapping("/ftc")
    public Iterable<FtConsumer> getConsumers() {
        return ftcRepository.findAll();
    }

    @RequestMapping("/ftm")
    public Iterable<FemaleTalentMatching> getFTMs() {

        return ftmRepository.findAll();
    }
    public void createTestFtw(){
        ArrayList<FtwDto> ftwDtoList = FtwDto.createTestFtw();
        ftService.createFtw(ftwDtoList);
    }

    public void createTestFtc(){
        ArrayList<FtcDto> ftcDtoList = FtcDto.createTestFtc();
        ftService.createFtc(ftcDtoList);
    }

    public void createTestFtm(){
        ArrayList<FtmDto> ftmDtoList = FtmDto.createTestFtm();
        ftService.createFtm(ftmDtoList);
    }
    @RequestMapping("/ftm/find/{ftcNum}")
    public Iterable<FemaleTalentMatching> getFTMResult(@PathVariable Long ftcNum) {
        FtConsumer ftc = new FtConsumer();
        ftc.setFtConsumerNum(ftcNum);
        return ftmRepository.findByFtConsumer(ftc);
    }

    @GetMapping("/ftw/{id}")
    public ResponseEntity<FTInfo> getFtwInfo(@PathVariable Long id) {

        FtWorker ftw = ftwRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 여성인재입니다."));

        Member member = ftw.getMember();

        FTInfo ftwInfo = new FTInfo(ftw, member);

        return ResponseEntity.ok(ftwInfo);
    }

    @GetMapping("/ftc/{id}")
    public ResponseEntity<FTInfo> getFtcInfo(@PathVariable Long id) {

        FtConsumer ftc = ftcRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 여성인재 신청입니다."));

        Member member = ftc.getMember();

        FTInfo ftcInfo = new FTInfo(ftc, member);

        return ResponseEntity.ok(ftcInfo);
    }

    @GetMapping("/ftm/{id}")
    public ResponseEntity<FTInfo> getFtmInfo(@PathVariable Long id) {

        FemaleTalentMatching ftm = ftmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id + "은 존재하지 않는 매칭결과입니다."));

        FtWorker ftw = ftm.getFtWorker();
        FtConsumer ftc = ftm.getFtConsumer();

        FTInfo ftmInfo = new FTInfo(ftm, ftw, ftc);

        return ResponseEntity.ok(ftmInfo);
    }

    @PostMapping("/ftw/new")
    public ResponseEntity<FtWorker> createFtw(@RequestBody FtwDto ftwDto) {
        FtWorker savedFtw = ftService.createFtw(ftwDto);
        return ResponseEntity.ok(savedFtw);
    }

    @PostMapping("/ftc/new")
    public ResponseEntity<FtConsumer> createFtc(@RequestBody FtcDto ftcDto) {
        FtConsumer savedFtc = ftService.createFtc(ftcDto);
        return ResponseEntity.ok(savedFtc);
    }

    @PostMapping("/ftm/new")
    public ResponseEntity<FemaleTalentMatching> createFtm(@RequestBody FtmDto ftmDto) {
        FemaleTalentMatching savedFtm = ftService.createFtm(ftmDto);
        return ResponseEntity.ok(savedFtm);
    }

    @RequestMapping("/ftw/edit/{ftwId}")
    public ResponseEntity<FtWorker> editFtw(@PathVariable Long ftwId, @RequestBody FtwDto ftwDto) {
        FtWorker savedFtw = ftService.editFtw(ftwId, ftwDto);
        return ResponseEntity.ok(savedFtw);
    }

    @RequestMapping("/ftc/edit/{ftcId}")
    public ResponseEntity<FtConsumer> editFtc(@PathVariable Long ftcId, @RequestBody FtcDto ftcDto) {
        FtConsumer savedFtc = ftService.editFtc(ftcId, ftcDto);
        return ResponseEntity.ok(savedFtc);
    }

    @RequestMapping("/ftm/edit/{ftmId}")
    public ResponseEntity<FemaleTalentMatching> editFtc(@PathVariable Long ftmId, @RequestBody FtmDto ftmDto) {
        FemaleTalentMatching savedFtm = ftService.editFtc(ftmId, ftmDto);

        // 저장한 게시글을 반환
        return ResponseEntity.ok(savedFtm);
    }

    @GetMapping("/ftwsms/{ftcNum}")
    public List<String> getTelByFtcNum(@PathVariable Long ftcNum) {
        // 받은 ftcNum을 consumerNum으로 지정하고 서비스 호출
        List<String> telList = ftService.findWTelByConsumerNum(ftcNum);

        return telList;
    }
    @GetMapping("/ftcsms/{ftcNum}")
    public String getwTelByFtcNum(@PathVariable Long ftcNum) {
        // 받은 ftcNum을 consumerNum으로 지정하고 서비스 호출
        List<String> telList = ftService.findCTelByConsumerNum(ftcNum);
        String tel = telList.get(0);
        return tel;
    }


    //멤버별 ftw, ftc, ftmatching 정보 가져오기

    @GetMapping("/ftw/member/{memNum}")
    public Iterable<FtWorker> getFtWorkersByMember(@PathVariable Long memNum) {
        // 멤버 번호를 기준으로 FtWorker 조회
        Member member = memRepository.findById(memNum)
                .orElseThrow(() -> new ResourceNotFoundException(memNum + "은 존재하지 않는 회원입니다."));

        return ftwRepository.findByMember(member);
    }

    @GetMapping("/ftc/member/{memNum}")
    public Iterable<FtConsumer> getFtConsumersByMember(@PathVariable Long memNum) {
        // 멤버 번호를 기준으로 FtConsumer 조회
        Member member = memRepository.findById(memNum)
                .orElseThrow(() -> new ResourceNotFoundException(memNum + "은 존재하지 않는 회원입니다."));

        return ftcRepository.findByMember(member);
    }
}
