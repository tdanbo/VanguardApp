import {
  faAngleLeft,
  faCarrot,
  faCrosshairs,
  faEye,
  faHeartBroken,
  faPersonRunning,
  faShield,
  faSkull,
  faUser,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import * as Constants from "../Constants";
import { ActivesEntry, CharacterEntry } from "../Types";
import {
  GetAbilityCorruption,
  GetEquipmentCorruption,
  GetImpedingValue,
  GetPreciseValue,
  GetStorageValue,
  OverburdenValue,
} from "../functions/RulesFunctions";
import { toTitleCase } from "../functions/UtilityFunctions";
const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  font-weight: bold;
  color: ${Constants.WIDGET_SECONDARY_FONT};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: ${Constants.BORDER_RADIUS};
  width: 25px;
  height: 25px;
  margin: 2px;
  padding-bottom: 2px;
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
const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  height: 20px;
  min-width: 1px;

  background-color: #2c2f33;
`;

import {
  ButtonContainer,
  CenterContainer,
  Divider,
  LargeCircleButton,
  ModalContainer,
  Title,
} from "../components_general/SelectorStyles";
import { GetGameData } from "../contexts/GameContent";

export const MainContainer = styled.div`
  display: flex;
  min-width: 50%;
  flex-direction: column;
  justify-content: center;
  margin: 100px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  gap: 5px;

  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const LeftValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  gap: 5px;
  margin: 10px;
  min-width: 50%;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

const RightValue = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  margin: 10px;
  min-width: 50%;
  color: ${Constants.WIDGET_SECONDARY_FONT};
`;

interface InfoComponentProps {
  character: CharacterEntry;
  actives: ActivesEntry;
}

function InfoComponent({ character, actives }: InfoComponentProps) {
  const { abilities, equipment } = GetGameData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <InfoBox onClick={handleOpen}>
        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
      </InfoBox>
      {isModalOpen && (
        <Overlay onClick={handleClose}>
          <MainContainer onClick={stopPropagation}>
            <Title>{character.name}</Title>
            <ModalContainer>
              <CenterContainer>
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faPersonRunning}
                      color={Constants.GREEN}
                    ></FontAwesomeIcon>
                    Speed
                  </Row>
                  <Row>
                    <LeftValue>
                      ( 5 + Quick Stat - Impeding Value - Overburden ) / 2 = ⌈
                      Speed ⌉
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      ( 5 + {character.stats.quick.value} -{" "}
                      {GetImpedingValue(character, equipment)} -{" "}
                      {OverburdenValue(character, equipment)} ) / 2 = ⌈{" "}
                      {(5 +
                        character.stats.quick.value -
                        GetImpedingValue(character, equipment) -
                        OverburdenValue(character, equipment)) /
                        2}{" "}
                      ⌉
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faHeartBroken}
                      color={Constants.BRIGHT_RED}
                    ></FontAwesomeIcon>
                    Pain Threshold
                  </Row>
                  <Row>
                    <LeftValue>Strong Stat / 2 = ⌈ Pain Threshold ⌉</LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {character.stats.strong.value} / 2 = ⌈{" "}
                      {character.stats.strong.value / 2} ⌉
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faWeightHanging}
                      color={Constants.BRIGHT_YELLOW}
                    ></FontAwesomeIcon>
                    Max Capacity
                  </Row>
                  <Row>
                    <LeftValue>
                      ( Strong Stat + Resolute Stat ) / 2 = ⌈ Max Capacity ⌉
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      ( {character.stats.strong.value} +
                      {character.stats.resolute.value} ) / 2 = ⌈{" "}
                      {(character.stats.strong.value +
                        character.stats.resolute.value) /
                        2}{" "}
                      ⌉
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faCarrot}
                      color={Constants.ORANGE}
                    ></FontAwesomeIcon>
                    Consumption
                  </Row>
                  <Row>
                    <LeftValue>
                      ( XP Earned / 50 ) + ( Storage Value / 3 ) = ⌈ Consumption
                      ⌉
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      ( {character.details.xp_earned} / 50 ) + ({" "}
                      {GetStorageValue(character, equipment)} / 3 ) = ⌈{" "}
                      {character.details.xp_earned / 50 +
                        GetStorageValue(character, equipment) / 3}{" "}
                      ⌉
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faCrosshairs}
                      color={Constants.BRIGHT_RED}
                    ></FontAwesomeIcon>
                    Attack
                  </Row>
                  <Row>
                    <LeftValue>
                      {toTitleCase(actives.attack.stat)} Stat + Precise
                      Qualities = Attack
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {actives.attack.value} +{" "}
                      {GetPreciseValue(character, equipment)} ={" "}
                      {actives.attack.value +
                        GetPreciseValue(character, equipment)}
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faShield}
                      color={Constants.BLUE}
                    ></FontAwesomeIcon>
                    Defense
                  </Row>
                  <Row>
                    <LeftValue>
                      {toTitleCase(actives.defense.stat)} Stat - Impeding Value
                      = Defense
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {actives.defense.value} -{" "}
                      {GetImpedingValue(character, equipment)} ={" "}
                      {actives.defense.value -
                        GetImpedingValue(character, equipment)}
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faEye}
                      color={Constants.GREEN}
                    ></FontAwesomeIcon>
                    Sneaking
                  </Row>
                  <Row>
                    <LeftValue>
                      {toTitleCase(actives.sneaking.stat)} Stat - Impeding Value
                      = Sneaking
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {actives.sneaking.value} -{" "}
                      {GetImpedingValue(character, equipment)} ={" "}
                      {actives.sneaking.value -
                        GetImpedingValue(character, equipment)}
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faSkull}
                      color={Constants.PURPLE}
                    ></FontAwesomeIcon>
                    Casting
                  </Row>
                  <Row>
                    <LeftValue>
                      {toTitleCase(actives.casting.stat)} Stat - Impeding Value
                      = Casting
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {actives.casting.value} -{" "}
                      {GetImpedingValue(character, equipment)} ={" "}
                      {actives.casting.value -
                        GetImpedingValue(character, equipment)}
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faSkull}
                      color={Constants.PURPLE}
                    ></FontAwesomeIcon>
                    Max Temporary Corruption
                  </Row>
                  <Row>
                    <LeftValue>
                      Resolute Stat / 2 = ⌈ Temporary Corruption ⌉
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      {character.stats.resolute.value} / 2 = ⌈{" "}
                      {character.stats.resolute.value / 2} ⌉
                    </RightValue>
                  </Row>
                </Column>
                <Divider />
                <Column>
                  <Row>
                    <FontAwesomeIcon
                      icon={faSkull}
                      color={Constants.PURPLE}
                    ></FontAwesomeIcon>
                    Max Permanent Corruption
                  </Row>
                  <Row>
                    <LeftValue>
                      ( Temporary Corruption * 3 ) - Uniques - Mystical Powers =
                      Permanent Corruption
                    </LeftValue>
                    <VerticalDivider></VerticalDivider>
                    <RightValue>
                      ( {character.stats.resolute.value / 2} * 3 ) -{" "}
                      {GetEquipmentCorruption(character, equipment)} -{" "}
                      {GetAbilityCorruption(character, abilities)} ={" "}
                      {(character.stats.resolute.value / 2) * 3 -
                        GetEquipmentCorruption(character, equipment) -
                        GetAbilityCorruption(character, abilities)}
                    </RightValue>
                  </Row>
                </Column>

                <Divider />
              </CenterContainer>
              <Divider />
            </ModalContainer>
            <ButtonContainer>
              <LargeCircleButton onClick={handleClose}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </LargeCircleButton>
            </ButtonContainer>
          </MainContainer>
        </Overlay>
      )}
    </>
  );
}

export default InfoComponent;
