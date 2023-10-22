package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class PayHistDto {

    private Long rentHistNum;
    private int fee;

    static public ArrayList<PayHistDto> createPayHists() {
        ArrayList<PayHistDto> PayList = new ArrayList<PayHistDto>();

        PayHistDto payHistDto = new PayHistDto();

        payHistDto.setRentHistNum(1L);
        payHistDto.setFee(10000);

        PayList.add(payHistDto);

        return PayList;
    }
}
