import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  bookListReducer,
  bookDetailsReducers,
  bookDeleteReducer,
  bookCreateReducer,
  bookUpdateReducer,
  bookCommentCreateReducer,
} from './reducers/bookReducers';
import {
  userDetailsReducer,
  userLoginReducer,
  userSignupReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers';
import Cookies from 'js-cookie';

const reducer = combineReducers({
  bookList: bookListReducer,
  bookDetails: bookDetailsReducers,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
  bookCommentCreate: bookCommentCreateReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
});

const userInfoFromCookies = Cookies.get('userInfo')
  ? JSON.parse(Cookies.get('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromCookies },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
