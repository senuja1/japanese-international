import {
  MOCK_DOWNLOADS,
  MOCK_NOTIFICATIONS,
  MOCK_VIDEOS,
  MOCK_QUESTIONS,
} from '../utils/mockData'

const STORAGE_KEYS = {
  content: 'japanese_portal_content_v1',
  announcements: 'japanese_portal_announcements_v1',
  notificationState: 'japanese_portal_notification_state_v1',
  downloadsByUser: 'japanese_portal_downloads_by_user_v1',
  videosWatchedByUser: 'japanese_portal_videos_watched_by_user_v1',
  testResultsByUser: 'japanese_portal_test_results_by_user_v1',
  userProfiles: 'japanese_portal_user_profiles_v1',
}

const readJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

const writeJSON = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

const nowISODate = () => new Date().toISOString().split('T')[0]

const seedContent = () => ({
  videos: MOCK_VIDEOS,
  downloads: MOCK_DOWNLOADS,
  questions: MOCK_QUESTIONS,
})

const seedAnnouncements = () => ({
  items: MOCK_NOTIFICATIONS.map(n => ({
    id: n.id,
    title: n.title,
    body: n.body,
    date: n.date,
    type: n.type,
  })),
})

export function getContent() {
  const content = readJSON(STORAGE_KEYS.content, null)
  if (content?.videos && content?.downloads && content?.questions) return content
  const seeded = seedContent()
  writeJSON(STORAGE_KEYS.content, seeded)
  return seeded
}

export function setVideos(videos) {
  const content = getContent()
  const next = { ...content, videos }
  writeJSON(STORAGE_KEYS.content, next)
}

export function setDownloads(downloads) {
  const content = getContent()
  const next = { ...content, downloads }
  writeJSON(STORAGE_KEYS.content, next)
}

export function getAnnouncements() {
  const stored = readJSON(STORAGE_KEYS.announcements, null)
  if (stored?.items) return stored
  const seeded = seedAnnouncements()
  writeJSON(STORAGE_KEYS.announcements, seeded)
  return seeded
}

export function setAnnouncementsItems(items) {
  writeJSON(STORAGE_KEYS.announcements, { items })
}

function ensureUserProfile(userId, fallbackProfile) {
  const profiles = readJSON(STORAGE_KEYS.userProfiles, {})
  if (!profiles[userId]) {
    profiles[userId] = fallbackProfile
    writeJSON(STORAGE_KEYS.userProfiles, profiles)
  }
  return profiles[userId]
}

export function getUserProfile(userId, fallbackProfile) {
  const profiles = readJSON(STORAGE_KEYS.userProfiles, {})
  if (profiles[userId]) return profiles[userId]
  if (!fallbackProfile) return null
  return ensureUserProfile(userId, fallbackProfile)
}

export function updateUserProfile(userId, patch) {
  const profiles = readJSON(STORAGE_KEYS.userProfiles, {})
  const prev = profiles[userId] || {}
  profiles[userId] = { ...prev, ...patch }
  writeJSON(STORAGE_KEYS.userProfiles, profiles)
  return profiles[userId]
}

function ensureNotificationStateForUser(userId) {
  const state = readJSON(STORAGE_KEYS.notificationState, {})
  if (!state[userId]) {
    const initialReads = MOCK_NOTIFICATIONS.filter(n => n.read).map(n => n.id)
    state[userId] = { readIds: initialReads, hiddenIds: [] }
    writeJSON(STORAGE_KEYS.notificationState, state)
  }
  return state[userId]
}

export function getNotificationState(userId) {
  const state = readJSON(STORAGE_KEYS.notificationState, {})
  if (!state[userId]) return ensureNotificationStateForUser(userId)
  return state[userId]
}

export function markNotificationRead(userId, notificationId) {
  const stateAll = readJSON(STORAGE_KEYS.notificationState, {})
  const s = ensureNotificationStateForUser(userId)
  const nextReadIds = s.readIds.includes(notificationId)
    ? s.readIds
    : [...s.readIds, notificationId]
  stateAll[userId] = { ...s, readIds: nextReadIds }
  writeJSON(STORAGE_KEYS.notificationState, stateAll)
  return stateAll[userId]
}

export function hideNotification(userId, notificationId) {
  const stateAll = readJSON(STORAGE_KEYS.notificationState, {})
  const s = ensureNotificationStateForUser(userId)
  if (s.hiddenIds.includes(notificationId)) return s
  stateAll[userId] = { ...s, hiddenIds: [...s.hiddenIds, notificationId] }
  writeJSON(STORAGE_KEYS.notificationState, stateAll)
  return stateAll[userId]
}

export function getNotificationsForUser(userId) {
  const announcements = getAnnouncements().items
  const s = getNotificationState(userId)
  const readSet = new Set(s.readIds)
  const hiddenSet = new Set(s.hiddenIds)

  return announcements
    .filter(a => !hiddenSet.has(a.id))
    .map(a => ({ ...a, read: readSet.has(a.id) }))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
}

export function getUnreadCountForUser(userId) {
  const notifs = getNotificationsForUser(userId)
  return notifs.filter(n => !n.read).length
}

function ensureArrayByUser(key, userId, fallbackValue) {
  const all = readJSON(key, {})
  if (!all[userId]) {
    all[userId] = fallbackValue
    writeJSON(key, all)
  }
  return all[userId]
}

export function getDownloadedIdsForUser(userId) {
  return ensureArrayByUser(
    STORAGE_KEYS.downloadsByUser,
    userId,
    []
  )
}

export function addDownloadedIdForUser(userId, fileId) {
  const all = readJSON(STORAGE_KEYS.downloadsByUser, {})
  const prev = ensureArrayByUser(STORAGE_KEYS.downloadsByUser, userId, [])
  const next = prev.includes(fileId) ? prev : [...prev, fileId]
  all[userId] = next
  writeJSON(STORAGE_KEYS.downloadsByUser, all)
  return next
}

export function getVideosWatchedIdsForUser(userId) {
  return ensureArrayByUser(
    STORAGE_KEYS.videosWatchedByUser,
    userId,
    []
  )
}

export function addVideoWatchedIdForUser(userId, videoId) {
  const all = readJSON(STORAGE_KEYS.videosWatchedByUser, {})
  const prev = ensureArrayByUser(STORAGE_KEYS.videosWatchedByUser, userId, [])
  const next = prev.includes(videoId) ? prev : [...prev, videoId]
  all[userId] = next
  writeJSON(STORAGE_KEYS.videosWatchedByUser, all)
  return next
}

export function getTestResultsForUser(userId) {
  const all = readJSON(STORAGE_KEYS.testResultsByUser, {})
  if (!all[userId]) return []
  return all[userId]
}

export function addTestResultForUser(userId, result) {
  const all = readJSON(STORAGE_KEYS.testResultsByUser, {})
  const prev = all[userId] || []
  const next = [result, ...prev]
  all[userId] = next
  writeJSON(STORAGE_KEYS.testResultsByUser, all)
  return next
}

export function dateISO() {
  return nowISODate()
}

