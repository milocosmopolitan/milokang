import React, { Component } from 'react';
import { connect } from 'react-redux';

const RootComponent = (props) => (
  <div>{ props.children && React.cloneElement(props.children) }</div>
)

export default RootComponent;
