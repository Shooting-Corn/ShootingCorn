import React , {useState}from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Timeline from "./Timeline.js";

const GET_MOVIE = gql`
  query getMovie($id: String!) {
    movie(id: $id) {
      id
      title
      directors
      stars
      genres
      runtime
      grade 
      synopsis
      violence_per
      violence
      nudity
      word
      alcohol
      poster
      isLiked @client
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #000000, #424242);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Nudity = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;  
  color: red
`;

const Violence = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;  
  color:#FA8258
`;

const Profanity = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;  
  color: #FFBF00
`;

const Alcohol_Smoking = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;  
  color: #FFBF00
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: id }
  });

  const [modalVisible, setModalVisible] = useState(false)
  const openModal = () => {
    setModalVisible(true)
  }
  const closeModal = () => {
    setModalVisible(false)
  }

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "💖" : " "}`}
        </Title>
        <Subtitle>
          {data?.movie?.directors} · {data?.movie?.runtime}
        </Subtitle>
        <Nudity>Nudity: level {data?.movie?.nudity}</Nudity>
        <Violence>Violence: level {data?.movie?.violence}</Violence>
        <Profanity>Profanity: {data?.movie?.word}</Profanity>
        <Alcohol_Smoking>Alcohol &amp; Smoking: {data?.movie?.alcohol}</Alcohol_Smoking>
        <button onClick={openModal}>Specific Timeline &gt;</button>
        {
          modalVisible && <Timeline
          id={data.movie.id}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}></Timeline>
        }
        <Description>{data?.movie?.synopsis}</Description>
      </Column>
      <Poster bg={data?.movie?.poster}></Poster>
    </Container>
  );
};