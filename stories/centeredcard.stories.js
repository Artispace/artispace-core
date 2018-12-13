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
      content={`
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.


      `}
      link={{
        href: "/goodintent",
        content: "Link"
      }}
      LinkButton={LinkButton}
    />
  ));
