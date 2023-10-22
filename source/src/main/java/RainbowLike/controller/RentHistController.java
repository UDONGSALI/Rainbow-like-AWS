package RainbowLike.controller;


import RainbowLike.constant.Status;
import RainbowLike.dto.RentHistDto;
import RainbowLike.entity.RentHist;
import RainbowLike.repository.RentHistRepository;
import RainbowLike.service.RentHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;



@RestController
@RequiredArgsConstructor
@RequestMapping("/rent")
public class RentHistController {

    @Autowired
    private RentHistService rentHistService;
    @Autowired
    private RentHistRepository rentHistRepository;

    @GetMapping
    public List<RentHist> getAllRentHist() {
        return rentHistService.getAllRentHists();
    }
    // 회원 번호로 멤버별 대관내역 요청

    @RequestMapping("/memberRent/{memNum}")
    public List<RentHist> getRentalsByMemNum(@PathVariable Long memNum) {
        return rentHistRepository.findByMember_MemNum(memNum);
    }


    @GetMapping("/search/{option}/{value}/{memId}")
    public ResponseEntity<Iterable<RentHist>> searchRentHist(@PathVariable String option, @PathVariable String value, @PathVariable String memId) {
        Iterable<RentHist> results = rentHistService.searchRentHist(option, value, memId);
        return ResponseEntity.ok(results);
    }

    @PatchMapping("/{rentHistNum}")
    public ResponseEntity<?> updateRentHistStatus(@PathVariable Long rentHistNum, @RequestBody Map<String, String> body) {
        try {
            Status status = Status.valueOf(body.get("status").toUpperCase());
            Optional<RentHist> updatedRentHist = rentHistService.updateRentHistApplyStatus(rentHistNum, status);
            if (updatedRentHist.isPresent()) {
                return ResponseEntity.ok(updatedRentHist.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }
    }


    @PostMapping("/update/{spaceNum}/{memNum}")
    public ResponseEntity<String> applyForRent(@RequestBody RentHistDto rentHistDto,
                                               @PathVariable Long spaceNum,
                                               @PathVariable Long memNum) {
        try {
            RentHist rentHist = rentHistService.applyForRent(rentHistDto, spaceNum, memNum);
            return ResponseEntity.ok(rentHist.toString());
        } catch (Exception e) {
            e.printStackTrace(); // 예외 메시지를 로깅하도록 수정
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }


    @DeleteMapping("/{rentHistNum}")
    public ResponseEntity<Void> deleteRentHist(@PathVariable Long rentHistNum) {
        rentHistService.cancelRentHist(rentHistNum);
        return ResponseEntity.noContent().build();
    }

}
