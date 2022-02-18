import React, { useState } from "react";
import Link from 'next/link'
import { signout, isAuth } from '../actions/auth';
import { useRouter } from 'next/router';

const sideDrawer = ({show, drawerToggleClickHandler}) => {
  const router = useRouter();
  let drawerClasses = ["side-drawer"];

  if (show) {
    drawerClasses = ["side-drawer", "open"];
  }

  return (
    <div className={drawerClasses.join(" ")}>
      <div className="side-drawer-content">
        <Link className="side-drawer-link" href="/">
          <a className="side-drawer-a" onClick={drawerToggleClickHandler} >Home</a>
        </Link>
        <Link className="side-drawer-link" href="/quizes">
          <a className="side-drawer-a" onClick={drawerToggleClickHandler} >Quizes</a>
        </Link>
        {isAuth() && (
          <>
            <Link className="side-drawer-link" key='createquiz' href={`/createquiz`}>
              <a className="side-drawer-a" onClick={drawerToggleClickHandler}>
                  Build a Quiz
              </a>
            </Link>
            <Link className="side-drawer-link" key='uploadtoDB' href={`/uploadtodb`}>
              <a className="side-drawer-a" onClick={drawerToggleClickHandler}>
                  UploadtoDB
              </a>
            </Link>
          </>
        )}
        {
          !isAuth() && (
            <>
              <Link href="/signup" className="side-drawer-link">
                <a className="side-drawer-a" onClick={drawerToggleClickHandler}>SignUp</a>
              </Link>
              <Link href="/signin" className="side-drawer-link">
                <a className="side-drawer-a" onClick={drawerToggleClickHandler}>SignIn</a>
              </Link>
            </>
          )
        }
        {
          isAuth() && (
              <>
                  <Link href="/" className="side-drawer-link">
                      <a 
                          className="side-drawer-a" 
                          onClick={() => signout(() => router.push(`/`))}
                      >Sign Out</a>
                  </Link>
              </>
          )
        }
      </div>
    </div>
  );
};
export default sideDrawer;