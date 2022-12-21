const express = require("express");
const router = express.Router();

const {
  getBoards,
  getBoard,
  postBoard,
  putBoard,
  deleteBoard,
  deleteBoards,
} = require("../controllers/board");

// 전체 게시글 조회
router.get("/boards", getBoards);

// 특정 게시글 조회
router.get("/boards/:boardId", getBoard);

// 게시글 작성
router.post("/boards", postBoard);

// 특정 게시글 수정
// 비밀번호 비교 후 비밀번호 일치할 때만 수정
router.put("/boards/:boardId", putBoard);

// 특정 게시글 삭제
router.delete("/boards/:boardId", deleteBoard);

// 전체 게시글 삭제
router.delete("/boards", deleteBoards);

module.exports = router;
