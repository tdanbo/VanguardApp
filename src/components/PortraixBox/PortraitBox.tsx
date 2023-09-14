import styled from "styled-components";
import portrait from "/assets/portrait1.jpeg"; // Import the image

const Container = styled.div`
  display: flex;
  flex: 2;
  flex-direction: row;
  background-color: coral;
  background-image: url("/dist/assets/portrait1.jpeg");
  background-size: cover; // resize the background image to cover the entire container
  background-position: center; // position the background image in the center of the container
`;

function PortraitBox() {
  return <Container></Container>;
}

export default PortraitBox;
