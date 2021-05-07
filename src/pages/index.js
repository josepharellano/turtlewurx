import React from "react"
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Layout } from '../components'
import { About, Tours } from '../components/sections'



const IndexPage = ({ location }) =>{ 
  console.log(location);
  return (
    <div>
      <Layout location={location}>
        <About />
        <Tours />
      </Layout> 
    </div>
)};

export default IndexPage;
