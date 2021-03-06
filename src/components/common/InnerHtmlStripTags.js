import React from 'react';
import String from 'string';
import PropTypes from 'prop-types';

/**
 * @description propTypes for InnerHtmlStripTags
 * @type {Object}
 */
const propTypes = {
  html: PropTypes.string.isRequired,
};

/**
 * @function InnerHtmlStripTags
 * @param {String} html html string
 * @returns {XML}
 */
function InnerHtmlStripTags({ html }) {
  if (!html) {
    return null;
  }

  const stripedHtml = String(html)
    .trim()
    .replaceAll('&nbsp;', ' ')
    .stripTags()
    .s;

  return <span className="ellipsisListItem" dangerouslySetInnerHTML={{ __html: stripedHtml }} />;
}

InnerHtmlStripTags.propTypes = propTypes;

export default InnerHtmlStripTags;
