
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Note, NoteColor } from '../types/Note';
import { toast } from "sonner";

interface NotesContextType {
  notes: Note[];
  addNote: (title: string, content: string, color: NoteColor) => void;
  updateNote: (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  togglePinned: (id: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      try {
        // Parse the notes and convert date strings back to Date objects
        return JSON.parse(savedNotes, (key, value) => {
          if (key === 'createdAt' || key === 'updatedAt') {
            return new Date(value);
          }
          return value;
        });
      } catch (e) {
        console.error('Failed to parse notes from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    // Save notes to localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string, color: NoteColor = 'yellow') => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      color,
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setNotes(prevNotes => [newNote, ...prevNotes]);
    toast.success("Note created");
  };

  const updateNote = (id: string, updates: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, ...updates, updatedAt: new Date() } 
          : note
      )
    );
    toast.success("Note updated");
  };

  const deleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    toast.success("Note deleted");
  };

  const togglePinned = (id: string) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id 
          ? { ...note, isPinned: !note.isPinned, updatedAt: new Date() } 
          : note
      )
    );
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePinned,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};
