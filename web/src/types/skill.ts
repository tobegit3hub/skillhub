export interface Skill {
  name: string
  description: string
  path: string
}

export interface Plugin {
  name: string
  description: string
  source: string
  strict: boolean
  skills: string[]
  // Source marketplace directory (e.g., "vibe-working-skills")
  sourceDirectory?: string
}

export interface Owner {
  name: string
  email: string
}

export interface Metadata {
  description: string
  version: string
}

export interface Marketplace {
  name: string
  owner?: Owner
  metadata?: Metadata
  plugins: Plugin[]
  // Source marketplace directory (e.g., "vibe-working-skills")
  sourceDirectory?: string
}

// Skill card display data (parsed from SKILL.md)
export interface SkillDisplay {
  id: string
  name: string
  description: string
  category: string
  pluginName: string
  icon: string
  iconBgColor: string
  iconTextColor: string
}
