import React, { useState } from "react";
import styled, { css } from "styled-components";

// const Container = styled.div.attrs(props => ({
//     style: {
//         background:props.line_color,
//     },
// })) `width: 0.8px; height: 25px; float: right;`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 0.3px;
    max-width:26px;
    height: 100px;
`;


const Frame = styled.div`
    height:60px;
    width: 0.7px;
    background-color: ${props => props.color};
    ${props => 
        props.line_class === "yolo" && 
        css`
        :hover {
            transform: scale(20.0, 1.2);

        }
    `}
`;

const Time = styled.span`
    display:inline-block;
    margin:10px;
    font-size:small;
    background-color:blue;
    z-index:10;
`;

const Line = ({time, isLine, setFrame, checkFrame}) => {
    const line_color = (isLine !== '' & isLine !== null) ? "red":"#E6E6E6"
    const line_class = (isLine !== '' & isLine !== null)  ? "yolo":"none"
    const real_time = time*1
    const real_min = parseInt(real_time/60)
    const real_sec = pad(real_time%60)

    const concat = real_min + ":" + real_sec
    const line_time = (isLine !== '' & isLine !== null)  ? concat:""

    const [isHover, setHover] = useState(false);

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

    return (
        <Container>
            <Frame color={line_color} line_class={line_class}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => {setFrame(isLine);checkFrame(isLine);}}
            />
            {line_color === "red" && isHover && <Time>{line_time}</Time>}
        </Container>
    );
};

export default Line;