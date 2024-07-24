import styled from "styled-components";
import { AdvantageType, CharacterEntry, SessionEntry } from "../Types";
import AbilitySection from "../components_character/AbilitySection";
import EffectControlSection from "../components_character/EffectControlSection";
import CharacterNameBox from "../components_cleanup/CharacterNameComponent";
import DetailStatComponent from "../components_cleanup/DetailStatComponent";
import { CheckAbility } from "../functions/ActivesFunction";
import { getCharacterXp, getUtilityXp } from "../functions/CharacterFunctions";
import StatComponent from "../components_cleanup/StatComponent";
import ModifierLockComponent from "../components_cleanup/ModifierLockComponent";
import { DisplayType } from "../Types";

import * as Constants from "../Constants";

const DynamicContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  gap: ${Constants.WIDGET_GAB};
  height: 0px; /* or another fixed value */
  width: 100%;
`;

import { Socket } from "socket.io-client";

import CorruptionStatComponent from "../components_character/CorruptionStatComponent";
import HealthStatComponent from "../components_character/HealthStatComponent";
import PortraitComponent from "../components_character/PortraitComponent";
import UpdateAbilityStats from "../functions/rules/UpdateAbilityStats";
import EquipmentSection from "../components_character/EquipmentSection";
import { ActiveStateType, EquipAbilityType } from "../Types";
import EnergyStatComponent from "../components_character/EnergyStatComponent";
import JoinSessionComponent from "../components_browser/JoinSessionComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHatWizard, faUser } from "@fortawesome/free-solid-svg-icons";
import EffectsSection from "../components_character/EffectsSection";
type CharacterSheetProps = {
  websocket: Socket;
  session: SessionEntry;
  character: CharacterEntry;
  browserState: number;
  setBrowserState: (value: number) => void;
  inventoryState: number;
  setInventoryState: (value: number) => void;
  setSession: React.Dispatch<React.SetStateAction<SessionEntry>>;
  isGm: boolean;
  isCreature: boolean;
  advantage: AdvantageType;
  activeState: ActiveStateType;
  setAdvantage: React.Dispatch<React.SetStateAction<AdvantageType>>;
  setActiveState: React.Dispatch<React.SetStateAction<ActiveStateType>>;
  setCharacterId: React.Dispatch<React.SetStateAction<string>>;
  criticalState: boolean;
  setCriticalState: React.Dispatch<React.SetStateAction<boolean>>;
  modifierLock: boolean;
  setModifierLock: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  equipmentAbilities: EquipAbilityType;
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
  isJoined: boolean;
  setIsGm: React.Dispatch<React.SetStateAction<boolean>>;
  setLeftDisplay: React.Dispatch<React.SetStateAction<DisplayType>>;
  leftDisplay: DisplayType;
  effectAbilities: "effects" | "abilities";
  setEffectAbilities: React.Dispatch<
    React.SetStateAction<"effects" | "abilities">
  >;
};

function CharacterSheet({
  websocket,
  session,
  character,
  isCreature,
  advantage,
  activeState,
  setAdvantage,
  setActiveState,
  setCharacterId,
  criticalState,
  setCriticalState,
  modifierLock,
  setModifierLock,
  equipmentAbilities,
  setSession,
  setIsJoined,
  isJoined,
  isGm,
  setIsGm,
  setLeftDisplay,
  leftDisplay,
  effectAbilities,
  setEffectAbilities,
}: CharacterSheetProps) {
  UpdateAbilityStats(character);

  const onGmSwitch = () => {
    setIsGm((prevMode) => !prevMode);
    if (leftDisplay === "drops") {
      setLeftDisplay("inventory");
    }
  };

  return (
    <div
      className="column"
      style={{
        width: "100%",
        backgroundColor: Constants.BACKGROUND,
        height: "100%",
        gap: "10px",
      }}
    >
      <div className="grid">
        {isJoined ? (
          <div
            className="row outline_color"
            style={{ height: "50px", padding: "0px 10px" }}
          >
            <CharacterNameBox character={character} />
          </div>
        ) : (
          <div className="row" style={{ height: "50px" }}>
            <JoinSessionComponent
              setIsJoined={setIsJoined}
              setSession={setSession}
            />
          </div>
        )}
        <div className="row" style={{ height: "50px" }}>
          <div
            className="row outline_color"
            style={{ maxWidth: "35px" }}
            onClick={() => onGmSwitch()}
            title={isGm ? "Switch to Player Mode" : "Switch to GM Mode"}
          >
            <FontAwesomeIcon
              icon={isGm ? faHatWizard : faUser}
              color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
            />
          </div>
          <div className="row outline_color">
            <DetailStatComponent
              title="COMBAT XP"
              value={`${getCharacterXp(character)} / ${
                character.details.xp_earned
              }`}
            />
          </div>
          <div className="row outline_color">
            <DetailStatComponent
              title="UTILITY XP"
              value={`${getUtilityXp(character)} /
            ${Math.max(Math.round(character.details.xp_earned / 5), 10)}`}
            />
          </div>
          <ModifierLockComponent
            modifierLock={modifierLock}
            setModifierLock={setModifierLock}
          />
        </div>
      </div>
      <div className="grid">
        <div className="column">
          <PortraitComponent
            character={character}
            activeState={activeState}
            advantage={advantage}
            setActiveState={setActiveState}
            setAdvantage={setAdvantage}
            session={session}
            websocket={websocket}
            isCreature={isCreature}
            setCharacterId={setCharacterId}
            criticalState={criticalState}
            setCriticalState={setCriticalState}
          />
          <div className="row" style={{ height: "50px", marginTop: "10px" }}>
            <EnergyStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              browser={false}
            />
            <HealthStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              browser={false}
            />
            <CorruptionStatComponent
              websocket={websocket}
              session={session}
              character={character}
              isCreature={isCreature}
              browser={false}
            />
          </div>
        </div>
        <div className="column">
          <div className="row">
            <div className="column">
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"vigilant"}
                stat_value={
                  character.stats.vigilant.value + character.stats.vigilant.base
                }
                stat_modifier={character.stats.vigilant.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={false}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"strong"}
                stat_value={
                  character.stats.strong.value + character.stats.strong.base
                }
                stat_modifier={character.stats.strong.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={false}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"cunning"}
                stat_value={
                  character.stats.cunning.value + character.stats.cunning.base
                }
                stat_modifier={character.stats.cunning.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={false}
              />

              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"persuasive"}
                stat_value={
                  character.stats.persuasive.value +
                  character.stats.persuasive.base
                }
                stat_modifier={character.stats.persuasive.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={false}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"attack"}
                stat_value={
                  character.stats.attack.value + character.stats.attack.base
                }
                stat_modifier={character.stats.attack.mod}
                stat_color={Constants.TYPE_COLORS["attack"]}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={false}
              />
            </div>
            <div className="column">
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"accurate"}
                stat_value={
                  character.stats.accurate.value + character.stats.accurate.base
                }
                stat_modifier={character.stats.accurate.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                active={true}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={!CheckAbility(character, "Man-at-Arms", "master")}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"quick"}
                stat_value={
                  character.stats.quick.value + character.stats.quick.base
                }
                stat_modifier={character.stats.quick.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={!CheckAbility(character, "Man-at-Arms", "adept")}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"discreet"}
                stat_value={
                  character.stats.discreet.value + character.stats.discreet.base
                }
                stat_modifier={character.stats.discreet.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={!CheckAbility(character, "man-at-arms", "master")}
              />

              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"resolute"}
                stat_value={
                  character.stats.resolute.value + character.stats.resolute.base
                }
                stat_modifier={character.stats.resolute.mod}
                stat_color={Constants.WIDGET_SECONDARY_FONT_INACTIVE}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={!CheckAbility(character, "armored mystic", "novice")}
              />
              <StatComponent
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                stat_name={"defense"}
                stat_value={
                  character.stats.defense.value + character.stats.defense.base
                }
                stat_modifier={character.stats.defense.mod}
                stat_color={Constants.TYPE_COLORS["defense"]}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                modifierLock={modifierLock}
                impeded={!CheckAbility(character, "Man-at-Arms", "adept")}
              />
            </div>
          </div>
          <div
            className="row "
            style={{ minHeight: "50px", marginTop: "10px" }}
          >
            <EffectControlSection
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
            />
          </div>
        </div>
      </div>

      <DynamicContainer>
        {equipmentAbilities === "equipment" ? (
          <div className="scroll_container breakpoint show_over_breakpoint1">
            <EquipmentSection
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              criticalState={criticalState}
              setCriticalState={setCriticalState}
            />
          </div>
        ) : (
          <div className="scroll_container breakpoint show_over_breakpoint1">
            {effectAbilities === "abilities" ? (
              <AbilitySection
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                setEffectAbilities={setEffectAbilities}
              />
            ) : (
              <EffectsSection
                session={session}
                character={character}
                websocket={websocket}
                isCreature={isCreature}
                activeState={activeState}
                advantage={advantage}
                setActiveState={setActiveState}
                setAdvantage={setAdvantage}
                setCriticalState={setCriticalState}
                setEffectAbilities={setEffectAbilities}
              />
            )}
          </div>
        )}

        <div className="scroll_container breakpoint show_over_breakpoint2">
          {effectAbilities === "abilities" ? (
            <AbilitySection
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              setEffectAbilities={setEffectAbilities}
            />
          ) : (
            <EffectsSection
              session={session}
              character={character}
              websocket={websocket}
              isCreature={isCreature}
              activeState={activeState}
              advantage={advantage}
              setActiveState={setActiveState}
              setAdvantage={setAdvantage}
              setCriticalState={setCriticalState}
              setEffectAbilities={setEffectAbilities}
            />
          )}
        </div>
      </DynamicContainer>
    </div>
  );
}

export default CharacterSheet;
