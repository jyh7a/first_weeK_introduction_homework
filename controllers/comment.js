const Board = require("../models/board");
const Comment = require("../models/comment");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });

    res.send(comments);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: error.message });
  }
};

const getBoardComments = async (req, res) => {
  try {
    const { boardId } = req.params;

    // 조기 리턴
    const board = await Board.findById(boardId);
    if (board === null) {
      return res.status(400).send({ message: "🛑 게시글이 없습니다." });
    }

    const comment = await Comment.find({ boardId }).sort({ createdAt: -1 });

    res.send(comment);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: error.message });
  }
};

const postBoardComment = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { body, userName } = req.body;

    // 조기 리턴
    const board = await Board.findById(boardId);
    if (board === null) {
      return res.status(400).send({ message: "🛑 게시글이 없습니다." });
      // return 안붙였을때 에러 테스트
      // boardID = 63a31e030f1338b7fba2990c
      // res.send({message: "🛑 게시글이 없습니다."});
    }

    if (Object.keys(req.body).length !== 2) {
      return res.status(400).send({ message: "파라미터를 확인하세요" });
    }

    if (body === "") {
      return res.status(400).send("🛑 댓글 내용을 입력해주세요");
    }

    const comment = await Comment.create({
      body,
      userName,
      boardId,
    });

    console.log(comment);

    res.send(comment);
  } catch (error) {
    console.error(error);

    res.status(500).send(error.message);
  }
};

const putBoardComment = async (req, res) => {
  try {
    const { boardId, commentId } = req.params;
    const { body, userName } = req.body;

    // 조기 리턴
    const board = await Board.findById(boardId);
    if (board === null) {
      return res.status(400).send({ message: "🛑 게시글이 없습니다." });
    }

    const _comment = await Comment.findById(commentId);
    if (_comment === null) {
      return res.status(400).send({ message: "🛑 댓글이 없습니다." });
    }

    if (Object.keys(req.body).length !== 2) {
      return res.status(400).send({ message: "파라미터를 확인하세요" });
    }

    if (body === "") {
      return res.status(400).send("🛑 댓글 내용을 입력해주세요");
    }

    const result = await Comment.findByIdAndUpdate(
      commentId,
      {
        body,
        userName,
      },
      { new: true }
    );

    console.log("result", result);

    res.send({ message: "success" });
  } catch (error) {
    console.error(error);

    res.status(500).send(error.message);
  }
};

const deleteBoardComments = async (req, res) => {
  try {
    const { boardId, commentId } = req.params;

    // 조기 리턴
    const board = await Board.findById(boardId);
    if (board === null) {
      return res.status(400).send({ message: "🛑 게시글이 없습니다." });
    }

    const _comment = await Comment.findById(commentId);
    if (_comment === null) {
      return res.status(400).send({ message: "🛑 댓글이 없습니다." });
    }

    const comment = await Comment.findByIdAndDelete(commentId);

    res.send(comment);
  } catch (error) {
    console.error(error);

    res.status(500).send(error.message);
  }
};

const deleteComments = async (req, res) => {
  try {
    const result = await Comment.deleteMany();

    console.log("result", result);

    if (result.deletedCount > 0) {
      return res.send({ message: "success" });
    } else {
      return res.send({ message: "nothing to delete" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).send(error.message);
  }
};

module.exports = {
  getComments,
  getBoardComments,
  postBoardComment,
  putBoardComment,
  deleteBoardComments,
  deleteComments,
};
