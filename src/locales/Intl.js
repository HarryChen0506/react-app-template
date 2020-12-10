import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import enUS from './lang/en-US';
import zhCN from './lang/zh-CN';
import zhTW from './lang/zh-TW';

const translation = {
  'en-US': enUS,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
};

function Intl(props) {
  const { children } = props;
  const setting = useSelector(state => state.setting);
  const { locale } = setting || {};
  const [mergedMessages, setMergedMessages] = useState(translation['zh-CN']);

  useEffect(() => {
    // Merging english and current locale,
    // avoid showing Text id if cannot look for the translate in locale file
    setMergedMessages(
      { ...translation['zh-CN'], ...translation[locale] },
    );
  }, [locale]);

  return (
    <IntlProvider
      messages={mergedMessages}
      locale={locale}
      key={locale}
      defaultLocale="zh-CN"
    >
      {children}
    </IntlProvider>
  );
}

export default Intl;
