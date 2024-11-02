import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import LighteningIcon from "@/assets/icons/lightening.svg?react";
import SendIcon from "@/assets/icons/send.svg?react";

interface ChatBoxProps {
  isSender: boolean;
  message: string;
  isGeneateAvailable?: boolean;
  onGenerateClick?: () => void;
}

const ChatBox = ({
  isSender,
  message,
  isGeneateAvailable = false,
  onGenerateClick,
}: ChatBoxProps) => {
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
      <div className="flex flex-col gap-[0.5rem]">
        <div className={cn("bg-chatbox p-[1rem] rounded-2xl")}>{message}</div>
        {isGeneateAvailable ? (
          <div className="flex w-full justify-start">
            <Button onClick={onGenerateClick}>
              <div>문서 생성하기</div>
              <SendIcon />
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ChatBox;
