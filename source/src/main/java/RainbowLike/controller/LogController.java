package RainbowLike.controller;


import RainbowLike.dto.LogDto;
import RainbowLike.dto.OrganizationDto;
import RainbowLike.entity.Log;
import RainbowLike.entity.Organization;
import RainbowLike.repository.LogRepository;
import RainbowLike.service.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/log")
public class LogController {

    private final LogService logService;

    @GetMapping
    public ResponseEntity<Iterable<Log>> getLog() {
        return ResponseEntity.ok(logService.findAll());
    }

    @GetMapping("/search/{option}/{value}")
    public Iterable<Log> searchLogByOption(@PathVariable String option, @PathVariable String value) {
        return logService.searchByOptionAndValue(option, value);
    }

    @PostMapping
    public ResponseEntity<Log> saveLog(@RequestBody LogDto logDto) {
        Log savedLog = logService.saveLog(logDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
    }
}
