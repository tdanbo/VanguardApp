import styled from "styled-components";
import * as Constants from "../Constants";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TravelEntry } from "../Types";
import { updateSession } from "../functions/SessionsFunctions";
import {
  faAngleLeft,
  faAngleRight,
  faPersonWalking,
  faHorse,
} from "@fortawesome/free-solid-svg-icons";
import {
  MainContainer,
  ModalContainer,
  Title,
  CenterContainer,
  Divider,
  LargeCircleButton,
  ButtonContainer,
} from "./SelectorPage/SelectorStyles";
import { update } from "lodash";

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  background-color: ${Constants.WIDGET_BACKGROUND_EMPTY};
  border-radius: ${Constants.BORDER_RADIUS};
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid ${Constants.WIDGET_BORDER};
  gap: 10px;
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

interface StyledButtonProps {
  isActive: boolean;
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
  color: ${(props) =>
    props.isActive ? Constants.WIDGET_SECONDARY_FONT : Constants.WIDGET_BORDER};
  background-color: ${(props) =>
    props.isActive
      ? Constants.WIDGET_BACKGROUND
      : Constants.WIDGET_BACKGROUND_EMPTY};
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

function TravelBox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { session, setSession } = useContext(SessionContext);
  const [timeOfDay, setTimeOfday] = useState<string>();
  const [tooltip, setTooltip] = useState<string>("A normal days of travel.");
  const ForcedSpeed = "No natural healing will occur while traveling.";
  const DeathSpeed =
    "Succeed a Strong test or suffer 1d6+1 damage. Failing on a 20 will kill the character.";
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

  const handleAccept = async () => {
    const travelEntry: TravelEntry = {
      day: session.travel.day + 1,
      time: 6,
      weather: session.travel.weather,
      distance: session.travel.distance - distanceTraveled,
    };

    const updatedSession = { ...session, travel: travelEntry };

    const newSession = await updateSession(updatedSession);
    setSession(newSession);
    handleClose();
  };

  return (
    <>
      <Container onClick={handleOpen}>
        <div>
          {session.travel.weather.toUpperCase()} {timeOfDay}
        </div>
        <div>|</div>
        <div>DAY {session.travel.day}</div>
        <div>|</div>
        <div>TIME {session.travel.time}</div>
        <div>|</div>
        <div>
          ETA {session.travel.distance} KM / {session.travel.distance / 20} DAYS
        </div>
      </Container>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
            <Title>Day Change</Title>
            <ModalContainer>
              <CenterContainer>
                <ResourceChangeContainer>
                  <Column>
                    <Button
                      onClick={() => setTravelMethod("Normal March")}
                      isActive={travelMethod === "Normal March"}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Normal
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Forced March")}
                      isActive={travelMethod === "Forced March"}
                      title={ForcedSpeed}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Forced
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Death March")}
                      isActive={travelMethod === "Death March"}
                      title={DeathSpeed}
                    >
                      <FontAwesomeIcon icon={faPersonWalking} />
                      Death
                    </Button>
                  </Column>
                  <Column>
                    <Button
                      onClick={() => setTravelMethod("Normal Ride")}
                      isActive={travelMethod === "Normal Ride"}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Normal
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Forced Ride")}
                      isActive={travelMethod === "Forced Ride"}
                      title={ForcedSpeed}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Forced
                    </Button>
                    <Button
                      onClick={() => setTravelMethod("Death Ride")}
                      isActive={travelMethod === "Death Ride"}
                      title={DeathSpeed}
                    >
                      <FontAwesomeIcon icon={faHorse} />
                      Death
                    </Button>
                  </Column>
                </ResourceChangeContainer>
                <ResourceChangeContainer>
                  <Button
                    onClick={() => setTravelTerrain("Easy Terrain")}
                    isActive={travelTerrain === "Easy Terrain"}
                  >
                    Easy Terrain
                  </Button>
                  <Button
                    onClick={() => setTravelTerrain("Normal Terrain")}
                    isActive={travelTerrain === "Normal Terrain"}
                  >
                    Normal Terrain
                  </Button>

                  <Button
                    onClick={() => setTravelTerrain("Hard Terrain")}
                    isActive={travelTerrain === "Hard Terrain"}
                  >
                    Hard Terrain
                  </Button>
                </ResourceChangeContainer>
                <ResourceChangeContainer>
                  <Button
                    onClick={() => setTravelLocation("Ambria")}
                    isActive={travelLocation === "Ambria"}
                  >
                    Ambria
                  </Button>
                  <Button
                    onClick={() => setTravelLocation("Bright / Wild")}
                    isActive={travelLocation === "Bright / Wild"}
                  >
                    Bright / Wild
                  </Button>
                  <Button
                    onClick={() => setTravelLocation("Dark")}
                    isActive={travelLocation === "Dark"}
                  >
                    Dark
                  </Button>
                </ResourceChangeContainer>
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
              <LargeCircleButton onClick={handleClose}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LargeCircleButton>
              <LargeCircleButton onClick={handleAccept}>
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
