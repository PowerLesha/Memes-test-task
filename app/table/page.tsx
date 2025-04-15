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

  const handleSave = () => {
    if (!selectedMeme) return;
    dispatch(updateMeme(selectedMeme));
    setOpenModal(false);
    dispatch(clearSelectedMeme());
  };

  const handleEditClick = (meme: any) => {
    dispatch(selectMeme(meme));
    setOpenModal(true);
  };

  return (
    <div className="p-4 w-full">
      <Table aria-label="Meme Table" className="w-full">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Likes</TableColumn>
          <TableColumn className="text-center">
            {" "}
            {/* Center the "Actions" header */}
            Actions
          </TableColumn>
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id}>
              <TableCell>{meme.id}</TableCell>
              <TableCell>{meme.title}</TableCell>
              <TableCell>{meme.likes}</TableCell>
              <TableCell className="text-center">
                {" "}
                {/* Centering the actions */}
                <Button onPress={() => handleEditClick(meme)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedMeme && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
          <div className="p-4 space-y-4 w-full max-w-lg mx-auto">
            <h2 className="text-lg font-bold">Edit Meme</h2>

            <Input
              label="Title"
              value={selectedMeme.title}
              onChange={(e) =>
                dispatch(selectMeme({ ...selectedMeme, title: e.target.value }))
              }
            />

            <Input
              label="Image URL"
              value={selectedMeme.imageUrl}
              onChange={(e) =>
                dispatch(
                  selectMeme({ ...selectedMeme, imageUrl: e.target.value })
                )
              }
            />

            <Input
              label="Likes"
              type="number"
              value={String(selectedMeme.likes)}
              onChange={(e) =>
                dispatch(
                  selectMeme({ ...selectedMeme, likes: +e.target.value })
                )
              }
            />

            <div className="flex justify-end space-x-2">
              <Button variant="light" onPress={() => setOpenModal(false)}>
                Cancel
              </Button>
              <Button onPress={handleSave}>Save</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MemeTable;
