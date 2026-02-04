import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    // 如果没有 locale，默认用英文
    if (!locale || !['en', 'zh'].includes(locale)) {
        locale = 'en';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});