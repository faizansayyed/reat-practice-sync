import React from "react";
import Linkify from "linkify-react";

const TextWithLinks = () => {
  const content = `
    Visit our website at http://www.example.com for more info.
    For support, email us at support@example.com or call 123-456-7890.
    Check out https://github.com for repositories.
    Avoid this incomplete URL: https://example...
    Email us at ftest@g... (should be ftest@gmail.com)
    Call us at 123-456-7890 (should be a valid phone number)...
  `;

  const isValidUrl = (value) => {
    // Regular expression to validate URLs
    const urlRegex = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w]*)*\/?$/i;
    return urlRegex.test(value);
  };

  const isValidEmail = (value) => {
    // Regular expression to validate email addresses
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(value);
  };

  const isValidPhoneNumber = (value) => {
    // Regular expression to validate phone numbers
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(value);
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
      } else if (type === "email" && isValidEmail(value)) {
        return <a href={`mailto:${value}`}>{value}</a>;
      } else if (type === "phone" && isValidPhoneNumber(value)) {
        return <a href={`tel:${value}`}>{value}</a>;
      } else {
        return value; // Return original text for invalid links
      }
    }
  };

  return <Linkify options={options}>{content}</Linkify>;
};

export default TextWithLinks;
