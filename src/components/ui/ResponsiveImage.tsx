import type { MediaImage } from '../../content/media';

interface ResponsiveImageProps {
  image: MediaImage;
  /** CSS `sizes` — how wide the image renders at each breakpoint. */
  sizes: string;
  /** Above-the-fold LCP image: load eagerly with high priority. */
  priority?: boolean;
  className?: string;
  alt?: string;
}

const srcSet = (img: MediaImage, ext: 'avif' | 'webp') =>
  img.widths.map((w) => `/media/${img.slug}-${w}.${ext} ${w}w`).join(', ');

/** AVIF → WebP <picture> with intrinsic width/height (no layout shift). */
export const ResponsiveImage = ({
  image,
  sizes,
  priority = false,
  className,
  alt,
}: ResponsiveImageProps) => (
  <picture>
    <source type="image/avif" srcSet={srcSet(image, 'avif')} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet(image, 'webp')} sizes={sizes} />
    <img
      src={`/media/${image.slug}-${image.widths[0]}.webp`}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={className}
    />
  </picture>
);
