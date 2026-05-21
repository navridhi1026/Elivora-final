// ─── MediaPipe landmark indices ──────────────────────────────
export const LANDMARKS = {
  LEFT_SHOULDER:  11,
  RIGHT_SHOULDER: 12,
  LEFT_HIP:       23,
  RIGHT_HIP:      24,
  LEFT_ELBOW:     13,
  RIGHT_ELBOW:    14,
}

// ─── Image cache ─────────────────────────────────────────────
const imageCache = {}

export function preloadImage(src) {
  if (imageCache[src]) return Promise.resolve(imageCache[src])

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload  = () => { imageCache[src] = img; resolve(img) }
    img.onerror = (err) => reject(err)
    img.src = src
  })
}

// ─── Calculate where to draw the clothing ────────────────────
export function calculateClothingTransform(
  landmarks,
  canvasW,
  canvasH,
  config = {}
) {
  const {
    verticalOffset  = 0.02,
    widthMultiplier = 1.5,
    heightRatio     = 1.2,
  } = config

  const lShoulder = landmarks[LANDMARKS.LEFT_SHOULDER]
  const rShoulder = landmarks[LANDMARKS.RIGHT_SHOULDER]
  const lHip      = landmarks[LANDMARKS.LEFT_HIP]
  const rHip      = landmarks[LANDMARKS.RIGHT_HIP]

  if (!lShoulder || !rShoulder || !lHip || !rHip) return null

  const MIN_VISIBILITY = 0.5
  if (
    lShoulder.visibility < MIN_VISIBILITY ||
    rShoulder.visibility < MIN_VISIBILITY
  ) return null

  const toPixel = (lm) => ({
    x: lm.x * canvasW,
    y: lm.y * canvasH,
  })

  const ls = toPixel(lShoulder)
  const rs = toPixel(rShoulder)
  const lh = toPixel(lHip)
  const rh = toPixel(rHip)

  const midX        = (ls.x + rs.x) / 2
  const midY        = (ls.y + rs.y) / 2
  const shoulderSpan = Math.abs(rs.x - ls.x)
  const hipMidY     = (lh.y + rh.y) / 2
  const bodyHeight  = hipMidY - midY  // eslint-disable-line no-unused-vars

  const clothingW = shoulderSpan * widthMultiplier
  const clothingH = clothingW * heightRatio
  const angle     = Math.atan2(rs.y - ls.y, rs.x - ls.x)

  const x = midX - clothingW / 2
  const y = midY - clothingH * verticalOffset

  return { x, y, width: clothingW, height: clothingH, angle, midX, midY }
}

// ─── Draw the clothing PNG onto the canvas ───────────────────
export function drawClothing(ctx, img, transform) {
  if (!img || !transform) return

  const { x, y, width, height, angle, midX, midY } = transform

  ctx.save()
  ctx.translate(midX, midY)
  ctx.rotate(angle)
  ctx.translate(-midX, -midY)
  ctx.drawImage(img, x, y, width, height)
  ctx.restore()
}