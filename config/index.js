import { SIT, IE, ProdE, ENV } from "@env";

let API_BASE_URL;

switch (ENV) {
  case "SIT":
    API_BASE_URL = SIT;
    break;
  case "IE":
    API_BASE_URL = IE;
    break;
  case "ProdE":
    API_BASE_URL = ProdE;
    break;
}

export default API_BASE_URL;
