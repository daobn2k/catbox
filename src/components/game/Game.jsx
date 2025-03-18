import UnityGame from "../UnityGame/UnityGame";
import Wrapper from "./Wrapper";

function Game() {
  return (
    <div className="flex justify-center h-full flex-col relative max-h-screen overflow-y-auto">
      <Wrapper>
        <UnityGame />
      </Wrapper>
    </div>
  );
}

export default Game;
