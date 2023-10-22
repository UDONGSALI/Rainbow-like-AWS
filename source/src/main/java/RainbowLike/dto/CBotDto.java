package RainbowLike.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class CBotDto {

    private String resCtgr;

    private String resTitle;

    private String resContnet;


    static public ArrayList<CBotDto> createCBotQnA(){
        ArrayList<CBotDto> qnaList =new ArrayList<CBotDto>();

        CBotDto qna1 = new CBotDto();
        qna1.setResCtgr("대관");
        qna1.setResTitle("대관 신청하기");
        qna1.setResContnet("대관을 신청하려면 (대관신청주소)에서 대관을 신청해주세요. 이하 대관신청 설명");
        qnaList.add(qna1);


        CBotDto qna2 = new CBotDto();
        qna2.setResCtgr("대관");
        qna2.setResTitle("대관 신청 취소");
        qna2.setResContnet("대관신청을 취소하려면 (마이페이지)에서 취소해주세요. 이하 대관신청 설명");
        qnaList.add(qna2);


        CBotDto qna3 = new CBotDto();
        qna3.setResCtgr("대관");
        qna3.setResTitle("대관이용후기작성");
        qna3.setResContnet("대관 이용 후기를 작성하려면 (대관이용후기)에서 작성해주세요. 이하 대관신청 설명");
        qnaList.add(qna3);


        CBotDto qna4 = new CBotDto();
        qna4.setResCtgr("사업/교육");
        qna4.setResTitle("사업/교육 신청하기");
        qna4.setResContnet("사업/교육 설명");
        qnaList.add(qna4);


        CBotDto qna5 = new CBotDto();
        qna5.setResCtgr("사업/교육");
        qna5.setResTitle("신청한 사업/교육 정보 확인");
        qna5.setResContnet("마이페이지에서 확인 가능합니다. 이하 상세설명");
        qnaList.add(qna5);


        CBotDto qna6 = new CBotDto();
        qna6.setResCtgr("카테고리3");
        qna6.setResTitle("qna 타이틀3-1");
        qna6.setResContnet("qna 설명 3-1");
        qnaList.add(qna6);


        CBotDto qna7 = new CBotDto();
        qna7.setResCtgr("카테고리3");
        qna7.setResTitle("qna 타이틀 3-2");
        qna7.setResContnet("qna 설명 3-2");
        qnaList.add(qna7);


        CBotDto qna8 = new CBotDto();
        qna8.setResCtgr("카테고리3");
        qna8.setResTitle("qna 타이틀 3-3");
        qna8.setResContnet("qna 설명 3-3");
        qnaList.add(qna8);


        CBotDto qna9 = new CBotDto();
        qna9.setResCtgr("카테고리4");
        qna9.setResTitle("qna 타이틀 4-1");
        qna9.setResContnet("qna 설명 4-1");
        qnaList.add(qna9);


        CBotDto qna10 = new CBotDto();
        qna10.setResCtgr("카테고리4");
        qna10.setResTitle("qna 타이틀 4-2");
        qna10.setResContnet("qna 설명 4-2");
        qnaList.add(qna10);

        return qnaList;
    }



}
