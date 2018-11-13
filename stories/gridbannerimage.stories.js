import React from "react";
import { storiesOf } from "@storybook/react";

import Gridbannerimage from "../src/Gridbannerimage";

const img =
  "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

storiesOf("Gridbannerimage", module)
  .add("Default Gridbannerimage", () => <Gridbannerimage />)
  .add("Gridbannerimage with image", () => <Gridbannerimage image={img} />)
  .add("Gridbannerimage with moreinfo", () => (
    <Gridbannerimage
      moreinfo={{
        title: "Tevin",
        subtitle: "Thuku"
      }}
    />
  ))
  .add("Gridbannerimage moreinfo position at the bottom", () => (
    <Gridbannerimage
      moreinfo={{
        position: "bottom"
      }}
      image={img}
    />
  ))
  .add(
    "Gridbannerimage with dynamic heights for different areas viewport widths",
    () => (
      <Gridbannerimage
        image={img}
        height={{
          sm: 300,
          md: 300,
          lg: 300
        }}
      />
    )
  );
