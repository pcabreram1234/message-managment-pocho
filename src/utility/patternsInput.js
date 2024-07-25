const phoneNumberInput = (e) => {
  /*   const string = e.currentTarget.value; */
  const pattern = new RegExp(/[\d]{3}[\-]{1}[\d]{3}[\-]{1}[\d]{4}/);
  /*   let out = "";

  for (let i = 0; i < string.length; i++) {
    if (pattern.test(string[i])) {
      out += string[i];
    } else {
      out.replace(string[i], "");
    }
  } */
  console.log(pattern.test(e));

  return pattern.test();
};

const onlyNumbers = (e) => {
  const string = e.currentTarget.value;
  const pattern = new RegExp(/\d|\-/);
  let out = "";

  for (let i = 0; i < string.length; i++) {
    if (pattern.test(string[i])) {
      out += string[i];
    } else {
      out.replace(string[i], "");
    }
  }

  return out;
};

const onlyLetters = (e) => {
  const string = e.currentTarget.value;
  const pattern = new RegExp(/[a-zA-Z\s]/i);
  let out = "";

  for (let i = 0; i < string.length; i++) {
    if (pattern.test(string[i])) {
      out += string[i];
    } else {
      out.replace(string[i], "");
    }
  }

  return out;
};

export { phoneNumberInput, onlyNumbers, onlyLetters };
