import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'zh'] as const;

// 导出封装好的导航组件
export const { Link, redirect, usePathname, useRouter } = createNavigation({ locales });