import * as Constants from "../Constants";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmptyCharacter, SessionEntry, TravelEntry } from "../Types";
import { useRoll } from "../functions/CombatFunctions";
import { update_session } from "../functions/SessionsFunctions";
import {
  faAngleLeft,
  faAngleRight,
  faPersonWalking,
  faHorse,
  faTent,
} from "@fortawesome/free-solid-svg-icons";
import {
  MainContainer,
  Title,
  CenterContainer,
  LargeCircleButton,
  ButtonContainer,
} from "../components/SelectorPage/SelectorStyles";
import { forEach } from "lodash";
import { GetBurnRate } from "../functions/CharacterFunctions";
import styled from "styled-components";
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
  margin-right: 20px;
  margin-top: 10px;
  height: 37px;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-top: 1px solid ${Constants.WIDGET_BORDER};
  border-bottom: 1px solid ${Constants.WIDGET_BORDER};
  border-right: 1px solid ${Constants.WIDGET_BORDER};
  border-top-right-radius: ${Constants.BORDER_RADIUS};
  border-bottom-right-radius: ${Constants.BORDER_RADIUS};
  color: ${Constants.WIDGET_SECONDARY_FONT};
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
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

interface TravelBoxProps {
  session: SessionEntry;
  websocket: WebSocket;
}

function TravelBox({ session, websocket }: TravelBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeOfDay, setTimeOfday] = useState<string>();
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

  useEffect(() => {
    const determineTimeOfDay = () => {
      const hour = session.travel.time;
      if (hour >= 5 && hour < 12) {
        return "MORNING";
      } else if (hour >= 12 && hour < 14) {
        return "NOON";
      } else if (hour >= 14 && hour < 17) {
        return "AFTERNOON";
      } else if (hour >= 17 && hour < 20) {
        return "EVENING";
      } else {
        return "NIGHT";
      }
    };

    setTimeOfday(determineTimeOfDay());
  }, [session.travel.time]);

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
      time: 6,
      weather: randomWeather(),
      distance: newdistance,
    };

    session.travel = travelEntry;

    forEach(session.characters, (character) => {
      if (distanceTraveled > 0) {
        character.details.xp_earned += 1;
      }

      const burnrate = GetBurnRate(character);
      if (character.rations.food >= burnrate) {
        character.rations.food -= burnrate;
        if (character.damage > 0) {
          character.damage -= 1;
        }
      }

      if (character.rations.water >= burnrate) {
        character.rations.water -= burnrate;
        character.corruption.temporary = 0;
      }
    });

    update_session(session, EmptyCharacter, false, websocket);

    const onRollDice = useRoll(); // Moved this outside the HandleRest function

    // Using the handleRoll function here doesn't make much sense unless you are planning to call this function somewhere else.
    // Otherwise, you can directly call onRollDice with the required parameters.
    const handleRoll = () => {
      onRollDice({
        websocket,
        session,
        character: EmptyCharacter,
        dice: 20,
        modifier: 20,
        count: 0,
        target: 0,
        source: EmptyCharacter.name,
        active: "Resting",
        add_mod: false,
        isCreature: false,
      });
    };

    handleRoll(); // If you wish to execute the roll immediately after updating the character
    handleClose();
  };

  const [newDestination, setNewDestination] = useState<number>(0);

  const handleChangeDestination = async () => {
    session.travel.distance = newDestination * 20;

    update_session(session, EmptyCharacter, false, websocket);
    handleClose();
  };

  return (
    <>
      <Container onClick={handleOpen}>
        <TravelLeftButton>
          {session.travel.weather.toUpperCase()} {timeOfDay}
        </TravelLeftButton>
        <Divider />
        <TravelButton>{session.travel.time}:00</TravelButton>
        <Divider />

        <TravelButton>DAY {session.travel.day}</TravelButton>
        <Divider />
        <TravelRightButton>ETA {session.travel.distance} KM</TravelRightButton>
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
