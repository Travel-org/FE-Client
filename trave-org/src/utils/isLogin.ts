import Cookies from "js-cookie";
const isLogin = () => !!Cookies.get("SESSION");
export default isLogin;