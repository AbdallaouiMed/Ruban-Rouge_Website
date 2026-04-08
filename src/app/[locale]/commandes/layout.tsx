import { getTranslations } from 'next-intl/server';
import { generateMetadata as genMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return genMeta({
    title: `${t('orders.title')} | Ruban Rouge Meknès`,
    description: t('orders.description'),
    locale,
    path: '/commandes',
  });
}

export default function CommandesLayout({ children }: Props) {
  return <>{children}</>;
}
