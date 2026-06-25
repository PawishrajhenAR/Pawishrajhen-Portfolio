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
  'skills-foot',
  'research-aside',
  'contact-aside',
  'footer-corner',
] as const;

export type AsciiSlotId = (typeof ASCII_SLOT_IDS)[number];

export const asciiSlotSizes: Record<AsciiSlotId, AsciiArtSize> = {
  'hero-sidebar': 'md',
  'about-aside': 'sm',
  'experience-foot': 'sm',
  'skills-foot': 'md',
  'research-aside': 'sm',
  'contact-aside': 'md',
  'footer-corner': 'xs',
};
