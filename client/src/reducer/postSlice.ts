import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_URL } from "../utilitis/baseUrl";

export const getAllPost = createAsyncThunk("/allpost", async () => {
  try {
    const result = await axios.get(base_URL + "/posts");
    return result.data.result;
  } catch (err) {
    return err;
  }
});

export const getSinglePost = createAsyncThunk(
  "/posts/:id",
  async (id: string | undefined) => {
    try {
      const result = await axios.get(`${base_URL}/posts/${id}`);
      return result.data.result;
    } catch (err) {
      return err;
    }
  }
);

export const getPostByUserId = createAsyncThunk(
  "/posts/my:userId",
  async ({ authId, token }: { authId: string; token: string }) => {
    try {
      const result = await axios.get(`${base_URL}/posts/my/${authId}`, {
        headers: {
          token: token,
        },
      });
      return result.data.result;
    } catch (err) {
      return err;
    }
  }
);

export const getPostByCategory = createAsyncThunk(
  "/posts/category/:categoryId",
  async ( categoryId:string | undefined ) => {
    try {
      const result = await axios.get(
        `${base_URL}/posts/category/${categoryId}`
      );
      return result.data.result;
    } catch (err) {
      return err;
    }
  }
);

export type Data = {
  _id: string;
  title: string;
  desc: string;
  image: string;
  author: {
    _id: string;
    name: string;
    image: string;
  };
  views: number;
  likes: any[];
  comments: any[];
  category:
    | {
        _id: string;
        name: string;
        icon: string;
      }
    | string;
  createdAt: string;
  updatedAt: string;
};

export interface PostStateType {
  data: Data[];
  isLoading: boolean;
  isError: boolean;
  Search?:Data[]
}

const initialState: PostStateType = {
  data: [],
  isLoading: false,
  isError: false,
  Search:[]

};

const postSlice = createSlice({
  name: "Post",
  initialState: initialState,
  reducers: {
    filter: (state, action) => {


      const searchInputValue=(action.payload).toLowerCase()
      const filterItems = state.data.filter((items)=>items.title.toLowerCase().includes(searchInputValue))
      state.Search=filterItems
    },
  },

  extraReducers: (build) => {
    // get All Post
    build.addCase(getAllPost.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.Search=action.payload
    });
    build.addCase(getAllPost.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    build.addCase(getAllPost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get single post

    build.addCase(getSinglePost.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    build.addCase(getSinglePost.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    build.addCase(getSinglePost.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get  post by user id/auth id

    build.addCase(getPostByUserId.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    build.addCase(getPostByUserId.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    build.addCase(getPostByUserId.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // get  post by user category

    build.addCase(getPostByCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    build.addCase(getPostByCategory.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    build.addCase(getPostByCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { filter } = postSlice.actions;
export default postSlice.reducer;
