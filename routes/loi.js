var express = require('express');
var router = express.Router();

import Loi from "../controller/loi"

router.get('/', function (req, res, next) {
    log("/loi 根目录")
    next()
}, Loi.getAllInoventory);

router.get('/inventory/code/:inventoryCode', async (req, res) => {
    const {inventoryCode} = req.params;
    const result = await Loi.getByInventoryCode(inventoryCode)
    res.json(result)
})
router.get('/inventory/name/:inventoryName', async (req, res) => {
    const {inventoryName} = req.params;
    const result = await Loi.getByInventoryName(inventoryName)
    res.json(result)
})

router.post('/entry', Loi.entry)

module.exports = router;
// export default  router;