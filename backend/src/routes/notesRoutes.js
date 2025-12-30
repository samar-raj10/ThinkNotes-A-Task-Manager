import express from "express"
import { createnotes, deletenotes, getAllnotes, updatenotes, getNoteById, updateStatus, updateDate} from "../controllers/notesControllers.js";


const router = express.Router();

router.get("/", getAllnotes);
router.get("/:id",getNoteById);
router.post("/", createnotes);
router.put("/:id", updatenotes);
router.delete("/:id", deletenotes);
router.patch("/:id/status", updateStatus);
router.patch("/:id/due-date", updateDate);


export default router;

