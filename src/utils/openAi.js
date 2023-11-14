import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";

const openai = new OpenAI({
  apiKey: OPENAI_KEY,   //defaults to process.env["OPENAI_API_KEY"]
  dangerouslyAllowBrowser: true, //Include this if we are using the API Key in the front end or browser
});

export default openai;
