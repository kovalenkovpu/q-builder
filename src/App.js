import React, { Component } from 'react';
import GenericQueryBuilder from './GenericQueryBuilder';

export default class App extends Component {
  render() {
    return (
      <GenericQueryBuilder isComplex={true}/>
    );
  }
}
