import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "firstName":{
            "type":"string",
            "nullable": false,
        },
        "lastName":{
            "type":"string",
            "nullable": false,
        },
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+",
        },
        "password":{
            "type":"string",
            "pattern":`^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z]).{8,}$`,
        },
        "location":{
            "type":"string",
        },
        "occupation":{
            "type":"string",
        }
    },
    "required":["firstName", "lastName", "email", "password"]
}

export default ajv.compile(schema)