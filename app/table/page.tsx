"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  clearSelectedMeme,
  selectMeme,
  updateMeme,
} from "../store/slices/memeSlice";

const MemeTable = () => {
  const dispatch = useDispatch();
  const memes = useSelector((state: RootState) => state.memes.memes);
  const selectedMeme = useSelector(
    (state: RootState) => state.memes.selectedMeme
  );
  const [openModal, setOpenModal] = useState(false);
  const [validLength, setValidLength] = useState(true);

  const handleSave = () => {
    if (!selectedMeme) return;

    const { title, imageUrl, likes } = selectedMeme;

    const isValidUrl = /^(http|https):\/\/.*\.(jpg|jpeg)$/.test(imageUrl);
    const isValidTitle = title && title.length >= 3;

    const isValidLikes = typeof likes === "number" && likes >= 0 && likes <= 99;

    if (!isValidTitle || !isValidUrl || !isValidLikes) {
      return;
    }

    const updatedMeme = {
      id: selectedMeme.id ?? -1,
      title,
      imageUrl,
      likes,
      link: selectedMeme.link,
    };

    dispatch(updateMeme(updatedMeme));
    setOpenModal(false);
    dispatch(clearSelectedMeme());
  };

  const handleEditClick = (meme: any) => {
    dispatch(selectMeme(meme));
    setOpenModal(true);
  };

  const handleInputChange = (field: string, value: any) => {
    if (selectedMeme) {
      dispatch(
        selectMeme({
          ...selectedMeme,
          [field]: value,
        })
      );
    }
  };

  return (
    <div className="p-4 w-full">
      <Table aria-label="Meme Table" className="w-full">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn className="text-center">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell>{meme.title}</TableCell>
              <TableCell>{meme.likes}</TableCell>
              <TableCell className="text-center">
                <Button onPress={() => handleEditClick(meme)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
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
          <h2 className="text-lg font-bold">Edit Meme</h2>

          <Input
            label="ID (Read Only)"
            value={String(selectedMeme?.id ?? -1)}
            readOnly
          />

          <Input
            label="Title"
            value={selectedMeme?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
            minLength={3}
            maxLength={100}
          />
          {!validLength && (
            <p className="text-red-500 text-sm mt-1">
              Title must be between 3 and 100 characters.
            </p>
          )}
          <Input
            label="Image URL (JPG)"
            value={selectedMeme?.imageUrl || ""}
            onChange={(e) => handleInputChange("imageUrl", e.target.value)}
            required
            pattern="^(http|https):\/\/.*\.(jpg|jpeg)$"
          />

          <Input
            label="Likes"
            type="number"
            value={String(selectedMeme?.likes || 0)}
            onChange={(e) =>
              handleInputChange(
                "likes",
                Math.max(0, Math.min(99, +e.target.value))
              )
            }
            min={0}
            max={99}
            required
          />

          <div className="flex justify-end space-x-2">
            <Button variant="light" onPress={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onPress={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemeTable;
