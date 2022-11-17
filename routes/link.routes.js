import { Router } from "express";
import { getLinks, createLinks, getLink, removeLink, updateLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js"
import { bodyLinkValidator, paramIDValidator } from "../middlewares/validatorManager.js";

const router = Router();

//* GET             /api/links   DEVUELVE TODO LOS LINKS
router.get("/", requireToken, getLinks);

//* GET             /api/links/:id   DEVUELVE UN LINK ESPECIFICO
router.get("/:id", requireToken, getLink);
//router.get("/:nanoLink", getLink);

//? POST            /api/links   CREA UN LINK NUEVO
router.post("/", requireToken, bodyLinkValidator, createLinks);

//! DELETE          /api/links/:id   ELIMINA UN LINK SELECCIONADO
router.delete("/:id", requireToken, paramIDValidator, removeLink);

//TODO PATCH/PUT       /api/links/:id   ACTUALIZA PARTE (PATCH) O TODO (PUT) EL LINK
router.patch("/:id", requireToken, paramIDValidator, bodyLinkValidator, updateLink);

export default router