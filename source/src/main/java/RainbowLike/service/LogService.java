package RainbowLike.service;


import RainbowLike.constant.EduType;
import RainbowLike.constant.EventType;
import RainbowLike.constant.Type;
import RainbowLike.dto.LogDto;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Log;
import RainbowLike.entity.Member;
import RainbowLike.repository.LogRepository;
import RainbowLike.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class LogService {

    private final LogRepository logRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    public Iterable<Log> findAll() {
        return logRepository.findAll();
    }

    public Iterable<Log> searchByOptionAndValue(String option, String value) {
        Iterable<Log> result;
        switch (option) {
            case "type":
                EventType type = EventType.valueOf(value);
                result = logRepository.findByType(type);
                break;
            case "memId":
                result = logRepository.findByMemberIn(memberRepository.findByMemIdContaining(value));
                break;
            case "url":
                result = logRepository.findByUrlContaining(value);
                break;
            case "memType":
                Type memType = Type.valueOf(value);
                result = logRepository.findByMemberIn(memberRepository.findByType(memType));
                break;
            default:
                result = new ArrayList<>();
        }
        return result;
    }

    public Log saveLog(LogDto logDto) {
        Member member = memberRepository.findByMemId(logDto.getMemId());
        logDto.setMember(member);
        Log log = mapper.map(logDto, Log.class);
        logRepository.save(log);
        return log;
    }
}
