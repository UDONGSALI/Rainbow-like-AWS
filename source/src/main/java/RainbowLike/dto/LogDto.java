package RainbowLike.dto;


import RainbowLike.constant.EventType;
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

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDateTime;

@Getter
@Setter
public class LogDto {

    private String memId;

    @JsonIgnore
    private Member member;

    private EventType type;

    private String url;

    private String endpoint;

    private String method;

    private String label;
}
