const axios = require("axios");
const querystring = require("qs");

const IAMPORT_KEY = "imp_apikey";
const IAMPORT_SECRET =
  "ekKoeW8RyKuT0zgaZsUtXXTLQ4AhPFW3ZGseDA6bkA5lamv9OqDMnxyeB9wqOsuO9W3Mx9YSJ4dTqJ3f";

async function authenticate() {
  return await axios.post("https://api.iamport.kr/users/getToken", {
    imp_key: IAMPORT_KEY,
    imp_secret: IAMPORT_SECRET,
  });
}

async function checkBankHolder({ bankCode, bankAccountNumber }) {
  const query = querystring.stringify({
    bank_code: bankCode,
    bank_num: bankAccountNumber,
  });

  const accessToken = (await authenticate()).data.response.access_token;

  return await axios.get(`https://api.iamport.kr/vbanks/holder?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

checkBankHolder({
  bankCode: "081",
  bankAccountNumber: "85891018218207",
})
  .then( ({data})=> {
      console.log(data.response.bank_holder);
  })
  .catch(console.log);
