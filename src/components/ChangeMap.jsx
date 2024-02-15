import PropTypes from "prop-types";
import React from "react";
import { useMap } from "react-leaflet";

const ChangeMap = ({position}) => {
const map = useMap()
map.setView(position)

  return null;
};

ChangeMap.propTypes={
    position : PropTypes.array.isRequired
}

export default ChangeMap;
