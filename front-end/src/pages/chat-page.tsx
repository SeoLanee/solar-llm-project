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
    { isSender: true, content: "안녕하세요." },
    {
      isSender: false,
      content:
        "긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다. 긴질문 텍스트 입니다.",
    },
  ]);

  const handleSubmit = (message: Message) => {
    console.log(message);
    setMessages([...messages, message]);
    // 답변 제출 및 질의 요청 post
  };

  return (
    <div className="w-full py-[4rem] flex flex-col gap-[0.5rem]">
      {messages.map((message, index) => (
        <ChatBox
          key={index}
          isSender={message.isSender}
          message={message.content}
        />
      ))}

      <Footer onSubmit={handleSubmit} disabled={false} />
    </div>
  );
};

export default ChatPage;
