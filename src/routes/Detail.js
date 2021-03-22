import React , {useState}from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Timeline from "./Timeline.js";
import './Detail.css'


//warning images
import grade0 from './img/OK.gif'
import violent1_a from './img/violent1_a.gif'
import violent2_a from './img/violent2_a.gif'
import violent3_a from './img/violent3_a.gif'


import violent1 from './img/violent1.gif'
import violent2 from './img/violent2.gif'
import violent3 from './img/violent3.gif'


import nudity1 from './img/nudity1.gif'
import nudity2 from './img/nudity2.gif'
import nudity3 from './img/nudity3.gif'


import profanity1 from './img/profanity1.gif'
import profanity2 from './img/profanity2.gif'


import smoking from './img/smoking.gif'
import drinking from './img/drinking.gif'



const GET_MOVIE = gql`
  query getMovie($id: String!) {
    movie(id: $id) {
      id
      title
      directors
      stars
      genre
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

width: 100vw;
height: 800px;
maring-bottom:100px;
padding-bottom:300px;


`;



const Column = styled.div`

position:absolute;
top:600px;
left:130px;

  margin-left: 420px;
  margin-bottom: 200px;
  width: 50%;
  padding:40px;
  
  background-color: white;
  border-radius: 18px;
  box-shadow:  10px 10px 10px #d1d2d4,
               -10px -10px 10px #ffffff;

  
  
`;

const Title = styled.h1`
  position:absolute;
  width:800px;
  height: auto;

  left:500px;
  top:250px;
  font-size: 85px;
  margin-bottom: 15px;
  color:red;
  
`;

//nudity
const Grade_nudity = styled.h4`
  font-size: 85px;
  width:10px;
  position:absolute;
  color:blue;
  left:45px;
  top:-40px;
 
  z-index:2;
`;

//violent
const Grade_violence = styled.h4`
  font-size: 85px;
  width:10px;
  
  position:absolute;
  color:blue;
  left:140px;
  top:-40px;
 
  z-index:2;
`;

//violent
const Grade_profanity = styled.h4`
  font-size: 85px;
  width:10px;
  
  position:absolute;
  color:blue;
  left:235px;
  top:-40px;
  opacity: 0.8;
  z-index:2;
`;

//violent
const Grade_alcohol = styled.h4`
  font-size: 85px;
  width:10px;
  
  position:absolute;
  color:blue;
  left:330px;
  top:-40px;
  opacity: 0.8;
  z-index:2;
`;

const Subtitle = styled.h4`
  margin-bottom: 35px;
  font-size: 18px;
`;

const Description = styled.p`
  margin-top: 10px;
  margin-bottom:30px;
  font-size: 18px;
  color:black;
`;

// detail poster
const Poster = styled.div`

position:absolute;
top: 0px; 
left:-260px;
  width: 30%;
  height: 100%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;

  border-radius: 18px;

  margin-bottom:100px;
`;

// background poster
const Poster2 = styled.div`

position:absolute;
top: 0px; 
left:0px;
  width: 100%;
  height: 65%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;

  z-index:-1;
  -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  filter: grayscale(100%);

  opacity:0.6
`;

const Nudity = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;  
  color: black
`;

const Violence = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;  
  color:black
`;

const Profanity = styled.h4`
  font-size: 18px;
  margin-bottom: 10px;  
  color: black
`;

const Alcohol_Smoking = styled.h4`
  font-size: 18px;
  margin-bottom: 15px;  
  color: black
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
    <Container bg={data?.movie?.poster}>
      <Poster2 bg={data?.movie?.poster}></Poster2>
      <center>
      <Title className="Title">
        {loading
          ? "Loading..."
          : `${data.movie.title} ${data.movie.isLiked ? "💖" : " "}`}
      </Title>

      </center>

      
      
      <Column>

      <Poster bg={data?.movie?.poster}></Poster>
        

      



      


  <Grade_violence className="Grade_violence">

{
    
    data?.movie?.grade === "All"
    ?//All-grade violence
    (data?.movie?.violence === 3
      ? <img className ="grade_img" src={violent3_a}></img> //grade3
      : ( data?.movie?.violence > 1
          ? <img className ="grade_img" src={violent2_a}></img>  //grade2
          : ( data?.movie?.violence === 0
            ?<img className ="grade_img" src={grade0}></img>  //grade0
            :<img className ="grade_img" src={violent1_a}></img>  //grade1
            )
        )
    )

    ://12+grade violence
    (data?.movie?.violence === 3
      ?<img className ="grade_img" src={violent3}></img>
      : ( data?.movie?.violence > 1
          ? <img className ="grade_img" src={violent2}></img>//2등급 
          : ( data?.movie?.violence === 0
            ?<img className ="grade_img" src={grade0}></img>//0등급
            :<img className ="grade_img" src={violent1}></img> //1등급
            )
        )
    )

}

</Grade_violence>



<Grade_nudity className="Grade_nudity">

{   
  data?.movie?.nudity === 3
    ?<img className ="grade_img" src={nudity3}></img> //nudity3
    : (data?.movie?.nudity > 1
        ? <img className ="grade_img" src={nudity2}></img>  ////nudity2
        : ( data?.movie?.nudity === 0
          ?<img className ="grade_img" src={grade0}></img>  //nudity0
          :<img className ="grade_img" src={nudity1}></img>  ////nudity1
          )
      )
  

}
</Grade_nudity>




<Grade_profanity className="Grade_profanity">
{   
  data?.movie?.word > 7
    ? <img className ="grade_img" src={profanity2}></img> //profanity2
    : (data?.movie?.word === 0
        ? <img className ="grade_img" src={grade0}></img>  ////profanity1
        : <img className ="grade_img" src={profanity1}></img>  //profanity0
      )
}
</Grade_profanity>



<Grade_alcohol className="Grade_alcohol">

{   
  data?.movie?.alcohol === "no alcohol or smoking"
    ?<img className ="grade_img" src={grade0}></img>  //grade0
    : (data?.movie?.alcohol === "smoking and drinking"
        ? <p><img className ="grade_img" src={smoking}></img> <img className ="grade_s_d" src={drinking}></img> </p>  //smoking and drinking
        : ( data?.movie?.alcohol === "drinking"
          ?<img className ="grade_img" src={drinking}></img>  //drinking
          :<img className ="grade_img" src={smoking}></img>  ////smoking
          )
      )
}
</Grade_alcohol>
        <Subtitle className="Subtitle">
        {data?.movie?.grade}·{data?.movie?.genre}· {data?.movie?.directors} · {data?.movie?.runtime}min· {data?.movie?.stars}
        </Subtitle>
        <Description>{data?.movie?.synopsis}</Description>
        <Nudity>Nudity: level {data?.movie?.nudity}</Nudity>
        <Violence>Violence: level {data?.movie?.violence}</Violence>
        <Profanity>Profanity: {data?.movie?.word}</Profanity>
        <Alcohol_Smoking>Alcohol &amp; Smoking: {data?.movie?.alcohol}</Alcohol_Smoking>
        <button className="button" onClick={openModal}>Specific Timeline &gt;</button>
        {
          modalVisible && <Timeline
          id={data.movie.id}
          title={data.movie.title}
          runtime={data?.movie?.runtime}
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}></Timeline>
        }
      </Column>
  
    </Container>
  );
};