import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";
import "./Home.css"

const GET_MOVIES = gql`
  {
    movies {
      id
      poster
      isLiked @client
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;  
  align-items: center;
  margin:0px;
  flex-direction: column;
  width: 100%;
  height:100%;
`;

const Header = styled.header`

  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 65px;
  font-weight: 600;
  margin-bottom: 20px;
  color:black;
  position:absolute;
  top:290px;
  background-color:yellow;
  
`;

const Subtitle = styled.h3`
  font-size: 35px;
  color:black;
  color:white;
  position:absolute;
  top:-300px;
  z-index:2;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 25px;
  width: 80%;
  top: 500px;
  position: absolute;
  left: 150px;
  align-items: center;
  justify-content: center;

  
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>CORN'S LISTS</Title>
        <Subtitle>-Movie Review-</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      <Movies>
        {data?.movies?.map(m => (
          <Movie
            key={m.id}
            id={m.id}
            isLiked={m.isLiked}
            bg={m.poster}
          />
        ))}
      </Movies>
    </Container>
  );
};