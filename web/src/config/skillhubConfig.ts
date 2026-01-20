/**
 * Skillhub configuration
 * Defines marketplace directories and related settings
 */

export interface SkillhubConfig {
  // Marketplace directories (relative to public folder)
  marketplaceDirectories: string[]
  description?: string
}

let cachedConfig: SkillhubConfig | null = null

/**
 * Load skillhub configuration from public/skillhub-config.json
 * If not found, returns default configuration
 */
export async function loadSkillhubConfig(): Promise<SkillhubConfig> {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    const response = await fetch('/skillhub-config.json')
    if (response.ok) {
      cachedConfig = await response.json()
      return cachedConfig
    }
  } catch (error) {
    console.warn('Failed to load skillhub-config.json, using default configuration:', error)
  }

  // Default configuration
  cachedConfig = {
    marketplaceDirectories: ['vibe-working-skills']
  }
  return cachedConfig
}

/**
 * Get the cached skillhub configuration (must call loadSkillhubConfig first)
 */
export function getSkillhubConfig(): SkillhubConfig {
  if (!cachedConfig) {
    throw new Error('Skillhub config not loaded. Call loadSkillhubConfig() first.')
  }
  return cachedConfig
}

/**
 * Get marketplace data from a specific directory
 * @param directory - Directory path relative to public folder
 * @returns Path to marketplace.json file
 */
export function getMarketplaceJsonPath(directory: string): string {
  return `/${directory}/.claude-plugin/marketplace.json`
}

/**
 * Get all marketplace.json paths from configured directories
 */
export async function getAllMarketplaceJsonPaths(): Promise<string[]> {
  const config = await loadSkillhubConfig()
  return config.marketplaceDirectories.map(dir => getMarketplaceJsonPath(dir))
}
