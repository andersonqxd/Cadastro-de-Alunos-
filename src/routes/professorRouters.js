const express = require("express");
const controler = require("../controllers/professorController");
const router = express.Router();

router.get("/", controler.lista);
router.post("/", controler.criar);
router.put("/:id", controler.atualizar)
router.delete("/:id", controler.deletar)

module.exports = router;