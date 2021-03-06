import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Box, CircularProgress } from '@material-ui/core';
import makeStyles from '../components/ImageAvatars';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfilePage = ({ location, history }) => {
  const classes = makeStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [message, setMessage] = useState(null);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      }
      // inside useEffect() instead of if (!user || !user.name || success),
      // put if (success) in it's own block so we can setProfileUpdated
      if (success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        setProfileUpdated(true);
        return;
      }
      setName(user.name);
      setPhoto(user.photo);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);

      setPhoto(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const profileSubmitHandler = (e) => {
    e.preventDefault();

    setProfileUpdated(false);
    setMessage(null);
    dispatch(updateUserProfile({ id: user._id, name, email, photo }));
  };

  const passwordSubmitHandler = (e) => {
    console.log('submit password');
  };

  return (
    <div className="w-7/12 pt-10 pb-10 flex justify-between antialiased mt-12 mb-20">
      {/* Avatar and name container */}
      <Box
        display="flex"
        width="33%"
        alignItems="center"
        flexDirection="column"
      >
        <Avatar
          alt={userInfo.name}
          src={userInfo.photo}
          className={classes.extraLarge}
        />

        <div className="self-center text-2xl text-center text-gradient font-semibold pt-6 uppercase">
          {userInfo.name}
        </div>
      </Box>

      {/* Profile settings container */}
      <div className="w-6/12 flex flex-col">
        <h1 className="pb-4 font-semibold text-gradient text-xl uppercase">
          Update Profile Settings
        </h1>
        {/* {message && <Message severity="error">{error}</Message>} */}
        {userUpdateProfile.error && (
          <Message severity="error">{userUpdateProfile.error}</Message>
        )}
        {loading && (
          <Box mb={1}>
            <CircularProgress />
          </Box>
        )}
        {/* instead of checking for success, check for profileUpdated */}
        {profileUpdated && <Message severity="success">Saved changes!</Message>}
        {/* {success && <Message severity="success">Saved changes!</Message>} */}
        <form onSubmit={profileSubmitHandler}>
          <div className="mb-6 pt-4">
            <label
              for="name"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Name"
              value={name}
              className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <label
                for="email"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Email
              </label>
            </div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email"
              value={email}
              className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              for="image"
              className="text-purple text-sm text-gradient transform underline leading-8 py-1 px-1 cursor-pointer hover:shadow-lg hover:bg-pink-600 hover:text-white duration-300"
            >
              Choose new photo
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={uploadFileHandler}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-1/4 px-3 py-3 text-white uppercase bg-pink-600 rounded-md focus:outline-none transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300"
            >
              Update
            </button>
          </div>
        </form>
        {/* Password change container */}
        <div className="pt-20 flex flex-col">
          <h1 className="pb-4 font-semibold text-gradient text-xl uppercase">
            Reset Password
          </h1>
          <form onSubmit={passwordSubmitHandler}>
            <div className="mb-6 pt-4">
              <label
                for="currentPassword"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
              >
                Current password
              </label>
              <input
                type="currentPassword"
                name="currentPassword"
                id="currentPassword"
                placeholder="Current password"
                className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label
                  for="newPassword"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  New password
                </label>
              </div>
              <input
                type="newPassword"
                name="newPassword"
                id="newPassword"
                placeholder="New password"
                className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label
                  for="confirmPassword"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  Confirm new password
                </label>
              </div>
              <input
                type="confirmPassword"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                className="w-full px-3 py-3 placeholder-gray-300 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                required
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <div className="pt-5">
              <button
                type="submit"
                className="w-1/4 px-3 py-3 text-white uppercase bg-pink-600 rounded-md focus:outline-none transform hover:scale-105 focus:scale-100 motion-reduce:transform-none duration-300"
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
