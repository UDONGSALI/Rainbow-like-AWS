package RainbowLike.controller;

import RainbowLike.constant.Status;
import RainbowLike.entity.Board;
import RainbowLike.entity.EduHist;
import RainbowLike.entity.Member;
import RainbowLike.entity.Post;
import RainbowLike.repository.EduHistRepository;
import RainbowLike.repository.EduRepository;
import RainbowLike.service.EduHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/eduHist")
public class EduHistController {
    private final EduHistService eduHistService;
    private final EduHistRepository eduHistRepository;

    @GetMapping
    public ResponseEntity<Iterable<EduHist>> getEduHists() {
        Iterable<EduHist> eduHists = eduHistService.findAll();
        return ResponseEntity.ok(eduHists);
    }

    @GetMapping("/search/{option}/{value}/{memId}")
    public ResponseEntity<Iterable<EduHist>> searchEduHist(@PathVariable String option, @PathVariable String value, @PathVariable String memId) {
        Iterable<EduHist> results = eduHistService.searchEduHist(option, value, memId);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/check/{memNum}/{eduNum}")
    public ResponseEntity<Boolean> eduHistCheck(@PathVariable Long memNum, @PathVariable Long eduNum) {
        return ResponseEntity.ok(eduHistService.eduHistCheck(memNum, eduNum));
    }

    // 회원 번호로 멤버별 교육신청내역 요청
    @RequestMapping("/memberEduHist/{memNum}")
    public List<EduHist> getEduHistByMember(@PathVariable Long memNum) {
        return eduHistRepository.findByMember_MemNum(memNum);
    }


    @PatchMapping("/{eduHistnum}")
    public ResponseEntity<?> updateEduHistStatus(@PathVariable Long eduHistnum, @RequestBody Map<String, String> body) {
        try {
            Status status = Status.valueOf(body.get("status").toUpperCase());
            Optional<EduHist> updatedEduHist = eduHistService.updateEduHistStatus(eduHistnum, status);
            if (updatedEduHist.isPresent()) {
                return ResponseEntity.ok(updatedEduHist.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEduHist(@PathVariable Long id) {
        if (eduHistService.deleteEduHist(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<String> saveEduHistAndFile(
            @RequestParam("eduHistData") String eduHistDataJson,
            @RequestParam(name = "file", required = false) List<MultipartFile> files,
            @RequestParam(name = "tableName", required = false) String tableName,
            @RequestParam(name = "number", required = false) Long number) {
        try {
            return ResponseEntity.ok(eduHistService.saveEduHistAndFile(eduHistDataJson, files, tableName, number));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("요청 처리 중 에러 발생");
        }
    }



}
