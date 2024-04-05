import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

type Speaker = {
  _id: string;
  name: string;
  organization: string;
  designation: string;
  photo: string;
  sponsor_link: string;
};
export default function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <Card
      key={speaker._id}
      sx={{ maxWidth: 355 }}
      className="bg-transparent shadow-none hover:bg-transparent "
    >
      <CardActionArea className="hover:bg-transparent py-4 bg-transparent w-[300px] h-[394px] px-4 flex items-center justify-around flex-col ">
        <div className="">
          <Image
            alt="Speaker"
            src={
              speaker.photo
                ? `${process.env.NEXT_PUBLIC_BASE_URL}/${speaker.photo}`
                : "/download.jpeg"
            }
            height={170}
            width={160}
            className="h-[170px] w-[160px] overflow-hidden rounded-full border border-gray-500"
          />
        </div>
        <CardContent className="max-w-[200px] px-1">
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            className="font-bold text-lg text-center"
          >
            {speaker.name}
          </Typography>

          <Typography
            variant="body2"
            color="text.base"
            className="text-base text-center"
          >
            {speaker.designation}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="text-sm text-center"
            // className="text-center leading-8 text-base tracking-wider font-semibold"
          >
            {speaker.organization}
          </Typography>
          <a
            href="#"
            className="text-blue-600 flex items-center justify-center mt-2"
          >
            <a href={speaker.sponsor_link} target="_blank">
              <FaLinkedinIn size={25} />
            </a>
          </a>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
