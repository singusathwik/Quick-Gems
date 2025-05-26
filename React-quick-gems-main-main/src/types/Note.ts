
export type NoteColor = 'yellow' | 'green' | 'pink' | 'blue' | 'purple' | 'orange';

export interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}
