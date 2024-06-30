// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
//=====================================================================================
// FETCH METHOD
// This function uses the fetch API to make a request to the server.
//=====================================================================================
function fetchMethod(url, callback, method = "GET", data = null, token = null) {
    console.log("fetchMethod: ", url, method, data, token);
  
    const headers = {};
  
    if (data) {
        headers["Content-Type"] = "application/json";
    }
  
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }
  
    let options = {
        method: method.toUpperCase(),
        headers: headers,
    };
  
    if (method.toUpperCase() !== "GET" && data !== null) {
        options.body = JSON.stringify(data);
    }
  
    fetch(url, options)
        .then((response) => {
            if (response.status == 204) {
                callback(response.status, {});
            } else {
                response.json().then((responseData) => callback(response.status, responseData));
            }
        })
        .catch((error) => console.error(`Error from ${method} ${url}:`, error));
  }