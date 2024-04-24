import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+",
        },
    },
    "required": ["email"],
}

export default ajv.compile(schema)