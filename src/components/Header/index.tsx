import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../models/user";

import styled from "styled-components";

interface HeaderProps {
  loggedInUser: User | null;
}

function Header({ loggedInUser }: HeaderProps) {
  console.log(loggedInUser);
  return (
    <Nav>
      <NavMenu>
        <Link to="/">
          <img src="/images/home.svg" alt="home icon" />
          <span>HOME</span>
        </Link>
        <Link to="/">
          <img src="/images/request.svg" alt="request a movie icon" />
          <span>REQUEST A MOVIE</span>
        </Link>
        <Link to="/">
          <img src="/images/history.svg" alt="history icon" />
          <span>HISTORY</span>
        </Link>
        <Link to="/my_profile">
          <img src="/images/profile.svg" alt="profile icon" />
          <span>MY PROFILE</span>
        </Link>
      </NavMenu>
      {loggedInUser ? (
        <Link to="/my_profile">
          <UserImg
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYlb0-QUxpdl8nTjSiF2NnXK9QRJ-EWNRnqwuutiyP4EDfM0LlHg7NjSVaoibynxEg6U&usqp=CAU"
            alt="user icon"
          />
        </Link>
      ) : (
        <Link to="/login">
          <UserImg
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjYlb0-QUxpdl8nTjSiF2NnXK9QRJ-EWNRnqwuutiyP4EDfM0LlHg7NjSVaoibynxEg6U&usqp=CAU"
            alt="user icon"
          />
        </Link>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;

  @media (max-width: 900px) {
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
`;
// const Logo = styled.img`
//   width: 80px;
// `;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;

  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0.5);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;
