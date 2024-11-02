import { cn } from "@/lib/utils";
import LighteningIcon from "@/assets/icons/lightening.svg?react";

interface ChatBoxProps {
  isSender: boolean;
  message: string;
}

const ChatBox = ({ isSender, message }: ChatBoxProps) => {
  return (
    <div
      className={cn("flex items-start gap-4 w-full", {
        "justify-end": isSender,
        "justify-start": !isSender,
      })}
    >
      {!isSender ? (
        <LighteningIcon className="w-6 h-6 min-w-6 min-h-6 mt-[1rem]" />
      ) : null}
      <div className={cn("bg-chatbox p-[1rem] rounded-2xl")}>{message}</div>
    </div>
  );
};

export default ChatBox;
