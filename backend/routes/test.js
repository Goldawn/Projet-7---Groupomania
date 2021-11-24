const express = require('express');
const router = express.Router({ mergeParams: true});

const testCtrl = require('../controllers/test');

router.post('/new', testCtrl.createTest);
router.put('/:testId', testCtrl.modifyTest)
router.delete('/:testId', testCtrl.deleteTest)
router.get('/', testCtrl.getAllTests);



module.exports = router;