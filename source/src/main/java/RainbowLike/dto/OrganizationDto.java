package RainbowLike.dto;

import RainbowLike.constant.Status;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
public class OrganizationDto {


    @NotBlank
    private String Name;

    @NotBlank
    private String url;

    @NotBlank
    private String tel;

    @NotBlank
    private String addr;

    private String addrDtl;

    private String addrPost;


    static public ArrayList<OrganizationDto> creatDefaultOrg() {
        ArrayList<OrganizationDto> organizationDtos = new ArrayList<>();

        OrganizationDto organizationDto5 = new OrganizationDto();
        organizationDto5.setName("세종여성플라자");
        organizationDto5.setUrl("https://www.sejong.go.kr/index.jsp");
        organizationDto5.setTel("044-863-0380");
        organizationDto5.setAddr("세종특별자치시 새롬로 14");
        organizationDto5.setAddrDtl("새롬종합복지센터 4층 (새롬동)");
        organizationDto5.setAddrPost("30127");
        organizationDtos.add(organizationDto5);

//        OrganizationDto organizationDto1 = new OrganizationDto();
//        organizationDto1.setName("세종여성새로일하기센터");
//        organizationDto1.setUrl("http://www.sejongsaeil.com/default/");
//        organizationDto1.setTel("0448638219");
//        organizationDto1.setAddr("세종특별자치시 새롬로 14");
//        organizationDto1.setAddrDtl("새롬종합복지센터 2층");
//        organizationDto1.setAddrPost("30127");
//        organizationDtos.add(organizationDto1);

        OrganizationDto organizationDto2 = new OrganizationDto();
        organizationDto2.setName("세종YMCA성인권상담소");
        organizationDto2.setUrl("https://ywcagfcc.hompee.com/frnt/main/index.hpc");
        organizationDto2.setTel("0448629191");
        organizationDto2.setAddr("세종특별자치시 조치원읍 군청로 87-16");
        organizationDto2.setAddrDtl("조치원청사 2층");
        organizationDto2.setAddrPost("30033");
        organizationDtos.add(organizationDto2);

        OrganizationDto organizationDto3 = new OrganizationDto();
        organizationDto3.setName("종촌종합복지센터");
        organizationDto3.setUrl("https://www.jongchonwelfare.or.kr/");
        organizationDto3.setTel("0448503000");
        organizationDto3.setAddr("세종특별자치시 도움1로 116");
        organizationDto3.setAddrDtl("종촌종합복지센터");
        organizationDto3.setAddrPost("30064");
        organizationDtos.add(organizationDto3);

        OrganizationDto organizationDto4 = new OrganizationDto();
        organizationDto4.setName("세종특별자치시");
        organizationDto4.setUrl("https://www.sejong.go.kr/index.jsp");
        organizationDto4.setTel("044120 ");
        organizationDto4.setAddr("세종특별자치시 한누리대로 2130");
        organizationDto4.setAddrDtl("세종시청");
        organizationDto4.setAddrPost("30151");
        organizationDtos.add(organizationDto4);


//        for (int i = 0; i < 100; i++) {
//            OrganizationDto organizationDto = new OrganizationDto();
//            organizationDto.setName("test" + i);
//            organizationDto.setUrl("test" + i);
//            organizationDto.setTel("test" + i);
//            organizationDto.setAddr("test" + i);
//            organizationDto.setAddrDtl("test" + i);
//            organizationDto.setAddrPost("test" + i);
//            organizationDtos.add(organizationDto);
//        }

        return organizationDtos;
    }
}

