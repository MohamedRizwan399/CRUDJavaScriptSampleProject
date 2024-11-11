import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
} from "./Footerstyle";
  
function Footer() {
  return (
    <Box>
      
      <Container>
        <Row>
          <Column>
            <FooterLink href="#/aboutus">About Us</FooterLink><br></br>
          </Column>
          <Column>
            <FooterLink href="#/contactus">Contact Us</FooterLink><br></br>
          </Column>

        </Row>
      </Container>
    </Box>
  );
};
export default Footer;