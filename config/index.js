import { SITE, IE, ProdE, ENV } from "@env";

let API_BASE_URL;

switch (ENV) {
  case "SITE":
    API_BASE_URL = SITE;
    break;
  case "IE":
    API_BASE_URL = IE;
    break;
  case "ProdE":
    API_BASE_URL = ProdE;
    break;
  default:
    API_BASE_URL = IE;
    break;
}

export default API_BASE_URL;
