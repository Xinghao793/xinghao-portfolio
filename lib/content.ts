import profileData from "@/content/profile.json";
import experienceData from "@/content/experience.json";
import skillsData from "@/content/skills.json";
import awardsData from "@/content/awards.json";
import journalsData from "@/content/journals.json";

export type Profile = typeof profileData;
export type Experience = (typeof experienceData)[number];
export type SkillGroup = (typeof skillsData)[number];
export type Award = (typeof awardsData)[number];

export interface JournalEntry {
  id: string;
  date: string;
  type: "daily" | "weekly" | "summary";
  title: string;
  event: string;
  eventSummary: string;
  tags: string[];
  summary: string;
  paragraphs: string[];
}

export const profile = profileData as Profile;
export const experience = experienceData as Experience[];
export const skills = skillsData as SkillGroup[];
export const awards = awardsData as Award[];
export const journals = journalsData as JournalEntry[];

export function formatDate(date: string): string {
  return date.replaceAll("-", ".");
}

export function getJournalBySlug(slug: string): JournalEntry | undefined {
  return journals.find((j) => j.id === slug);
}

export function getJournalNeighbors(slug: string) {
  const index = journals.findIndex((j) => j.id === slug);
  return {
    prev: index > 0 ? journals[index - 1] : undefined,
    next: index >= 0 && index < journals.length - 1 ? journals[index + 1] : undefined
  };
}

export function journalTagPool(entries: JournalEntry[]): string[] {
  const set = new Set<string>();
  entries.forEach((j) => j.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}
