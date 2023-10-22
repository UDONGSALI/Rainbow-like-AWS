package RainbowLike.dto;

import RainbowLike.constant.Status;
import RainbowLike.entity.Edu;
import RainbowLike.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;


@Getter
@Setter
public class EduHistDto {

    private Long eduNum;

    private Long memNum;
    @JsonIgnore
    private Edu edu;
    @JsonIgnore
    private Member member;

    private boolean portraitRights;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime applyDate;

    private Status status;



    static public ArrayList<EduHistDto> createDefaultEduHist(){
        ArrayList<EduHistDto> eduHists = new ArrayList<>();
        for (int i = 2; i <= 20; i++) {
            for (int j = 1; j <= 5; j++) {
                if (j == 1 && i%2 ==0){
                    continue;
                }
                EduHistDto eduHistDto = new EduHistDto();
                eduHistDto.setMemNum(Long.valueOf(i));
                eduHistDto.setEduNum(Long.valueOf(j));
                eduHistDto.setStatus(Status.COMPLETE);
                eduHistDto.setApplyDate(LocalDateTime.now());
                eduHists.add(eduHistDto);
            }
            for (int j = 6; j <= 8; j++) {
                if ((j == 6 || j == 7 )&& i%2 ==0){
                    continue;
                }
                EduHistDto eduHistDto = new EduHistDto();
                eduHistDto.setMemNum(Long.valueOf(i));
                eduHistDto.setEduNum(Long.valueOf(j));
                eduHistDto.setStatus(Status.APPROVE);
                eduHistDto.setApplyDate(LocalDateTime.now());
                eduHists.add(eduHistDto);
            }
        }
        return eduHists;
    }
}
