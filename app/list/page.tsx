"use client";
import MemeCard from "@/components/MemeCard";
import { Meme } from "@/types";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MemeList = React.memo(() => {
  const memes: Meme[] = useSelector((state: RootState) => state.memes.memes);
  const onOpenMemeLink = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {memes.length === 0 ? (
        <p>No memes available</p>
      ) : (
        memes.map((meme) => (
          <MemeCard
            key={meme.id}
            id={meme.id}
            title={meme.title}
            imageUrl={meme.imageUrl}
            likes={meme.likes}
            link={meme.link}
            onOpenMemeLink={onOpenMemeLink}
          />
        ))
      )}
    </div>
  );
});

export default MemeList;
