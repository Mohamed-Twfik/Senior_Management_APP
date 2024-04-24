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
        "location":{
            "type":"string",
        },
        "occupation":{
            "type":"string",
        },
        "skill":{
            "type":"string",
        },
    }
}

export default ajv.compile(schema)