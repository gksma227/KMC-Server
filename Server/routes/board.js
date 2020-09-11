const express = require('express');

const router = express.Router();

const { boardType } = require('../controllers/board');

// * GET  // 게시판에 있는 전체 글들을 불러옵니다.
router.get('/:boardtype', boardType.get);

// * POST /write
router.post('/:boardtype/write', boardType.write.post);

// * GET /:id
router.get('/:boardtype/:id', boardType.id.get);

// * PATCH /modify/:id
router.patch('/:boardtype/modify/:id', boardType.modify.patch);

router.get('');

module.exports = router;
