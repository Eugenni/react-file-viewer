// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';
import mammoth from 'mammoth';

import 'styles/docx.scss';
import Loading from '../loading';

export default class extends Component {
  constructor(props) {
    super(props);
    this.docx = React.createRef();
  }
  componentDidMount() {
    const jsonFile = new XMLHttpRequest();
    jsonFile.open('GET', this.props.filePath, true);
    jsonFile.send();
    jsonFile.responseType = 'arraybuffer';
    jsonFile.onreadystatechange = () => {
      if (jsonFile.readyState === 4 && jsonFile.status === 200) {
        mammoth.convertToHtml(
          { arrayBuffer: jsonFile.response },
          { includeDefaultStyleMap: true },
        )
        .then((result) => {
          const docEl = document.createElement('div');
          docEl.className = 'document-container';
          docEl.innerHTML = result.value;
          this.docx.current.innerHTML = docEl.outerHTML;
        })
        .catch((a) => {
          console.log('alexei: something went wrong', a);
        })
        .done();
      }
    };
  }

  render() {
    return (
      <div className="docx" ref={this.docx} >
        <Loading />
      </div>);
  }
}
