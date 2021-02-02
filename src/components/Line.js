import React from "react";
import styled from "styled-components";

const Container = styled.div`
    height:10px;
    width: 3px;
    background-color: ${props => props.color};
`;

export default ({time, isLine}) => {
    const line_color = isLine ? "transparent":"red"
    return (
        <Container color={line_color}/>
    );
};