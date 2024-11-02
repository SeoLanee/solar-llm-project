import { getQuestion } from "@/apis/axios";
import ChatBox from "@/components/chat/chat-box";
import Footer from "@/components/shared/footer";
import { useState } from "react";

export interface Message {
  isSender: boolean;
  content: string;
}

const ChatPage = () => {
  //처음에 들어오면 첫 질문 get 요청, 오기전까지 disabled

  // const query = useQuery({
  //   queryKey: ["get-first-question"],
  //   queryFn: () => true,
  // });

  // const mutation = useMutation({
  //   mutationKey: ["answer-question"],
  //   mutationFn: (answer: string) => temp(answer),
  // });

  // const handleDeleteClick = (answer: string) => {
  //   mutation.mutate(answer);
  // };
  const [index, setIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      isSender: false,
      content:
        "안녕하세요! 문서 작성을 도와드리겠습니다. 먼저 제목은 무엇인가요?",
    },
    {
      isSender: true,
      content: "컴퓨터 비전과 딥러닝의 응용",
    },
    {
      isSender: false,
      content: "좋습니다. 주제에 대해 간단히 설명해 주시겠어요?",
    },
    {
      isSender: true,
      content:
        "컴퓨터 비전과 딥러닝 기술을 이용한 이미지 인식과 분류에 관한 내용입니다.",
    },
    {
      isSender: false,
      content: "좋아요. 이 문서의 주요 목표는 무엇인가요?",
    },
  ]);
  const handleAddMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  const handleSubmit = async (message: Message) => {
    setIsLoading(true);
    try {
      const response = await getQuestion(message.content);

      // const currentMessage = {
      //   isSender: true,
      //   content: message.content,
      // };

      const newMessage: Message = {
        isSender: false,
        content: response.data,
      };

      setMessages([...messages, newMessage]);
    } catch {
      alert("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full pt-[6rem] pb-[7.5rem] flex flex-col gap-[0.5rem]">
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

      <Footer
        onSubmit={handleSubmit}
        onAddMessage={handleAddMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatPage;
