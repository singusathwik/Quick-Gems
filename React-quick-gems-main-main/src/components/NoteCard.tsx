
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Note, NoteColor } from '@/types/Note';
import { useNotes } from '@/contexts/NotesContext';
import { cn } from '@/lib/utils';
import { Check, Edit, Pin, Trash, X } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface NoteCardProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const { updateNote, deleteNote, togglePinned } = useNotes();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    updateNote(note.id, {
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTitle(note.title);
    setEditedContent(note.content);
    setIsEditing(false);
  };

  const handleColorChange = (color: NoteColor) => {
    updateNote(note.id, { color });
  };

  const colorOptions: { value: NoteColor; label: string }[] = [
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'pink', label: 'Pink' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'orange', label: 'Orange' },
  ];

  return (
    <Card className={cn(
      "h-full flex flex-col transition-all animate-fade-in hover:shadow-md",
      `bg-note-${note.color}`,
    )}>
      <CardHeader className="pb-2 pt-4 px-4 space-y-0 flex justify-between items-start">
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-medium bg-white/50"
            placeholder="Note title"
          />
        ) : (
          <div className="flex justify-between w-full items-center">
            <h3 className="font-medium text-lg truncate">{note.title || "Untitled"}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={() => togglePinned(note.id)}
            >
              <Pin className={cn("h-4 w-4", note.isPinned ? "fill-primary" : "")} />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className={cn("px-4 pb-2 flex-grow", isEditing ? "" : "overflow-hidden")}>
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[100px] bg-white/50"
            placeholder="Note content"
          />
        ) : (
          <div className="whitespace-pre-line">
            {note.content}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-3 py-2 text-xs text-muted-foreground flex justify-between border-t border-black/5">
        <span>
          {format(new Date(note.updatedAt), 'MMM d, yyyy')}
        </span>
        <div className="flex gap-1">
          {isEditing ? (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={handleCancel}
              >
                <X className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={handleSave}
              >
                <Check className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <span className="h-3 w-3 rounded-full bg-note-${note.color} border border-black/10"></span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-2" align="end">
                  <div className="flex gap-1">
                    {colorOptions.map((color) => (
                      <Button
                        key={color.value}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => handleColorChange(color.value)}
                      >
                        <span 
                          className={`h-4 w-4 rounded-full bg-note-${color.value} border border-black/10 ${color.value === note.color ? 'ring-1 ring-black/30' : ''}`}
                          title={color.label}
                        ></span>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0" 
                onClick={() => deleteNote(note.id)}
              >
                <Trash className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
