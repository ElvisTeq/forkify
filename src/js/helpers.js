import { async } from 'regenerator-runtime';

import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    console.log(url);
    // This was sendJSON()

    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          // POST => request for sending data
          headers: {
            'Content-Type': 'application/json',
          },
          // => Info about the request we sending
          // => We telling the API we seding data in JSON format
          body: JSON.stringify(uploadData),
          // body => our data
        })
      : fetch(url);

    // This was getJSON()

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // Promise.race() => returns the promise that finish first
    // timeout(VALUE) => was a magic value, so we created a variable in config.js

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
    // By throwing error => it makes the imported module to throw the error instead of this one in the console
  }
};

/*

export const getJSON = async function (url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    // Promise.race() => returns the promise that finish first
    // timeout(VALUE) => was a magic value, so we created a variable in config.js

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
    // By throwing error => it makes the imported module to throw the error instead of this one in the console
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      // POST => request for sending data
      headers: {
        'Content-Type': 'application/json',
      },
      // => Info about the request we sending
      // => We telling the API we seding data in JSON format
      body: JSON.stringify(uploadData),
      // body => our data
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};

*/
