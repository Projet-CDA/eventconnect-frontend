"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import EventForm from "./EventForm";

interface CreateEventModalProps {
  onEventCreated?: () => void;
  children?: React.ReactNode;
}

export default function CreateEventModal({
  onEventCreated,
  children,
}: CreateEventModalProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onEventCreated) {
      onEventCreated();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Créer un événement
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>

        <EventForm
          onSuccess={handleSuccess}
          onCancel={handleCancel}
          submitButtonText="Créer l'événement"
          cancelButtonText="Annuler"
        />
      </DialogContent>
    </Dialog>
  );
}
