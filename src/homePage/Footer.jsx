import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./Footerstyle";
import { Outlet, Link} from "react-router-dom";
  
function Footer() {
  return (
    <Box>
      
      <Container>
        <Row>
          <Column>
            <FooterLink href="./aboutus">About Us</FooterLink><br></br>
          </Column>
          <Column>
            <FooterLink href="./contactus">Contact Us</FooterLink><br></br>
          </Column>

        </Row>
      </Container>
    </Box>
  );
};
export default Footer;