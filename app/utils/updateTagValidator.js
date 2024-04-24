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
}
export default ajv.compile(schema)