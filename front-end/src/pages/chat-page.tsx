import { getQuestion } from "@/apis/axios";
import ChatBox from "@/components/chat/chat-box";
import Footer from "@/components/shared/footer";
import { useState } from "react";

import dummyData from "@/lib/questionDummy.json";

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

  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      isSender: false,
      content: dummyData.answer[0],
      // "안녕하세요! 문서 작성을 도와드리겠습니다. 먼저 제목은 무엇인가요?",
    },
    {
      isSender: true,
      content: "컴퓨터 비전",
    },
    {
      isSender: false,
      content: dummyData.answer[1],
    },
    {
      isSender: true,
      content:
        "컴퓨터 비전(Computer Vision)은 컴퓨터가 이미지나 비디오 같은 시각 데이터를 인식하고 분석할 수 있도록 하는 기술입니다. 사람의 시각 시스템처럼 컴퓨터가 주변 환경을 이해하고 물체를 인식하며, 의미 있는 정보를 추출하는 것이 목표입니다. 최근 딥러닝과 같은 인공지능 기술의 발전으로 컴퓨터 비전은 크게 발전하여 자율주행, 의료 영상 분석, 산업 자동화 등 여러 분야에서 핵심적인 역할을 하고 있습니다.  컴퓨터 비전의 기본 작업은 이미지 처리에서 시작됩니다. 이미지 처리 단계에서는 원본 이미지의 품질을 높이고, 컴퓨터가 분석하기 쉽게 만드는 전처리 작업을 수행합니다. 예를 들어, 대비 조절, 노이즈 제거, 엣지 검출 등으로 이미지의 주요 특징을 부각시킵니다. 그런 다음 객체 인식(Object Recognition) 단계에서 딥러닝 모델을 통해 이미지를 분석하고, 고양이, 사람, 차량 등 특정 객체를 식별하게 됩니다. 이 과정에는 CNN(Convolutional Neural Network)과 같은 모델이 사용됩니다.  다음으로, 이미지 분할(Image Segmentation)은 이미지 속의 각 객체를 픽셀 단위로 구분하여 도로, 하늘, 사람 등을 분리합니다. 자율주행 자동차는 이 기술을 활용해 실시간으로 보행자와 차선, 다른 차량을 구분하고 안전하게 주행할 수 있습니다. 얼굴 인식(Face Recognition)은 주로 보안 및 인증 시스템에서 사용되며, 사람의 얼굴 특징을 인식하고 저장된 데이터와 비교하여 특정 인물을 식별하는 데 활용됩니다. 이 외에도 동작 및 포즈 추정(Pose Estimation) 기술은 비디오에서 사람의 움직임과 자세를 인식하는 데 사용되며, 헬스케어나 운동 분석 등에 응용됩니다. 컴퓨터 비전은 이미지 생성 기술로도 확장되었으며, GAN(Generative Adversarial Network)과 같은 모델을 통해 텍스트 설명을 바탕으로 이미지를 생성하거나, 기존 이미지를 보정할 수 있습니다.  컴퓨터 비전은 여러 산업과 일상생활에서 활용되고 있습니다. 예를 들어, 자율주행 차량은 카메라와 센서 데이터를 기반으로 도로 상황을 인식하고, 안전한 경로를 설정하여 운전할 수 있습니다. 의료 영상 분석 분야에서는 CT, MRI, 초음파 영상을 분석하여 질병을 진단하는 데 컴퓨터 비전 기술이 널리 쓰이고 있으며, 특정 병변을 자동으로 감지하거나 분석해 의료진의 진단을 지원합니다. 보안 및 감시 시스템에서는 컴퓨터 비전을 이용해 이상 행동을 감지하고, 출입 관리나 위험 상황 예측에 사용됩니다. 제조업에서도 컴퓨터 비전이 결함 검출과 품질 관리에 큰 도움을 주고 있으며, 증강 현실(AR)과 가상 현실(VR) 기술에서도 현실 세계를 인식하고 가상의 정보를 덧붙여 새로운 경험을 제공합니다.  기술적으로 컴퓨터 비전에는 CNN, YOLO, GAN과 같은 다양한 딥러닝 모델이 사용됩니다. CNN은 이미지 분류와 객체 검출에 강점을 가지고 있어 컴퓨터 비전의 핵심적인 역할을 하고 있으며, YOLO는 실시간 객체 검출을 가능하게 해 자율주행이나 영상 감시 시스템에 적합합니다. GAN은 사실적인 이미지 생성을 통해 새로운 디자인을 제안하거나 가상 시뮬레이션을 만드는 데 활용됩니다.  컴퓨터 비전에는 몇 가지 기술적 과제가 있습니다. 데이터 품질이 높아야만 정확한 분석이 가능하지만, 고해상도 데이터는 처리 속도나 연산 자원에 큰 부담을 줄 수 있습니다. 또한 자율주행과 같은 분야에서는 컴퓨터 비전의 높은 신뢰도와 안정성이 요구됩니다. 앞으로 컴퓨터 비전 기술은 더욱 발전할 것으로 예상되며, 특히 5G 네트워크와 엣지 컴퓨팅 덕분에 더욱 빠르고 안정적인 실시간 처리 환경이 조성될 것입니다. 컴퓨터 비전은 이제 단순한 인식 작업을 넘어 인간의 시각적 능력을 뛰어넘어 정밀한 분석과 예측까지 가능하게 하여, 앞으로의 기술 발전과 혁신을 이끌 중요한 요소로 자리 잡고 있습니다.",
    },
    {
      isSender: false,
      content: dummyData.answer[2],
    },
    {
      isSender: true,
      content: "보고서 형식으로",
    },
    {
      isSender: false,
      content: dummyData.answer[3],
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
  const handleOpenPdf = () => {
    window.open("../assets/result.pdf", "_blank");
  };

  return (
    <div className="w-full pt-[6rem] pb-[7.5rem] flex flex-col gap-[1rem]">
      {messages.map((message, index) => {
        const isGeneateAvailable =
          index === messages.length - 1 && index !== 0 && !message.isSender;

        return (
          <ChatBox
            key={index}
            isSender={message.isSender}
            message={message.content}
            isGeneateAvailable={isGeneateAvailable}
            onGenerateClick={handleOpenPdf}
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
