package RainbowLike.service;

import RainbowLike.dto.BoardDto;
import RainbowLike.entity.Board;
import RainbowLike.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.ArrayList;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final ModelMapper mapper;

    private final BoardRepository boardRepository;

    public Iterable<Board> getAllBoards() {
        return boardRepository.findAll();
    }

//    @PostConstruct
    public void createBoards() {

        ArrayList<BoardDto> boardDtoList = BoardDto.createBoards();
        for (BoardDto boardDto : boardDtoList) {

            Board board = mapper.map(boardDto, Board.class);

            boardRepository.save(board);
        }
    }
}

