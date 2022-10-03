import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

interface Props {
  kakao: any;
  setMap: React.Dispatch<any>;
  focusMark: { x: number; y: number };
  //   mark: { name: string; x: number; y: number }[];
}

const Container = styled.div`
  width: 80vw;
  height: 92vh;
  border-radius: inherit;
`;

const path = [
  [126.4910516, 33.4921636],
  [126.490837, 33.492013],
  [126.4901739, 33.4915494],
  [126.4901857, 33.4919283],
  [126.4901941, 33.4921313],
  [126.4902166, 33.4923272],
  [126.490004, 33.4921839],
  [126.4897959, 33.4920352],
  [126.4891124, 33.491566],
  [126.4889724, 33.4914783],
  [126.4879121, 33.4908311],
  [126.487787, 33.4907579],
  [126.4872619, 33.4904659],
  [126.487141, 33.4904054],
  [126.4869152, 33.4902926],
  [126.4867279, 33.4902018],
  [126.4865225, 33.4900919],
  [126.4864743, 33.4900663],
  [126.4862849, 33.4899691],
  [126.4858248, 33.4897326],
  [126.4853711, 33.4895035],
  [126.4852866, 33.4894577],
  [126.4849616, 33.4892665],
  [126.4847125, 33.4891247],
  [126.4844249, 33.4889582],
  [126.4835851, 33.4884219],
  [126.4834868, 33.4883615],
  [126.4833425, 33.4882702],
  [126.4824865, 33.4877409],
  [126.4822119, 33.4875664],
  [126.4819618, 33.4874164],
  [126.4816519, 33.4872272],
  [126.4814275, 33.4870901],
  [126.4812747, 33.4869914],
  [126.4803116, 33.4864162],
  [126.4802763, 33.4863969],
  [126.4801212, 33.4863145],
  [126.4799821, 33.486243],
  [126.4799136, 33.4862091],
  [126.4794748, 33.4859998],
  [126.4795725, 33.4857418],
  [126.4797517, 33.4853311],
  [126.4797727, 33.4852862],
  [126.4798457, 33.485119],
  [126.4799962, 33.4847649],
  [126.4800294, 33.4846894],
  [126.4802893, 33.4840927],
  [126.4803369, 33.4839875],
  [126.4803623, 33.4839282],
  [126.4804077, 33.4838177],
  [126.4804672, 33.4837036],
  [126.4806018, 33.4834215],
  [126.4809615, 33.4826732],
  [126.4809903, 33.4825995],
  [126.4811303, 33.482229],
  [126.481188, 33.4820735],
  [126.4812396, 33.4818989],
  [126.4812778, 33.4817621],
  [126.4813175, 33.4814026],
  [126.4813799, 33.4812236],
  [126.4817585, 33.4802328],
  [126.4819827, 33.4796475],
  [126.4821262, 33.4792492],
  [126.4821796, 33.4791026],
  [126.4822118, 33.4790181],
  [126.4822218, 33.478992],
  [126.4822363, 33.4789524],
  [126.4823108, 33.4787429],
  [126.4823731, 33.478573],
  [126.4830759, 33.4766405],
  [126.4831047, 33.476565],
  [126.4831447, 33.4764598],
  [126.4831847, 33.4763555],
  [126.4831991, 33.4763159],
  [126.4832537, 33.476154],
  [126.4833051, 33.4759939],
  [126.4835801, 33.4750248],
  [126.4837699, 33.4743463],
  [126.4837969, 33.4742491],
  [126.4839917, 33.4736005],
  [126.4840613, 33.4733548],
  [126.4841762, 33.4730094],
  [126.4842119, 33.4729033],
  [126.4842815, 33.4726549],
  [126.4843328, 33.4725038],
  [126.4844476, 33.47207],
  [126.4844685, 33.4719412],
  [126.484809, 33.4698723],
  [126.4849348, 33.4698815],
  [126.4847667, 33.4709155],
  [126.4845766, 33.4720783],
  [126.4844701, 33.4725383],
  [126.4844241, 33.4727012],
  [126.4843507, 33.4729062],
  [126.4843384, 33.4729404],
  [126.4842648, 33.4731599],
  [126.4842447, 33.4732237],
  [126.4841967, 33.4733749],
  [126.4841172, 33.4736394],
  [126.4839381, 33.4742269],
  [126.4837181, 33.4750043],
  [126.4835213, 33.475726],
];

const Map2 = ({ kakao, setMap, focusMark }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleFocusMark = () => {
    const options = {
      center: new kakao.maps.LatLng(focusMark.x, focusMark.y),
      level: 3,
    };
    setMap(new kakao.maps.Map(ref.current, options));
  };
  useEffect(() => {
    if (kakao && kakao.maps) handleFocusMark();
  }, [kakao]);

  return (
    <Container id="map" ref={ref}>

  </Container>
  );
};

export default Map2;