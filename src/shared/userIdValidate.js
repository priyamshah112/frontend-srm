export const emailValidate = (userData) => {
  console.log(userData);
  const email_reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  let email_res = email_reg.test(userData);
  if (email_res) {
    return true;
  } else {
    return false;
  }
};

export const phoneValidate = (userData) => {
  const phone_reg = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/gm;
  let phone_res = phone_reg.test(userData);
  if (phone_res) {
    return true;
  } else {
    return false;
  }
};

/* let email = "";
    let phone_no = "";
    let userId = "";
    const email_reg = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    let email_res = email_reg.test(user);
    if (email_res) {
      email = user;
    } else {
      const phone_re = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/gm;
      let phone_res = phone_re.test(user);
      if (phone_res) {
        phone_no = user.substr(user.length - 10);
      } else {
        userId = user;
      }
    }
    console.log("email:", email, "phone:", phone_no, "userId:", userId); */
