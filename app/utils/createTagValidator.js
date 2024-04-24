import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "tag": {
            "type": "string",
        },
        "description":{
            "type":"string",
        }
    },
    "required": ["tag"],
}
export default ajv.compile(schema)