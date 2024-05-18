import {
  BsArrow90DegLeft,
  BsArrow90DegRight,
  BsArrowUp,
  BsArrowUpLeft,
  BsArrowUpRight,
} from "react-icons/bs";
import { FaRegCirclePlay } from "react-icons/fa6";
import { LuGoal } from "react-icons/lu";
import {
  MdOutlineRoundaboutLeft,
  MdTurnSlightLeft,
  MdTurnSlightRight,
} from "react-icons/md";
import { RiArrowTurnBackFill } from "react-icons/ri";
import {
  TbArrowRoundaboutRight,
  TbArrowSharpTurnLeft,
  TbArrowSharpTurnRight,
} from "react-icons/tb";

const types = [
  BsArrow90DegLeft,
  BsArrow90DegRight,
  TbArrowSharpTurnLeft,
  TbArrowSharpTurnRight,
  MdTurnSlightLeft,
  MdTurnSlightRight,
  BsArrowUp,
  MdOutlineRoundaboutLeft,
  TbArrowRoundaboutRight,
  RiArrowTurnBackFill,
  LuGoal,
  FaRegCirclePlay,
  BsArrowUpLeft,
  BsArrowUpRight,
];
const instructionText = [
  "Left",
  "Right",
  "Sharp left",
  "Sharp right",
  "Slight left",
  "Slight right",
  "Straight",
  "Enter roundabout",
  "Exit roundabout",
  "U-turn",
  "Goal",
  "Depart",
  "Keep left",
  "Keep right",
];
export const getInstructionByType = (type: number) => {
  const Instruction = types[type];
  return { Instruction, instructionText: instructionText[type] };
};
