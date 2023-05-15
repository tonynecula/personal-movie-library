import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
import { Movie } from "../../../models/movie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ScreeningDetailsProps {
  movie: Movie;
}

const data = [
  { name: "10 AM", tickets: 120 },
  { name: "8 PM", tickets: 250 },
];

const ScreeningDetails: React.FC<ScreeningDetailsProps> = (props) => {
  return (
    <Container>
      <h4>SCREENING DETAILS</h4>
      <Content>
        <Link
          to={"/booking/" + props.movie.id}
          style={{ textDecoration: "none" }}
        >
          <Wrap>
            <span>10 AM {moment().add(1, "days").format("DD MMM")}</span>
          </Wrap>
        </Link>
        <Link
          to={"/booking/" + props.movie.id}
          style={{ textDecoration: "none" }}
        >
          <Wrap>
            <span>8 PM {moment().add(1, "days").format("DD MMM")}</span>
          </Wrap>
        </Link>
        <Link
          to={"/booking/" + props.movie.id}
          style={{ textDecoration: "none" }}
        >
          <Wrap>
            <span>10 AM {moment().add(2, "days").format("DD MMM")}</span>
          </Wrap>
        </Link>
        <Link
          to={"/booking/" + props.movie.id}
          style={{ textDecoration: "none" }}
        >
          <Wrap>
            <span>8 PM {moment().add(2, "days").format("DD MMM")}</span>
          </Wrap>
        </Link>
      </Content>
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tickets" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Container>
  );
};

export default ScreeningDetails;

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  @media (max-width: 900px) {
    margin-bottom: 30px;
  }
`;

const Content = styled.div`
  display: flex;
  grid-gap: 25px;
  overflow-x: auto;
  padding-left: 5px;
  @media (max-width: 900px) {
    font-size: 12px;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;
const ChartContainer = styled.div`
  margin-top: 50px;
  width: 30%;
  height: 300px;
  margin-bottom: 30px;
`;
const Wrap = styled.div`
  border-radius: 10px;
  cursor: pointer;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
    rgba(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  text-align: center;
  padding: 20px 20px 20px;
  @media (max-width: 900px) {
    width: 150px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
      rgba(0 0 0 / 72%) 0px 30px 22px -10px;
    border-color: rgba(249, 249, 249, 0.8);
  }

  span {
    letter-spacing: 1.42px;
    color: rgb(249, 249, 249, 0.8);
  }
`;
