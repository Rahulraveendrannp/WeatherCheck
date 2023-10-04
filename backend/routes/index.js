const express = require("express");
const router = express.Router();
const data = require("../controllers/api");

/**
 * @swagger
 * /api/weather/findplaces:
 *   get:
 *     summary: Find a place based on latitude and longitude.
 *     description: This API endpoint is used to find a place according to the given latitude and longitude.
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: The latitude coordinate of the place.
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: true
 *         description: The longitude coordinate of the place.
 *     responses:
 *       200:
 *         description: Successful response containing place information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 placeName:
 *                   type: string
 *                   description: The name of the place.
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       404:
 *         description: Place not found.
 *       500:
 *         description: Internal server error.
 *     examples:
 *       Request:
 *         summary: Example request to find a place.
 *         value:
 *           latitude: 40.7128
 *           longitude: -74.0060
 *       Response:
 *         summary: Example response for a found place.
 *         value:
 *           placeName: New York City
 *
 */
router.get("/api/weather/findplaces", data.fetchPlace);

/**
 * @swagger
 * /api/weather/histories:
 *   get:
 *     summary: Get weather history for a location.
 *     description: Retrieve weather history data for a specified location.
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: The location for which weather history is requested.
 *     responses:
 *       200:
 *         description: Successful response containing weather history.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 maxTemp:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: An array of maximum temperature values.
 *                 minTemp:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: An array of minimum temperature values.
 *                 days:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of days corresponding to the temperature data.
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/api/weather/histories", data.fetchHistory);

/**
 * @swagger
 * /api/weather/hourlyforecast:
 *   get:
 *     summary: Get hourly weather forecast for a location.
 *     description: Retrieve hourly weather forecast data for a specified location.
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: true
 *         description: The location for which hourly weather forecast is requested.
 *     responses:
 *       200:
 *         description: Successful response containing hourly weather forecast.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temp:
 *                   type: array
 *                   items:
 *                     type: number
 *                   description: An array of temperature values for each hour.
 *                 time:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: An array of time values corresponding to each temperature reading.
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/api/weather/hourlyforecast", data.fetchForecast);

module.exports = router;
