
import React from 'react';
import { useNotes } from '@/contexts/NotesContext';
import { NoteCard } from './NoteCard';

export const NoteList = () => {
  const { notes } = useNotes();
  
  const pinnedNotes = notes.filter(note => note.isPinned);
  const unpinnedNotes = notes.filter(note => !note.isPinned);

  if (notes.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No notes yet. Create your first note above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pinnedNotes.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Pinned Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      
      {unpinnedNotes.length > 0 && (
        <div>
          {pinnedNotes.length > 0 && <h2 className="text-lg font-medium mb-3">Other Notes</h2>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unpinnedNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
