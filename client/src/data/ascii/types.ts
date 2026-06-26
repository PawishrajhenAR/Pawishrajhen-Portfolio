export type AsciiArtSize = 'xs' | 'sm' | 'md' | 'lg';

export type AsciiArt = {
  id: string;
  label?: string;
  content: string;
  size?: AsciiArtSize;
};

export const ASCII_SLOT_IDS = [
  'hero-sidebar',
  'about-aside',
  'experience-foot',
  'research-aside',
  'contact-aside',
] as const;

export type AsciiSlotId = (typeof ASCII_SLOT_IDS)[number];

export const asciiSlotSizes: Record<AsciiSlotId, AsciiArtSize> = {
  'hero-sidebar': 'lg',
  'about-aside': 'sm',
  'experience-foot': 'sm',
  'research-aside': 'sm',
  'contact-aside': 'md',
};
