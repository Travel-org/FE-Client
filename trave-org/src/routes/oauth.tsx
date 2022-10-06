import Spinner from "@atoms/spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from "@src/app/api";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [tryLogin, { isLoading, isSuccess, error, data }] =
    api.useLoginMutation();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      navigate("/");
      return;
    }

    tryLogin(code);
  }, []);

  useEffect(() => {
    if (!data) return;

    if (data.status === 301) {
      navigate("/signUp", { state: { kakaoId: data.kakaoId } });
    } else {
      navigate("/dashboard");
    }
  }, [data]);

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>{`An error has occurred: ${error}`}</p>;

  return <Spinner />;
}

export default OAuth2RedirectHandler;
