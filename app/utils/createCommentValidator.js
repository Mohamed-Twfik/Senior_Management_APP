import Ajv from "ajv"
const ajv = new Ajv()

const schema = {
    "type": "object",
    "properties": {
        "comment":{
            "type":"string",
        }
    },
}
export default ajv.compile(schema)