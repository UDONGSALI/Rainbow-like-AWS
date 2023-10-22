package RainbowLike.dto;

import RainbowLike.constant.FtmYN;
import RainbowLike.entity.FtConsumer;
import RainbowLike.entity.FtWorker;
import RainbowLike.entity.Member;
import RainbowLike.entity.QFtConsumer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class FtmDto {

    private Long ftWorkerNum;
    @JsonIgnore
    private FtWorker ftWorker;
    private Long ftConsumerNum;
    @JsonIgnore
    private FtConsumer ftConsumer;
    private LocalDateTime writeDate;


    public FtmDto(){

    }

    public FtmDto(Long ftWorkerNum, Long ftConsumerNum, LocalDateTime writeDate){
        this.ftWorkerNum = ftWorkerNum;
        this.ftConsumerNum = ftConsumerNum;
        this.writeDate = writeDate;
    }

    static public ArrayList<FtmDto> createTestFtm() {
        ArrayList<FtmDto> ftmList = new ArrayList<>();

        FtWorker ftw1 = new FtWorker();
        FtWorker ftw2 = new FtWorker();
        FtWorker ftw3 = new FtWorker();
        FtWorker ftw5 = new FtWorker();
        ftw1.setFtWorkerNum(1L);
        ftw2.setFtWorkerNum(2L);
        ftw3.setFtWorkerNum(3L);
        ftw5.setFtWorkerNum(5L);

        FtConsumer ftc1 = new FtConsumer();
        FtConsumer ftc2 = new FtConsumer();
        ftc1.setFtConsumerNum(1L);
        ftc2.setFtConsumerNum(2L);

        FtmDto ftm1 = new FtmDto();
        ftm1.setFtWorker(ftw1);
        ftm1.setFtConsumer(ftc1);

        ftmList.add(ftm1);

        FtmDto ftm2 = new FtmDto();
        ftm2.setFtWorker(ftw2);
        ftm2.setFtConsumer(ftc2);

        ftmList.add(ftm2);

        FtmDto ftm3 = new FtmDto();
        ftm3.setFtWorker(ftw3);
        ftm3.setFtConsumer(ftc2);

        ftmList.add(ftm3);

        FtmDto ftm4 = new FtmDto();
        ftm4.setFtWorker(ftw5);
        ftm4.setFtConsumer(ftc2);

        ftmList.add(ftm4);

        return ftmList;
    }

}