import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "email":{
            "type":"string",
            "pattern":".+\@.+\..+"
        },
        "password":{
            "type":"string",
        },
    },
    "required":["email", "password"]
}
export default ajv.compile(schema)