import React from "react";
import Linkify from "linkify-react";

const TextWithLinks = () => {
  const content = `
    Visit our website at http://www.example.com for more info.
    For support, email us at support@example.com or call 123-456-7890.
    Check our documentation at https://confluence.c...
  `;

  const options = {
    // Define custom link components based on link types
    format: (value, type) => {
      if (type === "url" && !value.endsWith("...")) {
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        );
      } else if (type === "email") {
        return <a href={`mailto:${value}`}>{value}</a>;
      } else if (type === "phone") {
        return <a href={`tel:${value}`}>{value}</a>;
      }
    }
  };

  return <Linkify options={options}>{content}</Linkify>;
};

export default TextWithLinks;
