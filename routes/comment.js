const express = require("express");
const router = express.Router();

const {
  getComments,
  getBoardComments,
  postBoardComment,
  putBoardComment,
  deleteBoardComments,
  deleteComments,
} = require("../controllers/comment");

// 전체 댓글 조회
router.get("/comments", getComments);

// 특정 게시글에 속한 댓글 전체 조회
router.get("/boards/:boardId/comments", getBoardComments);

// 특정 게시글에 속한 댓글 작성
router.post("/boards/:boardId/comments", postBoardComment);

// 특정 게시글에 속한 특정 댓글 수정
router.put("/boards/:boardId/comments/:commentId", putBoardComment);

// 특정 게시글에 속한 특정 댓글 삭제
router.delete("/boards/:boardId/comments/:commentId", deleteBoardComments);

// 전체 댓글 삭제
router.delete("/comments", deleteComments);

module.exports = router;
