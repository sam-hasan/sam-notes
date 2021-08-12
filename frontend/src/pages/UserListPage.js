import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import makeStyles from '../components/ImageAvatars';
import { listUsers, deleteUser } from '../actions/userActions';
import { Avatar, Button, CircularProgress, Container } from '@material-ui/core';

const UserListPage = ({ history }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) dispatch(deleteUser(id));
  };

  return (
    <div class="container mx-auto px-4 sm:px-8 antialiased text-xl">
      <div class="pb-6 pt-3">
        <div className="ml-7">
          <h2 class="font-semibold pb-4 text-purple-600 text-2xl uppercase">
            Users
          </h2>
        </div>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Message severity="error">{error}</Message>
        ) : (
          <Container>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table class="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Name
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Role
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Email
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        Status
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase">
                        ID
                      </th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase"></th>
                      <th class="px-5 py-4 bg-purple-600 text-left text-sm font-semibold text-white uppercase"></th>
                    </tr>
                  </thead>
                  {users.map((user) => (
                    <tbody>
                      <tr>
                        <td class="px-5 py-5  bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 w-10 h-10">
                              <Avatar
                                alt={user.name}
                                src={user.photo}
                                className={classes.large}
                              />
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap p-2">
                                {user.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {user.role}
                          </p>
                        </td>
                        <td class="px-5 py-5  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                          </p>
                        </td>
                        <td class="px-5 py-5  bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">
                              {user.active ? 'Active' : 'Inactive'}
                            </span>
                          </span>
                        </td>
                        <td class="py-5  bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {user._id}
                          </p>
                        </td>
                        <td class="bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap p-1">
                            <Link to={`/admin/user/${user._id}/edit`}>
                              <ion-icon
                                name="create-outline"
                                style={{
                                  color: 'rgba(124, 58, 237)',
                                  fontSize: '24px',
                                }}
                              ></ion-icon>
                            </Link>
                          </p>
                        </td>
                        <td class="bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            <Button onClick={() => deleteHandler(user._id)}>
                              <ion-icon
                                style={{ color: 'red', fontSize: '24px' }}
                                name="trash"
                              ></ion-icon>
                            </Button>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </Container>
        )}
      </div>
    </div>
  );
};
export default UserListPage;
