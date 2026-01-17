import type { Marketplace, SkillDisplay } from '../types/skill'

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

export async function fetchMarketplace(): Promise<Marketplace> {
  const response = await fetch('/data/marketplace.json')
  if (!response.ok) {
    throw new Error('Failed to fetch marketplace data')
  }
  return response.json()
}

export async function fetchSkills(): Promise<SkillDisplay[]> {
  const marketplace = await fetchMarketplace()
  const skills: SkillDisplay[] = []

  for (const plugin of marketplace.plugins) {
    for (const skillPath of plugin.skills) {
      // Extract skill name from path (e.g., "./double-check-article" -> "double-check-article")
      const skillId = skillPath.replace('./', '')
      const style = getCategoryStyle(skillId)

      skills.push({
        id: skillId,
        name: formatSkillName(skillId),
        description: plugin.description,
        category: getCategoryFromSkillName(skillId),
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

    const matchesCategory = !category || category === 'Popular' ||
      skill.category.toLowerCase() === category.toLowerCase()

    return matchesQuery && matchesCategory
  })
}
