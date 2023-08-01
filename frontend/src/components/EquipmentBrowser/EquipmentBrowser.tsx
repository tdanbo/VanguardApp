import * as Constants from "../../Constants";
import CategoryButton from "./CategoryButton";

import { useState, useEffect } from "react";

import axios from "axios";

type Character = {
  title: string;
  description: string;
};

interface CharacterProps {
  open: boolean;
  onClose: () => void;
}

function EquipmentBrowser({ open, onClose }: CharacterProps) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          zIndex: "1000",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          backgroundColor: "rgba(0,0,0,0.75)",
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: Constants.DARK,
          padding: "25px",
          zIndex: "1000",
          borderRadius: "10px",
        }}
      >
        <form className="d-grid gap-2">
          <div className="flex">
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
          </div>
          <div className="flex">
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
            <CategoryButton category="Equipment" />
          </div>
        </form>
      </div>
    </>
  );
}

export default EquipmentBrowser;
