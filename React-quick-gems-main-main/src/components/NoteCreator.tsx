
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useNotes } from '@/contexts/NotesContext';
import { NoteColor } from '@/types/Note';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NoteCreator = () => {
  const { addNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<NoteColor>('yellow');

  const handleSubmit = () => {
    if (!content.trim() && !title.trim()) return;
    
    addNote(title.trim(), content.trim(), selectedColor);
    setTitle('');
    setContent('');
    setIsExpanded(false);
    setSelectedColor('yellow');
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
    <Card className="shadow-sm mb-8 border">
      <CardHeader className="pb-2">
        {isExpanded && (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-none font-medium focus-visible:ring-0"
            placeholder="Title"
          />
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isExpanded ? "Take a note..." : "Click to add a new note..."}
          className={cn(
            "min-h-[40px] resize-none border-none focus-visible:ring-0",
            isExpanded ? "min-h-[80px]" : "max-h-[40px]"
          )}
          onFocus={() => setIsExpanded(true)}
        />
      </CardContent>
      {isExpanded && (
        <CardFooter className="justify-between pt-0">
          <div className="flex gap-1">
            {colorOptions.map((color) => (
              <Button
                key={color.value}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 rounded-full"
                onClick={() => setSelectedColor(color.value)}
              >
                <span 
                  className={`h-4 w-4 rounded-full bg-note-${color.value} border border-black/10 ${color.value === selectedColor ? 'ring-1 ring-black/30' : ''}`}
                  title={color.label}
                ></span>
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsExpanded(false);
                setTitle('');
                setContent('');
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};
