import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../Common/constants';
import { useState } from "react";
import {useConfirm} from "./useConfirm";

function useDeletePost() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]); // 게시물 목록을 상태로 관리
    const confirm = useConfirm();

    const fetchPosts = async (boardNum) => {
        try {
            const response = await fetch(`${SERVER_URL}post/${boardNum}`);
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            console.error(err);
            alert("게시물 목록을 가져오는 중 오류가 발생했습니다.");
        }
    };

    const deletePost = async (postNum, files, boardNum, SERVER_URL, onSuccess) => {
        const isConfirmed = await confirm("정말로 이 게시글을 삭제하시겠습니까?");
        if (!isConfirmed) {
            return false;
        }
        try {
            const response = await fetch(`${SERVER_URL}post/${postNum}`, { method: 'DELETE' });

            if (response.ok) {
                await fetchPosts(boardNum); // 게시물 삭제 성공 후 게시물 목록을 다시 가져옴
                if (onSuccess) {
                    onSuccess(postNum); // 성공 콜백 호출
                }
                // 게시판 경로 결정 로직
                if (boardNum <= 2) {
                    navigate(`/post/${boardNum}`);
                } else if (boardNum >= 3 && boardNum <= 5) {
                    navigate(`/imgPost/${boardNum}`);
                } else if (boardNum >= 7) {
                    navigate(`/csl/${boardNum}`);
                } else {
                    navigate('/posts');
                }
                alert("게시글을 삭제 했습니다!.");
                return true;
            } else {
                alert("게시글 삭제에 실패하였습니다.");
                return false;
            }
        } catch (err) {
            console.error(err);
            alert("오류가 발생했습니다. 다시 시도해주세요.");
            return false;
        }
    };

    return { deletePost, posts }; // posts를 반환하여 사용 가능하게 함
}

export default useDeletePost;
