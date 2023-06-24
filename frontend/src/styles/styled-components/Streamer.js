import styled from 'styled-components';
const StyledImage = styled.img`
border-radius: 10px 10px 0px 0px;
width:100%;
`;
const StreamerDiv = styled.div`
display: flex;
align-content: center;
justify-content: center;
margin-top:2rem;
width:100%;
`;
const StreamerMain = styled.div`
width:30%;
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
border: 2px solid #F3BF99;
border-radius:10px;
padding:10px;
`;
const H1 = styled.h1`
    color:white;
    font-family: 'Times New Roman', serif;
    font-size: 25px;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 8px;
    line-height: 10px;
`;
const H4 = styled.h4`
    color:#F3BF99;
    font-weight: 400;
    font-size: 12.8px;
    line-height: 10px;
    margin-bottom: 6px;
    margin-top: 5px;
}
`
export {StreamerMain,StyledImage, StreamerDiv, H1, H4};
