package RainbowLike.controller;

import RainbowLike.entity.Board;
import RainbowLike.repository.BoardRepository;
import RainbowLike.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class BoardController {

    private final BoardRepository boardRepository;
    private final BoardService boardService;
    @GetMapping
    private ResponseEntity<Iterable<Board>> getBoards() {
        Iterable<Board> boards = boardService.getAllBoards();
        return ResponseEntity.ok(boards);
    }


}
