
const key = 'feature-flags'

// all feature flags and their defaults
const defaultFeatureFlags = {
  redTable: false
}

const persistedFeatures = (() => {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}')
  } catch (_) {
    return {}
  }
})()

export const featureFlags = Object.assign({}, defaultFeatureFlags, persistedFeatures)

export function assignFeatureFlag (feature, value) {
  if (!defaultFeatureFlags.hasOwnProperty(feature)) throw new Error(`Invalid feature: ${feature}`)

  const newPersistedFeatures = Object.assign({}, persistedFeatures, {
    [feature]: !!value
  })

  try {
    localStorage.setItem(key, JSON.stringify(newPersistedFeatures))
  } catch (err) {}

  console.log(`Feature '${feature}' set to '${!!value}'. Refresh the page to for it to take effect.`)
}

window.assignFeatureFlag = assignFeatureFlag
