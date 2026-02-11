
export interface DreamEntry {
  id: string;
  date: string;
  rawText: string;
  title: string;
  interpretation: string;
  advice: string;
  tags: string[];
  imageUrl?: string;
  mood?: 'mystical' | 'dark' | 'bright' | 'neutral';
}

export interface InterpretationResult {
  title: string;
  interpretation: string;
  advice: string;
  tags: string[];
  mood: 'mystical' | 'dark' | 'bright' | 'neutral';
}
