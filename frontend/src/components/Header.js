import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import {
  Avatar,
  Box,
  MenuItem,
  MenuList,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Button,
} from '@material-ui/core';
import makeStyles from '../components/ImageAvatars';

const Header = () => {
  const classes = makeStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="w-screen h-24 flex flex-row items-center p-1 justify-between bg-purple-600 shadow-xs antialiased font-sans">
      <div className="ml-32 text-3xl text-white hidden md:flex ">
        <Link to="/">SamNotes</Link>
      </div>

      <div className="flex flex-row-reverse items-center mr-20 hidden md:flex">
        {userInfo && userInfo.role === 'admin' && (
          <Box>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              size="small"
              style={{
                maxWidth: '40px',
                maxHeight: '40px',
                minWidth: '40px',
                minHeight: '40px',
              }}
            >
              <ion-icon name="chevron-down-outline" size="small"></ion-icon>
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to="/admin/userlist">Users</Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link to="/admin/booklist">Books</Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
        )}
        {userInfo ? (
          <Link to="/profile" className="flex">
            {' '}
            <Avatar
              alt={userInfo.name}
              src={userInfo.photo}
              className={classes.large}
            />
            <div className="text-base uppercase self-center ml-1 p-1 text-white">
              {userInfo.name.split(' ')[0]}
            </div>
          </Link>
        ) : (
          <Link
            to="/login"
            className="text-white transform hover:scale-110 motion-reduce:transform-none duration-300 text-base text-center px-3 py-3 ml-5 uppercase rounded md:rounded antialiased"
          >
            Log In
          </Link>
        )}
        {userInfo ? (
          <Link
            to="/logout"
            className="text-white transform hover:scale-110 motion-reduce:transform-none duration-300 text-base text-center py-3 uppercase mr-5 rounded md:rounded antialiased"
            onClick={logoutHandler}
          >
            Log Out
          </Link>
        ) : (
          <Link
            to="/signup"
            className="text-white transform hover:scale-110 motion-reduce:transform-none duration-300 text-base text-center px-3 py-3 uppercase rounded md:rounded antialiased"
          >
            Sign Up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
