// Copyright (c) 2017 PlanGrid, Inc.

import React, { Component } from 'react';

import 'styles/photo-viewer.scss';

export default class PhotoViewer extends Component {
  getImageDimensions(originalWidth, originalHeight) {
    // Scale image to fit into viewer
    let imgHeight;
    let imgWidth;
    const { height: viewerHeight, width: viewerWidth } = this.props;

    if (originalHeight <= viewerHeight && originalWidth <= viewerWidth) {
      imgWidth = originalWidth;
      imgHeight = originalHeight;
    } else {
      const heightRatio = viewerHeight / originalHeight;
      const widthRatio = viewerWidth / originalWidth;
      if (heightRatio < widthRatio) {
        imgHeight = originalHeight * heightRatio;
        imgWidth = originalWidth * heightRatio;
      } else {
        imgHeight = originalHeight * widthRatio;
        imgWidth = originalWidth * widthRatio;
      }
    }

    return { height: imgHeight, width: imgWidth };
  }

  getImageDataSrc() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    context.drawImage(this, 0, 0);
    return canvas.toDataURL('image/jpeg');
  }

  render() {
    const containerStyles = {
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
    };

    const { originalWidth, originalHeight } = this.props;
    const imageDimensions = this.getImageDimensions.call(this, originalWidth, originalHeight);

    const srcData = this.getImageDataSrc.call(this.props.texture.image);

    return (
      <div style={containerStyles} className="photo-viewer-container">
        <img className="photo" alt={'file_preview'} src={srcData} style={{ width: imageDimensions.width, height: imageDimensions.height }} />
      </div>
    );
  }
}
