
import React from 'react';
import { NotesProvider } from '@/contexts/NotesContext';
import { NoteCreator } from '@/components/NoteCreator';
import { NoteList } from '@/components/NoteList';

const Index = () => {
  return (
    <NotesProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto py-8 px-4">
          <header className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Quick Notes</h1>
            <p className="text-muted-foreground">Capture your thoughts, ideas, and reminders</p>
          </header>
          
          <main className="max-w-5xl mx-auto">
            <NoteCreator />
            <NoteList />
          </main>
        </div>
      </div>
    </NotesProvider>
  );
};

export default Index;
