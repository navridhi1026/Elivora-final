import React, {
  useRef, useEffect, useState, useCallback
} from 'react'
import { Camera, RefreshCw, Download, Zap, ChevronRight, Search } from 'react-feather'
import { Link } from 'react-router-dom'
import usePoseDetection from '@/hooks/usePoseDetection'
import {
  preloadImage,
  calculateClothingTransform,
  drawClothing,
} from '../utils/clothingRenderer'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const CLOTHES = [
  { id: 1, name: 'White Shirt', src: '/clothes/shirt-white.png', config: { widthMultiplier: 1.55, heightRatio: 1.3, verticalOffset: 0.0 } },
  { id: 2, name: 'Black Jacket', src: '/clothes/jacket-black.png', config: { widthMultiplier: 1.65, heightRatio: 1.4, verticalOffset: -0.02 } },
  { id: 3, name: 'Gray Hoodie', src: '/clothes/hoodie-gray.png', config: { widthMultiplier: 1.6, heightRatio: 1.35, verticalOffset: 0.0 } },
]

// Gender detection - uses body width analysis
async function detectGenderFromPose(landmarks) {
  if (!landmarks || landmarks.length === 0) return 'unisex'
  
  try {
    // Use shoulder and hip width to estimate gender
    // Females typically have narrower shoulders relative to hips
    const leftShoulder = landmarks[11]
    const rightShoulder = landmarks[12]
    const leftHip = landmarks[23]
    const rightHip = landmarks[24]
    
    if (!leftShoulder || !rightShoulder || !leftHip || !rightHip) {
      return 'unisex'
    }
    
    const shoulderWidth = Math.abs(rightShoulder.x - leftShoulder.x)
    const hipWidth = Math.abs(rightHip.x - leftHip.x)
    const ratio = shoulderWidth / hipWidth
    
    // Women typically have ratio < 0.95, men > 0.95
    return ratio < 0.95 ? 'female' : 'male'
  } catch (err) {
    console.error('Gender detection error:', err)
    return 'unisex'
  }
}

