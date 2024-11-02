import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/pages/chat-page";
import { KeyboardEvent, useState } from "react";

interface FooterProps {
  onSubmit: (message: Message) => void;
  disabled?: boolean;
}

const Footer = ({ onSubmit, disabled = false }: FooterProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  //for korean input
  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !isComposing) {
      event.preventDefault();
      if (inputValue.trim()) {
        onSubmit({ isSender: true, content: inputValue });
        setInputValue("");
      }
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full p-4 shadow-md flex justify-center">
      <div className="w-[48rem]">
        <Textarea
          placeholder="답변을 입력해주세요."
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          disabled={disabled}
        />
      </div>
    </footer>
  );
};

export default Footer;
