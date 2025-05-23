"use client";

export const dynamic = "force-dynamic";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  clearSelectedMeme,
  selectMeme,
  updateMeme,
} from "../store/slices/memeSlice";
import EditMemeModal from "@/components/EditMemeModal";

const MemeTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const memes = useSelector((state: RootState) => state.memes.memes);
  const selectedMeme = useSelector(
    (state: RootState) => state.memes.selectedMeme
  );
  const [openModal, setOpenModal] = useState(false);

  const handleSave = () => {
    if (!selectedMeme) return;

    const { title, imageUrl, likes } = selectedMeme;

    const isValidUrl =
      /^(https?):\/\/[^\s$.?#].[^\s]*\.(jpg|jpeg|webp|png|gif|bmp|svg)(\?[^\s]*)?$/i.test(
        imageUrl
      );

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
    console.log("updated");
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
    <div className=" w-full">
      <div className="overflow-x-auto px-0 sm:px-6 w-full">
        <Table aria-label="Meme Table" className="w-full min-w-full">
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
      </div>

      <EditMemeModal
        isOpen={openModal}
        selectedMeme={selectedMeme}
        onClose={() => {
          setOpenModal(false);
          dispatch(clearSelectedMeme());
        }}
        onSave={handleSave}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default MemeTable;
