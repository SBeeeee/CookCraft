import express from "express";
import { isAuthenticated} from "../middleware/isAuthenticated.js";
import { generater,saveRecipe,information,geturl,getRecipes } from "../controller/recipe.js";

const router = express.Router();

router.route("/").post(generater);
router.route("/favorites").post(saveRecipe);
router.route("/information/:id").get(information);
router.route("/geturl/:id").get(geturl);
router.route("/getRecipes/:id").get(getRecipes);

export default router;
