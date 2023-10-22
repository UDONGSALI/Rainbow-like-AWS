package RainbowLike.controller;


import RainbowLike.component.MemberNotFoundException;
import RainbowLike.dto.MemberDto;
import RainbowLike.entity.Member;
import RainbowLike.repository.MemberRepository;
import RainbowLike.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @GetMapping
    public ResponseEntity<Iterable<Member>> getMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    @GetMapping("/id/{memId}")
    public ResponseEntity<Member> getMembersByMemId(@PathVariable String memId) {
        return memberService.findMemberByMemId(memId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping("/{memId}")
    public ResponseEntity<Member> getMemberInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;

            String username = userDetails.getUsername();  // 여기서 사용자의 아이디를 가져옴
            Member member = memberRepository.findByMemId(username);

            if (member != null) {
                // 멤버 정보를 반환
                return ResponseEntity.ok(member);
            } else {
                return ResponseEntity.status(401).build();
            }
        } else {
            return ResponseEntity.status(401).build();
        }
    }

    //멤버번호로 회원정보 가져오기
    @GetMapping("/memInfo/{memNum}")
    public ResponseEntity<Member> getMemberByMemNum(@PathVariable Long memNum) {
        Member member = memberRepository.findByMemNum(memNum);
        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/id-tel/{tel}")
    public ResponseEntity<String> getMemIdByTel(@PathVariable String tel) {
        return memberService.findMemIdByTel(tel)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/tel-id/{id}")
    public ResponseEntity<String> getTelByMemId(@PathVariable String id) {
        return memberService.findTelByMemId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search/{option}/{value}")
    public ResponseEntity<Iterable<Member>> searchMember(@PathVariable String option, @PathVariable String value) {
        return ResponseEntity.ok(memberService.searchMember(option, value));
    }

    @GetMapping("/check/{type}/{value}")
    public ResponseEntity<Boolean> checkDuplicate(@PathVariable String type, @PathVariable String value) {
        return ResponseEntity.ok(memberService.checkDuplicate(type, value));
    }

    @PostMapping
    public ResponseEntity<String> saveMemberAndFile(
            @RequestParam("memberData") String memberDataJson,
            @RequestParam(name = "file", required = false) List<MultipartFile> files,
            @RequestParam(name = "tableName", required = false) String tableName,
            @RequestParam(name = "number", required = false) Long number) {
        try {
            return ResponseEntity.ok(memberService.saveMemberAndFile(memberDataJson, files, tableName, number));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("회원가입 중 오류가 발생했습니다.");
        }
    }

    @PatchMapping("/id/{id}/{pwd}")
    public ResponseEntity<?> memberPwdChange(@PathVariable String id, @PathVariable String pwd) {
        Member updatedMember = memberService.changePassword(id, pwd);
        if (updatedMember != null) {
            return ResponseEntity.ok(updatedMember);
        }
        return ResponseEntity.badRequest().body("Failed to update password");
    }

    //회원정보수정에 따른 업데이트
    @PatchMapping("/update/{memId}")
    public ResponseEntity<String> updateMember(@PathVariable String memId, @RequestBody MemberDto updatedInfo) {
        try {
            Member existingMember = memberRepository.findByMemId(memId);

            if (existingMember == null) {
                return ResponseEntity.badRequest().body("Member not found");
            }
            if (updatedInfo.getGender() != null) {
                existingMember.setGender(updatedInfo.getGender());
            }
            if (updatedInfo.getEmail() != null) {
                existingMember.setEmail(updatedInfo.getEmail());
            }
            existingMember.setName(updatedInfo.getName());
            if (updatedInfo.getPwd() != null) {
                existingMember.setPwd(updatedInfo.getPwd());
            }
            existingMember.setAddrPost(updatedInfo.getAddrPost());
            existingMember.setAddr(updatedInfo.getAddr());
            if (updatedInfo.getAddrDtl() != null) {
                existingMember.setAddrDtl(updatedInfo.getAddrDtl());
            }

            // 업데이트된 멤버를 저장하고 반환
            memberRepository.save(existingMember);
            return ResponseEntity.ok("Member updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member: " + e.getMessage());
        }
    }

    //회원탈퇴
    @PatchMapping("/Withdrawal/{memId}")
    public ResponseEntity<String> withdrawal(@PathVariable String memId) {
        try {
            memberService.withdrawal(memId);
            return ResponseEntity.ok("회원 탈퇴에 성공했습니다!");
        } catch (MemberNotFoundException e) {
            logger.error("회원이 존재하지 않습니다.", e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원이 존재하지 않습니다.");
        } catch (Exception e) {
            logger.error("회원 탈퇴 중 오류가 발생했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteMember(@PathVariable String memId) {
        try {
            memberService.deleteMember(memId);
            return ResponseEntity.ok("회원 탈퇴에 성공했습니다!");
        } catch (MemberNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원이 존재하지 않습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 삭제 중 오류가 발생했습니다.");
        }
    }
}



