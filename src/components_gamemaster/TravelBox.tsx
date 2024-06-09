import {
  faAngleLeft,
  faAngleRight,
  faHorse,
  faPersonWalking,
  faTent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forEach } from "lodash";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import * as Constants from "../Constants";
import {
  CombatEntry,
  NewCharacterEntry,
  SessionEntry,
  TravelEntry,
} from "../Types";
import {
  ButtonContainer,
  CenterContainer,
  LargeCircleButton,
  MainContainer,
  Title,
} from "../components_general/SelectorStyles";
import { GetBurnRate } from "../functions/RulesFunctions";
import { update_session } from "../functions/SessionsFunctions";
export const ModalContainer = styled.div`
  background-color: ${Constants.BACKGROUND};
  border: 1px solid ${Constants.WIDGET_BORDER};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);

  margin-bottom: 10px;
  overflow: auto;
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};

  scrollbar-width: none !important;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ResourceChangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  border-radius: ${Constants.BORDER_RADIUS};
  padding: 15px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
`;

const Column = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const TravelButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const TravelRightButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-width: 50%;
  max-width: 50%;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  cursor: pointer;
`;

const TravelLeftButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-left: 1px solid ${Constants.WIDGET_BORDER};
  border-top-left-radius: ${Constants.BORDER_RADIUS};
  border-bottom-left-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${Constants.WIDGET_GAB};
`;

interface StyledButtonProps {
  $isactive: string;
}

const Button = styled.div<StyledButtonProps>`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;

  ${(props) =>
    props.$isactive === "true" &&
    `
      background-color: ${Constants.WIDGET_BACKGROUND};
      color: ${Constants.WIDGET_SECONDARY_FONT};
    `}
`;

const ResultButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;
`;

const EtaButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;
`;

const EtaInput = styled.input`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border: 1px solid ${Constants.WIDGET_BORDER};
  border-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const TooltipButton = styled.div`
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  font-size: 11px;
`;

type DifficultyProps = {
  color: string;
  opacity: number;
};

const EmptyDifficulty = styled.div<DifficultyProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  height: 100%;
`;

const FilledDifficulty = styled.div<DifficultyProps>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${(props) => props.color};
  opacity: ${(props) => props.opacity};
  height: 100%;
`;

const DifficultyRatio = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  bordert: 1px solid ${Constants.WIDGET_BORDER};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  height: 100%;
  width: 20px;
`;

interface TravelBoxProps {
  session: SessionEntry;
  websocket: Socket;
}

