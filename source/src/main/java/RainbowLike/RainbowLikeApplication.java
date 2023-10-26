package RainbowLike;

import RainbowLike.controller.*;
import RainbowLike.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;

@SpringBootApplication
@RequiredArgsConstructor
public class RainbowLikeApplication implements CommandLineRunner {

    private final PostService postService;
    private final CommentController commentController;
    private final RentHistService rentHistService;
    private final EduHistService eduHistService;
    private final DefaultFileService defaultFileService;
    private final FtalentController ftalentController;
    private final SmsController smsController;
    private final CbotController cbotController;
    private final ChatController chatController;
    private final PayHistService payHistService;

    @Value("${GCP_CREDENTIALS}")
    private String gcpCredentials;

    public static void main(String[] args) {
        SpringApplication.run(RainbowLikeApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
            setupGcpCredentials();

//        rentHistService.createDefaultRent();
//
//        payHistService.creatDefaultPayHists();
//
//        postService.createDefaultPosts();
//
//        commentController.createComms();
//
//        eduHistService.createDefaultEduHists();
//
//        defaultFileService.createDefaultFiles();
//
//        ftalentController.createTestFtw();
//        ftalentController.createTestFtc();
//        ftalentController.createTestFtm();
//
//        smsController.createTestSms();
//
//        cbotController.createQnA();
//        chatController.createTestChat();
    }

    private void setupGcpCredentials() throws Exception {
        Path tempFile = Files.createTempFile("gcp-credentials", ".json");
        Files.write(tempFile, gcpCredentials.getBytes());
        System.setProperty("spring.cloud.gcp.credentials.location", tempFile.toUri().toString());
    }

}

