import styled from "styled-components";

function Footer() {
  return (
    <Nav>
      <FooterLeft>
        <span>Developed by Necula Tony</span>
      </FooterLeft>
      <FooterRight>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/tonynecula"
        >
          <img src="/images/github-icon.png" alt="Github Icon" />
        </a>
      </FooterRight>
    </Nav>
  );
}

export default Footer;

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const FooterLeft = styled.div`
  display: flex;
  width: 50%;

  span {
    text-align: center;
  }
`;

const FooterRight = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;

  a {
    padding-right: 20px;
  }

  img {
    height: 30px;
  }
`;
