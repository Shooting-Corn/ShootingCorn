import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";
import './Home.css'

const GET_MOVIES = gql`
  {
    movies {
      id
      poster
      isLiked @client
    }
  }
`;

//background-image: linear-gradient(-45deg, #000000, #424242); 
const Container = styled.div`
  
  
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  
`;

//background-image: ``;
//


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
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  font-size: 35px;
`;

const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 65%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container className="container">
      <Header>
        <Title>Shooting Corn</Title>
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

//
