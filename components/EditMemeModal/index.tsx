"use client";
import { Input, Button, Modal } from "@heroui/react";
import { useEffect, useState } from "react";

interface EditMemeModalProps {
  isOpen: boolean;
  selectedMeme: any;
  onClose: () => void;
  onSave: () => void;
  onChange: (field: string, value: any) => void;
}

const EditMemeModal = ({
  isOpen,
  selectedMeme,
  onClose,
  onSave,
  onChange,
}: EditMemeModalProps) => {
  const [validLength, setValidLength] = useState(true);

  useEffect(() => {
    if (selectedMeme?.title) {
      setValidLength(
        selectedMeme.title.length >= 3 && selectedMeme.title.length <= 100,
      );
    }
  }, [selectedMeme?.title]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="p-4 space-y-4 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg"
        style={{
          position: "fixed",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.9)",
        }}
      >
        <h2 className="text-lg font-bold text-white">Edit Meme</h2>

        <Input
          label="ID (Read Only)"
          value={String(selectedMeme?.id ?? -1)}
          readOnly
        />

        <Input
          label="Title"
          value={selectedMeme?.title || ""}
          onChange={(e) => onChange("title", e.target.value)}
          required
          minLength={3}
          maxLength={100}
        />

        <Input
          label="Image URL (JPG)"
          value={selectedMeme?.imageUrl || ""}
          onChange={(e) => onChange("imageUrl", e.target.value)}
          required
          pattern="^(http|https):\/\/.*\.(jpg|jpeg)$"
        />

        <Input
          label="Likes"
          type="number"
          value={String(selectedMeme?.likes || 0)}
          onChange={(e) =>
            onChange("likes", Math.max(0, Math.min(99, +e.target.value)))
          }
          min={0}
          max={99}
          required
        />

        <div className="flex justify-end space-x-2">
          <Button variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button onPress={onSave} isDisabled={!validLength}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditMemeModal;
