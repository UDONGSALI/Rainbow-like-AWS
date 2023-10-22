package RainbowLike.controller;

import RainbowLike.dto.PayHistDto;
import RainbowLike.dto.PaymentAndStatusChangeResult;
import RainbowLike.entity.PayHist;
import RainbowLike.service.PayHistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pay")
public class PayHistController {

    private final PayHistService payHistService;

    @GetMapping
    private Iterable<PayHist> getPayHists() {
        return payHistService.findAll();
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<PayHist> searchLogByOption(@PathVariable String option, @PathVariable String value) {
        return payHistService.searchByOptionAndValue(option, value);
    }

    @PostMapping
    public ResponseEntity<PaymentAndStatusChangeResult> addPayHist(@RequestBody PayHistDto payHistDto) {
        PaymentAndStatusChangeResult result = payHistService.addPayHist(payHistDto);
        return ResponseEntity.ok(result);
    }
}
