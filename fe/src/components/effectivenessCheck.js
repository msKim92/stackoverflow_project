//아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다.
export const nickNameCheck = (userId) => {
  let nickreg = /^[a-z0-9]{4,20}$/;

  return nickreg.test(userId);
};

export const emaileCheck = (username) => {
  let emailereg =
    /^[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;

  return emailereg.test(username);
};

//비밀번호는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.
export const pwdCheck = (pwd_check) => {
  let pwdreg = /^(?=.[A-Za-z])(?=.\d)(?=.[$@$!%#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

  return pwdreg.test(pwd_check);
};
