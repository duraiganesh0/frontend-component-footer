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

const SiteFooter = ({
  supportedLanguages,
  onLanguageSelected,
  logo,
}) => {
  const intl = useIntl();
  const { config } = useContext(AppContext);

  const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;

  const externalLinkClickHandler = (event) => {
    const label = event.currentTarget.getAttribute('href');
    const eventName = EVENT_NAMES.FOOTER_LINK;
    const properties = {
      category: 'outbound_link',
      label,
    };
    sendTrackEvent(eventName, properties);
  };

  render() {
    const {
      supportedLanguages,
      onLanguageSelected,
      logo,
      intl,
    } = this.props;
    const showLanguageSelector = supportedLanguages.length > 0 && onLanguageSelected;
    const { config } = this.context;

    return (
      <footer
        role="contentinfo"
        className="custom-footer footer"
      >
        <div>
          <nav class="nav-colophon" aria-label="About">
            <ol>
              <li class="nav-colophon-01">
                <a id="about" href="/about">About</a>
              </li>
              <li class="nav-colophon-03">
                <a id="contact" href="/support/contact_us">Contact</a>
              </li>
            </ol>
          </nav>

          <p class="copyright">
              © The University of Queensland
          </p>
          
          <nav class="nav-legal" aria-label="Legal">
            <ul>
              <li class="nav-legal-01">
                <a href="/tos_and_honor">Terms of Service &amp; Honor Code</a>
              </li>
              <li class="nav-legal-02">
                <a href="/privacy">Privacy Policy</a>
              </li>
            </ul>
          </nav>
          <div class="nav-legal-cricos">
            <abbr title="Australian Business Number">ABN</abbr>: 63 942 912 684
            &nbsp; | &nbsp;
            <abbr title="Commonwealth Register of Institutions and Courses for Overseas Students">CRICOS</abbr> Provider No: 00025B
          </div>
        </div>
      </footer>
    );
  }
}

SiteFooter.contextType = AppContext;

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