function TravelBox({ session, websocket }: TravelBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState<string>("A normal days of travel.");
  const NoTravelSpeed = "The party didn't travel during the day.";
  const NormalSpeed = "A normal days of travel.";
  const ForcedSpeed = "No natural healing will occur while traveling.";
  const DeathSpeed =
    "Strong test or suffer 1d6+1 damage. Failing on a 20 will kill the character.";
  const [distanceTraveled, setDistanceTraveled] = useState<number>(0);
  const [travelMethod, setTravelMethod] = useState<string>("Normal March");
  const [travelTerrain, setTravelTerrain] = useState<string>("Easy Terrain");
  const [travelLocation, setTravelLocation] = useState<string>("Ambria");

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    let distance = 0;
    if (travelMethod === "Normal March") {
      setTooltip(NormalSpeed);
      if (travelLocation === "Ambria") {
        distance = 20;
      } else if (travelLocation === "Bright / Wild") {
        distance = 20;
      } else if (travelLocation === "Dark") {
        distance = 10;
      }
    } else if (travelMethod === "Forced March") {
      setTooltip(ForcedSpeed);
      if (travelLocation === "Ambria") {
        distance = 40;
      } else if (travelLocation === "Bright / Wild") {
        distance = 30;
      } else if (travelLocation === "Dark") {
        distance = 15;
      }
    } else if (travelMethod === "Death March") {
      setTooltip(DeathSpeed);
      if (travelLocation === "Ambria") {
        distance = 60;
      } else if (travelLocation === "Bright / Wild") {
        distance = 40;
      } else if (travelLocation === "Dark") {
        distance = 20;
      }
    } else if (travelMethod === "Normal Ride") {
      if (travelLocation === "Ambria") {
        distance = 40;
      } else if (travelLocation === "Bright / Wild") {
        distance = 30;
      } else if (travelLocation === "Dark") {
        distance = 10;
      }
    } else if (travelMethod === "Forced Ride") {
      setTooltip(ForcedSpeed);
      if (travelLocation === "Ambria") {
        distance = 60;
      } else if (travelLocation === "Bright / Wild") {
        distance = 45;
      } else if (travelLocation === "Dark") {
        distance = 15;
      }
    } else if (travelMethod === "Death Ride") {
      setTooltip(DeathSpeed);
      if (travelLocation === "Ambria") {
        distance = 70;
      } else if (travelLocation === "Bright / Wild") {
        distance = 50;
      } else if (travelLocation === "Dark") {
        distance = 20;
      }
    }

    if (travelTerrain === "Easy Terrain") {
      distance += 10;
    } else if (travelTerrain === "Hard Terrain") {
      distance -= 5;
    }

    if (travelMethod === "No Travel") {
      setTooltip(NoTravelSpeed);
      distance = 0;
    }

    setDistanceTraveled(distance);
  }, [travelMethod, travelTerrain, travelLocation]);

  const handleAccept = async (forward: boolean) => {
    const weather = [
      "RAINY",
      "CLEAR",
      "CLOUDY",
      "STORMY",
      "WINDY",
      "SNOWY",
      "FOGGY",
    ];

    const randomWeather = (): string => {
      const randomIndex = Math.floor(Math.random() * weather.length);
      return weather[randomIndex];
    };

    let newday = session.travel.day;
    if (forward) {
      newday += 1;
    } else {
      newday -= 1;
    }

    let newdistance = session.travel.distance;
    if (forward) {
      newdistance -= distanceTraveled;
    } else {
      newdistance += distanceTraveled;
    }

    if (newdistance < 0) {
      newdistance = 0;
    }

    const travelEntry: TravelEntry = {
      day: newday,
      time: "morning",
      weather: randomWeather(),
      distance: newdistance,
      damage_gain: 0,
      corruption_gain: 0,
    };

    session.travel = travelEntry;

    forEach(session.characters, (character) => {
      if (distanceTraveled > 0) {
        character.details.xp_earned += 5;
      }

      const burnrate = GetBurnRate(character);
      if (character.rations.food >= burnrate) {
        character.rations.food -= burnrate;
        if (character.health.damage > 0) {
          character.health.damage -= 1;
        }
      }

      if (character.rations.water >= burnrate) {
        character.rations.water -= burnrate;
        character.health.shield = 0;
      }
    });

    const resting_combat: CombatEntry = {
      character: NewCharacterEntry,
      roll_type: "resting",
      roll_source: "Resting",
      roll_state: "",
      roll_entry: {
        result1: 0,
        result2: 0,
        roll1: 0,
        roll2: 0,
        advantage: "",
        critical: { state: 1, result: 0 },
        mod: 0,
        target: 0,
        success: true,
        dice: 0,
      },
      durability: [],
      uuid: uuidv4(),
      entry: "CombatEntry",
    };

    session.combatlog.push(resting_combat);
    session.combatlog = session.combatlog.slice(-20);

    update_session(session, websocket, NewCharacterEntry, false);
    handleClose();
  };

  const [newDestination, setNewDestination] = useState<number>(0);

  const handleChangeDestination = async () => {
    session.travel.distance = newDestination * 20;

    update_session(session, websocket, NewCharacterEntry, false);
    handleClose();
  };

  const FightDifficulty = (): number => {
    let group_xp = 0;
    let enemy_xp = 0;

    for (const character of session.characters) {
      group_xp += character.details.xp_earned;
    }

    for (const creature of session.encounter) {
      enemy_xp += creature.details.xp_earned;
    }

    const ratio = (group_xp > 0 ? enemy_xp / group_xp : Infinity) * 12;
    return Math.round(ratio);
  };

  const DifficultyColor = (index: number): string => {
    if (index <= 9) {
      return Constants.COLOR_4;
    } else if (index < 20) {
      return Constants.COLOR_5;
    } else {
      return Constants.COLOR_1;
    }
  };

  const difficulty = FightDifficulty();

  return (
    <>
      <Container onClick={handleOpen}>
        <TravelLeftButton>
          {session.travel.weather.toUpperCase()}{" "}
          {session.travel.time.toUpperCase()}
        </TravelLeftButton>
        <Divider />
        <TravelButton>DAY {session.travel.day}</TravelButton>
        <Divider />
        {/* <TravelButton>ETA {session.travel.distance} KM</TravelButton> */}
        <TravelRightButton>
          {Array.from({ length: 30 }).map((_, index) => {
            if (index < difficulty) {
              return (
                <FilledDifficulty
                  key={index}
                  color={DifficultyColor(index)}
                  opacity={1.0}
                ></FilledDifficulty>
              );
            } else
              return (
                <EmptyDifficulty
                  color={DifficultyColor(index)}
                  opacity={0.25}
                ></EmptyDifficulty>
              );
          })}
          <DifficultyRatio>{Math.round(difficulty)}</DifficultyRatio>
        </TravelRightButton>
      </Container>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
            <Title>Day Change</Title>
            <ModalContainer>
              <CenterContainer>
                <ResourceChangeContainer>
                  <EtaInput
                    type="number"
                    onChange={(e) => setNewDestination(e.target.valueAsNumber)}
                    placeholder="Squares to travel"
                  ></EtaInput>
                  <EtaButton onClick={() => handleChangeDestination()}>
                    Change Destination
                  </EtaButton>
                </ResourceChangeContainer>
                <ResourceChangeContainer>
                  <Button
                    onClick={() => setTravelMethod("No Travel")}
                    $isactive={(travelMethod === "No Travel").toString()}
                  >
                    <FontAwesomeIcon icon={faTent} />
                    No Travel
                  </Button>
                </ResourceChangeContainer>
                <ResourceChangeContainer>
                  <Column>
                    <Button
                      onClick={() => setTravelMethod("Normal March")}
                      $isactive={(travelMethod === "Normal March").toString()}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Normal
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Forced March")}
                      $isactive={(travelMethod === "Forced March").toString()}
                      title={ForcedSpeed}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Forced
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Death March")}
                      $isactive={(travelMethod === "Death March").toString()}
                      title={DeathSpeed}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Death
                    </Button>
                  </Column>
                  <Column>
                    <Button
                      onClick={() => setTravelMethod("Normal Ride")}
                      $isactive={(travelMethod === "Normal Ride").toString()}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Normal
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Forced Ride")}
                      $isactive={(travelMethod === "Forced Ride").toString()}
                      title={ForcedSpeed}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Forced
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Death Ride")}
                      $isactive={(travelMethod === "Death Ride").toString()}
                      title={DeathSpeed}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Death
                    </Button>
                  </Column>
                </ResourceChangeContainer>
                {
                  travelMethod !== "No Travel" ? (
                    <>
                      <ResourceChangeContainer>
                        <Button
                          onClick={() => setTravelTerrain("Easy Terrain")}
                          $isactive={(
                            travelTerrain === "Easy Terrain"
                          ).toString()}
                        >
                          Easy Terrain
                        </Button>
                        <Button
                          onClick={() => setTravelTerrain("Normal Terrain")}
                          $isactive={(
                            travelTerrain === "Normal Terrain"
                          ).toString()}
                        >
                          Normal Terrain
                        </Button>
                        <Button
                          onClick={() => setTravelTerrain("Hard Terrain")}
                          $isactive={(
                            travelTerrain === "Hard Terrain"
                          ).toString()}
                        >
                          Hard Terrain
                        </Button>
                      </ResourceChangeContainer>
                      <ResourceChangeContainer>
                        <Button
                          onClick={() => setTravelLocation("Ambria")}
                          $isactive={(travelLocation === "Ambria").toString()}
                        >
                          Ambria
                        </Button>
                        <Button
                          onClick={() => setTravelLocation("Bright / Wild")}
                          $isactive={(
                            travelLocation === "Bright / Wild"
                          ).toString()}
                        >
                          Bright / Wild
                        </Button>
                        <Button
                          onClick={() => setTravelLocation("Dark")}
                          $isactive={(travelLocation === "Dark").toString()}
                        >
                          Dark
                        </Button>
                      </ResourceChangeContainer>
                    </>
                  ) : null // Render nothing when travelMethod is "No Travel"
                }
                <ResourceChangeContainer>
                  <Column>
                    <ResultButton>{distanceTraveled} km</ResultButton>
                    <TooltipButton>{tooltip}</TooltipButton>
                  </Column>
                </ResourceChangeContainer>
              </CenterContainer>
              <Divider />
            </ModalContainer>
            <ButtonContainer>
              <LargeCircleButton onClick={() => handleAccept(false)}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LargeCircleButton>
              <LargeCircleButton onClick={() => handleAccept(true)}>
                <FontAwesomeIcon icon={faAngleRight} />
              </LargeCircleButton>
            </ButtonContainer>
          </MainContainer>
        </Overlay>
      )}
    </>
  );
}

export default TravelBox;
