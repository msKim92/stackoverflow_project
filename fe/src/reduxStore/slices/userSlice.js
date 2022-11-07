import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";
const BASEURL =
  "http://ec2-54-180-147-29.ap-northeast-2.compute.amazonaws.com/";

const NGROKURL = "https://811e-203-130-71-252.jp.ngrok.io/";

export const signUser = createAsyncThunk(
  "user/addUser",
  async ({ addData, navigate }) => {
    return Apis.post(`v1/sign/`, addData)
      .then((res) => {
        navigate("/login");
        return res.data;
      })
      .catch((err) => console.log(err));
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ loginData, navigate }) => {
    return (
      Apis.post(
        `v1/login`,
        { ...loginData },
        {
          headers: {
            withCredentials: true,
          },
        }
      )
        // return fetch("/v1/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Length": 0,
        //     "ngrok-skip-browser-warning": "111",
        //   },
        //   body: JSON.stringify(loginData),
        // })
        .then((res) => {
          // let userId = res.config.data;
          // let usertoken = userId.split('"')[3];
          console.log(res);
          let jwtToken = res.headers.get("Authorization");
          let jwtrefreshToken = res.headers.get("refresh");
          // localStorage.setItem("userEmail", usertoken);
          localStorage.setItem("access_token", jwtToken);
          localStorage.setItem("refresh", jwtrefreshToken);
          navigate("/");
          return res.data;
        })
        .catch((err) => console.log(err))
    );
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: "",
  },

  reducers: {},
  extraReducers: {
    [signUser.fulfilled]: (state, action) => {
      // state.users = action.payload;
      // state.loading = false;
      // state.error = "";
    },

    [loginUser.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
