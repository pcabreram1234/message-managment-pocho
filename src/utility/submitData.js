async function submitData(API, data, METHOD = "POST") {
  const token = window.localStorage.getItem("token");

  const headers = {
    "Content-type": "application/json; charset=UTF-8",
    "x-access-token": token,
  };

  if (METHOD !== "GET") {
    let req = await fetch(API, {
      method: METHOD,
      body: JSON.stringify({ data }),
      /* Colocamos como header el tipo JSON para que express pueda usar el midleware app.use(json()) */
      headers: headers,
    });
    let resp = await req.json();
    const token = req.headers.get("token");
    if (token) {
      window.localStorage.setItem("token", token);
    }
    if (resp.error) {
      window.location.href = "/login";
    }
    return resp;
  } else {
    let req = await fetch(API, {
      headers: headers,
    });
    let resp = await req.json();
    const token = req.headers.get("token");
    if (token) {
      window.localStorage.setItem("token", token);
    }
    if (resp.error) {
      window.location.href = "/login";
    }
    return resp;
  }
}

export { submitData };