export default function VirtualTryOnPage() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const landmarksRef = useRef(null)
  const clothingImgRef = useRef(null)
  const renderLoopRef = useRef(null)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [cameraReady, setCameraReady] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [poseDetected, setPoseDetected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fps, setFps] = useState(0)

  // Snapshot & suggestion state
  const [snapshot, setSnapshot] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [detectedGender, setDetectedGender] = useState(null)
  const [suggestedProducts, setSuggestedProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const currentCloth = CLOTHES[currentIndex]

  // ── Camera ──────────────────────────────────────────────────
  useEffect(() => {
    let stream = null
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user', frameRate: { ideal: 30 } },
          audio: false,
        })
        if (videoRef.current) {
          const video = videoRef.current
          video.onloadedmetadata = () => {
            video.play().catch(console.error)
            setCameraReady(true)
            setLoading(false)
          }
          video.srcObject = stream
          
          if (video.readyState >= 1) {
            video.play().catch(console.error)
            setCameraReady(true)
            setLoading(false)
          }
          
          // Safety timeout in case metadata event doesn't fire
          setTimeout(() => {
            setCameraReady(true)
            setLoading(false)
          }, 3000)
        }
      } catch (err) {
        setCameraError(err.name === 'NotAllowedError'
          ? 'Camera access denied. Please allow camera in browser settings.'
          : 'Camera not available on this device.')
        setLoading(false)
      }
    }
    startCamera()
    return () => stream?.getTracks().forEach(t => t.stop())
  }, [])

  useEffect(() => {
    clothingImgRef.current = null
    preloadImage(currentCloth.src)
      .then(img => { clothingImgRef.current = img })
      .catch(() => {})
  }, [currentIndex])

  const handlePoseDetected = useCallback((landmarks) => {
    landmarksRef.current = landmarks
    setPoseDetected(true)
  }, [])

  usePoseDetection({ videoRef, onPoseDetected: handlePoseDetected, enabled: cameraReady })

  // ── Render Loop ──────────────────────────────────────────────
  useEffect(() => {
    if (!cameraReady) return
    let lastTime = performance.now()
    let frameCount = 0, fpsTimer = 0

    const render = (now) => {
      frameCount++
      fpsTimer += now - lastTime
      if (fpsTimer >= 1000) { setFps(frameCount); frameCount = 0; fpsTimer = 0 }
      lastTime = now

      const canvas = canvasRef.current
      const video = videoRef.current
      if (!canvas || !video || video.readyState < 2) {
        renderLoopRef.current = requestAnimationFrame(render)
        return
      }

      const ctx = canvas.getContext('2d')
      canvas.width = video.videoWidth || 1280
      canvas.height = video.videoHeight || 720

      ctx.save()
      ctx.scale(-1, 1)
      ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
      ctx.restore()

      if (landmarksRef.current && clothingImgRef.current) {
        const mirrored = landmarksRef.current.map(lm => ({ ...lm, x: 1 - lm.x }))
        const transform = calculateClothingTransform(mirrored, canvas.width, canvas.height, currentCloth.config)
        if (transform) drawClothing(ctx, clothingImgRef.current, transform)
      }

      renderLoopRef.current = requestAnimationFrame(render)
    }
    renderLoopRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(renderLoopRef.current)
  }, [cameraReady, currentIndex])

  // ── Capture + Analyse ───────────────────────────────────────
  const captureAndAnalyse = async () => {
    const canvas = canvasRef.current
    if (!canvas || !landmarksRef.current) {
      alert('Please wait for pose to be detected')
      return
    }

    // Get snapshot
    const dataUrl = canvas.toDataURL('image/png')
    setSnapshot(dataUrl)
    setAnalyzing(true)

    // Detect gender from pose landmarks
    const gender = await detectGenderFromPose(landmarksRef.current)
    setDetectedGender(gender)

    // Fetch matching products from our API
    try {
      const searchParam = searchQuery.trim() ? `&search=${encodeURIComponent(searchQuery.trim())}` : ''
      const resp = await fetch(`${API_URL}/products?gender=${gender}${searchParam}&limit=6`)
      const data = await resp.json()
      if (data.products) {
        setSuggestedProducts(data.products)
      }
    } catch (err) {
      console.error('Failed to fetch suggestions:', err)
    }

    setAnalyzing(false)
  }

  const captureScreenshot = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = `elivora-tryon-${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
      {/* Header */}
      <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Virtual Try-On</h1>
            <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>AI-powered · WebRTC camera · Gender-smart suggestions</p>
          </div>
          <div style={{ fontSize: '12px', color: '#888', background: '#1a1a1a', padding: '8px 14px', borderRadius: '20px', border: '1px solid #333' }}>
            💡 Stand 1-2m from camera · Good lighting · Torso visible
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 16px' }}>
        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '80px 0' }}>
            <div style={{ width: '48px', height: '48px', border: '4px solid #333', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#888' }}>Starting camera…</p>
          </div>
        )}

        {/* Error */}
        {cameraError && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '80px 0', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>📷</div>
            <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Camera Unavailable</h2>
            <p style={{ color: '#888', maxWidth: '380px', fontSize: '14px' }}>{cameraError}</p>
            <button onClick={() => window.location.reload()}
              style={{ padding: '12px 24px', background: 'white', color: 'black', border: 'none', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}

        {/* Hidden video element for camera stream */}
        <video ref={videoRef} autoPlay playsInline muted style={{ display: 'none' }} />

        {/* Main Layout */}
        {!loading && !cameraError && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '20px' }}>

            {/* Canvas Column */}
            <div>
              <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#111' }}>
                <canvas ref={canvasRef} style={{ width: '100%', display: 'block', borderRadius: '16px' }} />

                {/* HUD */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(8px)' }}>
                    <Zap size={10} color="#facc15" /> {fps} FPS
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(8px)', background: poseDetected ? 'rgba(34,197,94,0.7)' : 'rgba(0,0,0,0.6)', color: poseDetected ? 'white' : '#888' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: poseDetected ? 'white' : '#555', display: 'inline-block' }} />
                    {poseDetected ? 'Pose detected' : 'Finding pose…'}
                  </div>
                  {detectedGender && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', padding: '4px 10px', borderRadius: '20px', background: 'rgba(99,102,241,0.8)', backdropFilter: 'blur(8px)', color: 'white' }}>
                      {detectedGender === 'female' ? '👩' : '👨'} {detectedGender === 'female' ? 'Women\'s' : 'Men\'s'} style detected
                    </div>
                  )}
                </div>

                {/* Bottom actions */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', borderRadius: '0 0 16px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '30px', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <Search size={14} color="#aaa" />
                    <input 
                      type="text" 
                      placeholder="What are you looking for? (e.g. T-shirt)" 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: 'white', padding: '8px 10px', fontSize: '13px', width: '100%', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={captureAndAnalyse} disabled={analyzing}
                    style={{ flex: 1, padding: '12px', background: analyzing ? '#555' : 'white', color: analyzing ? '#ccc' : 'black', border: 'none', borderRadius: '30px', cursor: analyzing ? 'not-allowed' : 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    {analyzing ? (
                      <><span style={{ width: '14px', height: '14px', border: '2px solid #999', borderTopColor: '#333', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Analysing...</>
                    ) : (
                      <><Camera size={15} /> Capture & Get Suggestions</>
                    )}
                  </button>
                  <button onClick={captureScreenshot}
                    style={{ padding: '12px 18px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', backdropFilter: 'blur(8px)' }}>
                    <Download size={14} /> Save
                  </button>
                  </div>
                </div>
              </div>

              {/* AI Suggestions Panel */}
              {detectedGender && suggestedProducts.length > 0 && (
                <div style={{ marginTop: '20px', background: '#111', borderRadius: '16px', border: '1px solid #222', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>
                        {detectedGender === 'female' ? '👗' : '👔'} AI Suggestions for You
                      </h3>
                      <p style={{ margin: '3px 0 0', fontSize: '12px', color: '#888' }}>
                        Based on your detected style • {detectedGender === 'female' ? "Women's" : "Men's"} collection
                      </p>
                    </div>
                    <Link to={`/products?gender=${detectedGender}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#888', textDecoration: 'none' }}>
                      View All <ChevronRight size={13} />
                    </Link>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '16px' }}>
                    {suggestedProducts.slice(0, 6).map(product => (
                      <Link key={product._id || product.id} to={`/products/${product._id || product.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                        <div style={{ background: '#1a1a1a', borderRadius: '12px', overflow: 'hidden', border: '1px solid #2a2a2a', transition: 'border-color 0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = '#555'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
                          <img src={product.image} alt={product.title}
                            style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }}
                            onError={e => {
                              if (e.target.dataset.error) return
                              e.target.dataset.error = true
                              e.target.src = 'https://placehold.co/200x200/eeeeee/999999?text=No+Image'
                            }} />
                          <div style={{ padding: '10px' }}>
                            <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{product.title}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#aaa', fontWeight: '700' }}>₹{product.price}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Outfit Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Outfit Selector */}
              <div style={{ background: '#111', borderRadius: '16px', padding: '16px', border: '1px solid #222' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Try On Outfit</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {CLOTHES.map((cloth, i) => (
                    <button key={cloth.id} onClick={() => setCurrentIndex(i)}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', border: i === currentIndex ? '2px solid white' : '2px solid #2a2a2a', background: i === currentIndex ? 'rgba(255,255,255,0.08)' : 'transparent', cursor: 'pointer', color: 'white', transition: 'all 0.2s', textAlign: 'left' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '8px', overflow: 'hidden', background: '#1a1a1a', flexShrink: 0 }}>
                        <img src={cloth.src} alt={cloth.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.style.display = 'none' }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: i === currentIndex ? '700' : '400' }}>{cloth.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div style={{ background: '#111', borderRadius: '16px', padding: '16px', border: '1px solid #222' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>How It Works</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { step: '1', text: 'Stand in front of camera', icon: '📸' },
                    { step: '2', text: 'Select an outfit to try on', icon: '👕' },
                    { step: '3', text: 'Hit Capture to take photo', icon: '🤳' },
                    { step: '4', text: 'AI detects your style & suggests products', icon: '🤖' },
                  ].map(item => (
                    <div key={item.step} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.5' }}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Snapshot preview */}
              {snapshot && (
                <div style={{ background: '#111', borderRadius: '16px', padding: '16px', border: '1px solid #222' }}>
                  <h3 style={{ margin: '0 0 10px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#888' }}>Last Capture</h3>
                  <img src={snapshot} alt="snapshot" style={{ width: '100%', borderRadius: '10px', display: 'block' }} />
                  {detectedGender && (
                    <div style={{ marginTop: '10px', padding: '8px 12px', background: '#1a1a1a', borderRadius: '8px', fontSize: '12px', color: '#aaa', textAlign: 'center' }}>
                      Detected: <strong style={{ color: 'white' }}>{detectedGender === 'female' ? '👩 Female' : '👨 Male'}</strong>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
