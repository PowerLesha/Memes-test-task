"use client";

import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";

interface MemeCardProps {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  link: string;
  onOpenMemeLink: (link: string) => void;
}

const MemeCard = ({
  id,
  title,
  imageUrl,
  likes,
  link,
  onOpenMemeLink,
}: MemeCardProps) => {
  return (
    <Card key={id} className="w-full h-full flex flex-col ">
      <CardHeader className="flex justify-center items-center">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-1/2 object-cover"
          height={100}
        />
      </CardHeader>

      <CardBody className="flex flex-col gap-8 justify-between p-4 h-1/2">
        <div>
          <p className="font-semibold text-xl">{title}</p>
          <p className="text-gray-500">{likes} Likes</p>
        </div>
        <div className="mt-auto">
          <Button onPress={() => onOpenMemeLink(link)}>Open Meme</Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default MemeCard;
