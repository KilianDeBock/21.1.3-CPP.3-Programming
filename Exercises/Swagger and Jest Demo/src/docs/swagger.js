/**
 * The Swagger configuration
 */

import schemas from "./schemas.js"
import paths from "./paths/index.js"

export default {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "API to control our data",
        description: "Title says it all... But this is a description in swagger.js",
        license: {
            name: "Artevelde HS",
            url: "https://arteveldehogeschool.be"
        }
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Development server"
        }
    ],
    tags: [
        {
            name: "Users",
            description: "Tags concerning users"
        }
    ],
    paths,
    components: {
        schemas
    }
}