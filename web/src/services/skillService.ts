import type { Marketplace, SkillDisplay } from '../types/skill'
import { getAllMarketplaceJsonPaths } from '../config/skillhubConfig'
import { getSkillMetadata } from './skillMetadataParser'

// Icon and color mappings for different skill categories
interface CategoryStyle {
  icon: string
  bgColor: string
  textColor: string
}

const categoryStyles = {
  check: { icon: 'fact_check', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
  article: { icon: 'article', bgColor: 'bg-green-50', textColor: 'text-green-600' },
  content: { icon: 'edit_note', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
  operation: { icon: 'campaign', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  default: { icon: 'extension', bgColor: 'bg-slate-50', textColor: 'text-slate-600' }
} as const satisfies Record<string, CategoryStyle>

function getCategoryStyle(skillName: string): { icon: string; bgColor: string; textColor: string } {
  const nameLower = skillName.toLowerCase()
  if (nameLower.includes('article') || nameLower.includes('文章')) {
    return categoryStyles.article
  }
  if (nameLower.includes('operation') || nameLower.includes('运营')) {
    return categoryStyles.operation
  }
  if (nameLower.includes('check') || nameLower.includes('检查')) {
    return categoryStyles.check
  }
  if (nameLower.includes('content') || nameLower.includes('内容')) {
    return categoryStyles.content
  }
  return categoryStyles.default
}

function getCategoryFromSkillName(skillName: string): string {
  const nameLower = skillName.toLowerCase()
  if (nameLower.includes('article') || nameLower.includes('文章')) {
    return 'Writing'
  }
  if (nameLower.includes('operation') || nameLower.includes('运营')) {
    return 'Marketing'
  }
  if (nameLower.includes('check') || nameLower.includes('检查')) {
    return 'Productivity'
  }
  if (nameLower.includes('content') || nameLower.includes('内容')) {
    return 'Content'
  }
  return 'General'
}

/**
 * Fetch marketplace data from a single source
 * @param marketplaceJsonPath - Path to marketplace.json file
 * @param sourceDirectory - The marketplace directory name (e.g., "vibe-working-skills")
 */
async function fetchMarketplaceFromSource(
  marketplaceJsonPath: string,
  sourceDirectory: string
): Promise<Marketplace | null> {
  try {
    const response = await fetch(marketplaceJsonPath)
    if (!response.ok) {
      console.warn(`Failed to fetch marketplace from ${marketplaceJsonPath}`)
      return null
    }
    const data = await response.json()
    return {
      ...data,
      sourceDirectory
    }
  } catch (error) {
    console.warn(`Error fetching marketplace from ${marketplaceJsonPath}:`, error)
    return null
  }
}

/**
 * Fetch marketplace data from all configured sources
 * Combines data from multiple marketplace directories
 */
export async function fetchMarketplace(): Promise<Marketplace> {
  const paths = await getAllMarketplaceJsonPaths()
  const config = await (await import('../config/skillhubConfig')).loadSkillhubConfig()
  const marketplaces: Marketplace[] = []

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const sourceDirectory = config.marketplaceDirectories[i]
    const marketplace = await fetchMarketplaceFromSource(path, sourceDirectory)
    if (marketplace) {
      marketplaces.push(marketplace)
    }
  }

  // Combine all marketplaces into one
  if (marketplaces.length === 0) {
    throw new Error('Failed to fetch marketplace data from all sources')
  }

  // Flatten plugins and ensure each has sourceDirectory set
  const combinedPlugins = marketplaces.flatMap(m =>
    m.plugins.map(plugin => ({
      ...plugin,
      sourceDirectory: m.sourceDirectory
    }))
  )

  return {
    name: 'combined-marketplace',
    plugins: combinedPlugins
  }
}

export async function fetchSkills(): Promise<SkillDisplay[]> {
  const marketplace = await fetchMarketplace()
  const skills: SkillDisplay[] = []

  for (const plugin of marketplace.plugins) {
    for (const skillPath of plugin.skills) {
      // Extract skill name from path (e.g., "./double-check-article" -> "double-check-article")
      const skillId = skillPath.replace('./', '')
      const style = getCategoryStyle(skillId)

      // Use plugin's sourceDirectory to construct the SKILL.md path
      let skillName = formatSkillName(skillId)
      let skillDescription = plugin.description

      // Try to fetch metadata from SKILL.md if we have source directory
      if (plugin.sourceDirectory) {
        const skillMdPath = `/${plugin.sourceDirectory}/${skillId}`
        const metadata = await getSkillMetadata(skillMdPath)
        if (metadata) {
          skillName = metadata.name
          skillDescription = metadata.description
        }
      }

      skills.push({
        id: skillId,
        name: skillName,
        description: skillDescription,
        category: getCategoryFromSkillName(skillId),
        pluginName: plugin.name,
        icon: style.icon,
        iconBgColor: style.bgColor,
        iconTextColor: style.textColor
      })
    }
  }

  return skills
}

function formatSkillName(id: string): string {
  // Convert "double-check-article" to "Double Check Article"
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function filterSkills(skills: SkillDisplay[], query: string, category: string): SkillDisplay[] {
  return skills.filter(skill => {
    const matchesQuery = !query ||
      skill.name.toLowerCase().includes(query.toLowerCase()) ||
      skill.description.toLowerCase().includes(query.toLowerCase())

    const matchesCategory = !category || category === 'All' ||
      skill.pluginName.toLowerCase() === category.toLowerCase()

    return matchesQuery && matchesCategory
  })
}
