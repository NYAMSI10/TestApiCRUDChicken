const express = require("express")
const router = express.Router()


const chickenController = require("../Controller/ChickenController")

// Ceux sont les différentes routes de l'API

router.get("/", chickenController.chickenAll)

router.get("/:id", chickenController.chickenById)

router.post("/", chickenController.createchicken)

router.put("/:id", chickenController.updatechicken)

router.delete("/:id", chickenController.deletechicken)

router.patch("/:id", chickenController.patchhicken)

router.post("/run/:id", chickenController.runhicken)

router.put("/:chickenid/farmyard/:farmyardid", chickenController.chicenfarmyard)

module.exports = router