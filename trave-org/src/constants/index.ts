// url
export const MAIN_URL = "/";

export const SIGNIN_URL = "/signIn";

export const SIGNUP_URL = "/signUp";

export const MYPAGE_URL = "/myPage";

export const ADMIN_URL = "/admin";

export const ERROR_MESSAGE = "올바른 작성이 필요합니다.";

export const SIGNIN_INPUT_DATA = {
  id: {
    type: "text",
    placeholder: "아이디",
    content: "아이디",
  },
  password: {
    type: "current-password",
    placeholder: "비밀번호",
    content: "비밀번호",
  },
};

export const CHECK_SIGNUP_DATA = {
  name: {
    required: "이름을 입력해주세요",
  },
  nickName: {
    required: "닉네임을 입력해주세요",
  },
  phoneNumber: {
    required: "전화번호를 입력해주세요.",
    pattern: {
      value: /^([\d]{3}-[\d]{4}-[\d]{4}|[\d]{11})$/,
      message: "올바른 전화번호가 아닙니다.",
    },
  },
  gender: {
    required: "성별을 입력해주세요",
  },
  tendency: {
    required: "성향을 입력해주세요",
    pattern: {
      value: /^[EIei][NSns][TFtf][JPjp]$/,
      message: "올바른 MBTI가 아닙니다.",
    },
  },
  year: {
    required: "년도를 입력해주세요",
  },
  month: {
    required: "월을 입력해주세요",
  },
  day: {
    required: "일을 입력해주세요",
  },
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[A-Za-z0-9._%+-]+@[\S+.]+$/,
      message: "올바른 이메일만 사용할 수 있습니다.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    // TODO: 비밀번호 형식 pattern
  },
};

export const SIGNUP_INPUT_DATA = {
  name: {
    type: "text",
    placeholder: "이름",
    content: "이름",
  },
  nickName: {
    type: "text",
    placeholder: "닉네임",
    content: "닉네임",
  },
  phoneNumber: {
    type: "text",
    placeholder: "전화번호",
    content: "전화번호",
  },
  gender: {
    type: "text",
    placeholder: "성별",
    content: "성별",
  },
  tendency: {
    type: "text",
    placeholder: "성향",
    content: "성향",
  },
  year: {
    type: "text",
    placeholder: "년",
  },
  month: {
    type: "text",
    placeholder: "월",
  },
  day: {
    type: "text",
    placeholder: "일",
  },

  email: {
    type: "text",
    placeholder: "이메일",
    content: "이메일",
  },
  password: {
    type: "current-password",
    placeholder: "비밀번호",
    content: "비밀번호",
  },
};