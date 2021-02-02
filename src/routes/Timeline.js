import React, {useEffect} from "react";
import styled from "styled-components";
import Portal from "./Portal";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Line from "../components/Line";

const GET_TIMELINE = gql`
  query getTimeline($id: String!) {
    timeline(id: $id) {
      idx
      Kiss_scene
      Clown 
      Gun
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
  width: 800px;
  height: 500px;
  max-width: 1000px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const Lines = styled.img`
  width: 100%;
  margin-top: 10px;
`;

const Timeline = ({
    id,
    className,
    onClose,
    maskClosable,
    closable,
    visible,
    children
  }) => {
    const {timelines} = useQuery(GET_TIMELINE, {
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
    
    useEffect(() => {
      document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
      return () => {
        const scrollY = document.body.style.top
        document.body.style.cssText = `position: ""; top: "";`
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }, []);

    return (
      <Portal elementId="modal-root">
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex={-1}
        visible={visible}>
        <ModalInner tabIndex={0} className="modal-inner">
          {closable && <button className="modal-close" onClick={close}>close</button>}
          <br/>
          <br/>
          {children}
          {timelines?.timeline?.map(m => (
            <Line
              time={m.idx}
              isLine={m.Kiss_scene}
            />
          ))}
          <Lines src={process.env.PUBLIC_URL + '/img/image.png'}></Lines>
        </ModalInner>
      </ModalWrapper>
    </Portal>
    );
};
export default Timeline;