import { SkillSourceType } from '../types/skill-source.type';
import { TimeUnitType } from '../types/time-unit.type';
import { SkillProject } from './skill-project';

export interface ISkill {
  name: string;
  skillSource: SkillSourceType;
  experienceDuration: number;
  experienceTimeUnit: TimeUnitType;
  skillLevel: number;
  skillProject: SkillProject[];
}
