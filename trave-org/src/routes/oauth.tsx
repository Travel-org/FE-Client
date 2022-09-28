import Spinner from "@atoms/spinner";
import { Api } from "@utils/api";
// import { useEffect } from "react";
import { useQuery } from "react-query";

const OAuth2RedirectHandler = () => {
  const { isLoading, error, data } = useQuery("oauth", () => {
    let code = new URL(window.location.href).searchParams.get("code");
    Api.get(`/oauth?${code}`);
  });
  // if (error) return "error";
  if (isLoading) return <p>"Loading..."</p>;

  if (error) return <p>{"An error has occurred: " + (error as any).message}</p>;

  return (
    <>
      <Spinner />
    </>
  );
};

export default OAuth2RedirectHandler;