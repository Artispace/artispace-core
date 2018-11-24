import React from "react";
import { storiesOf } from "@storybook/react";

import CenteredCard from "../src/Centeredcard";

import LinkButton from "../src/Button";

const background =
  "https://images.pexels.com/photos/1393996/pexels-photo-1393996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

storiesOf("CenteredCard", module)
  .add("Default CenteredCard", () => <CenteredCard />)
  .add("CenteredCard with Title", () => <CenteredCard title="Title" />)
  .add("CenteredCard with content", () => (
    <CenteredCard content="Content is here" />
  ))
  .add("centered Card with Title and Content", () => (
    <CenteredCard title="Title" content="Content is here" />
  ))
  .add("CentetedCard with background", () => (
    <CenteredCard background={background} />
  ))
  .add("CenteredCard with Background, title & Content", () => (
    <CenteredCard
      background={background}
      title="Title"
      content="Content is here"
    />
  ))
  .add("CenteredCard with Background, title, content & Avatar", () => (
    <CenteredCard
      avatar={{
        src: background
      }}
      background={background}
      title="Title"
      content="Content is here"
    />
  ))
  .add("CenteredCard with Background, Title, Content,Avatar and Link", () => (
    <CenteredCard
      avatar={{
        src: background
      }}
      background={background}
      title="Title"
      content="Content is here"
      link={{
        href: "/goodintent",
        content: "Link"
      }}
      LinkButton={LinkButton}
    />
  ));
