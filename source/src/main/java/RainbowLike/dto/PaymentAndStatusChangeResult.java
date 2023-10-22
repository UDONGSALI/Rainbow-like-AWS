package RainbowLike.dto;

import RainbowLike.entity.PayHist;
import RainbowLike.entity.RentHist;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentAndStatusChangeResult {

    private PayHist payHist;
    private RentHist updatedRentHist;

}
