package RainbowLike.entity;

import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

@CreatedDate
@Column(updatable = false)
LocalDateTime writeDate;

@LastModifiedDate
private LocalDateTime editDate;

public BaseEntity(){

    this.writeDate = LocalDateTime.now();
    this.editDate = LocalDateTime.now();
}

}