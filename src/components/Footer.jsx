import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { ensureConfig } from '@edx/frontend-platform';
import { AppContext } from '@edx/frontend-platform/react';

import messages from './Footer.messages';
import LanguageSelector from './LanguageSelector';

ensureConfig([
  'LMS_BASE_URL',
  'LOGO_TRADEMARK_URL',
], 'Footer component');

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

const SiteFooter = ({ supportedLanguages, onLanguageSelected, logo }) => {
  const intl = useIntl();
  const { config } = useContext(AppContext);

  const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;

  const externalLinkClickHandler = (event) => {
    const label = event.currentTarget.getAttribute('href');
    sendTrackEvent(EVENT_NAMES.FOOTER_LINK, {
      category: 'outbound_link',
      label,
    });
  };

  return (
    <footer role="contentinfo" className="custom-footer footer">
      <div>
        <nav className="nav-colophon" aria-label="About">
          <ol>
            <li className="nav-colophon-01">
              <a id="about" href="/about">About</a>
            </li>
            <li className="nav-colophon-03">
              <a id="contact" href="/support/contact_us">Contact</a>
            </li>
          </ol>
        </nav>

        <p className="copyright">
          © The University of Queensland
        </p>

        <nav className="nav-legal" aria-label="Legal">
          <ul>
            <li className="nav-legal-01">
              <a href="/tos_and_honor">Terms of Service &amp; Honor Code</a>
            </li>
            <li className="nav-legal-02">
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </nav>

        <div className="nav-legal-cricos">
          <abbr title="Australian Business Number">ABN</abbr>: 63 942 912 684
          &nbsp; | &nbsp;
          <abbr title="Commonwealth Register of Institutions and Courses for Overseas Students">CRICOS</abbr> Provider No: 00025B
        </div>
      </div>
    </footer>
  );
};

SiteFooter.propTypes = {
  logo: PropTypes.string,
  onLanguageSelected: PropTypes.func,
  supportedLanguages: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
};

SiteFooter.defaultProps = {
  logo: undefined,
  onLanguageSelected: undefined,
  supportedLanguages: [],
};

export default SiteFooter;
export { EVENT_NAMES };
