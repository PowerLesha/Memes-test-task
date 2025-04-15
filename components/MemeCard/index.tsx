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
    <Card key={id} className="w-full">
      <CardHeader>
        <Image
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <p className="font-semibold text-xl">{title}</p>
        <p className="text-gray-500">{likes} Likes</p>
        <Button onPress={() => onOpenMemeLink(link)} className="mt-2">
          Open Meme
        </Button>
      </CardBody>
    </Card>
  );
};

export default MemeCard;
