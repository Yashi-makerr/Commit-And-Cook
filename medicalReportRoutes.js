const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

// IMPORTANT destructuring import
const { uploadMedicalReport } = require("../controllers/medicalReportController");

router.post(
  "/upload",
  upload.single("report"),
  uploadMedicalReport
);

module.exports = router;
