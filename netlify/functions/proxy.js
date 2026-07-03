// exports.handler = async function (event) {
//   if (event.httpMethod !== "POST") {
//     return { statusCode: 405, body: "Method Not Allowed" };
//   }

//   const API_KEY = process.env.ANTHROPIC_API_KEY;
//   if (!API_KEY) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: "API key not configured" }),
//     };
//   }

//   try {
//     const body = JSON.parse(event.body);

//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await response.json();

//     return {
//       statusCode: response.status,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*",
//       },
//       body: JSON.stringify(data),
//     };
//   } catch (err) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: err.message }),
//     };
//   }
// };











exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  try {

    const API_KEY = process.env.ANTHROPIC_API_KEY;

    console.log("Node:", process.version);
    console.log("API Key Exists:", !!API_KEY);

    const body = JSON.parse(event.body);

    console.log("Request:");
    console.log(JSON.stringify(body, null, 2));

    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify(body)
      }
    );

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));
    console.log("Body:");
    console.log(text);

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "text/plain",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };

  } catch (err) {

    console.error(err);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: err.message,
        stack: err.stack
      })
    };
  }
};