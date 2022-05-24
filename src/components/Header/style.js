import styled from "styled-components";

export const StHeader = styled.header`
    border : 1px solid black;
`;

export const StHeaderMain = styled.div`
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin: 10px 16px 48px 20px;
    -webkit-box-align: center;
    align-items: center;

    img {
        width:30px;
    }
`;

export const Chartcontainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Chartitem = styled.div`
    width: 120px;
`;