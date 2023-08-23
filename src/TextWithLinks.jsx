import React from "react";
import Linkify from "linkify-react";

const TextWithLinks = () => {
  const content = `
    Visit our website at http://www.example.com for more info.
    For support, email us at support@example.com or call 123-456-7890.
    Check out https://github.com for repositories.
    Avoid this URL: https://example...
    Email us at ftest@g... (should be ftest@gmail.com)
    Call us at 123-456-7890 (should be a valid phone number)...
  `;

  const isValidUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  const Text = ({ children }) => {
    return <span>{children}</span>;
  };

  const options = {
    // Define custom link components based on link types
    format: (value, type) => {
      if (type === "url" && isValidUrl(value)) {
        const url = new URL(value);
        const domainName = url.hostname.replace(/^www\./, ""); // Remove "www." if present
        return (
          <a href={value} target="_blank" rel="noopener noreferrer">
            {domainName}
          </a>
        );
      } else if (type === "email") {
        return <a href={`mailto:${value}`}>{value}</a>;
      } else if (type === "phone") {
        return <a href={`tel:${value}`}>{value}</a>;
      } else {
        return <Text>{value}</Text>; // Render as plain text
      }
    }
  };

  return <Linkify options={options}>{content}</Linkify>;
};

export default TextWithLinks;
