import React from "react";
import Avatar from "../../src/Avatar";
import Buttonbase from "../../src/Buttonbase";
import Carousel from "../../src/Carousel";

const Avatarcomponent = props => <Avatar {...props} />;

const renderr = component => {
  switch (component) {
    case "Avatar":
      return Avatarcomponent;
    case "Buttonbase":
      return Avatarcomponent;
    case "Carousel":
      return Avatarcomponent;
    default:
      return Avatarcomponent;
  }
};

export default renderr;
