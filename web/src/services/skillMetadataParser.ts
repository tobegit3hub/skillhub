/**
 * YAML Front Matter parser for SKILL.md files
 * Extracts metadata from the --- delimited section at the beginning of files
 */

export interface SkillMetadata {
  name: string
  description: string
}

/**
 * Parse YAML front matter from a markdown file content
 * Expected format:
 * ---
 * name: skill-name
 * description: skill description
 * ---
 *
 * @param content - File content string
 * @returns Parsed metadata or null if parsing fails
 */
export function parseSkillMetadata(content: string): SkillMetadata | null {
  try {
    // Check if content starts with ---
    if (!content.startsWith('---')) {
      return null
    }

    // Find the closing ---
    const secondDelimiterIndex = content.indexOf('---', 3)
    if (secondDelimiterIndex === -1) {
      return null
    }

    // Extract the YAML content between delimiters
    const yamlContent = content.substring(3, secondDelimiterIndex).trim()

    // Parse YAML manually (simple key: value parser)
    const lines = yamlContent.split('\n')
    const metadata: Record<string, string> = {}

    for (const line of lines) {
      const colonIndex = line.indexOf(':')
      if (colonIndex === -1) continue

      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      metadata[key] = value
    }

    if (!metadata.name || !metadata.description) {
      return null
    }

    return {
      name: metadata.name,
      description: metadata.description
    }
  } catch (error) {
    console.warn('Error parsing skill metadata:', error)
    return null
  }
}

/**
 * Fetch SKILL.md content from a specific skill directory
 * @param skillPath - Path to the skill directory (e.g., "/vibe-working-skills/double-check-article")
 * @returns SKILL.md content or null if fetch fails
 */
export async function fetchSkillMarkdown(skillPath: string): Promise<string | null> {
  try {
    const skillMdPath = `${skillPath}/SKILL.md`
    const response = await fetch(skillMdPath)
    if (!response.ok) {
      console.warn(`Failed to fetch SKILL.md from ${skillMdPath}`)
      return null
    }
    return response.text()
  } catch (error) {
    console.warn(`Error fetching SKILL.md from ${skillPath}:`, error)
    return null
  }
}

/**
 * Get skill metadata from SKILL.md file
 * @param skillPath - Path to the skill directory
 * @returns Parsed skill metadata or null if not found
 */
export async function getSkillMetadata(skillPath: string): Promise<SkillMetadata | null> {
  const content = await fetchSkillMarkdown(skillPath)
  if (!content) {
    return null
  }
  return parseSkillMetadata(content)
}
