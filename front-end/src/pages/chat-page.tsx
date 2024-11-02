import ChatBox from "@/components/chat/chat-box";
import Footer from "@/components/shared/footer";
import { useState } from "react";

export interface Message {
  isSender: boolean;
  content: string;
}

const ChatPage = () => {
  //처음에 들어오면 첫 질문 get 요청, 오기전까지 disabled

  const [messages, setMessages] = useState<Message[]>([
    {
      isSender: false,
      content: "주제가 뭔가요?",
    },
    { isSender: true, content: "알아서 뭐하시게요" },
    {
      isSender: false,
      content: "제목이 뭔가요?",
    },
  ]);

  const handleSubmit = (message: Message) => {
    setMessages([...messages, message]);
    // 답변 제출 및 질의 요청 post
  };

  return (
    <div className="w-full py-[4rem] flex flex-col gap-[0.5rem]">
      {messages.map((message, index) => {
        const isGeneateAvailable =
          index === messages.length - 1 && index !== 0 && !message.isSender;

        return (
          <ChatBox
            key={index}
            isSender={message.isSender}
            message={message.content}
            isGeneateAvailable={isGeneateAvailable}
          />
        );
      })}

      <Footer onSubmit={handleSubmit} disabled={false} />
    </div>
  );
};

export default ChatPage;
