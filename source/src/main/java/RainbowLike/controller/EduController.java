package RainbowLike.controller;

import RainbowLike.entity.Edu;
import RainbowLike.service.EduService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/edus")
public class EduController {

    private final EduService eduService;

    @GetMapping
    private Iterable<Edu> getEdus() {
        return eduService.findAll();
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Edu> searchEduHist(@PathVariable String option, @PathVariable String value) {
        return eduService.searchByOptionAndValue(option, value);
    }

    @PostMapping
    public ResponseEntity<Edu> saveEdu(@RequestBody Edu edu) {
        Edu savedEdu = eduService.saveEdu(edu);
        return ResponseEntity.ok(savedEdu);
    }
}
