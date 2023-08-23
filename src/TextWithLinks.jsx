import React from 'react';
import Linkify from 'linkify-react';

const TextWithLinks = () => {
  const content = `
    Visit our website at http://www.example.com for more info.
    For support, email us at support@example.com or call 123-456-7890.
    Check out https://github.com for repositories.
    Avoid this URL: https://example...
    Email us at support@example...
    Call us at 123-456-7890...
  `;

  const options = {
    // Define custom link components based on link types
    format: (value, type) => {
      if (value.endsWith('...')) {
        return value; // Exclude links that end with "..."
      } else if (type === 'url') {
        const url = new URL(value);
        const domainName = url.hostname.replace(/^www\./, ''); // Remove "www." if present
        return <a href={value} target="_blank" rel="noopener noreferrer">{domainName}</a>;
      } else if (type === 'email') {
        return <a href={`mailto:${value}`}>{value}</a>;
      } else if (type === 'phone') {
        return <a href={`tel:${value}`}>{value}</a>;
      }
    }
  };

  return (
    <Linkify options={options}>
      {content}
    </Linkify>
  );
};

export default TextWithLinks;
