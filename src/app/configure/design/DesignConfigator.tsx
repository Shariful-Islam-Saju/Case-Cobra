/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface propsType {
  configId: string;
  imgUrl: string;
  imageDimensions: { width: number; height: number };
}

const DesignConfigator = ({ configId, imageDimensions, imgUrl }: propsType) => {
  return <div>DesignConfigator</div>;
};

export default DesignConfigator;
