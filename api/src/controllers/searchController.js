import { Router } from "express";
import { getErrorMessage } from "../utils/errorUtil.js";
import searchService from "../services/searchService.js";
import querystring from "node:querystring";

const searchController = Router();

searchController.get("/movies", async (req, res) => {
    const search = querystring.parse(req.query.search.replaceAll('"', '')).search;

    try {
      const result = await searchService.movies(search);

      res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

searchController.get("/actors", async (req, res) => {
    const search = querystring.parse(req.query.search.replaceAll('"', '')).search;

    try {
        const result = await searchService.actors(search);

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
});

searchController.get("/directors", async (req, res) => {
    const search = querystring.parse(req.query.search.replaceAll('"', '')).search;

    try {
        const result = await searchService.directors(search);
        
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(getErrorMessage(error));
    };
})

export default searchController;