import userResponse from "../responses/user.js"

export default {
    "/user/{id}": {
        summary: "Get an existing user",
        description: "Get an existing user",
        get: {
            tags: ["Users"],
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "integer",
                        minimum: 1
                    },
                    description: "The user ID"
                }
            ],
            responses: userResponse
        }
    },
    "/user": {
        summary: "Posts a user",
        description: "User was posted!",
        post: {
            tags: ["Users"],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/UserInput"
                        }
                    }
                }
            },
            responses: userResponse
        }
    },
    "/users": {
        summary: "Gets all the users",
        description: "Some description, Kilian is een geitje",
        get: {
            tags: ["Users"],
            responses: userResponse
        }
    }
}