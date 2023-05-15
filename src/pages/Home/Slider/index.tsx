import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Movie } from "../../../models/movie";

interface SliderProps {
  movies: Movie[];
}

const SliderComponent: React.FC<SliderProps> = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <Carousel {...settings}>
      <Link to={"/movie/6429986d5fef1df2ae354af3"}>
        <Wrap>
          <img src="/images/poster1.jpg" alt={"Weathering with you"} />
        </Wrap>
      </Link>
      <Link to={"/movie/642998e5a0f7e0d8c05de946"}>
        <Wrap>
          <img src="/images/poster2.jpg" alt={""} />
        </Wrap>
      </Link>
      <Link to={"/movie/6429997ab78c710c0b4f5908"}>
        <Wrap>
          <img src="/images/poster3.jpg" alt={""} />
        </Wrap>
      </Link>
      <Link to={"/movie/6429997ab78c710c0b4f5908"}>
        <Wrap>
          <img src="/images/poster4.jpg" alt={""} />
        </Wrap>
      </Link>
    </Carousel>
  );
};

export default SliderComponent;

const Carousel = styled(Slider)`
  margin-top: 20px;

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: visible;
  }

  button {
    z-index: 1;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  img {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    width: 100%;
    height: 100%;
  }

  &:hover {
    padding: 0;
    border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;
