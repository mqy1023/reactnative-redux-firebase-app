function formatBody(obj) {
  return obj ? Object.keys(obj).sort().map(function (key) {
    const val = obj[key];
    if (Array.isArray(val)) {
      return val.sort().map(function (val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
      }).join('&');
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val);
  }).join('&') : '';
}

const defaultMethod = 'POST';
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const FetchData = {
  req: function (url, params, callback, method = defaultMethod, headers = defaultHeaders) {
    let body = '';
    if (method === 'POST') {
      body = JSON.stringify(params);
    } else if (method === 'GET') {
      body = formatBody(params);
    }

    fetch(url, {
      method,
      headers,
      body
    }).then(res => res.json())
      .then(res => {
        callback(res);
      }).done();
  }
};

export default FetchData;
