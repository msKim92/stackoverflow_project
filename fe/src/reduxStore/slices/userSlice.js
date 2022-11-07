import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Apis from "../../api/api";

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
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
        // return fetch.post(
        //   "http://ec2-43-200-3-93.ap-northeast-2.compute.amazonaws.com:8080/v1/login",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ ...loginData }),
        //   }
        .then((res) => {
          // let userId = res.config.data;
          // let usertoken = userId.split('"')[3];

          let jwtToken = res.headers.get("Authorization");
          let jwtrefreshToken = res.headers.get("Refresh");
          localStorage.setItem("Authorization", jwtToken);
          localStorage.setItem("Refresh", jwtrefreshToken);
          navigate("/");
          return res.data;
        })
        .catch((err) => console.log(err))
    );
    // );
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
