import Spinner from "@atoms/spinner";
import { useNavigate } from "react-router-dom";
import { Api } from "@utils/api";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { api } from "@src/app/api";

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [tryLogin, { isLoading, isSuccess, error }] = api.useLoginMutation();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (!code) {
      navigate("/");
      return;
    }

    tryLogin(code);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>{`An error has occurred: ${error}`}</p>;

  return <Spinner />;
}

export default OAuth2RedirectHandler;
