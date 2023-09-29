# URL Shortener
## Feature
* Converts a long-length URL into a short-length URL (e.g. https://www.twitch.tv/directory/following -> http://localhost:8080/lrbnlrbn)
* A URL can be converted to many different short URLs
## Development
* Notes
    * The server is locally hosted with port 8080 -> http://localhost:8080
    * The server uses an in-memory storage with the Map object to store all the URLs and their shortened version
        * In the Map object, the keys are the IDs for the shortened URL and the values are the original URLs
    * The id for the short URL is always a length of 8.
* 3 Endpoints
    * GET '/' -> Returns a list of all URLs and their shortened version
    * GET '/:id' -> A randomly generated id maps to the original URL. It will redirect to the original URL.
        * EXAMPLE: Given the url http://localhost:8080/lrbnlrbn, 'lrbn' is the id. This id is mapped to a long URL like https://www.twitch.tv/directory/following. If http:localhost:8080/lrbn is visited, it will redirect to https://www.twitch.tv/directory/following
    * POST '/ -> Create a shortened URL by providing a URL in the request body. This endpoint takes in a JSON object -> { "url": "LONG URL HERE" }
