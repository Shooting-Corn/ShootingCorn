import React, {useEffect,  useState} from "react";
import styled from "styled-components";
import Portal from "./Portal";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Line from "../components/Line";

const GET_TIMELINE = gql`
  query($id:String!){
    timelines(id: $id) {
      idx
      Kiss_scene
      clown 
      blood
    }
  }
`;

const ModalOverlay = styled.div`
  box-sizing: content-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: auto !important;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;
const ModalWrapper = styled.div`
  box-sizing: content-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;
const ModalInner = styled.div`
  box-sizing: content-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 10px;
  width: 1200px;
  height: 800px;
  max-width: 1500px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 20px 40px 20px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  font-size: 0.8em;
  vertical-align: top;
  float:right;
`;

const Title = styled.span`
  font-size:4em;
  font-weight: bold;
  margin: 20px 10px 10px 90px;
`;

const RunTime = styled.span`
  font-size: 1em;

`;

const ImageFrame = styled.img`
  position: relative;
  top:-4%;
  width: 100%;
  height: 100%;
`;

const FrameCaution = styled.div`
  width: 600px;
  height: 380px;
  background-color: rgba(100, 0, 0, 0.3)
`;

const StringCaution = styled.p`
  z-index: 1001;
  position: relative;
  top:50%;
  left:45%
`;

const ClassWrapper = styled.div`
  margin: 7px 0px 7px 0px;
  padding: 5px;
  display:flex;
  flex-wrap: wrap;
`;

const ClassInner = styled.div`
  flex:0.8;
  padding: 15px 2px 2px 2px;
  margin: 5px;
`;

const Timeline = ({
    id,
    title,
    runtime,
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children
  }) => {
    const {data} = useQuery(GET_TIMELINE, {
      variables: {id: id}
    });
    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose(e)
        }
    };
    
    const close = (e) => {
      if (onClose) {
        onClose(e)
      }
    };
    const [frame, setFrame] = useState("");
    const [frameVisible, setFrameVisible] = useState(false)

    useEffect(() => {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
      return () => {
        const scrollY = document.body.style.top
        document.body.style.cssText = `position: ""; top: "";`
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }, []);

    const checkFrame = (isLine) => {
      if (frameVisible && frame === "") {
        setFrameVisible(false)
      } else if (frameVisible && frame === isLine) {
        setFrameVisible(false)
      } else {
        setFrameVisible(true)
      }
      console.log(frameVisible)
    }

    //useEffect( () => {checkFrame(frame)}, [frame])

    return (
      <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && <CloseButton onClick={close}>X</CloseButton>}
          <br/>
          <Title>{title}</Title>
          <RunTime>{runtime} min</RunTime>
          
          <br/>
          <ClassWrapper>
            <ClassInner>Kiss scene</ClassInner>
            {data?.timelines?.map(t => (
              <Line
                key = {t.idx}
                time={t.idx}
                isLine={t.Kiss_scene}
                setFrame={setFrame}
                checkFrame={checkFrame}
              />
            ))}
          </ClassWrapper>
          <ClassWrapper>
            <ClassInner>Clown</ClassInner>
            {data?.timelines?.map(t => (
              <Line
                key = {t.idx}
                time={t.idx}
                isLine={t.clown}
                frame={frame}
                setFrame={setFrame}
                checkFrame={checkFrame}
                />
            ))}
          </ClassWrapper>
          <ClassWrapper>
            <ClassInner>Blood</ClassInner>
            {data?.timelines?.map(t => (
              <Line
                key = {t.idx}
                time={t.idx}
                isLine={t.blood}
                setFrame={setFrame}
                checkFrame={checkFrame}
                />
            ))}
          </ClassWrapper>
          <FrameCaution>
            <StringCaution>Caution!</StringCaution>
            {frameVisible && <ImageFrame src={frame} alt="frame"/>}
          </FrameCaution>
        </ModalInner>
      </ModalWrapper>
    </Portal>
    );
};
export default Timeline;