
const express = require("express");
const server = express();
server.use(express.json());

const NAME = "kumar_vaibhav";
const BIRTHDATE = "07052004";
const EMAIL_ID = "kumarvaibhav2022@vitbhopal.ac.in";
const ROLL_NO = "22BHI10183";

function makeFancyString(text) {
  return text
    .split("")
    .reverse()
    .map((c, idx) => (idx % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
    .join("");
}

server.post("/bfhl", (req, res) => {
  try {
    const inputList = req.body.data || [];

    let evens = [], odds = [], letters = [], specials = [];
    let total = 0, collected = "";

    inputList.forEach((val) => {
      if (/^-?\d+$/.test(val)) {
        let num = Number(val);
        (num % 2 === 0 ? evens : odds).push(val);
        total += num;
      } else if (/^[A-Za-z]+$/.test(val)) {
        letters.push(val.toUpperCase());
        collected += val;
      } else {
        specials.push(val);
      }
    });

    res.status(200).json({
      is_success: true,
      user_id: `${NAME}_${BIRTHDATE}`,
      email: EMAIL_ID,
      roll_number: ROLL_NO,
      even_numbers: evens,
      odd_numbers: odds,
      alphabets: letters,
      special_characters: specials,
      sum: String(total),
      concat_string: makeFancyString(collected)
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: "Something went wrong" });
  }
});

server.listen(3000, () => console.log("API running on port 3000"));
