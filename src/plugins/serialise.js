export const serialize = ({ url, body, filters }) => {
  if (typeof url === "string") {
    if (body) {
      body = Object.entries(body).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );
    }
    if (filters) {
      filters = Object.entries(filters).reduce(
        (a, [k, v]) => (v ? ((a[k] = v), a) : a),
        {}
      );
    }

    const bodyArray = body ? Object.keys(body) : [];
    const filtersArray = filters ? Object.keys(filters) : [];
    let startingString = "";
    let serializeBody = "";

    if (bodyArray.length || filtersArray.length) {
      startingString += "?";
    }

    if (bodyArray.length > 0) {
      bodyArray.forEach((prop, index) => {
        serializeBody += `${prop}=${body[prop]}${
          index < bodyArray.length - 1 ? "&" : ""
        }`;
      });
    }

    if (filtersArray.length && bodyArray.length) {
      serializeBody += "&";
    }

    if (filtersArray.length > 0) {
      filtersArray.forEach((prop, index) => {
        serializeBody += `${prop}=${filters[prop]}${
          index < filtersArray.length - 1 ? "&" : ""
        }`;
      });
    }

    const fullString = `${url}${startingString}${serializeBody}`;
    console.log("fullString: ", fullString);
    return fullString;
  } else {
    throw Error("url is required || url is not a string");
  }
};
