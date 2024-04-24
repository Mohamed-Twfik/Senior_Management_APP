import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "description":{
            "type":"array",
        },
        "tags":{
            "type":"array",
        },
    },
}
export default ajv.compile(schema)