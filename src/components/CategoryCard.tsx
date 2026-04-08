import Link from 'next/link';
import { useLocale } from 'next-intl';

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export function CategoryCard({ title, image, href }: CategoryCardProps) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}${href}`}
      className="group relative overflow-hidden rounded-lg aspect-square bg-gray-200 block"
    >
      {/* Image with zoom effect */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Title */}
      <div className="absolute inset-0 flex items-end p-6">
        <h3 className="font-display text-2xl font-bold text-white transform transition-transform group-hover:translate-y-[-4px]">
          {title}
        </h3>
      </div>
    </Link>
  );
}
